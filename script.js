// Adjust scroll position for fixed navbar
const scrollToSection = (element) => {
    const offsetTop = element.offsetTop - 80;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
    
    // Activate the section after scrolling
    setTimeout(() => {
        activateSection(element);
    }, 800);
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        scrollToSection(targetElement);
    });
});

// Add active class to navigation links based on scroll position and clicks
function setActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${targetId}`) {
            link.classList.add('active');
        }
    });
}

// Handle scroll-based active state with debouncing
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const sections = document.querySelectorAll('.section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100) && pageYOffset < (sectionTop + sectionHeight - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        if (current) {
            setActiveNavLink(current);
        }
    }, 50);
});

// Handle click-based navigation
document.querySelectorAll('.nav-link:not(.download-cv)').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        
        // Scroll to target section
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Handle CV download with feedback
document.querySelector('.download-cv')?.addEventListener('click', function(e) {
    // Add visual feedback
    const originalText = this.textContent;
    this.innerHTML = '<i class="fas fa-download"></i> Downloading...';
    
    // Ensure download works on GitHub Pages
    setTimeout(() => {
        this.textContent = originalText;
    }, 2000);
    
    // Fallback for browsers that might block the download
    setTimeout(() => {
        if (this.textContent === originalText) {
            window.open('Pravejan CV.pdf', '_blank');
        }
    }, 2500);
});



// Return to Top Button Functionality
const returnToTopButton = document.getElementById('returnToTop');

// Show/hide button based on scroll position
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        returnToTopButton.classList.add('visible');
    } else {
        returnToTopButton.classList.remove('visible');
    }
});

// Scroll to top when clicked
returnToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Skill Bar Loading Animation
const skillBarsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                // Get the width from the inline style
                const width = bar.style.width;
                // Reset the width to 0
                bar.style.width = '0';
                // Animate to the original width
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
            });
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all skill items
document.querySelectorAll('.skill-item').forEach(item => {
    skillBarsObserver.observe(item);
});

// Add animation to timeline items when they come into view
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

document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
});



// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Initialize first section as active
    const firstSection = document.querySelector('.section');
    if (firstSection) {
        firstSection.classList.add('active');
    }
});

// Slide transition functionality
let isScrolling = false;

function activateSection(section) {
    // Remove active class from all sections
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // Add active class to target section
    section.classList.add('active');
}

// Handle scroll events for section activation
window.addEventListener('scroll', function() {
    if (isScrolling) return;
    
    isScrolling = true;
    
    setTimeout(() => {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activateSection(section);
            }
        });
        
        isScrolling = false;
    }, 100);
});

// Add hover effect to navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.color = '#ffa502';
    });
    
    link.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.color = '#e6e6e6';
        }
    });
});