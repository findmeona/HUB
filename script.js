/* ===================================================
   RV CREATION – script.js
   Features:
   - Sticky navbar scroll effect
   - Mobile hamburger menu
   - Scroll reveal animations
   - Counter animation for stats
   - Contact form with WhatsApp redirect
   - Active nav link on scroll
=================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ================================================
     1. NAVBAR – scroll shadow + active state
  ================================================ */
  const navbar = document.getElementById('navbar');

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
     2. HAMBURGER MENU
  ================================================ */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when any nav link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }


  /* ================================================
     3. SCROLL REVEAL
  ================================================ */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });
   // OPEN LIGHTBOX
function openLightbox(imgSrc) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");

  img.src = imgSrc;
  lightbox.style.display = "flex";
}

// CLOSE LIGHTBOX
function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// CLICK OUTSIDE IMAGE TO CLOSE
document.addEventListener("click", function(e) {
  const lightbox = document.getElementById("lightbox");
  if (e.target === lightbox) {
    closeLightbox();
  }
});


  /* ================================================
     4. COUNTER ANIMATION
  ================================================ */
  const statNums = document.querySelectorAll('.stat-num[data-target]');

  const counterObserver = new IntersectionObserver(
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

  statNums.forEach(function (el) {
    counterObserver.observe(el);
  });

  function animateCounter(el) {
    var target   = parseInt(el.getAttribute('data-target'), 10);
    var duration = 1600;
    var start    = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
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
     5. ACTIVE NAV LINK ON SCROLL
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
     6. CONTACT FORM – WhatsApp redirect
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

      // Basic validation
      if (!name) {
        showError('fname', 'Please enter your name.');
        return;
      }
      if (!phone) {
        showError('fphone', 'Please enter your phone number.');
        return;
      }
      if (!service) {
        showError('fservice', 'Please select a service.');
        return;
      }

      // Build WhatsApp message
      var waMessage = 'Hello RV Creation! 🙏\n\n';
      waMessage += '*Name:* ' + name + '\n';
      waMessage += '*Phone:* ' + phone + '\n';
      waMessage += '*Service:* ' + service + '\n';
      if (date) {
        var formatted = formatDate(date);
        waMessage += '*Event Date:* ' + formatted + '\n';
      }
      if (message) {
        waMessage += '*Message:* ' + message + '\n';
      }
      waMessage += '\nI would like to know more about your decoration services.';

      var encoded = encodeURIComponent(waMessage);
      var waURL   = 'https://wa.me/919913542816?text=' + encoded;

      // Show success message
      var successEl = document.getElementById('formSuccess');
      if (successEl) {
        successEl.style.display = 'block';
        successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Open WhatsApp after brief delay
      setTimeout(function () {
        window.open(waURL, '_blank');
      }, 600);

      // Reset form after 3s
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
    field.focus();
    // Remove error style on next input
    field.addEventListener('input', function () {
      field.style.borderColor = '';
    }, { once: true });
    // Optional: alert fallback
    alert(msg);
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    var parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return parts[2] + '/' + parts[1] + '/' + parts[0];
  }


  /* ================================================
     7. SMOOTH SCROLL FOR ANCHOR LINKS
  ================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = 70; // navbar height
        var targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });


  /* ================================================
     8. GALLERY – replace placeholders with images
     To add real photos:
     Replace the .gallery-placeholder div with:
     <img src="images/your-photo.jpg" alt="Event description" />
  ================================================ */

}); // end DOMContentLoaded
