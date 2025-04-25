document.addEventListener('DOMContentLoaded', function() {
    function initializeMobileMenu() {
        console.log('Initializing mobile menu...');
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const navClose = document.querySelector('.nav-close');
        const mainNav = document.querySelector('.main-nav');
        const body = document.querySelector('body');

        if (!hamburgerMenu || !navClose || !mainNav) {
            console.error('Mobile menu elements not found, waiting for content to load...');
            return false;
        }

        console.log('Mobile menu elements found, setting up event listeners...');

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
            console.log('Hamburger menu clicked');
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

        return true;
    }

    // Try to initialize immediately
    if (!initializeMobileMenu()) {
        // If initialization fails, wait for content to load
        window.addEventListener('contentLoaded', function() {
            console.log('Content loaded, attempting to initialize mobile menu...');
            initializeMobileMenu();
        });
    }
}); 