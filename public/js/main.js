document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-green-950/95', 'backdrop-blur-md', 'shadow-lg', 'border-green-800');
            navbar.classList.remove('border-transparent');
        } else {
            navbar.classList.remove('bg-green-950/95', 'backdrop-blur-md', 'shadow-lg', 'border-green-800');
            navbar.classList.add('border-transparent');
        }
    });

    // --- Tier Calculator Logic ---
    const gamesInput = document.getElementById('games-input');
    const winInput = document.getElementById('win-input');
    const gamesVal = document.getElementById('games-val');
    const winVal = document.getElementById('win-val');
    const tierResult = document.getElementById('tier-result');
    const tierDesc = document.getElementById('tier-desc');
    const badgeBg = document.getElementById('badge-bg');

    function updateTier() {
        const games = parseInt(gamesInput.value);
        const winRate = parseInt(winInput.value);

        // Update display values
        gamesVal.textContent = games;
        winVal.textContent = winRate + '%';

        // Calculate Score (Simple heuristic: Experience * Skill)
        // Score range roughly 0 to 5000
        const score = games * winRate;

        let tier = "";
        let desc = "";
        let colorClass = "";

        if (score < 300) {
            tier = "Bar Room Novice";
            desc = "Just getting started. The only way is up.";
            colorClass = "from-gray-600 to-gray-800";
        } else if (score < 800) {
            tier = "Club Regular";
            desc = "You know your angles, but consistency is key.";
            colorClass = "from-green-600 to-green-800";
        } else if (score < 1800) {
            tier = "Local Hustler";
            desc = "People hesitate to bet against you.";
            colorClass = "from-blue-600 to-blue-800";
        } else if (score < 3000) {
            tier = "Table Shark";
            desc = "You run tables. Respect is earned.";
            colorClass = "from-purple-600 to-purple-800";
        } else {
            tier = "Grandmaster";
            desc = "A living legend of the felt.";
            colorClass = "from-gold-500 to-gold-700";
        }

        tierResult.textContent = tier;
        tierDesc.textContent = desc;
        
        // Update badge color
        badgeBg.className = `w-48 h-48 bg-gradient-to-br ${colorClass} rounded-full flex items-center justify-center shadow-2xl transition-all duration-500`;
    }

    gamesInput.addEventListener('input', updateTier);
    winInput.addEventListener('input', updateTier);

    // Initialize
    updateTier();


    // --- Animated Number Counters ---
    const counters = [
        { id: 'stat-matches', end: 1240 },
        { id: 'stat-players', end: 842 }
    ];

    const animateCounters = () => {
        counters.forEach(counter => {
            const el = document.getElementById(counter.id);
            if (!el) return;
            
            const duration = 2000; // ms
            const start = 0;
            const end = counter.end;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeOutQuad = 1 - (1 - progress) * (1 - progress);
                
                const current = Math.floor(start + (end - start) * easeOutQuad);
                el.textContent = current.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            requestAnimationFrame(update);
        });
    };

    // Trigger animation when stats section is in view
    const statsSection = document.getElementById('stat-matches');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });
        observer.observe(statsSection);
    }

});