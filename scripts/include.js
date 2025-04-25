document.addEventListener("DOMContentLoaded", function() {
    // Get the base URL for GitHub Pages
    const baseUrl = window.location.pathname.includes('github.io') 
        ? '/harryb05.github.io' 
        : '';

    // Insert header
    fetch(`${baseUrl}/partials/header.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.querySelector("header").innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading header:', error);
        });

    // Insert footer
    fetch(`${baseUrl}/partials/footer.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.querySelector("footer").innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
});
