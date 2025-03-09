document.addEventListener("DOMContentLoaded", function () {
    function adjustPaddingForHeader() {
        const header = document.querySelector("header");
        const body = document.querySelector("body");
        const nav = document.querySelector("nav ul");
        
        if (header && nav) {
            const headerHeight = header.offsetHeight;
            const navHeight = nav.offsetHeight;
            const isMobile = window.innerWidth <= 1050;
            
            let padding = headerHeight;
            if (isMobile) {
                padding += navHeight + 60;
            } else {
                padding += 200;
            }
            
            body.style.paddingTop = `${padding}px`;
        }
    }

    const header = document.querySelector("header");
    if (header) {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                adjustPaddingForHeader();
            }
        });
        resizeObserver.observe(header);
    }

    setTimeout(adjustPaddingForHeader, 100);

    window.addEventListener("resize", adjustPaddingForHeader);
});

