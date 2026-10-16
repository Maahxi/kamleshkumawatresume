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

  /* -------------------------------------------------------------------------
     11. 3D TILTED CYLINDER HERO SHOWCASE (Curved Arc Merchandising Reel)
     ------------------------------------------------------------------------- */
  initTiltedGridHero();
});

function initTiltedGridHero() {
  const root = document.getElementById('tilted-grid-hero-root');
  if (!root) return;

  const IMAGES = [
    { src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80', alt: 'Showroom visual merchandising' },
    { src: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1000&q=80', alt: 'Apparel store displays' },
    { src: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1000&q=80', alt: 'Flagship boutique interior' },
    { src: 'https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&w=1000&q=80', alt: 'Retail footwear & apparel' },
    { src: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1000&q=80', alt: 'Fashion showroom inventory' },
    { src: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=1000&q=80', alt: 'Sports & lifestyle collection' },
    { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80', alt: 'Retail grand opening showroom' }
  ];

  // Preload images
  IMAGES.forEach(item => {
    const img = new Image();
    img.src = item.src;
  });

  const SLICES = 16;
  const CAMERA = 1.6;
  const curve = 80;
  const bend = (Math.min(85, Math.max(5, curve)) * Math.PI) / 180;
  const tileHeight = 28;
  const aspectRatio = 16 / 9;
  const gap = 8;
  const axis = 56;
  const fade = 12;
  const speed = 4;
  const MAX_WIDTH = 55;

  function arc(b) {
    return (CAMERA - 1 + Math.cos(b)) / (2 * CAMERA * Math.sin(b));
  }

  function measure(width, height) {
    const h = Math.min((tileHeight / 100) * height, ((MAX_WIDTH / 100) * width) / aspectRatio);
    const radius = width * arc(bend);
    if (!(h > 0) || !(radius > 0)) return { columns: 2, sweep: 0, unit: 0, limit: 0 };
    const deg = (rad) => (rad * 180) / Math.PI;
    const unit = deg(h / radius);
    const pitch = (aspectRatio + gap / 100) * unit;
    const limit = deg(bend) + (aspectRatio * unit) / 2;
    const columns = Math.min(60, Math.max(2, Math.ceil((2 * limit) / pitch)));
    const round = (n) => +n.toFixed(4);
    const sweep = round((columns * pitch) / 2);
    return { columns, sweep, unit: round(unit), limit: round(Math.min(sweep, limit)) };
  }

  let styleEl = document.getElementById('tilted-grid-dynamic-style');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'tilted-grid-dynamic-style';
    document.head.appendChild(styleEl);
  }

  function render(width, height) {
    const layout = measure(width, height);
    const { columns, sweep, unit, limit } = layout;

    const r = 100 * arc(bend);
    const radiusStr = `${+r.toFixed(3)}cqw`;
    const turn = (deg) => `translateZ(${radiusStr}) rotateY(${+deg.toFixed(4)}deg) translateZ(-${radiusStr})`;
    const hide = +(((sweep - limit) / (2 * sweep || 1)) * 100).toFixed(4);
    const duration = columns * speed;

    styleEl.textContent = `
      @keyframes tgh-orbit-loop {
        from { transform: ${turn(-sweep)}; }
        to { transform: ${turn(sweep)}; }
        0%, ${hide}%, ${100 - hide}%, 100% { visibility: hidden; }
        ${hide + 0.001}%, ${100 - hide - 0.001}% { visibility: visible; }
      }
      @media (prefers-reduced-motion: reduce) {
        .tgh-tile { animation-play-state: paused !important; }
      }
    `;

    const u = (n) => `calc(${+n.toFixed(4)} * min(${tileHeight}cqh, ${+(MAX_WIDTH / aspectRatio).toFixed(4)}cqw))`;
    const share = aspectRatio / SLICES;
    const mask = `linear-gradient(90deg, transparent, #000 ${fade}%, #000 ${100 - fade}%, transparent)`;

    root.innerHTML = '';

    const band = document.createElement('div');
    band.className = 'tilted-grid-band';
    band.style.perspective = `${+(r * CAMERA).toFixed(3)}cqw`;
    band.style.perspectiveOrigin = `50% ${axis}%`;
    band.style.maskImage = mask;
    band.style.webkitMaskImage = mask;
    band.style.opacity = '1';

    for (let t = 0; t < columns; t++) {
      const first = columns - 1 - t;
      const img = IMAGES[first % IMAGES.length];

      const tile = document.createElement('div');
      tile.className = 'tgh-tile';
      tile.style.left = `calc(50% - ${u(aspectRatio / 2)})`;
      tile.style.top = `calc(${axis}% - ${u(0.5)})`;
      tile.style.width = u(aspectRatio);
      tile.style.height = u(1);
      tile.style.animation = `tgh-orbit-loop ${duration}s linear ${-t * speed}s infinite`;

      for (let k = 0; k < SLICES; k++) {
        const slice = document.createElement('div');
        slice.className = 'tgh-slice' + (k === 0 ? ' slice-first' : '') + (k === SLICES - 1 ? ' slice-last' : '');
        slice.style.left = u((aspectRatio - share) / 2);
        slice.style.width = k === SLICES - 1 ? u(share) : `calc(${u(share)} + 1px)`;
        slice.style.height = u(1);
        slice.style.transform = turn((aspectRatio / 2 - (k + 0.5) * share) * unit);

        const imgEl = document.createElement('img');
        imgEl.className = 'tgh-img';
        imgEl.src = img.src;
        imgEl.alt = k === 0 ? img.alt : '';
        imgEl.loading = 'eager';
        imgEl.style.left = u(-k * share);
        imgEl.style.width = u(aspectRatio);
        imgEl.style.height = u(1);

        slice.appendChild(imgEl);
        tile.appendChild(slice);
      }

      band.appendChild(tile);
    }

    root.appendChild(band);
  }

  let prevWidth = 0;
  let prevHeight = 0;
  const ro = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      if (width !== prevWidth || height !== prevHeight) {
        prevWidth = width;
        prevHeight = height;
        if (width > 0 && height > 0) {
          render(width, height);
        }
      }
    }
  });
  ro.observe(root);
}
