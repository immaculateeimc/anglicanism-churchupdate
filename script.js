// DOM Elements
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const themeToggle = document.getElementById('themeToggle');
const footerThemeToggle = document.getElementById('footerThemeToggle');
const backToTop = document.getElementById('backToTop');
const body = document.body;
const mobileLinks = document.querySelectorAll('.mobile-link');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle Mobile Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    // Toggle body scroll when menu is open
    if (mobileNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
        
        // Update active state
        mobileLinks.forEach(l => l.classList.remove('active'));
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Find corresponding desktop nav link and activate it
        const href = link.getAttribute('href');
        navLinks.forEach(navLink => {
            if (navLink.getAttribute('href') === href) {
                navLink.classList.add('active');
            }
        });
    });
});

// Theme Toggle Function
function toggleTheme() {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    
    // Save theme preference
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Update theme toggle button text
    updateThemeButton();
}

// Update theme toggle button
function updateThemeButton() {
    const isDarkMode = body.classList.contains('dark-mode');
    themeToggle.setAttribute('aria-label', 
        isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
    );
}

// Initialize theme from localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    }
    
    updateThemeButton();
}

// Theme toggle event listeners
themeToggle.addEventListener('click', toggleTheme);
if (footerThemeToggle) {
    footerThemeToggle.addEventListener('click', toggleTheme);
}

// Back to Top Functionality
function handleBackToTop() {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Update active state for navigation
            mobileLinks.forEach(link => link.classList.remove('active'));
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileNav.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// Update active nav link on scroll
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Update desktop nav
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
            
            // Update mobile nav
            mobileLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Image error handling
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        if (this.classList.contains('logo') || this.classList.contains('footer-logo')) {
            // Use a Nigerian Anglican cathedral image as fallback
            this.src = 'https://images.unsplash.com/photo-1566458257149-41a8d0507c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
        }
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Initialize back to top
    handleBackToTop();
    
    // Set up event listeners
    window.addEventListener('scroll', () => {
        handleBackToTop();
        updateActiveNavOnScroll();
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('active') && 
            !hamburger.contains(e.target) && 
            !mobileNav.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Handle escape key to close mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Update current year in footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Add loading animation for update cards
    const updateCards = document.querySelectorAll('.update-card');
    updateCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 0.5s ease forwards;
        opacity: 0;
    }
    
    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);