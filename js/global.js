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
