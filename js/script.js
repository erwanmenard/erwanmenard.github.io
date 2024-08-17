document.addEventListener('DOMContentLoaded', function () {
    const commentForms = document.querySelectorAll('form');

    commentForms.forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const commentText = this.querySelector('textarea').value.trim();
            const commentList = this.parentNode.querySelector('.comment-list');

            if (commentText !== '') {
                const newComment = document.createElement('p');
                newComment.textContent = commentText;
                commentList.appendChild(newComment);
                this.reset();
            }
        });
    });

    const darkModeBtn = document.getElementById('dark-mode-btn');
    darkModeBtn.addEventListener('click', toggleDarkMode);

    function toggleDarkMode() {
        const body = document.body;
        body.classList.toggle('dark-mode');

        const theme = body.classList.contains('dark-mode') ? "dark" : "light";
        setCookie("theme", theme, 365);
    }

    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
    }

    function getCookie(name) {
        const keyValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return keyValue ? keyValue[2] : null;
    }

    const theme = getCookie("theme");
    if (theme === "dark") {
        enableDarkMode();
    }

    function enableDarkMode() {
        const body = document.body;
        body.classList.add('dark-mode');
    }

    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    let currentIndex = 0;

    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');

    const intervalTime = 2000; 
    let slideInterval;

    function startSlideShow() {
        slideInterval = setInterval(() => {
            currentIndex++;
            if (currentIndex >= slides.length) {
                currentIndex = 0;
            }
            updateCarousel();
        }, intervalTime);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    prevBtn.addEventListener('click', () => {
        stopSlideShow();
        showPrevSlide();
    });

    nextBtn.addEventListener('click', () => {
        stopSlideShow();
        showNextSlide();
    });

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.style.display = index === currentIndex ? 'block' : 'none';
        });
    }
    
    startSlideShow();
});
