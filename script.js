// ===================================
// CONFIGURAÇÕES E VARIÁVEIS GLOBAIS
// ===================================

const config = {
    scrollOffset: 80,
    animationDuration: 600,
    observerThreshold: 0.15,
    baseLocation: [-23.6208, -46.5932],
    radiusKm: 20
};

// ===================================
// MOBILE MENU
// ===================================

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-link');
const body = document.body;

// Toggle mobile menu
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking on a link
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
    }
});

// ===================================
// SMOOTH SCROLLING
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#' || targetId === '') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// HEADER SCROLL EFFECT
// ===================================

const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// PROGRESS BAR
// ===================================

const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

// ===================================
// BACK TO TOP BUTTON
// ===================================

const backToTopBtn = document.querySelector('.back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// COUNTER ANIMATION (Hero Stats)
// ===================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = target + (target === 100 ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
        }
    }, 16);
}

// ===================================
// INTERSECTION OBSERVER (Scroll Animations)
// ===================================

const observerOptions = {
    threshold: config.observerThreshold,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Animate counters when hero section is visible
            if (entry.target.classList.contains('hero-stats')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.service-card, .benefit-card, .gallery-item, .testimonial-card, .info-card');
animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// Observe hero stats
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    observer.observe(heroStats);
}

// ===================================
// LOCATION MAP (Leaflet)
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const mapElement = document.getElementById('locationMap');
    
    if (mapElement && typeof L !== 'undefined') {
        try {
            // Initialize map
            const map = L.map('locationMap', {
                center: config.baseLocation,
                zoom: 12,
                zoomControl: true,
                scrollWheelZoom: false
            });
            
            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 19
            }).addTo(map);
            
            // Custom marker icon
            const customIcon = L.divIcon({
                html: '<div style="background: linear-gradient(135deg, #ffd700 0%, #ff6600 100%); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.3);"><i class="fas fa-bolt" style="color: #1a1a1a; font-size: 20px;"></i></div>',
                className: 'custom-marker',
                iconSize: [40, 40],
                iconAnchor: [20, 20]
            });
            
            // Add marker
            const marker = L.marker(config.baseLocation, { icon: customIcon }).addTo(map);
            marker.bindPopup(`
                <div style="text-align: center; padding: 10px;">
                    <strong style="font-size: 16px; color: #1a1a1a;">Xavier Soares - Eletricista</strong><br>
                    <span style="color: #6c757d; font-size: 13px;">Estr. das Lágrimas, 2501</span><br>
                    <span style="color: #6c757d; font-size: 13px;">São João Climaco, São Paulo - SP</span>
                </div>
            `).openPopup();
            
            // Add circle for coverage area
            L.circle(config.baseLocation, {
                color: '#0066cc',
                fillColor: '#0066cc',
                fillOpacity: 0.1,
                radius: config.radiusKm * 1000,
                weight: 2
            }).addTo(map);
            
            // Resize map on window resize
            window.addEventListener('resize', () => {
                map.invalidateSize();
            });
            
            // Re-render map when section becomes visible
            const locationSection = document.getElementById('location');
            if (locationSection) {
                const mapObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => map.invalidateSize(), 100);
                            mapObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });
                
                mapObserver.observe(locationSection);
            }
        } catch (error) {
            console.error('Erro ao inicializar o mapa:', error);
            mapElement.innerHTML = '<p style="text-align: center; padding: 50px; color: #6c757d;">Não foi possível carregar o mapa. Por favor, verifique sua conexão.</p>';
        }
    }
});

// ===================================
// LAZY LOADING IMAGES
// ===================================

