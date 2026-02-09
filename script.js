/* ============================================
   VANSHIKA SHARMA - PORTFOLIO INTERACTIONS
   Particles, Typing, Scroll, Cursor, Tilt
   ============================================ */

(function () {
  'use strict';

  // =====================
  // PARTICLE CONSTELLATION
  // =====================
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null };
  const PARTICLE_COUNT = 80;
  const CONNECTION_DISTANCE = 150;
  const MOUSE_RADIUS = 200;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
      // Random color: lavender or soft purple
      this.color = Math.random() > 0.5 ? '124, 58, 237' : '167, 139, 250';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Mouse repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          this.x += dx * force * 0.02;
          this.y += dy * force * 0.02;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DISTANCE) {
          const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.15;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawConnections();
    requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  initParticles();
  animateParticles();

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // =====================
  // CUSTOM CURSOR
  // =====================
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');
  let cursorX = 0, cursorY = 0;
  let outlineX = 0, outlineY = 0;

  window.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    cursorDot.style.left = cursorX + 'px';
    cursorDot.style.top = cursorY + 'px';
  });

  function animateCursorOutline() {
    outlineX += (cursorX - outlineX) * 0.15;
    outlineY += (cursorY - outlineY) * 0.15;
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    requestAnimationFrame(animateCursorOutline);
  }
  animateCursorOutline();

  // Cursor hover effect on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .btn-magnetic, .glass-card, .hero-tag, .skill-pill, .nav-toggle');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // =====================
  // TYPING EFFECT
  // =====================
  const typingEl = document.getElementById('typingText');
  const phrases = [
    'Android Applications',
    'AI-Powered Systems',
    'LLM-Based Solutions',
    'Conversational AI Agents',
    'Secure Communication Platforms',
    'GenAI Products'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeEffect() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 300; // Pause before new word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // =====================
  // NAVBAR
  // =====================
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll: add scrolled class
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 150;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[data-section="${id}"]`);
      if (navLink) {
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(l => l.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // =====================
  // SCROLL PROGRESS BAR
  // =====================
  const scrollProgress = document.getElementById('scrollProgress');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = progress + '%';
  });

  // =====================
  // SMOOTH SCROLL
  // =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // =====================
  // SCROLL REVEAL ANIMATIONS
  // =====================
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation for sibling elements
        const delay = index * 100;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // =====================
  // 3D TILT EFFECT ON CARDS
  // =====================
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -6;
      const rotateY = (x - centerX) / centerX * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });

  // =====================
  // MAGNETIC BUTTON EFFECT
  // =====================
  const magneticBtns = document.querySelectorAll('.btn-magnetic');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // =====================
  // PARALLAX ON HERO ELEMENTS
  // =====================
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrollY < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
      heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 0.6;
    }
  });

  // =====================
  // SKILL PILL GLOW ON HOVER
  // =====================
  document.querySelectorAll('.skill-pill').forEach(pill => {
    pill.addEventListener('mouseenter', () => {
      pill.style.boxShadow = '0 0 15px rgba(124, 58, 237, 0.15), 0 0 30px rgba(124, 58, 237, 0.06)';
    });
    pill.addEventListener('mouseleave', () => {
      pill.style.boxShadow = 'none';
    });
  });

  // =====================
  // TIMELINE DOTS GLOW ON SCROLL
  // =====================
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const dot = entry.target.querySelector('.marker-dot');
      if (entry.isIntersecting && dot) {
        dot.style.boxShadow = '0 0 15px rgba(124, 58, 237, 0.3), 0 0 30px rgba(124, 58, 237, 0.15)';
        dot.style.background = '#7c3aed';
      }
    });
  }, { threshold: 0.5 });

  timelineItems.forEach(item => timelineObserver.observe(item));

})();
