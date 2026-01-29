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

        // Mysterious Skill Index calculation
        // We use the provided thresholds but keep the math hidden from the UI
        const skillIndex = (winRate / 100);

        let tier = "";
        let desc = "";
        let colorClass = "";

        if (skillIndex < 0.48) {
            tier = "Rookie";
            desc = "The first step into the felt. Every legend has a beginning.";
            colorClass = "from-gray-600 to-gray-800";
        } else if (skillIndex < 0.52) {
            tier = "Bronze";
            desc = "The metal is forged. Consistency begins to take shape.";
            colorClass = "from-orange-700 to-orange-900";
        } else if (skillIndex < 0.56) {
            tier = "Silver";
            desc = "A glimmer of brilliance. You're no longer just playing; you're competing.";
            colorClass = "from-slate-300 to-slate-500";
        } else if (skillIndex < 0.60) {
            tier = "Gold";
            desc = "The standard of excellence. Respect is earned at this level.";
            colorClass = "from-yellow-500 to-yellow-700";
        } else if (skillIndex < 0.64) {
            tier = "Platinum";
            desc = "Refined and resilient. Few reach this plateau of skill.";
            colorClass = "from-cyan-400 to-cyan-600";
        } else if (skillIndex < 0.68) {
            tier = "Diamond";
            desc = "Unbreakable focus. You see the table differently than others.";
            colorClass = "from-blue-400 to-blue-600";
        } else {
            tier = "Shark";
            desc = "The apex predator. The table is yours, and everyone knows it.";
            colorClass = "from-purple-600 to-purple-900";
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

});