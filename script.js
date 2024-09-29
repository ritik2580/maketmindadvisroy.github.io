// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Hover animations on course bullet points
    document.querySelectorAll('.course-box ul.course-details li').forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.backgroundColor = '#b3e5fc';
            item.style.transform = 'scale(1.05)';
        });
        item.addEventListener('mouseout', () => {
            item.style.backgroundColor = '#eef7ff';
            item.style.transform = 'scale(1)';
        });
    });

    // Fade-in elements when they come into view
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => observer.observe(el));

    // Open/close chatbot
    const chatbotBtn = document.getElementById('chatbot-btn');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChatbot = document.getElementById('close-chatbot');

    chatbotBtn.addEventListener('click', () => {
        chatbotWindow.style.display = 'block';
    });

    closeChatbot.addEventListener('click', () => {
        chatbotWindow.style.display = 'none';
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button and Progress Bar
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }

        // Update progress bar
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrolled = (scrollTop / docHeight) * 100;
        document.getElementById('progress-bar').style.width = scrolled + '%';
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Testimonial carousel
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    const testimonialInterval = 4000;

    function showNextTestimonial() {
        testimonials[currentTestimonial].classList.remove('active');
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
    }

    setInterval(showNextTestimonial, testimonialInterval);

    // Chatbot Send Button Functionality
    const sendBtn = document.getElementById('send-btn');
    const chatbotBody = document.querySelector('.chatbot-body');
    const chatbotInput = document.getElementById('chatbot-input');

    sendBtn.addEventListener('click', handleSendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    function handleSendMessage() {
        const userInput = chatbotInput.value.trim();
        if (userInput !== '') {
            appendMessage(`You: ${chatbotInput.value}`, 'user');
            chatbotInput.value = '';

            setTimeout(() => {
                const response = generateChatbotResponse(userInput.toLowerCase());
                appendMessage(`RITIK: ${response}`, 'bot');
            }, 1000);
        }
    }

    function appendMessage(message, sender) {
        const messagePara = document.createElement('p');
        messagePara.textContent = message;
        messagePara.classList.add(sender);
        chatbotBody.appendChild(messagePara);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

    function generateChatbotResponse(input) {
        if (input.includes('contact')) {
            return "You can contact us at 74541868914 or email nisheshmittal88@gmail.com.";
        } else if (input.includes('course')) {
            return "We offer two courses: Basic (₹17,999) and Advance (₹27,999). What would you like to know more about?";
        } else if (input.includes('price')) {
            return "The Basic course is ₹17,999 and the Advance course is ₹27,999.";
        } else if (input.includes('help')) {
            return "I'm here to assist you! You can ask about our courses, contact info, or anything else related to Market Minds Advisory.";
        } else {
            return "Sorry, I didn’t get that. Can you please ask something else?";
        }
    }

    // Collapsible Course Details
    document.querySelectorAll('.toggle-details').forEach(button => {
        button.addEventListener('click', () => {
            const courseDetails = button.nextElementSibling;
            const isVisible = courseDetails.style.display === 'block';
            courseDetails.style.display = isVisible ? 'none' : 'block';
            button.textContent = isVisible ? 'Show Details' : 'Hide Details';
        });
    });
});

