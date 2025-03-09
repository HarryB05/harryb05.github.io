document.addEventListener("DOMContentLoaded", function () {
    function typeTitle(element, text, speed = 100) {
        let index = 0;

        function typeCharacter() {
            if (index < text.length) {
                element.innerHTML = text.substring(0, index + 1) + '<span class="cursor">|</span>';
                index++;
                setTimeout(typeCharacter, speed);
            }
        }

        typeCharacter();
    }

    document.querySelectorAll("[data-text]").forEach(element => {
        const text = element.getAttribute("data-text");
        typeTitle(element, text);
    });
});
