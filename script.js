// Add scroll animation to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add mouse movement effect to abstract shape
    const heroShape = document.querySelector('.abstract-shape');
    const heroSection = document.querySelector('.hero');

    if (heroShape && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            // Add mouse movement to the existing 3D rotation
            heroShape.style.transform = `rotateX(${60 + yAxis}deg) rotateY(${xAxis}deg) rotateZ(45deg)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            heroShape.style.transform = `rotateX(60deg) rotateY(0deg) rotateZ(45deg)`;
            heroShape.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });

        heroSection.addEventListener('mouseenter', () => {
            heroShape.style.transition = 'transform 0.1s ease';
        });
    }

    // Dynamic background blob movement based on mouse
    const blobs = document.querySelectorAll('.blob');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 20;
            const moveX = (x * speed);
            const moveY = (y * speed);
            blob.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
        });
    });
});
