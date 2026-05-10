document.addEventListener('DOMContentLoaded', () => {

  /* ── Cursor Glow ── */
  const glow = document.getElementById('cursorGlow');
  if (glow && window.innerWidth > 768) {
    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  /* ── Hamburger ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });

  /* ── Navbar scroll ── */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 60);
    lastScroll = y;
  });

  /* ── Active link ── */
  const sections = document.querySelectorAll('section[id]');
  const anchors = navLinks.querySelectorAll('a');

  function setActive() {
    let id = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) id = s.id;
    });
    anchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
  }

  window.addEventListener('scroll', setActive);

  /* ── Typing ── */
  const typedEl = document.getElementById('typedText');
  const phrases = ['Web Developer', 'UI Designer', 'Frontend Dev', 'مُبدع'];
  let p = 0, c = 0, del = false;

  function type() {
    const cur = phrases[p];
    if (!del) {
      typedEl.textContent = cur.slice(0, ++c);
      if (c === cur.length) { del = true; setTimeout(type, 2000); return; }
      setTimeout(type, 70);
    } else {
      typedEl.textContent = cur.slice(0, --c);
      if (c === 0) { del = false; p = (p + 1) % phrases.length; setTimeout(type, 400); return; }
      setTimeout(type, 30);
    }
  }
  type();

  /* ── Skill bars ── */
  const fills = document.querySelectorAll('.skill-fill');
  function fillSkills() {
    fills.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight - 60 && !el.dataset.filled) {
        el.dataset.filled = '1';
        el.style.width = el.dataset.w + '%';
      }
    });
  }

  /* ── Reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  function checkReveal() {
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 70) el.classList.add('visible');
    });
  }

  /* ── CountUp ── */
  const statNums = document.querySelectorAll('.stat-num');
  let counted = false;

  function countUp() {
    if (counted) return;
    const r = statNums[0]?.getBoundingClientRect();
    if (!r || r.top > window.innerHeight - 80) return;
    counted = true;

    statNums.forEach(el => {
      const target = +el.dataset.target;
      const duration = 1500;
      const start = performance.now();

      function update(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.floor(eased * target);
        if (t < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }

  function onScroll() {
    checkReveal();
    fillSkills();
    countUp();
  }

  window.addEventListener('scroll', onScroll);
  setTimeout(() => { checkReveal(); fillSkills(); countUp(); }, 200);

  /* ── Back to top ── */
  const backBtn = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    backBtn.classList.toggle('show', window.scrollY > 400);
  });
  backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── Contact form ── */
  document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    alert('✅ تم إرسال الرسالة بنجاح! سأتواصل معك قريباً.');
    e.target.reset();
  });

});
