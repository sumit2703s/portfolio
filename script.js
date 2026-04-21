document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Scroll Animations
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden');
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    // 2. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) { targetElement.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    // 3. Terminal Typing Effect
    const phrases = [
        "Cloud Native Enthusiast...",
        "kubectl apply -f sumit.yaml",
        "System Reliability Engineer",
        "docker-compose up -d --build",
        "Automating everything..."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 50;
    const deleteSpeed = 30;
    const delayBetweenPhrases = 2000;
    const typewriterElement = document.getElementById('typewriter');

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            speed = delayBetweenPhrases;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    }
    
    // Start typing effect exactly when it fades in, giving 500ms lead
    setTimeout(typeEffect, 800);

    // Set Current Year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 4. Live Server Uptime Counter (Simulation for styling)
    const uptimeElement = document.getElementById('uptime');
    let secondsTotal = Math.floor(Math.random() * 500000) + 10000; // Random starting uptime

    setInterval(() => {
        secondsTotal++;
        const d = Math.floor(secondsTotal / (3600*24));
        const h = Math.floor(secondsTotal % (3600*24) / 3600);
        const m = Math.floor(secondsTotal % 3600 / 60);
        const s = Math.floor(secondsTotal % 60);
        
        // Format: 12d 04h 23m 12s
        if (uptimeElement) {
            uptimeElement.textContent = `${d}d ${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
        }
    }, 1000);
});
