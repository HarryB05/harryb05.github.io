document.addEventListener('DOMContentLoaded', function() {
    let initializationAttempts = 0;
    const MAX_ATTEMPTS = 10;
    const RETRY_INTERVAL = 100; // milliseconds

    function initializeMobileMenu() {
        console.log('Initializing mobile menu... Attempt:', initializationAttempts + 1);
        
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const navClose = document.querySelector('.nav-close');
        const mainNav = document.querySelector('.main-nav');
        const body = document.querySelector('body');

        if (!hamburgerMenu || !navClose || !mainNav) {
            console.log('Mobile menu elements not found yet. Will retry...');
            
            if (initializationAttempts < MAX_ATTEMPTS) {
                initializationAttempts++;
                setTimeout(initializeMobileMenu, RETRY_INTERVAL);
                return false;
            } else {
                console.error('Failed to initialize mobile menu after maximum attempts');
                return false;
            }
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

        console.log('Mobile menu initialized successfully');
        return true;
    }

    // Start initialization process
    initializeMobileMenu();

    // Also listen for content loaded event
    window.addEventListener('contentLoaded', function() {
        console.log('Content loaded event received, reinitializing mobile menu...');
        initializationAttempts = 0; // Reset attempts
        initializeMobileMenu();
    });
}); 