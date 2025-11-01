// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 1000);
});

// Create Floating Particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Scroll Progress Indicator
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) return;
    
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Animated Counter Function
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const suffix = element.parentElement.getAttribute('data-suffix') || '';
    const isDecimal = target % 1 !== 0;

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = isDecimal ? target.toFixed(1) : Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = isDecimal ? start.toFixed(1) : Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

// Animate Stats on Scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            
            // Animate counters
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                const dataTarget = counter.getAttribute('data-target');
                const dataValue = entry.target.getAttribute('data-value');
                const target = dataTarget ? parseFloat(dataTarget) : 
                             (dataValue ? parseFloat(dataValue) : 0);
                if (target > 0) {
                    animateCounter(counter, target);
                }
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-item').forEach(item => {
    statsObserver.observe(item);
});

// Animate main percentage counter
const percentageCounter = document.querySelector('.stats-circle .counter');
if (percentageCounter) {
    const statsCircle = document.querySelector('.stats-visual');
    const circleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(percentageCounter.getAttribute('data-target')) || 45;
                animateCounter(percentageCounter, target);
                circleObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    if (statsCircle) {
        circleObserver.observe(statsCircle);
    }
}

// Animate Chart Bars
const chartBars = document.querySelectorAll('.chart-bar');
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            chartBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.classList.add('animate');
                }, index * 100);
            });
            chartObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const impactChart = document.querySelector('.impact-chart');
if (impactChart) {
    chartObserver.observe(impactChart);
}

// Animate Innovation Cards
const innovationCards = document.querySelectorAll('.innovation-card');
const innovationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = `fadeInUp 0.6s ease forwards`;
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            innovationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

innovationCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    innovationObserver.observe(card);
});

// Animate Team Cards
const teamCards = document.querySelectorAll('.team-card');
const teamObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, index * 150);
            teamObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

teamCards.forEach(card => teamObserver.observe(card));

// Interactive Dryer Demo
const controlItems = document.querySelectorAll('.control-item');
const dryerModel = document.querySelector('.dryer-model');

controlItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        controlItems.forEach(i => i.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
        
        // Animate dryer model
        if (dryerModel) {
            dryerModel.style.transform = 'scale(1.05)';
            setTimeout(() => {
                dryerModel.style.transform = 'scale(1)';
            }, 300);
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

function setActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.includes('#')) {
            const hashId = href.split('#')[1];
            if (hashId === current) {
                link.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const particles = document.getElementById('particles');
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        if (particles) {
            particles.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    updateScrollProgress();
    setActiveNav();
});
