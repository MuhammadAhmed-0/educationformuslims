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
    const isContactPage = window.location.pathname.includes('contact.html');

    // Track if popup has already shown on this page load
    let popupAlreadyShown = false;

    // Show popup only if NOT on contact page
    if (!isContactPage) {
        const delay = isHomePage ? 5000 : 10000; // 7s for home, 15s for others

        setTimeout(() => {
            if (!popupAlreadyShown) {
                openPopup();
                popupAlreadyShown = true; // prevent it from showing again this session
            }
        }, delay);
    }



}

const popupForm = document.getElementById('popup-form');
if (popupForm) {
  popupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstName', document.getElementById('popup-name').value);
    formData.append('email', document.getElementById('popup-email').value);
    formData.append('phone', document.getElementById('popup-phone').value);
    formData.append('country', document.getElementById('popup-country').value);
    formData.append('course', document.getElementById('popup-course').value);
    formData.append('source', 'Popup Form');

    fetch('send_email.php', { method: 'POST', body: formData })
      .then(r => r.text())
      .then(res => {
        if (res.trim() === 'success') {
          alert('✅ Thank you! Your free trial request has been sent successfully.');
          popupForm.reset();
          closePopup();
        } else {
          alert('⚠️ Sorry, we could not send your request. Please try again.');
        }
      })
      .catch(() => {
        alert('⚠️ Network error. Please try again.');
      });
  });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    formData.append('source', 'Contact Form');

    fetch('send_email.php', { method: 'POST', body: formData })
      .then(r => r.text())
      .then(res => {
        if (res.trim() === 'success') {
          alert('✅ Thank you for reaching out! Our team has received your message and will contact you shortly.');
          contactForm.reset();
        } else {
          alert('⚠️ Message not sent. Please try again.');
        }
      })
      .catch(() => {
        alert('⚠️ Network error. Please try again.');
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
    input.addEventListener('focus', function () {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function () {
        this.parentElement.classList.remove('focused');
    });
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

console.log('Education For Muslims - Website Loaded Successfully');
console.log('For enrollment inquiries, please contact: info@educationformuslims.com');