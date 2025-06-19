// ---------------- Certifications Carousel ----------------
let currentSlide = 0;
const slides = document.querySelectorAll('.cert-slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function moveSlide(n) {
    currentSlide += n;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    showSlide(currentSlide);
}

// Initialize first slide
showSlide(currentSlide);

// ---------------- Smooth scrolling for navigation links ----------------
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// ---------------- Animation on scroll for sections ----------------
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .project, .education-item, .skill-category').forEach(section => {
    observer.observe(section);
});

// ---------------- Work Experience animations ----------------
const experienceItems = document.querySelectorAll('.experience-item');

function checkExperienceVisibility() {
    const triggerBottom = window.innerHeight / 5 * 4;
    
    experienceItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        
        if (itemTop < triggerBottom) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animation
experienceItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Check visibility on scroll and load
window.addEventListener('scroll', checkExperienceVisibility);
window.addEventListener('load', checkExperienceVisibility);

// ---------------- Mobile menu toggle ----------------
const menuToggle = document.createElement('div');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('nav').prepend(menuToggle);

menuToggle.addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('active');
    menuToggle.innerHTML = document.querySelector('nav ul').classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.querySelector('nav ul').classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});
