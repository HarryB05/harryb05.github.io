document.addEventListener("DOMContentLoaded", function() {
    // Insert header
    fetch("partials/header.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("header").innerHTML = data;
        });

    // Insert sfooter
    fetch("partials/footer.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("footer").innerHTML = data;
        });
});
