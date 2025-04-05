// Custom Cursor Initialization
(function initCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;
    
    // Set initial opacity to ensure visibility
    cursorDot.style.opacity = '1';
    cursorOutline.style.opacity = '1';
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
        window.requestAnimationFrame(() => {
            cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });
    });
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, .tilt-element, .portfolio-item, .service-card, .tech-item, .hamburger, input, textarea'
    );
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorDot.classList.add('active');
            cursorOutline.classList.add('active');
        });
        
        element.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('active');
            cursorOutline.classList.remove('active');
        });
    });
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });
    
    // Show cursor when mouse enters window
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });
})();

// Mobile Navigation
const burger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav-links');

if (burger && nav) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
            nav.classList.remove('active');
            burger.classList.remove('active');
        }
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            nav.classList.remove('active');
            burger.classList.remove('active');
        }
    });
});

// Form Submission with Simple Validation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Simple form validation
        const name = this.querySelector('#name').value.trim();
        const email = this.querySelector('#email').value.trim();
        const message = this.querySelector('#message').value.trim();
        
        if (!name || !email || !message) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Magnetic Button Effect
const magneticButtons = document.querySelectorAll('.magnetic-wrap');
magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const btnRect = this.getBoundingClientRect();
        const btnX = e.clientX - btnRect.left;
        const btnY = e.clientY - btnRect.top;
        
        const centerX = btnRect.width / 2;
        const centerY = btnRect.height / 2;
        
        const distanceX = btnX - centerX;
        const distanceY = btnY - centerY;
        
        const button = this.querySelector('button');
        button.style.transform = `translate(${distanceX / 6}px, ${distanceY / 6}px)`;
    });
    
    btn.addEventListener('mouseleave', function() {
        const button = this.querySelector('button');
        button.style.transform = 'translate(0, 0)';
    });
});

// Interactive Background Effect
const interactiveBg = document.querySelector('.interactive-bg');
if (interactiveBg) {
    document.addEventListener('mousemove', e => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        interactiveBg.style.background = `radial-gradient(circle at ${mouseX * 100}% ${mouseY * 100}%, rgba(99, 102, 241, 0.15), rgba(15, 23, 42, 1))`;
    });
}

// Reveal Sections on Scroll
const revealSections = document.querySelectorAll('.reveal-section');

function revealOnScroll() {
    revealSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) {
            section.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// 3D Card Tilt Effect for Service Cards
const cards = document.querySelectorAll('.service-card');
cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const cardRect = card.getBoundingClientRect();
        const cardX = e.clientX - cardRect.left;
        const cardY = e.clientY - cardRect.top;
        
        const centerX = cardRect.width / 2;
        const centerY = cardRect.height / 2;
        
        const percentX = (cardX - centerX) / centerX;
        const percentY = (cardY - centerY) / centerY;
        
        card.style.transform = `perspective(1000px) rotateY(${percentX * 10}deg) rotateX(${-percentY * 10}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
    });
});

// Scroll Progress Indicator
const progressBar = document.querySelector('.scroll-progress');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// Portfolio Modal Functionality
function initPortfolioModal() {
    const modalLinks = document.querySelectorAll('.portfolio-zoom');
    const modal = document.querySelector('.portfolio-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalImg = document.querySelector('.modal-body img');
    const modalTitle = document.querySelector('.modal-details h2');
    const modalDesc = document.querySelector('.modal-details p');
    const modalTags = document.querySelector('.modal-tech');
    
    modalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const item = link.closest('.portfolio-item');
            const img = item.querySelector('img').getAttribute('src');
            const title = item.querySelector('h3').textContent;
            const desc = item.querySelector('p').textContent;
            const tags = item.getAttribute('data-tags').split(',');
            
            modalImg.setAttribute('src', img);
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            
            modalTags.innerHTML = '';
            tags.forEach(tag => {
                const tagEl = document.createElement('div');
                tagEl.classList.add('tech-tag');
                tagEl.textContent = tag.trim();
                modalTags.appendChild(tagEl);
            });
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Initialize all functionalities
document.addEventListener('DOMContentLoaded', function() {
    initPortfolioModal();
    initTextAnimations();
    initScrollReveal();
    addTransitionsToInternalLinks();
    initSkillBars();
    createBackgroundParticles();
    initParallaxEffect();
    createLogoParticles();
});
// Initialize text animations 