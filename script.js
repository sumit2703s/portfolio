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
    // 5. System Breach Sequence
    const logoElement = document.querySelector('.logo');
    if (logoElement) {
        logoElement.style.cursor = 'pointer';

        // Inject Dynamic Styles
        const breachStyles = document.createElement('style');
        breachStyles.textContent = `
            #breach-container {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0, 0, 0, 0.95); z-index: 9999;
                display: flex; justify-content: center; align-items: center;
                font-family: 'Fira Code', monospace;
                opacity: 0; transition: opacity 0.3s ease, background 0.5s ease; pointer-events: none;
            }
            #breach-container.active { opacity: 1; pointer-events: auto; }
            
            .breach-popup {
                background: #0a0a0a; border: 2px solid #ef4444; padding: 2.5rem;
                text-align: center; max-width: 90%; box-shadow: 0 0 40px rgba(239, 68, 68, 0.3);
                transform: scale(0.9); transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            #breach-container.active .breach-popup { transform: scale(1); }
            
            .breach-popup h2 {
                color: #ef4444; font-size: clamp(1.2rem, 4vw, 2rem); margin-bottom: 1rem;
                animation: breach-flash 0.5s infinite alternate;
            }
            .breach-popup p { color: #fca5a5; font-size: clamp(0.9rem, 2vw, 1.2rem); }
            
            @keyframes breach-flash {
                from { opacity: 1; text-shadow: 0 0 10px #ef4444; }
                to { opacity: 0.5; text-shadow: none; }
            }

            .breach-terminal {
                display: none; width: 100%; height: 100%; background: transparent;
                padding: 2rem; box-sizing: border-box; overflow: hidden;
                color: #ef4444; text-align: left; align-items: flex-start; flex-direction: column; justify-content: flex-end;
                position: relative;
            }
            .breach-terminal.active { display: flex; }
            
            .breach-log-line {
                width: 100%; margin-bottom: 0.5rem; font-size: clamp(0.8rem, 2vw, 1.1rem);
                text-shadow: 0 0 5px #ef4444;
                animation: log-glitch 0.15s infinite alternate;
            }
            @keyframes log-glitch {
                0% { transform: translateX(0); opacity: 1; }
                50% { transform: translateX(-2px); opacity: 0.8; }
                100% { transform: translateX(2px); opacity: 1; filter: drop-shadow(0 0 2px red); }
            }

            .breach-scanline {
                position: absolute; top: 0; left: 0; width: 100%; height: 10px;
                background: rgba(239, 68, 68, 0.3); opacity: 0.6;
                animation: scanline 3s linear infinite; pointer-events: none;
            }
            @keyframes scanline {
                0% { top: -10%; }
                100% { top: 110%; }
            }

            .breach-recovery {
                display: none; background: #064e3b; border: 2px solid #10b981; padding: 2.5rem;
                text-align: center; max-width: 90%; box-shadow: 0 0 40px rgba(16, 185, 129, 0.3);
                transform: scale(0.9); transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .breach-recovery.active { display: block; transform: scale(1); }
            
            .breach-recovery h2 { color: #10b981; font-size: clamp(1.2rem, 4vw, 2rem); margin-bottom: 1rem; }
            .breach-recovery p { color: #6ee7b7; font-size: clamp(0.9rem, 2vw, 1.2rem); }
        `;
        document.head.appendChild(breachStyles);

        const container = document.createElement('div');
        container.id = 'breach-container';
        document.body.appendChild(container);

        let stage2Timeout, stage3Timeout, endTimeout, terminalInterval;

        const closeSequence = () => {
            container.classList.remove('active');
            clearTimeout(stage2Timeout);
            clearTimeout(stage3Timeout);
            clearTimeout(endTimeout);
            clearInterval(terminalInterval);
            setTimeout(() => { 
                container.innerHTML = ''; 
                container.style.background = '';
            }, 300);
        };

        container.addEventListener('click', closeSequence);

        logoElement.addEventListener('click', () => {
            if (container.classList.contains('active')) return;
            
            container.style.background = 'rgba(0, 0, 0, 0.95)';
            // STAGE 1: Fatal Error Popup
            container.innerHTML = `
                <div class="breach-popup">
                    <h2>!! FATAL ERROR: PRODUCTION_POD_CRASH !!</h2>
                    <p>CrashLoopBackOff detected on sumit-portfolio pod</p>
                </div>
            `;
            container.classList.add('active');

            // STAGE 2: Terminal Glitch (at 1.8s)
            stage2Timeout = setTimeout(() => {
                const logs = [
                    "[CRITICAL] KERNEL_PANIC: null pointer dereference",
                    "[ALERT]    UNAUTHORIZED_ROOT_ACCESS — uid=0",
                    "[CRITICAL] TRACING_IP: 192.168.1.1 → 10.0.0.42",
                    "[ERROR]    etcd cluster UNREACHABLE — quorum lost",
                    "[ALERT]    kubelet unresponsive on node/sumit-prod-01",
                    "[CRITICAL] Segmentation fault (core dumped)",
                    "[ALERT]    FIREWALL BREACH — port 443 exposed",
                    "[ERROR]    SSL certificate EXPIRED — MITM risk HIGH",
                    "[CRITICAL] MEMORY OVERFLOW: heap corruption detected",
                    "[ALERT]    UNAUTHORIZED_SSH: root@10.0.0.42"
                ];
                
                container.innerHTML = `
                    <div class="breach-terminal active">
                        <div class="breach-scanline"></div>
                        <div id="breach-log-container" style="width: 100%;"></div>
                    </div>
                `;
                
                const logContainer = document.getElementById('breach-log-container');
                let logIndex = 0;
                
                terminalInterval = setInterval(() => {
                    if (logIndex < logs.length) {
                        const line = document.createElement('div');
                        line.className = 'breach-log-line';
                        line.textContent = logs[logIndex];
                        logContainer.appendChild(line);
                        logIndex++;
                    } else {
                        clearInterval(terminalInterval);
                    }
                }, 200);

            }, 1800);

            // STAGE 3: Auto-heal (at 5.8s)
            stage3Timeout = setTimeout(() => {
                clearInterval(terminalInterval);
                container.style.background = 'rgba(2, 44, 34, 0.95)';
                container.innerHTML = `
                    <div class="breach-recovery active">
                        <h2>✓ INFRASTRUCTURE AUTO-HEALED</h2>
                        <p>ALL SYSTEMS NOMINAL — uptime restored</p>
                    </div>
                `;
                
                // Fade out entire overlay after 2.5 seconds
                endTimeout = setTimeout(() => {
                    closeSequence();
                }, 2500);
                
            }, 5800);
        });
    }
});
