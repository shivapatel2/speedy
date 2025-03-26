document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Navigation Functions
    // ======================
    const navbar = document.querySelector('.navbar');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        
        // Animate free button in mobile menu
        const freeButton = document.querySelector('.free-nav-button');
        if (navLinks.classList.contains('active')) {
            freeButton.style.animation = 'fadeIn 0.5s ease-out 0.3s forwards';
            freeButton.style.opacity = '0';
        } else {
            freeButton.style.animation = '';
            freeButton.style.opacity = '1';
        }
    });

    // Close mobile menu when clicking a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // ======================
    // Smooth Scrolling
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ======================
    // Animations
    // ======================
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll(
            '.hero-content, .hero-image, .category-card, ' +
            '.stream-item, .about-text, .about-image, ' +
            '.contact-info, .contact-form, .free-panel'
        );
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll(
        '.hero-content, .hero-image, .category-card, ' +
        '.stream-item, .about-text, .about-image, ' +
        '.contact-info, .contact-form, .free-panel'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // ======================
    // Floating Particles
    // ======================
    function createParticles() {
        const particlesContainer = document.getElementById('particles-js');
        if (!particlesContainer) return;
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 6 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            const randomX = (Math.random() - 0.5) * 2;
            const randomY = (Math.random() - 0.5) * 2;
            
            // Apply styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = Math.random() * 0.5 + 0.3;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.setProperty('--random-x', randomX);
            particle.style.setProperty('--random-y', randomY);
            
            // Random color variation
            const colorValue = Math.floor(Math.random() * 60 + 180);
            particle.style.backgroundColor = `rgba(255, ${colorValue}, ${colorValue}, 0.6)`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();

    // ======================
    // Free Items Page Functionality
    // ======================
    // Only run on free-items.html
    if (document.querySelector('.free-items-container')) {
        // Get category from URL
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        const categoryName = document.getElementById('category-name');
        
        // Set category name
        if (category) {
            const categoryMap = {
                'movies': 'Movies',
                'anime': 'Anime',
                'sports': 'Sports'
            };
            categoryName.textContent = categoryMap[category] || 'Content';
        }
        
        // Admin mode toggle
        const adminToggle = document.getElementById('admin-toggle');
        let adminMode = false;
        
        if (adminToggle) {
            adminToggle.addEventListener('click', function() {
                adminMode = !adminMode;
                document.body.classList.toggle('admin-mode', adminMode);
                adminToggle.textContent = adminMode ? '👑' : '🔧';
                localStorage.setItem('adminMode', adminMode);
            });
            
            // Check for saved admin mode state
            if (localStorage.getItem('adminMode') === 'true') {
                adminMode = true;
                document.body.classList.add('admin-mode');
                adminToggle.textContent = '👑';
            }
        }
        
        // Add panel form toggle
        const addPanelBtn = document.getElementById('add-panel-btn');
        const addPanelForm = document.getElementById('add-panel-form');
        
        if (addPanelBtn && addPanelForm) {
            addPanelBtn.addEventListener('click', function() {
                addPanelForm.style.display = addPanelForm.style.display === 'none' ? 'block' : 'none';
            });
        }
        
        // Save new panel
        const savePanelBtn = document.getElementById('save-panel-btn');
        const panelsContainer = document.getElementById('free-panels-container');
        
        if (savePanelBtn && panelsContainer) {
            savePanelBtn.addEventListener('click', function() {
                const title = document.getElementById('panel-title').value;
                const content = document.getElementById('panel-content').value;
                const buttonText = document.getElementById('panel-button-text').value;
                const link = document.getElementById('panel-link').value;
                
                if (title && content && buttonText && link) {
                    const newPanel = document.createElement('div');
                    newPanel.className = 'free-panel';
                    newPanel.innerHTML = `
                        <button class="edit-button">✎</button>
                        <h3 class="panel-title">${title}</h3>
                        <p class="panel-content">${content}</p>
                        <a href="${link}" class="panel-button">${buttonText}</a>
                    `;
                    panelsContainer.appendChild(newPanel);
                    
                    // Reset form
                    document.getElementById('panel-title').value = '';
                    document.getElementById('panel-content').value = '';
                    document.getElementById('panel-button-text').value = '';
                    document.getElementById('panel-link').value = '';
                    addPanelForm.style.display = 'none';
                    
                    // Save to localStorage (temporary solution)
                    savePanelsToLocalStorage();
                } else {
                    alert('Please fill all fields');
                }
            });
        }
        
        // Load panels from localStorage
        function loadPanelsFromLocalStorage() {
            const savedPanels = JSON.parse(localStorage.getItem('freePanels')) || [];
            const container = document.getElementById('free-panels-container');
            
            if (container) {
                // Clear default panels if we have saved ones
                if (savedPanels.length > 0) {
                    container.innerHTML = '';
                }
                
                savedPanels.forEach(panel => {
                    const panelElement = document.createElement('div');
                    panelElement.className = 'free-panel';
                    panelElement.innerHTML = `
                        <button class="edit-button">✎</button>
                        <h3 class="panel-title">${panel.title}</h3>
                        <p class="panel-content">${panel.content}</p>
                        <a href="${panel.link}" class="panel-button">${panel.buttonText}</a>
                    `;
                    container.appendChild(panelElement);
                });
            }
        }
        
        // Save panels to localStorage
        function savePanelsToLocalStorage() {
            const panels = [];
            document.querySelectorAll('.free-panel').forEach(panel => {
                panels.push({
                    title: panel.querySelector('.panel-title').textContent,
                    content: panel.querySelector('.panel-content').textContent,
                    buttonText: panel.querySelector('.panel-button').textContent,
                    link: panel.querySelector('.panel-button').getAttribute('href')
                });
            });
            localStorage.setItem('freePanels', JSON.stringify(panels));
        }
        
        // Initial load
        loadPanelsFromLocalStorage();
    }

    // ======================
    // General Event Handlers
    // ======================
    // Simulate loading for streaming items
    document.querySelectorAll('.play-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Streaming would start now in a real application!');
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Newsletter form handling
    const newsletterForm = document.querySelector('.footer-newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            alert(`Thank you for subscribing with ${emailInput.value}!`);
            emailInput.value = '';
        });
    }
});

// Additional animation keyframes
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; visibility: hidden; }
        }
        
        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes float {
            0% { transform: translate(0, 0); opacity: 1; }
            50% { opacity: 0.3; }
            100% { transform: translate(calc(100vw * var(--random-x)), calc(100vh * var(--random-y))); opacity: 1; }
        }
    </style>
`);