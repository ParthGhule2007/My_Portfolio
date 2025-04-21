// script.js

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('.section');
    const backButtons = document.querySelectorAll('.back-btn');
    const profileImg = document.querySelector('.profile-img');
    const description = document.querySelector('.description');
    const visitorCountSpan = document.getElementById('visitor-count');
    const container = document.querySelector('.container');
    const typingText = document.querySelector('.typing-text');
    const letters = document.querySelectorAll('.title-letter');


    function updateVisitorCount() {
        let count = localStorage.getItem('visitorCount') || 0;
        count = parseInt(count) + 1;
        localStorage.setItem('visitorCount', count);

        let current = 0;
        const increment = Math.ceil(count / 30);
        const timer = setInterval(() => {
            current += increment;
            if (current >= count) {
                current = count;
                clearInterval(timer);
            }
            visitorCountSpan.textContent = current;
        }, 30);
    }
    updateVisitorCount();

    let currentActiveSection = null;

    function showSection(sectionId) {
        sections.forEach(section => section.classList.remove('active'));
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            currentActiveSection = sectionId;
            animateTitleLetters(targetSection);
            if (sectionId === 'skills') animateProgressBars(targetSection);
        }
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
    }

    function animateTitleLetters(section) {
        const letters = section.querySelectorAll('.title-letter');
        letters.forEach((letter, index) => {
            letter.style.animation = 'none';
            letter.offsetHeight;
            setTimeout(() => {
                letter.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`;
            }, 10);
        });
    }

    function animateProgressBars(section) {
        const progressBars = section.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = '0%';
            bar.offsetHeight;
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 100);
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            if (targetId !== '') container.classList.add('section-view');
            showSection(targetId);
        });
    });

    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            container.classList.remove('section-view');
            document.querySelectorAll('.progress').forEach(bar => bar.style.width = '0%');
            sections.forEach(section => section.classList.remove('active'));
            navLinks.forEach(link => link.classList.remove('active'));
            currentActiveSection = null;
        });
    });

    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('glow');
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = this.classList.contains('glow') ? 'scale(1.05)' : 'scale(1)';
            }, 300);
        });
    });
    let currentIndex = 0;
const testimonials = document.querySelectorAll(".testimonial-card");

function showTestimonial(index) {
  testimonials.forEach((card, i) => {
    card.classList.remove("active");
    if (i === index) card.classList.add("active");
  });
}

function nextTestimonial() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
}

function prevTestimonial() {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentIndex);
}

// Auto slide every 7 seconds
setInterval(() => {
  nextTestimonial();
}, 7000);


    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            projectItems.forEach(proj => proj.classList.remove('active'));
            this.classList.add('active');
            this.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.8)';
            setTimeout(() => {
                this.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.6)';
            }, 500);
        });
    });

    container.classList.remove('section-view');

    setTimeout(() => {
        letters.forEach(letter => letter.classList.add('illuminated'));
    }, 1000);

    const messages = [
        "Hi, I am",
        "Welcome to my digital portfolio",
        "I am currently studying in MIT AOE ",
        "Aspiring Computer Engineer",
        "|Passionate About Technology🚀",
        "Exploring the World of AI & Software🤖💻"
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseBetweenMessages = 2000;

    function type() {
        const currentMessage = messages[messageIndex];
        const displayText = currentMessage.substring(0, charIndex);
        typingText.textContent = displayText;

        if (!isDeleting) {
            if (charIndex < currentMessage.length) {
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, pauseBetweenMessages);
            }
        } else {
            if (charIndex > 0) {
                charIndex--;
                setTimeout(type, deletingSpeed);
            } else {
                isDeleting = false;
                messageIndex = (messageIndex + 1) % messages.length;
                setTimeout(type, 500);
            }
        }
    }

    type();
});

