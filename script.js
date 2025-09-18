// Navigation functionality
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Handle navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Handle mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Handle smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Typewriter effect for hero section
const typingText = document.getElementById('typing-text');
const textToType = "Full Stack Developer";
let charIndex = 0;

function typeWriter() {
    if (charIndex < textToType.length) {
        typingText.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Scroll indicator functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
scrollIndicator.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Handle skill bar animations
            if (entry.target.classList.contains('skill-item')) {
                const skillFill = entry.target.querySelector('.skill-fill');
                const skillPercentage = skillFill.getAttribute('data-skill');
                skillFill.style.setProperty('--skill-width', skillPercentage + '%');
                entry.target.classList.add('animate');
            }
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.feature-card, .project-card, .skill-item, .profile-card');
animateElements.forEach(el => observer.observe(el));

// Staggered animation for cards
const cardContainers = [
    '.features-grid',
    '.projects-grid', 
    '.skills-grid',
    '.profiles-grid'
];

cardContainers.forEach(containerSelector => {
    const container = document.querySelector(containerSelector);
    if (container) {
        const cards = container.querySelectorAll('.feature-card, .project-card, .skill-item, .profile-card');
        
        const containerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.1 });
        
        containerObserver.observe(container);
    }
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
        </svg>
        Sending...
    `;
    submitBtn.disabled = true;
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success message
    submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20,6 9,17 4,12"/>
        </svg>
        Message Sent!
    `;
    
    // Reset form
    contactForm.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 3000);
});

// Add spinning animation for loading spinner
const style = document.createElement('style');
style.textContent = `
    .animate-spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Smooth reveal animation for sections
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
});

// Add hover effects to buttons and cards
document.addEventListener('DOMContentLoaded', () => {
    // Button ripple effect
    const buttons = document.querySelectorAll('.btn-hero, .btn-project, .btn-profile, .btn-submit');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple effect styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn-hero, .btn-project, .btn-profile, .btn-submit {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});

// Add glow effect to cards on hover
const cards = document.querySelectorAll('.feature-card, .project-card, .skill-item, .profile-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 20px 40px rgba(79, 172, 254, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
    });
});

// Skill bar animation when in viewport
const skillBars = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillFill = entry.target.querySelector('.skill-fill');
            const percentage = skillFill.getAttribute('data-skill');
            
            setTimeout(() => {
                skillFill.style.width = percentage + '%';
            }, 300);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(skill => skillObserver.observe(skill));