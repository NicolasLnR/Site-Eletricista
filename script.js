// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
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
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

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

// Initialize Location Map
document.addEventListener('DOMContentLoaded', () => {
    // Coordenadas para Estr. das Lágrimas, 2501 - São João Climaco, São Paulo - SP
    const baseLocation = [-23.6208, -46.5932]; // Latitude, Longitude
    
    // Inicializar o mapa
    const map = L.map('locationMap').setView(baseLocation, 12);
    
    // Adicionar o mapa base (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Adicionar marcador para a localização base
    const baseMarker = L.marker(baseLocation).addTo(map);
    baseMarker.bindPopup('<strong>Xavier Soares - Eletricista</strong><br>Estr. das Lágrimas, 2501<br>São João Climaco, São Paulo - SP').openPopup();
    
    // Adicionar círculo para mostrar o raio de 20km
    const radiusCircle = L.circle(baseLocation, {
        color: '#0066cc',
        fillColor: '#0066cc',
        fillOpacity: 0.1,
        radius: 20000 // 20km em metros
    }).addTo(map);
    
    // Ajustar o mapa ao tamanho do contêiner quando a janela for redimensionada
    window.addEventListener('resize', () => {
        map.invalidateSize();
    });
});

// Animação para os cards de serviço
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});
