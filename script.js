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
                display: none; width: 100%; height: 100%; background: #050505;
                padding: 2rem; box-sizing: border-box; overflow: hidden;
                color: #d1d5db; text-align: left; align-items: flex-start; flex-direction: column; justify-content: flex-end;
                position: relative;
                box-shadow: inset 0 0 100px rgba(0,0,0,0.9);
            }
            .breach-terminal::after {
                content: " "; display: block; position: absolute;
                top: 0; left: 0; bottom: 0; right: 0;
                background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
                z-index: 2; background-size: 100% 2px, 3px 100%; pointer-events: none;
            }
            .breach-terminal.active { display: flex; }
            
            .breach-log-line {
                width: 100%; margin-bottom: 0.2rem; font-size: clamp(0.75rem, 2vw, 1.05rem);
                text-shadow: 0 0 2px rgba(255, 255, 255, 0.3);
                position: relative; z-index: 3;
            }
            .log-crit { color: #ef4444; font-weight: bold; text-shadow: 0 0 5px #ef4444; }
            .log-alert { color: #fbbf24; font-weight: bold; text-shadow: 0 0 5px #fbbf24; }
            .log-err { color: #f97316; font-weight: bold; text-shadow: 0 0 5px #f97316; }
            .log-time { color: #6b7280; margin-right: 8px; font-weight: normal; }
            
            .breach-cursor {
                display: inline-block; width: 10px; height: 1.2em;
                background-color: #d1d5db; margin-left: 5px; vertical-align: middle;
                animation: blink-cursor 1s step-end infinite;
            }
            @keyframes blink-cursor { 50% { opacity: 0; } }

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
                    "[CRITICAL] KERNEL_PANIC: null pointer dereference at 0xffff880039e3a000 — cpu:3 pid:1847",
                    "[ALERT]    UNAUTHORIZED_ROOT_ACCESS — uid=0 gid=0 — session opened from 185.220.101.47",
                    "[CRITICAL] TRACING_IP: 192.168.1.1 → 10.0.0.42 → 172.16.0.1 → 45.33.32.156",
                    "[ERROR]    etcd cluster UNREACHABLE — quorum lost on 3/3 nodes — last heartbeat: 847ms ago",
                    "[ALERT]    kubelet unresponsive on node/sumit-prod-01 — pod eviction threshold breached",
                    "[CRITICAL] Segmentation fault — process: kube-apiserver PID:2341 — stack trace dumped",
                    "[ERROR]    SSL certificate EXPIRED 72hrs ago — MITM probability: CRITICAL",
                    "[CRITICAL] MEMORY OVERFLOW: heap corruption at 0x7fff5fbff8c0 — 98.7% consumed",
                    "[ALERT]    UNAUTHORIZED_SSH: root@10.0.0.42 — brute force: 4821 attempts in 00:03:12",
                    "[ERROR]    Docker daemon CRASHED — all 17 containers terminated — volumes unmounted",
                    "[CRITICAL] /dev/sda1 I/O ERROR — 2847 bad sectors — RAID degraded — data loss imminent",
                    "[ALERT]    CPU spike 100% — all 8 cores throttled — load average: 47.32 48.01 46.88",
                    "[ERROR]    DNS resolution FAILED — nameserver 8.8.8.8 unreachable — fallback timeout",
                    "[CRITICAL] OOM Killer activated — PID 1337 (prometheus) terminated — metrics lost",
                    "[ALERT]    iptables FLUSHED — all 247 rules wiped — unknown process: /tmp/.hidden/sh",
                    "[ERROR]    Redis connection refused — port 6379 unresponsive — 1.2M keys potentially lost",
                    "[CRITICAL] ROOTKIT detected — /proc/hidden_module loaded — kernel integrity compromised",
                    "[ALERT]    GitHub Actions runner HIJACKED — malicious workflow — secrets exposed: 12",
                    "[ERROR]    AWS IAM credentials LEAKED — unauthorized EC2 spin-up detected in ap-south-1",
                    "[CRITICAL] Kubernetes namespace default DELETED — 12 pods lost — PVC data unrecoverable",
                    "[ALERT]    DDOS incoming — 1.2M req/sec from 47 countries — Cloudflare bypass confirmed",
                    "[ERROR]    Terraform state CORRUPTED — 34 resources in drift — destroy plan triggered",
                    "[CRITICAL] Jenkins pipeline COMPROMISED — malicious stage injected — artifact poisoned",
                    "[ALERT]    MongoDB EXPOSED — port 27017 open — 847GB data at risk — ransom note found",
                    "[ERROR]    Helm rollback FAILED — revision 0 not found — CrashLoopBackOff on all pods",
                    "[CRITICAL] Node/sumit-prod-01 EVICTED — cluster capacity: 0% — all workloads lost",
                    "[ALERT]    VPC peering HIJACKED — traffic rerouted via 185.220.101.47 — exfiltration active",
                    "[ERROR]    Grafana dashboards DELETED — 90 days metrics wiped — alerting rules purged",
                    "[CRITICAL] SSH private key EXPOSED — ~/.ssh/id_rsa leaked — 23 servers compromised",
                    "[ALERT]    Ansible playbook TAMPERED — malicious tasks running on 23 hosts simultaneously",
                    "[ERROR]    PostgreSQL WAL corrupted — PITR impossible — last backup: 6 days ago",
                    "[CRITICAL] Nginx reverse proxy DOWN — all incoming traffic dropped — 502 across board",
                    "[ALERT]    crontab MODIFIED — malicious job added — runs every 60s as root",
                    "[ERROR]    Vault secrets UNSEALED by unknown — 847 credentials exposed — rotate immediately",
                    "[CRITICAL] containerd CRASHED — container runtime unavailable — nodes NotReady",
                    "[ALERT]    S3 bucket sumit-prod MADE PUBLIC — 2.3TB data exposed to internet",
                    "[ERROR]    Prometheus scrape FAILED — all targets down — alertmanager unreachable",
                    "[CRITICAL] systemd PID 1 KILLED — init system dead — complete OS failure imminent",
                    "[ALERT]    network interface eth0 DOWN — node isolated — no route to host",
                    "[ERROR]    kernel module tainted — unsigned driver loaded — stability compromised",
                    "[CRITICAL] swap partition CORRUPTED — OOM cascade starting across all nodes",
                    "[ALERT]    BIOS firmware TAMPERED — rootkit persistence confirmed — reflash required",
                    "[ERROR]    NFS mount LOST — /data unmounted — 34 services writing to null",
                    "[CRITICAL] load balancer UNRESPONSIVE — health checks failing — traffic blackholed",
                    "[ALERT]    GitLab runner TOKEN STOLEN — pipelines hijacked — all repos at risk",
                    "[ERROR]    Elasticsearch cluster RED — 0/12 shards assigned — search completely down",
                    "[CRITICAL] iptables chain INPUT DROPPED — all inbound traffic blocked — lockout imminent",
                    "[ALERT]    Docker registry CORRUPTED — image pulls failing — deployments impossible",
                    "[ERROR]    Kafka consumer lag: 8.4M messages — producers blocked — data pipeline dead",
                    "[CRITICAL] MySQL replication BROKEN — master-slave split — data divergence detected",
                    "[ALERT]    TLS handshake FAILING — certificate chain broken — all HTTPS down",
                    "[ERROR]    Puppet agent COMPROMISED — config drift on 67 nodes — rollback failed",
                    "[CRITICAL] /proc/sysrq-trigger ACTIVATED — emergency sync — system halting",
                    "[ALERT]    IPv6 routing table CORRUPTED — packet loss 94% — BGP sessions dropped",
                    "[ERROR]    HAProxy backend DOWN — all 8 servers unhealthy — 503 service unavailable",
                    "[CRITICAL] inode table FULL — filesystem write operations failing — logs lost",
                    "[ALERT]    Kubernetes RBAC BYPASSED — privilege escalation confirmed — cluster owned",
                    "[ERROR]    Celery workers KILLED — task queue frozen — 14k jobs unprocessed",
                    "[CRITICAL] memory bus ERROR — ECC uncorrectable — hardware failure imminent",
                    "[ALERT]    SSH known_hosts POISONED — MITM on all remote sessions — credentials stolen",
                    "[ERROR]    CI/CD secrets ROTATED by attacker — all pipelines broken — deployments halt",
                    "[CRITICAL] TCP SYN flood detected — 940k packets/sec — kernel socket buffer overflow",
                    "[ALERT]    Datadog agent KILLED — monitoring blind — incidents undetected",
                    "[ERROR]    ZooKeeper quorum LOST — Kafka metadata unavailable — brokers offline",
                    "[CRITICAL] AWS root account ACCESSED from 185.220.101.47 — MFA bypassed",
                    "[ALERT]    Cloudflare WAF DISABLED — DDoS protection removed — origin exposed",
                    "[ERROR]    Jenkins master DISK FULL — build artifacts deleted — workspace corrupted",
                    "[CRITICAL] kernel oops at 0xffffffff81a2b4c0 — unable to handle kernel NULL pointer",
                    "[ALERT]    Splunk forwarder STOPPED — security logs missing — audit trail broken",
                    "[ERROR]    Pagerduty webhook FAILED — on-call team unnotified — incident unacknowledged",
                    "[CRITICAL] hardware watchdog TRIGGERED — system unresponsive — forced reboot in 10s",
                    "[ALERT]    OpenSSL vulnerability CVE-2024-XXXX exploited — decryption keys extracted",
                    "[ERROR]    backup job FAILED for 6 consecutive days — RPO breach — data unrecoverable",
                    "[CRITICAL] CPU microcode ERROR — speculative execution compromised — Spectre active",
                    "[ALERT]    DNS cache POISONED — all traffic redirected to 185.220.101.47",
                    "[ERROR]    Kubernetes API server CERTIFICATE EXPIRED — kubectl forbidden — cluster locked",
                    "[CRITICAL] COMPLETE INFRASTRUCTURE COLLAPSE — all systems non-operational",
                    "[ALERT]    attempting emergency recovery... contacting auto-heal module...",
                    "[ERROR]    recovery checksum MISMATCH — override engaged — deploying backup systems...",
                    "[CRITICAL] FINAL WARNING — meltdown in T-3... T-2... T-1..."
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
                        
                        let rawLine = logs[logIndex];
                        let prefix = "";
                        let prefixClass = "";
                        
                        if (rawLine.startsWith("[CRITICAL]")) { prefix = "[CRITICAL]"; prefixClass = "log-crit"; }
                        else if (rawLine.startsWith("[ALERT]")) { prefix = "[ALERT]"; prefixClass = "log-alert"; }
                        else if (rawLine.startsWith("[ERROR]")) { prefix = "[ERROR]"; prefixClass = "log-err"; }
                        
                        let message = rawLine.substring(prefix.length);
                        
                        const now = new Date();
                        const timeStr = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}]`;
                        
                        line.innerHTML = `<span class="log-time">${timeStr}</span><span class="${prefixClass}">${prefix}</span>${message}`;
                        logContainer.appendChild(line);
                        
                        const terminal = document.querySelector('.breach-terminal');
                        if(terminal) terminal.scrollTop = terminal.scrollHeight;
                        
                        logIndex++;
                    } else {
                        clearInterval(terminalInterval);
                        const cursorLine = document.createElement('div');
                        cursorLine.className = 'breach-log-line';
                        cursorLine.innerHTML = `<span class="breach-cursor"></span>`;
                        logContainer.appendChild(cursorLine);
                    }
                }, 60);

            }, 1800);

            // STAGE 3: Auto-heal (at 6.8s -> 1.8s + 5.0s)
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
                
            }, 6800);
        });
    }
});
