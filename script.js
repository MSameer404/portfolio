document.addEventListener('DOMContentLoaded', () => {
    // === Navbar scroll effect ===
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // === Mobile menu toggle ===
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
        // Close menu on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // === Active nav link on scroll ===
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === id);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => navObserver.observe(section));

    // === Smooth scroll for anchor links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // === Reveal on scroll (IntersectionObserver) ===
    const revealElements = document.querySelectorAll(
        '.section-label, .section-title, .hero-badge, .hero-title, .hero-subtitle, ' +
        '.hero-description, .hero-actions, .hero-stats, .hero-visual, ' +
        '.about-text, .tech-stack, .project-card, .contact-info, .contact-form-wrapper'
    );
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach((el, i) => {
        // Stagger delays for siblings
        const delay = (i % 4) * 0.1;
        el.style.transitionDelay = `${delay}s`;
        revealObserver.observe(el);
    });

    // === Stat counter animation ===
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count, 10);
                animateCount(el, target);
                countObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => countObserver.observe(el));

    function animateCount(el, target) {
        const duration = 1500;
        const start = performance.now();
        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            el.textContent = Math.floor(ease * target);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
        };
        requestAnimationFrame(step);
    }

    // === Parallax orbs on mouse move ===
    const orbs = document.querySelectorAll('.gradient-orb');
    if (window.matchMedia('(hover: hover)').matches) {
        let mouseX = 0, mouseY = 0, orbX = 0, orbY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        function animateOrbs() {
            orbX += (mouseX - orbX) * 0.03;
            orbY += (mouseY - orbY) * 0.03;
            orbs.forEach((orb, i) => {
                const speed = (i + 1) * 15;
                orb.style.transform = `translate(${orbX * speed}px, ${orbY * speed}px) scale(1.05)`;
            });
            requestAnimationFrame(animateOrbs);
        }
        animateOrbs();
    }

    // === Project card tilt on hover ===
    document.querySelectorAll('.project-card').forEach(card => {
        let rect;
        card.addEventListener('mouseenter', () => {
            rect = card.getBoundingClientRect();
            card.style.transition = 'all 0.1s ease';
        });
        card.addEventListener('mousemove', (e) => {
            if (!rect) return;
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `translateY(-6px) perspective(800px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'all 0.5s ease';
        });
    });

    // === Contact form ===
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-submit span');
            const originalText = btn.textContent;
            btn.textContent = 'Message Sent! ✓';
            form.reset();
            setTimeout(() => { btn.textContent = originalText; }, 3000);
        });
    }

    // === Code window typing effect ===
    const codeBody = document.querySelector('.code-body');
    if (codeBody) {
        codeBody.style.opacity = '0';
        const codeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    codeBody.style.transition = 'opacity 0.8s ease';
                    codeBody.style.opacity = '1';
                    codeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        codeObserver.observe(codeBody);
    }
});
