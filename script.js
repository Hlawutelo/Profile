// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Remove active class from all menu items
        document.querySelectorAll('.menu-list-items a').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to clicked menu item
        this.classList.add('active');
        
        // Get the target section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Calculate the offset to account for fixed navbar
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const menu = document.querySelector('.menu');
            const hamburger = document.querySelector('.hamburger');
            const hamburgerIcon = document.querySelector('.hamburger-icon');
            const crossIcon = document.querySelector('.cross-icon');
            
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                hamburgerIcon.style.display = 'block';
                crossIcon.style.display = 'none';
            }
        }
    });
});

// Set active class based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const menuItems = document.querySelectorAll('.menu-list-items a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const crossIcon = document.querySelector('.cross-icon');

    hamburger.addEventListener('click', () => {
        menu.classList.toggle('active');
        hamburgerIcon.style.display = menu.classList.contains('active') ? 'none' : 'block';
        crossIcon.style.display = menu.classList.contains('active') ? 'block' : 'none';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
            menu.classList.remove('active');
            hamburgerIcon.style.display = 'block';
            crossIcon.style.display = 'none';
        }
    });
});

// Mouse-following flip effect with continuous movement
document.addEventListener('DOMContentLoaded', () => {
    const flipElements = document.querySelectorAll('.portfolio-card, .about .about-text, .skills-list, .service-card, .hero .intro');
    
    flipElements.forEach(element => {
        // Add flip-content wrapper if it doesn't exist
        if (!element.querySelector('.flip-content')) {
            const content = element.innerHTML;
            element.innerHTML = `<div class="flip-content">${content}</div>`;
        }
        
        let isHovered = false;
        let lastX = 0;
        let lastY = 0;
        let animationFrame = null;
        
        const animate = () => {
            if (!isHovered) {
                // Continue subtle movement even after mouse leaves
                const time = Date.now() * 0.001;
                const rotateX = Math.sin(time) * 2;
                const rotateY = Math.cos(time) * 2;
                
                if (element.classList.contains('service-card')) {
                    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                } else if (element.classList.contains('intro')) {
                    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                } else {
                    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }
            }
            animationFrame = requestAnimationFrame(animate);
        };
        
        element.addEventListener('mousemove', (e) => {
            isHovered = true;
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Store last position for smooth transition
            lastX = rotateX;
            lastY = rotateY;
            
            // Apply the transform with different sensitivity for different elements
            if (element.classList.contains('service-card')) {
                element.style.transform = `perspective(1000px) rotateX(${rotateX / 2}deg) rotateY(${rotateY / 2}deg)`;
            } else if (element.classList.contains('intro')) {
                element.style.transform = `perspective(1000px) rotateX(${rotateX / 3}deg) rotateY(${rotateY / 3}deg)`;
            } else {
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            isHovered = false;
            // Don't reset transform, let the animation continue
        });
        
        // Start the animation
        animate();
    });
});

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        // Get form data
        const formData = new FormData(this);
        
        // Create email body
        const emailBody = `
            Name: ${formData.get('name')}
            Email: ${formData.get('email')}
            Phone: ${formData.get('phone')}
            Message: ${formData.get('message')}
        `;
        
        // Create mailto link
        const mailtoLink = `mailto:hlawutelo2ntsanwisi@gmail.com?subject=New Contact Form Submission&body=${encodeURIComponent(emailBody)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Clear form and refresh page after a short delay
        setTimeout(() => {
            this.reset();
            window.location.reload();
        }, 1000);
        
        // Prevent default form submission
        e.preventDefault();
    });
}); 