if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===================================
// GALLERY LIGHTBOX (Simple Implementation)
// ===================================

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) {
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                animation: fadeIn 0.3s ease;
            `;
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 10px;
                box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
            `;
            
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            closeBtn.style.cssText = `
                position: absolute;
                top: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                background: rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(10px);
                border: none;
                border-radius: 50%;
                color: white;
                font-size: 24px;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            
            closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
                closeBtn.style.transform = 'rotate(90deg)';
            });
            
            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
                closeBtn.style.transform = 'rotate(0deg)';
            });
            
            lightbox.appendChild(lightboxImg);
            lightbox.appendChild(closeBtn);
            document.body.appendChild(lightbox);
            body.style.overflow = 'hidden';
            
            // Close lightbox
            const closeLightbox = () => {
                lightbox.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    lightbox.remove();
                    body.style.overflow = '';
                }, 300);
            };
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox || e.target === closeBtn || e.target.parentElement === closeBtn) {
                    closeLightbox();
                }
            });
            
            // Close on Escape key
            document.addEventListener('keydown', function escapeHandler(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', escapeHandler);
                }
            });
        }
    });
});

// ===================================
// FORM VALIDATION (if you add a contact form)
// ===================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// ===================================
// WHATSAPP TRACKING
// ===================================

const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me"]');

whatsappLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Analytics tracking (if you use Google Analytics or similar)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'WhatsApp',
                'event_label': 'Contact Button Click'
            });
        }
        
        console.log('WhatsApp link clicked');
    });
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations and effects are already implemented above
}, 10));

// ===================================
// ACCESSIBILITY IMPROVEMENTS
// ===================================

// Add keyboard navigation for mobile menu
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            mobileMenuBtn.click();
        }
    });
}

// Focus trap for mobile menu
if (mobileMenu) {
    const focusableElements = mobileMenu.querySelectorAll('a, button');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    mobileMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
}

// ===================================
// PAGE LOAD OPTIMIZATION
// ===================================

window.addEventListener('load', () => {
    // Remove loading class if exists
    document.body.classList.remove('loading');
    
    // Initialize AOS or other animation libraries if needed
    console.log('Page fully loaded');
    
    // Preload critical images
    const criticalImages = document.querySelectorAll('img[data-preload]');
    criticalImages.forEach(img => {
        const tempImg = new Image();
        tempImg.src = img.dataset.src || img.src;
    });
});

// ===================================
// ERROR HANDLING
// ===================================

window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.error);
    // You can send error reports to your analytics service here
});

// ===================================
// SERVICE WORKER (Optional - for PWA)
// ===================================

if ('serviceWorker' in navigator) {
    // Uncomment to register service worker
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js')
    //         .then(registration => console.log('SW registered:', registration))
    //         .catch(error => console.log('SW registration failed:', error));
    // });
}

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c Xavier Soares - Eletricista Profissional ', 'background: linear-gradient(135deg, #ffd700 0%, #ff6600 100%); color: #1a1a1a; font-size: 16px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c Website desenvolvido com ❤️ ', 'color: #0066cc; font-size: 12px;');

// ===================================
// EXPORT FOR TESTING (if needed)
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        validatePhone,
        debounce,
        animateCounter
    };
}
// ===================================
// ROLETINHA DE PRÊMIOS (Wheel Spin)
// ===================================

const wheelCanvas = document.getElementById('wheel');
const ctx = wheelCanvas.getContext('2d');

const options = [
    "10% OFF",
    "15% OFF",
    "Instalação de LED",
    "Visita Gratuita",
    "Troca de Disjuntor",
    "20% OFF"
];

const colors = ["#ffd700", "#ff6600", "#0066cc", "#00c6ff", "#ff8800", "#ffaa00"];

let startAngle = 0;
let arc = Math.PI / (options.length / 2);
let spinTimeout = null;

function drawWheel() {
    const outsideRadius = 150;
    const textRadius = 120;
    const insideRadius = 20;

    ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

    for (let i = 0; i < options.length; i++) {
        let angle = startAngle + i * arc;

        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.arc(175, 175, outsideRadius, angle, angle + arc, false);
        ctx.arc(175, 175, insideRadius, angle + arc, angle, true);
        ctx.fill();

        ctx.save();
        ctx.fillStyle = "#000";
        ctx.translate(
            175 + Math.cos(angle + arc / 2) * textRadius,
            175 + Math.sin(angle + arc / 2) * textRadius
        );
        ctx.rotate(angle + arc / 2);
        ctx.fillText(options[i], -ctx.measureText(options[i]).width / 2, 5);
        ctx.restore();
    }
}

drawWheel();

let spinAngleStart = 0;
let spinTime = 0;
let spinTimeTotal = 0;

function rotateWheel() {
    spinTime += 30;

    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }

    const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI) / 180;
    drawWheel();
    spinTimeout = requestAnimationFrame(rotateWheel);
}

function stopRotateWheel() {
    const degrees = (startAngle * 180) / Math.PI + 90;
    const index = Math.floor((360 - (degrees % 360)) / (360 / options.length));

    document.getElementById("spinResult").innerText =
        "Resultado: " + options[index];

    cancelAnimationFrame(spinTimeout);
}

function easeOut(t, b, c, d) {
    return c * (Math.sin((t / d) * (Math.PI / 2))) + b;
}

document.getElementById("spinButton").addEventListener("click", () => {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = 2000 + Math.random() * 3000;
    rotateWheel();
});
