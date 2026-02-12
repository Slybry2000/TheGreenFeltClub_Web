document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
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
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-green-950/95', 'backdrop-blur-md', 'shadow-lg', 'border-green-800');
                navbar.classList.remove('border-transparent');
            } else {
                navbar.classList.remove('bg-green-950/95', 'backdrop-blur-md', 'shadow-lg', 'border-green-800');
                navbar.classList.add('border-transparent');
            }
        });
    }

    // --- iOS Waitlist Form ---
    const iosWaitlistForm = document.getElementById('ios-waitlist-form');
    const iosWaitlistEmail = document.getElementById('ios-waitlist-email');
    const iosWaitlistNote = document.getElementById('ios-waitlist-note');

    if (iosWaitlistForm && iosWaitlistEmail) {
        iosWaitlistForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = iosWaitlistEmail.value.trim();
            if (!email) return;

            const subject = encodeURIComponent('iOS waitlist');
            const body = encodeURIComponent(
                `Please add me to the iOS waitlist.\n\nEmail: ${email}`
            );
            const mailtoHref = `mailto:admin@thegreenfeltclub.com?subject=${subject}&body=${body}`;

            if (iosWaitlistNote) {
                iosWaitlistNote.innerHTML = `Opening your email app... If nothing happens, <a href="${mailtoHref}" class="text-gold-500 underline">tap here</a>.`;
            }

            window.location.href = mailtoHref;
        });
    }

});
