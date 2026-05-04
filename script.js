/* ===================================================
   RV CREATION – script.js (ENHANCED)
   Features:
   - Sticky navbar scroll effect + backdrop blur
   - Animated hamburger menu (→ X transform)
   - Scroll reveal (up, left, right) with IntersectionObserver
   - Typing effect for hero headline
   - Counter animation for stats
   - Contact form with WhatsApp redirect
   - Active nav link on scroll
   - Particle canvas (subtle golden particles)
   - Smooth scroll for anchor links
   - Gallery lightbox
=================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ================================================
     1. NAVBAR – scroll shadow + backdrop blur
  ================================================ */
  var navbar = document.getElementById('navbar');

  function handleScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightNavLink();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });


  /* ================================================
     2. HAMBURGER MENU (with X animation)
  ================================================ */
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
      var isOpen = navLinks.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }


  /* ================================================
     3. SCROLL REVEAL (multi-direction)
  ================================================ */
  var allReveal = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  allReveal.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* Also keep old .reveal class support */
  var oldReveal = document.querySelectorAll('.reveal');
  var oldObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          oldObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  oldReveal.forEach(function (el) { oldObserver.observe(el); });


  /* ================================================
     4. TYPING EFFECT – Hero Heading Line 3
  ================================================ */
  var typingEl = document.getElementById('typingText');
  var phrases  = ['Truly Magical', 'Truly Elegant', 'Truly Special', 'Truly Yours'];
  var phraseIndex = 0;
  var charIndex   = 0;
  var isDeleting  = false;
  var typingDelay = 110;

  function typeWriter() {
    if (!typingEl) return;

    var current = phrases[phraseIndex];

    if (isDeleting) {
      typingEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      typingDelay = 60;
    } else {
      typingEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      typingDelay = 110;
    }

    if (!isDeleting && charIndex === current.length) {
      // Pause at full word
      typingDelay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingDelay = 400;
    }

    setTimeout(typeWriter, typingDelay);
  }

  // Start typing after hero lines animate in
  setTimeout(typeWriter, 1200);


  /* ================================================
     5. COUNTER ANIMATION
  ================================================ */
  var statNums = document.querySelectorAll('.stat-num[data-target]');

  var counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNums.forEach(function (el) { counterObserver.observe(el); });

  function animateCounter(el) {
    var target   = parseInt(el.getAttribute('data-target'), 10);
    var duration = 1600;
    var start    = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }


  /* ================================================
     6. ACTIVE NAV LINK ON SCROLL
  ================================================ */
  var sections = document.querySelectorAll('section[id], .hero[id]');

  function highlightNavLink() {
    var scrollPos = window.scrollY + 100;
    sections.forEach(function (section) {
      var top    = section.offsetTop;
      var bottom = top + section.offsetHeight;
      var id     = section.getAttribute('id');
      var link   = document.querySelector('.nav-links a[href="#' + id + '"]');
      if (link) {
        if (scrollPos >= top && scrollPos < bottom) {
          document.querySelectorAll('.nav-links a').forEach(function (a) {
            a.style.color = '';
          });
          link.style.color = '#F0C97A';
        }
      }
    });
  }


  /* ================================================
     7. CONTACT FORM – WhatsApp redirect
  ================================================ */
  var bookingForm = document.getElementById('bookingForm');

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = document.getElementById('fname').value.trim();
      var phone   = document.getElementById('fphone').value.trim();
      var service = document.getElementById('fservice').value;
      var date    = document.getElementById('fdate').value;
      var message = document.getElementById('fmsg').value.trim();

      if (!name)    { showError('fname',    'Please enter your name.');       return; }
      if (!phone)   { showError('fphone',   'Please enter your phone number.'); return; }
      if (!service) { showError('fservice', 'Please select a service.');      return; }

      var waMessage  = 'Hello RV Creation! 🙏\n\n';
      waMessage += '*Name:* '    + name    + '\n';
      waMessage += '*Phone:* '   + phone   + '\n';
      waMessage += '*Service:* ' + service + '\n';
      if (date)    { waMessage += '*Event Date:* ' + formatDate(date) + '\n'; }
      if (message) { waMessage += '*Message:* '    + message + '\n'; }
      waMessage += '\nI would like to know more about your decoration services.';

      var waURL = 'https://wa.me/919913542816?text=' + encodeURIComponent(waMessage);

      var successEl = document.getElementById('formSuccess');
      if (successEl) {
        successEl.style.display = 'block';
        successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      setTimeout(function () { window.open(waURL, '_blank'); }, 600);
      setTimeout(function () {
        bookingForm.reset();
        if (successEl) successEl.style.display = 'none';
      }, 3500);
    });
  }

  function showError(fieldId, msg) {
    var field = document.getElementById(fieldId);
    if (!field) return;
    field.style.borderColor = '#E24B4A';
    field.style.boxShadow   = '0 0 0 3px rgba(226,75,74,0.12)';
    field.focus();
    field.addEventListener('input', function () {
      field.style.borderColor = '';
      field.style.boxShadow   = '';
    }, { once: true });
    alert(msg);
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    var parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return parts[2] + '/' + parts[1] + '/' + parts[0];
  }


  /* ================================================
     8. SMOOTH SCROLL FOR ANCHOR LINKS
  ================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset    = 70;
        var targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });


  /* ================================================
     9. GALLERY LIGHTBOX
  ================================================ */
  window.openLightbox = function (imgSrc) {
    var lightbox = document.getElementById('lightbox');
    var img      = document.getElementById('lightbox-img');
    if (!lightbox || !img) return;
    img.src = imgSrc;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function () {
    var lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.style.display = 'none';
    document.body.style.overflow = '';
  };

  // Close on backdrop click
  var lightboxEl = document.getElementById('lightbox');
  if (lightboxEl) {
    lightboxEl.addEventListener('click', function (e) {
      if (e.target === lightboxEl) window.closeLightbox();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') window.closeLightbox();
  });


  /* ================================================
     10. PARTICLE CANVAS – Subtle golden sparkles
  ================================================ */
  var canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });

  // Only show particles in the hero viewport region
  var PARTICLE_COUNT = 38;
  var particles = [];

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function createParticle() {
    return {
      x:       randomBetween(0, canvas.width),
      y:       randomBetween(0, canvas.height * 0.85),
      r:       randomBetween(0.6, 2.2),
      alpha:   randomBetween(0.15, 0.55),
      vx:      randomBetween(-0.18, 0.18),
      vy:      randomBetween(-0.35, -0.08),
      fadeDir: Math.random() > 0.5 ? 1 : -1,
      fadeSpd: randomBetween(0.003, 0.008)
    };
  }

  for (var i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
  }

  // Gold color #C9922A split as rgb 201,146,42
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(function (p) {
      // Fade in/out
      p.alpha += p.fadeDir * p.fadeSpd;
      if (p.alpha >= 0.55) { p.fadeDir = -1; }
      if (p.alpha <= 0.06) { p.fadeDir = 1; }

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Reset when out of bounds
      if (p.y < -10) {
        p.y = canvas.height * 0.9;
        p.x = randomBetween(0, canvas.width);
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(201, 146, 42, ' + p.alpha + ')';
      ctx.fill();
    });

    requestAnimationFrame(drawParticles);
  }

  drawParticles();

  /* ================================================
     11. SERVICE CARDS – Stagger entrance
  ================================================ */
  var serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(function (card, idx) {
    card.style.transitionDelay = (idx * 0.08) + 's';
  });

  /* ================================================
     12. GALLERY ITEMS – Stagger entrance
  ================================================ */
  var galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(function (item, idx) {
    item.style.transitionDelay = (idx * 0.06) + 's';
  });

  /* ================================================
     13. STAT CARDS – pop on hover (handled in CSS)
         Extra: add sparkle ripple on click
  ================================================ */
  document.querySelectorAll('.stat-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      var ripple = document.createElement('span');
      ripple.style.cssText = [
        'position:absolute',
        'border-radius:50%',
        'background:rgba(201,146,42,0.25)',
        'pointer-events:none',
        'transform:scale(0)',
        'animation:rippleAnim 0.55s ease-out forwards',
        'width:80px',
        'height:80px',
        'top:50%',
        'left:50%',
        'margin-top:-40px',
        'margin-left:-40px'
      ].join(';');

      // Inject ripple keyframes once
      if (!document.getElementById('ripple-style')) {
        var st = document.createElement('style');
        st.id = 'ripple-style';
        st.textContent = '@keyframes rippleAnim { to { transform: scale(2.5); opacity: 0; } }';
        document.head.appendChild(st);
      }

      card.style.position = 'relative';
      card.style.overflow  = 'hidden';
      card.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 560);
    });
  });

}); // end DOMContentLoaded
