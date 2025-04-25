document.addEventListener('DOMContentLoaded', function() {
    // Wait for a short delay to ensure header content is loaded
    setTimeout(() => {
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const navClose = document.querySelector('.nav-close');
        const mainNav = document.querySelector('.main-nav');
        const body = document.querySelector('body');

        if (!hamburgerMenu || !navClose || !mainNav) {
            console.error('Mobile menu elements not found');
            return;
        }

        // Function to open menu
        function openMenu() {
            mainNav.classList.add('active');
            body.style.overflow = 'hidden';
        }

        // Function to close menu
        function closeMenu() {
            mainNav.classList.remove('active');
            body.style.overflow = '';
        }

        // Toggle menu on hamburger click
        hamburgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            if (mainNav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu on close button click
        navClose.addEventListener('click', closeMenu);

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mainNav.classList.contains('active') && 
                !mainNav.contains(e.target) && 
                e.target !== hamburgerMenu) {
                closeMenu();
            }
        });

        // Close menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu on window resize if it's open
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
                closeMenu();
            }
        });
    }, 100); // Small delay to ensure header is loaded
}); 