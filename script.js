// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.2)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all glass cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
(function() {
    const COOKIE_NAME = 'ack_traditional_owners';
    const COOKIE_DAYS = 365;

    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + (value || "") + ";" + expires + ";path=/;SameSite=Lax";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function createPopup() {
        const wrapper = document.createElement('div');
        wrapper.className = 'acknowledgement-popup';
        wrapper.setAttribute('role', 'dialog');
        wrapper.setAttribute('aria-live', 'polite');
        wrapper.setAttribute('aria-label', 'Acknowledgement of Traditional Owners');

        const text = document.createElement('div');
        text.className = 'ack-text';
        text.innerText = "We would like to acknowledge the Gadigal People of the Eora Nation, the traditional custodians of the land and waterways UTS lays on, and Koeybuway and Moegibuway peoples of Saibai, acknowledging them as the Traditional Owners of Saibai and pay our respects to the Elders both past and present.";

        const placeholder = document.createElement('div');
        placeholder.className = 'ack-placeholder';

        const dismiss = document.createElement('button');
        dismiss.className = 'ack-dismiss';
        dismiss.type = 'button';
        dismiss.setAttribute('aria-label', 'Dismiss acknowledgement');

        const img = document.createElement('img');
        img.src = '/x.circle.fill.svg';
        img.alt = 'Close';
        dismiss.appendChild(img);

        dismiss.addEventListener('click', () => {
            setCookie(COOKIE_NAME, '1', COOKIE_DAYS);
            wrapper.classList.add('fade-out');
            setTimeout(() => {
                wrapper.remove();
            }, 400);
        });

        text.prepend(placeholder);
        wrapper.appendChild(dismiss);
        wrapper.appendChild(text);
        document.body.appendChild(wrapper);
    }

    document.addEventListener('DOMContentLoaded', () => {
        try {
            const acknowledged = getCookie(COOKIE_NAME);
            if (!acknowledged) {
                createPopup();
            }
        } catch (e) {
            createPopup();
        }
    });
})();
