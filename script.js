// Hover animations on course bullet points
document.querySelectorAll('.course-card ul li').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.backgroundColor = '#b3e5fc';
        item.style.transform = 'scale(1.1)';
    });
    item.addEventListener('mouseout', () => {
        item.style.backgroundColor = '#f0f8ff';
        item.style.transform = 'scale(1)';
    });
});

// Fade-in elements when they come into view
const fadeInElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

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
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const backToTopBtn = document.getElementById('back-to-top');

window.onscroll = function() {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
};

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Simple testimonial carousel
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showNextTestimonial() {
    testimonials[currentTestimonial].classList.remove('active');
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
}

setInterval(showNextTestimonial, 4000);  // Change testimonial every 4 seconds

// Send button functionality with multiple responses
const sendBtn = document.getElementById('send-btn');
const chatbotBody = document.querySelector('.chatbot-body');
const chatbotInput = document.getElementById('chatbot-input');

sendBtn.addEventListener('click', () => {
    let userInput = chatbotInput.value.toLowerCase();
    if (userInput.trim() !== '') {
        let userMessage = document.createElement('p');
        userMessage.textContent = "You: " + chatbotInput.value;
        chatbotBody.appendChild(userMessage);
        chatbotInput.value = '';

        setTimeout(() => {
            let responseMessage = document.createElement('p');
            responseMessage.textContent = "RITIK: ";

            // Responses based on user input
            if (userInput.includes('contact')) {
                responseMessage.textContent += "You can contact us at 74541868914 or email nisheshmittal88@gmail.com.";
            } else if (userInput.includes('course')) {
                responseMessage.textContent += "We offer two courses: Basic (₹17,999)           and     Advance (₹27,999).   What would you like to know more about?";
            } else if (userInput.includes('price')) {
                responseMessage.textContent += "The Basic course is ₹17,999 and the Advance course is ₹27,999.";
            } else if (userInput.includes('help')) {
                responseMessage.textContent += "I'm here to assist you! You can ask about our courses, contact info, or anything else related to Market Minds Advisory.";
            } else {
                responseMessage.textContent += "Sorry, I didn’t get that. Can you please ask something else?";
            }

            chatbotBody.appendChild(responseMessage);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;  // Auto-scroll to the latest message
        }, 1000);
    }
});
