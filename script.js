// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Set active class on clicked link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '-10% 0px -10% 0px',
    // Delays handled in CSS
};

// Active Navigation Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^=\"#\"]');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const activeId = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${activeId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { 
    threshold: 0.2,
    rootMargin: '-10% 0px -20% 0px'
});

// Observe sections for active nav
sections.forEach(section => {
    sectionObserver.observe(section);
});

// Function to set active nav based on scroll position (fallback)
function setActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    if (current) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// Set initial active state and bind events
setActiveNav();
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(setActiveNav, 50); // Throttled
});
window.addEventListener('resize', setActiveNav);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target); // Animate once for performance
        }
    });
}, observerOptions);

// Observe all animate-on-scroll elements
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Contact Form Validation and Handler
const contactForm = document.getElementById('contact-form');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const messageField = document.getElementById('message');

function showError(field, errorElement, message) {
    field.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError(field, errorElement) {
    field.classList.remove('error');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

function validateField(field, errorElement, validationFn, errorMsg) {
    const value = field.value.trim();
    if (!value) {
        showError(field, errorElement, errorMsg || 'This field is required');
        return false;
    }
    if (validationFn && !validationFn(value)) {
        showError(field, errorElement, errorMsg);
        return false;
    }
    clearError(field, errorElement);
    return true;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm() {
    let isValid = true;
    
    // Name
    isValid &= validateField(nameField, document.getElementById('name-error'), null, 'Name is required');
    
    // Email
    isValid &= validateField(emailField, document.getElementById('email-error'), (val) => emailRegex.test(val), 'Please enter a valid email address');
    
    // Message
    isValid &= validateField(messageField, document.getElementById('message-error'), null, 'Message is required');
    
    return isValid;
}

// Real-time validation
[nameField, emailField, messageField].forEach(field => {
    field.addEventListener('input', function() {
        const errorElement = document.getElementById(field.id + '-error');
        if (field.id === 'email') {
            validateField(field, errorElement, emailRegex.test(field.value.trim()) ? null : emailRegex);
        } else {
            validateField(field, errorElement);
        }
    });
    
    field.addEventListener('blur', function() {
        const errorElement = document.getElementById(field.id + '-error');
        validateField(this, errorElement, this.id === 'email' ? (val) => emailRegex.test(val) : null, this.id === 'email' ? 'Please enter a valid email address' : 'This field is required');
    });
});

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Simulate successful submission
        alert('Thank you! Your message has been sent. I\'ll get back to you soon.');
        this.reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Typing Effect for Hero Title (Optional Enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Uncomment to enable typing effect
// window.addEventListener('load', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     const fullText = heroTitle.textContent;
//     typeWriter(heroTitle, fullText, 80);
// });

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

let isDark = currentTheme === 'dark' || (!currentTheme && systemPrefersDark);

if (isDark) {
    document.documentElement.classList.add('dark');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const icon = themeToggle.querySelector('i');
    if (isDark) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// Preloader (Optional)
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});
