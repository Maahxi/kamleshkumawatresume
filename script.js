/* ==========================================================================
   KAMLESH KUMAWAT - DIGITAL RESUME SCRIPTS
   Interactive UI, Daily Mirror Tabs, Clipboard Tools & Contact Encoders
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scroll-progress');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const printCvBtn = document.getElementById('print-cv-btn');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  const shareBtn = document.getElementById('share-btn');

  // Daily Mirror Tabs
  const workflowTabs = document.querySelectorAll('.w-tab');
  const workflowSteps = document.querySelectorAll('.workflow-step');

  // Recruiter Form Buttons
  const sendWhatsAppBtn = document.getElementById('send-whatsapp-btn');
  const sendEmailBtn = document.getElementById('send-email-btn');

  /* -------------------------------------------------------------------------
     1. THEME SWITCHER (Dark / Light Mode)
     ------------------------------------------------------------------------- */
  const savedTheme = localStorage.getItem('kamlesh_resume_theme') || 'dark';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('kamlesh_resume_theme', newTheme);
  });

  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
      themeToggle.setAttribute('title', 'Switch to Light Theme');
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeToggle.setAttribute('title', 'Switch to Dark Theme');
    }
  }

  /* -------------------------------------------------------------------------
     2. SCROLL PROGRESS & HEADER STICKY BEHAVIOR
     ------------------------------------------------------------------------- */
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    if (scrollProgress) {
      scrollProgress.style.width = `${scrollPercent}%`;
    }

    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    highlightActiveNavLink();
  });

  /* -------------------------------------------------------------------------
     3. ACTIVE NAVIGATION LINK ON SCROLL
     ------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveNavLink() {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* -------------------------------------------------------------------------
     4. MOBILE NAVIGATION TOGGLE
     ------------------------------------------------------------------------- */
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    mobileToggle.setAttribute('aria-expanded', isOpen);
  });

  // Auto-close menu when clicking link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    });
  });

  /* -------------------------------------------------------------------------
     5. TOAST NOTIFICATION UTILITY
     ------------------------------------------------------------------------- */
  let toastTimeout;
  function showToast(message, iconClass = 'fa-circle-check') {
    if (!toast) return;
    toastText.textContent = message;
    const icon = toast.querySelector('.toast-icon');
    if (icon) {
      icon.className = `fa-solid ${iconClass} toast-icon`;
    }
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  /* -------------------------------------------------------------------------
     6. CLIPBOARD COPY TRIGGERS
     ------------------------------------------------------------------------- */
  const copyTriggers = document.querySelectorAll('.copy-trigger');
  copyTriggers.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = el.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
      }).catch(() => {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`Copied: ${textToCopy}`);
      });
    });
  });

  /* -------------------------------------------------------------------------
     7. DAILY MIRROR WORKFLOW TABS
     ------------------------------------------------------------------------- */
  workflowTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const stepIndex = tab.getAttribute('data-step');

      workflowTabs.forEach(t => t.classList.remove('active'));
      workflowSteps.forEach(s => s.classList.remove('active'));

      tab.classList.add('active');
      const targetStep = document.getElementById(`step-${stepIndex}`);
      if (targetStep) {
        targetStep.classList.add('active');
      }
    });
  });

  /* -------------------------------------------------------------------------
     8. PRINT / PDF TRIGGER
     ------------------------------------------------------------------------- */
  if (printCvBtn) {
    printCvBtn.addEventListener('click', () => {
      window.print();
    });
  }

  /* -------------------------------------------------------------------------
     9. SHARE RESUME LINK
     ------------------------------------------------------------------------- */
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'Kamlesh Kumawat - Senior Retail Showroom Manager',
        text: 'Review the digital resume and retail portfolio of Kamlesh Kumawat (10+ Years Store Leadership Experience):',
        url: window.location.href
      };

      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          // Fallback if user dismissed
        }
      } else {
        // Fallback: Copy link
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('Resume link copied to clipboard!');
        });
      }
    });
  }

  /* -------------------------------------------------------------------------
     10. RECRUITER CONTACT FORM LOGIC (WhatsApp & Email Encoders)
     ------------------------------------------------------------------------- */
  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', () => {
      const name = document.getElementById('recruiter-name').value.trim() || 'A Recruiter';
      const phone = document.getElementById('recruiter-phone').value.trim();
      const role = document.getElementById('recruiter-role').value;
      const msg = document.getElementById('recruiter-msg').value.trim();

      let text = `Hello Kamlesh,\n\nI reviewed your digital resume and would like to discuss an opportunity.\n\n*Name/Company:* ${name}`;
      if (phone) text += `\n*Contact:* ${phone}`;
      text += `\n*Position:* ${role}`;
      if (msg) text += `\n*Details:* ${msg}`;

      const waUrl = `https://wa.me/917976623187?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    });
  }

  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', () => {
      const name = document.getElementById('recruiter-name').value.trim() || 'Recruiter';
      const phone = document.getElementById('recruiter-phone').value.trim();
      const role = document.getElementById('recruiter-role').value;
      const msg = document.getElementById('recruiter-msg').value.trim();

      const subject = `Retail Opportunity Discussion: ${role} - ${name}`;
      let body = `Dear Kamlesh,\n\nI have reviewed your digital resume and would like to connect regarding an opportunity.\n\n`;
      body += `Organization / Recruiter: ${name}\n`;
      if (phone) body += `Contact Phone: ${phone}\n`;
      body += `Role in discussion: ${role}\n\n`;
      if (msg) body += `Message / Details:\n${msg}\n\n`;
      body += `Looking forward to your response.\n`;

      const mailtoUrl = `mailto:smartkkm@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
    });
  }
});
