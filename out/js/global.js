// ── CURSOR ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (cursor) { cursor.style.left = mx+'px'; cursor.style.top = my+'px'; }
});
function animRing() {
  rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
  if (ring) { ring.style.left = rx+'px'; ring.style.top = ry+'px'; }
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button,.card,.job-card,.news-card').forEach(el => {
  el.addEventListener('mouseenter', () => { if(cursor){cursor.style.width='18px';cursor.style.height='18px';} if(ring){ring.style.width='48px';ring.style.height='48px';} });
  el.addEventListener('mouseleave', () => { if(cursor){cursor.style.width='10px';cursor.style.height='10px';} if(ring){ring.style.width='34px';ring.style.height='34px';} });
});

// ── SCROLL PROGRESS + NAV ──
window.addEventListener('scroll', () => {
  const s = window.scrollY, t = document.body.scrollHeight - window.innerHeight;
  const p = document.getElementById('progress');
  if (p) p.style.width = (s/t*100)+'%';
  const nav = document.querySelector('nav');
  if (nav) s > 60 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
});

// ── REVEAL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── CANVAS BG ──
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  const particles = [];
  const mouse = { x: -999, y: -999 };
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  for (let i = 0; i < 70; i++) {
    particles.push({ x:Math.random()*3000, y:Math.random()*3000, vx:(Math.random()-.5)*.25, vy:(Math.random()-.5)*.25, r:Math.random()*1.2+.4, a:Math.random()*.35+.08 });
  }
  function draw() {
    if (document.hidden) { requestAnimationFrame(draw); return; }
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(0,80,180,0.04)'; ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d = Math.sqrt(dx*dx+dy*dy);
      const a = d < 180 ? p.a + (1-d/180)*.6 : p.a;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(0,160,255,${a})`; ctx.fill();
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i+1; j < particles.length; j++) {
        const dx = particles[i].x-particles[j].x, dy = particles[i].y-particles[j].y;
        const d = Math.sqrt(dx*dx+dy*dy);
        if (d < 110) {
          ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y);
          ctx.strokeStyle = `rgba(0,140,255,${0.07*(1-d/110)})`; ctx.lineWidth=.5; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}
initCanvas();

// ── MOBILE MENU ──
function toggleMobile() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ── LANG ──
const langData = {
  en: { contact: 'Contact Now', quote: 'Get Quote' },
  de: { contact: 'Kontakt', quote: 'Angebot' },
  mr: { contact: 'आता संपर्क करा', quote: 'कोटेशन मिळवा' }
};
function setLang(lang) {
  document.querySelectorAll('[data-lang-contact]').forEach(el => el.textContent = langData[lang]?.contact || el.textContent);
}

// ── COUNTER ──
function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '+';
    let cur = 0; const step = target / 55;
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); }
      el.textContent = Math.floor(cur) + suffix;
    }, 22);
  });
}

// ── ACTIVE NAV LINK ──
const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === path || (path === '' && a.getAttribute('href') === 'index.html')) {
    a.classList.add('active');
  }
});

// ── WHATSAPP FLOAT BUTTON ──
(function() {
  const wa = document.createElement('a');
  wa.id = 'wa-float';
  wa.href = 'https://wa.me/919404030215?text=Hi%2C%20I%20am%20interested%20in%20your%20automation%20services.';
  wa.target = '_blank';
  wa.rel = 'noopener noreferrer';
  wa.setAttribute('aria-label', 'Chat with MordeTech on WhatsApp');
  wa.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
  document.body.appendChild(wa);
  let shown = false;
  window.addEventListener('scroll', function() {
    if (!shown && window.scrollY > 400) { shown = true; wa.classList.add('visible'); }
  }, { passive: true });
  setTimeout(function() { if (!shown) { shown = true; wa.classList.add('visible'); } }, 8000);
})();
