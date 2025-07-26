// Smooth Scroll para Links

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');
menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('active');
    anime({
        targets: navUl,
        translateY: navUl.classList.contains('active') ? 0 : -100,
        duration: 500,
        easing: 'easeInOutQuad'
    });
});

// TSParticles Configuration
tsParticles.load("particles-js", {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#FFFFFF"
        },
        shape: {
            type: "star",
            stroke: {
                width: 0,
                color: "#000000"
            }
        },
        opacity: {
            value: 0.8,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.3,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.5,
                sync: false
            }
        },
        line_linked: {
            enable: false
        },
        move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: false
            },
            onclick: {
                enable: false
            },
            resize: true
        }
    },
    retina_detect: true
});

// Portfolio Images (Simulating Folders)
const portfolioImages = {
    portraits: [
        { src: "assets/portrait1.jpg", alt: "Retrato 1" },
        { src: "assets/portrait2.jpg", alt: "Retrato 2" },
        { src: "assets/portrait3.jpg", alt: "Retrato 3" },
        { src: "assets/portrait4.jpg", alt: "Retrato 4" },
        { src: "assets/portrait5.jpg", alt: "Retrato 5" },
        { src: "assets/portrait6.jpg", alt: "Retrato 6" },
        { src: "assets/portrait7.jpg", alt: "Retrato 7" },
        { src: "assets/portrait8.jpg", alt: "Retrato 8" },
        { src: "assets/portrait9.jpg", alt: "Retrato 9" },
        { src: "assets/portrait10.jpg", alt: "Retrato 10" },
        { src: "assets/portrait11.jpg", alt: "Retrato 11" },
        { src: "assets/portrait12.jpg", alt: "Retrato 12" },
        { src: "assets/portrait13.jpg", alt: "Retrato 13" },
        { src: "assets/portrait14.jpg", alt: "Retrato 14" },
        { src: "assets/portrait15.jpg", alt: "Retrato 15" }
    ],
    pets: [
        { src: "assets/pet1.jpg", alt: "pet 1" },
        { src: "assets/pet2.jpg", alt: "pet 2" },
        { src: "assets/pet12.jpg", alt: "pet 3" },
        { src: "assets/pet16.jpg", alt: "pet 4" },
        { src: "assets/pet6.jpg", alt: "pet 6" },
        { src: "assets/pet9.jpg", alt: "pet 9" },
        { src: "assets/pet10.jpg", alt: "pet 10" },
        { src: "assets/pet11.jpg", alt: "pet 11" },
        { src: "assets/pet13.jpg", alt: "pet 12" },
        { src: "assets/pet3.jpg", alt: "pet 13" },
        { src: "assets/pet14.jpg", alt: "pet 14" },
        { src: "assets/pet15.jpg", alt: "pet 15" },
    ],
    events: [
        { src: "assets/event1.jpg", alt: "Evento 1" },
        { src: "assets/event2.jpg", alt: "Evento 2" },
        { src: "assets/event3.jpg", alt: "Evento 3" },
        { src: "assets/event4.jpg", alt: "Evento 4" },
        { src: "assets/event5.jpg", alt: "Evento 5" },
        { src: "assets/event6.jpg", alt: "Evento 6" },
        { src: "assets/event7.jpg", alt: "Evento 7" },
        { src: "assets/event8.jpg", alt: "Evento 8" },
        { src: "assets/event9.jpg", alt: "Evento 9" },
        { src: "assets/event10.jpg", alt: "Evento 10" },
        { src: "assets/event14.jpg", alt: "Evento 14" },
        { src: "assets/event15.jpg", alt: "Evento 15" }
    ]
};

// Portfolio Rendering
const portfolioGrid = document.querySelector('.portfolio-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
let currentImages = [];
let currentLightboxIndex = 0;

function renderPortfolio(filter) {
    portfolioGrid.innerHTML = '';
    let images = [];

    if (filter === 'all') {
        images = [
            ...portfolioImages.portraits.slice(0, 3),
            ...portfolioImages.pets.slice(0, 3),
            ...portfolioImages.events.slice(0, 2)
        ];
    } else {
        images = portfolioImages[filter] || [];
    }

    currentImages = images;

    images.forEach((image, index) => {
        const item = document.createElement('div');
        item.classList.add('portfolio-item');
        item.dataset.index = index;
        item.dataset.category = filter === 'all' ? getCategory(image.src) : filter;
        item.innerHTML = `<img src="${image.src}" alt="${image.alt}" loading="lazy" decoding="async" width="400" height="250">`;
        portfolioGrid.appendChild(item);
    });
}

function getCategory(src) {
    if (src.includes('portrait')) return 'portraits';
    if (src.includes('pet')) return 'pets';
    if (src.includes('event')) return 'events';
    return '';
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.getAttribute('data-filter');
        renderPortfolio(filter);
    });
});

// Initial Render
renderPortfolio('all');

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const closeLightbox = document.querySelector('.close-lightbox');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const nextCard = lightbox.querySelector('.next-card');

