AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

const popupOverlay = document.getElementById('registration-popup');

function openPopup() {
    if (popupOverlay) {
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePopup() {
    if (popupOverlay) {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (popupOverlay) {
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });

    const isHomePage = window.location.pathname === '/' || window.location.pathname.includes('index.html');
    if (isHomePage) {
        setTimeout(() => {
            openPopup();
        }, 2000);
    }
}

const popupForm = document.getElementById('popup-form');
if (popupForm) {
    popupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('popup-name').value;
        const email = document.getElementById('popup-email').value;
        const phone = document.getElementById('popup-phone').value;
        const course = document.getElementById('popup-course').value;
        
        const subject = 'New Enrollment Request';
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0ACourse Interest: ${course}`;
        
        window.location.href = `mailto:info@educationformuslims.com?subject=${subject}&body=${body}`;
        
        alert('Thank you for your interest! We will contact you shortly.');
        closePopup();
        popupForm.reset();
    });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();  // Prevent page reload

        // Gather form data
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const country = document.getElementById('country').value;
        const age = document.getElementById('age').value;
        const course = document.getElementById('course').value;
        const level = document.getElementById('level').value;
        const schedule = document.getElementById('schedule').value;
        const message = document.getElementById('message').value;

        // Create a FormData object to send data via AJAX
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('country', country);
        formData.append('age', age);
        formData.append('course', course);
        formData.append('level', level);
        formData.append('schedule', schedule);
        formData.append('message', message);

        // Create an AJAX request to send the data to PHP
        fetch('send_email.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            // Show success message if email is sent
            alert('Thank you for contacting us! We will get back to you within 24 hours.');
            contactForm.reset();  // Reset the form after submission
        })
        .catch(error => {
            // Show error message if something goes wrong
            alert('There was an issue sending your message. Please try again.');
        });
    });
}


const statNumbers = document.querySelectorAll('.stat-number');

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + (element.dataset.target >= 90 && element.dataset.target < 100 ? '' : '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end + (element.dataset.target >= 90 && element.dataset.target < 100 ? '' : '');
        }
    };
    window.requestAnimationFrame(step);
}

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            animateValue(entry.target, 0, target, 2000);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

statNumbers.forEach(number => {
    observer.observe(number);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

const inputs = document.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

console.log('Education For Muslims - Website Loaded Successfully');
console.log('For enrollment inquiries, please contact: info@educationformuslims.com');