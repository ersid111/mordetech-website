// MordeTech — WhatsApp Float + Back-to-Top + Cookie Consent
(function() {

  // ── WhatsApp floating button ──
  var WA_NUMBER = '917387441521';
  var WA_MESSAGE = encodeURIComponent('Hello MordeTech! I visited your website and would like to discuss an automation project.');
  var wa = document.createElement('div');
  wa.className = 'wa-float';
  wa.innerHTML = '<div class="wa-tooltip"><strong>Chat on WhatsApp</strong>Quick reply · usually within 1 hr</div>' +
    '<a class="wa-float-btn" href="https://wa.me/' + WA_NUMBER + '?text=' + WA_MESSAGE + '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">' +
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
    '</a>';
  document.body.appendChild(wa);

  // ── Back-to-Top button ──
  var btt = document.createElement('a');
  btt.id = 'back-to-top';
  btt.href = '#';
  btt.setAttribute('aria-label', 'Back to top');
  btt.innerHTML = '↑';
  btt.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.body.appendChild(btt);

  window.addEventListener('scroll', function() {
    if (window.scrollY > 320) {
      btt.classList.add('visible');
    } else {
      btt.classList.remove('visible');
    }
  });

  // ── Cookie Consent Banner ──
  var COOKIE_KEY = 'mt_cookie_consent';
  if (!localStorage.getItem(COOKIE_KEY)) {
    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML =
      '<p>We use cookies and analytics to improve your experience. By continuing, you agree to our <a href="/privacy.html">Privacy Policy</a>.</p>' +
      '<div class="cookie-btns">' +
        '<button class="cookie-btn-decline" id="cookieDecline">Decline</button>' +
        '<button class="cookie-btn-accept" id="cookieAccept">Accept All</button>' +
      '</div>';
    document.body.appendChild(banner);

    function dismissBanner(consent) {
      localStorage.setItem(COOKIE_KEY, consent ? 'accepted' : 'declined');
      banner.classList.add('hidden');
      setTimeout(function() { banner.remove(); }, 450);
    }

    document.getElementById('cookieAccept').addEventListener('click', function() { dismissBanner(true); });
    document.getElementById('cookieDecline').addEventListener('click', function() { dismissBanner(false); });
  }

  // ── Free Consultation Popup ──
  var POPUP_KEY = 'mt_popup_shown';
  if (!sessionStorage.getItem(POPUP_KEY)) {
    setTimeout(function() {
      var overlay = document.createElement('div');
      overlay.id = 'consult-overlay';
      overlay.innerHTML =
        '<div id="consult-popup">' +
          '<button id="consult-close" aria-label="Close">✕</button>' +
          '<div style="font-size:2rem;margin-bottom:12px;">🚀</div>' +
          '<h3>Free 30-Min Consultation</h3>' +
          '<p>Talk to a MordeTech automation engineer about your factory challenges — no obligation, no sales pitch. Just expert advice.</p>' +
          '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px;">' +
            '<a href="/contact.html" class="consult-btn-primary">Book Free Call →</a>' +
            '<button class="consult-btn-ghost" id="consult-later">Maybe Later</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(overlay);

      function closePopup() {
        sessionStorage.setItem(POPUP_KEY, '1');
        overlay.style.opacity = '0';
        setTimeout(function() { overlay.remove(); }, 300);
      }

      document.getElementById('consult-close').addEventListener('click', closePopup);
      document.getElementById('consult-later').addEventListener('click', closePopup);
      overlay.addEventListener('click', function(e) { if (e.target === overlay) closePopup(); });
    }, 25000);
  }

})();