function updateLightbox() {
    const image = currentImages[currentLightboxIndex];
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;

    const nextIndex = (currentLightboxIndex + 1) % currentImages.length;
    nextCard.style.backgroundImage = `url(${currentImages[nextIndex].src})`;
}

portfolioGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.portfolio-item');
    if (item) {
        currentLightboxIndex = parseInt(item.dataset.index);
        updateLightbox();
        lightbox.style.display = 'flex';
    }
});

closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightboxPrev.addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex - 1 + currentImages.length) % currentImages.length;
    updateLightbox();
});

lightboxNext.addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex + 1) % currentImages.length;
    updateLightbox();
});

// Smooth Scroll
document.querySelectorAll('a[data-target]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        if (window.innerWidth <= 768) navUl.classList.remove('active');
    });
});

// Service Pricing
const sessionSelects = document.querySelectorAll('.session-select');
const customPrices = document.querySelectorAll('.custom-price');

sessionSelects.forEach((select, index) => {
    select.addEventListener('change', () => {
        const basePrice = parseInt(select.getAttribute('data-base-price'));
        const hours = parseInt(select.value);
        let totalPrice = basePrice * (hours / 2);
        const packageName = select.options[select.selectedIndex].text;
        customPrices[index].textContent = `${packageName} - $${totalPrice.toFixed(2)}`;
        customPrices[index].style.color = '#43F47A';
        customPrices[index].style.fontWeight = '600';
    });
    select.dispatchEvent(new Event('change'));
});

// Modal and Form
const modal = document.createElement('div');
modal.classList.add('modal');
modal.innerHTML = `
    <div class="modal-content">
        <span class="close-modal">×</span>
        <h3>Agendamento</h3>
        <form id="contactForm" action="https://formspree.io/f/xeokdepj" method="POST">
            <input type="text" name="name" id="name" placeholder="Seu Nome" required>
            <input type="email" name="email" id="email" placeholder="Seu E-mail" required>
            <input type="tel" name="phone" id="phone" placeholder="Seu Telefone" required>
            <textarea name="message" id="message" placeholder="Sua Mensagem" required></textarea>
            <input type="hidden" name="servico" id="servico" value="">
            <input type="hidden" name="package" id="package" value="">
            <button type="submit">Enviar</button>
        </form>
    </div>
`;
document.body.appendChild(modal);

const notification = document.createElement('div');
notification.classList.add('custom-notification');
notification.innerHTML = `
    <p>Formulário enviado com sucesso!</p>
    <span class="close-notification">×</span>
`;
document.body.appendChild(notification);

const openModalButtons = document.querySelectorAll('.servico-btn, #contato .cta-btn');
const closeModal = modal.querySelector('.close-modal');
const modalTitle = modal.querySelector('.modal-content h3');
const form = modal.querySelector('#contactForm');
const inputs = form.querySelectorAll('input, textarea');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        let title = 'Agendamento';
        const servicoSelect = button.closest('.servico-card')?.querySelector('.session-select');
        const servicoType = button.getAttribute('data-servico');
        let packageName = '';
        let hours = '';

        if (button.classList.contains('servico-btn') && servicoSelect) {
            title = `Agendamento ${servicoType.charAt(0).toUpperCase() + servicoType.slice(1)}`;
            packageName = servicoSelect.options[servicoSelect.selectedIndex].text;
            hours = servicoSelect.value;
            form.querySelector('#servico').value = packageName;
            form.querySelector('#package').value = hours;
        }

        modal.style.display = 'flex';
        modalTitle.textContent = title;
        inputs.forEach(input => {
            if (input.id !== 'servico' && input.id !== 'package') input.value = '';
        });
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value && input.id !== 'servico' && input.id !== 'package') {
            input.style.border = '2px solid #43F47A';
        } else {
            input.style.border = 'none';
        }
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            notification.style.display = 'block';
            modal.style.display = 'none';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);
        } else {
            alert('Erro ao enviar o formulário.');
        }
    }).catch(error => {
        alert('Erro ao enviar o formulário.');
        console.error('Error:', error);
    });
});

notification.querySelector('.close-notification').addEventListener('click', () => {
    notification.style.display = 'none';
});

// WhatsApp Button
const whatsappBtn = document.getElementById('whatsapp-btn');
function updateWhatsappBtn() {
    const sobreSection = document.getElementById('sobre');
    const rect = sobreSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight && whatsappBtn.style.display !== 'block') {
        whatsappBtn.style.display = 'block';
    }
}

window.addEventListener('scroll', updateWhatsappBtn);
window.addEventListener('load', updateWhatsappBtn);

// Testimonials Carousel
const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
let currentIndex = 0;

function updateCarousel() {
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextCarouselSlide() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
}

function prevCarouselSlide() {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
}

setInterval(nextCarouselSlide, 6000);
prevButton.addEventListener('click', prevCarouselSlide);
nextButton.addEventListener('click', nextCarouselSlide);