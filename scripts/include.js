document.addEventListener("DOMContentLoaded", function() {
    // Function to get the correct path for assets
    function getPath(file) {
        const baseUrl = window.location.pathname.includes('github.io') 
            ? '/harryb05.github.io' 
            : '';
        return `${baseUrl}/${file}`;
    }

    // Function to load HTML content
    function loadContent(file, targetSelector) {
        console.log(`Attempting to load ${file} into ${targetSelector}`);
        
        fetch(getPath(file))
            .then(response => {
                console.log(`Response status for ${file}: ${response.status}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                const element = document.querySelector(targetSelector);
                if (element) {
                    element.innerHTML = data;
                    // Dispatch an event when content is loaded
                    window.dispatchEvent(new Event('contentLoaded'));
                } else {
                    console.error(`Target element ${targetSelector} not found`);
                }
            })
            .catch(error => {
                console.error(`Error loading ${file}:`, error);
            });
    }

    // Load header and footer
    loadContent('partials/header.html', 'header');
    loadContent('partials/footer.html', 'footer');
});
