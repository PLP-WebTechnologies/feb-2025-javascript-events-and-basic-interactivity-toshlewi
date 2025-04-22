// Data for cars
const carData = [
    {
        id: 1,
        name: "Toyota RAV4 2020",
        image: "https://images.pexels.com/photos/10902922/pexels-photo-10902922.jpeg?auto=compress&cs=tinysrgb&w=600",
        price: "3M Ksh",
        description: "The 2020 Toyota RAV4 combines rugged styling with impressive fuel economy and a comfortable interior. This SUV is perfect for both city driving and weekend adventures.",
        features: [
            "25,000 miles",
            "Automatic transmission",
            "All-wheel drive",
            "Apple CarPlay/Android Auto",
            "Blind spot monitoring",
            "Leather seats",
            "Heated front seats"
        ]
    },
    {
        id: 2,
        name: "Ford Mustang 2019",
        image: "https://images.pexels.com/photos/10905500/pexels-photo-10905500.jpeg?auto=compress&cs=tinysrgb&w=600",
        price: "3.4M Ksh",
        description: "The 2019 Ford Mustang delivers thrilling performance with its powerful engine and sporty handling. This iconic American muscle car turns heads wherever it goes.",
        features: [
            "18,000 miles",
            "Automatic transmission",
            "Rear-wheel drive",
            "5.0L V8 engine",
            "Leather seats",
            "Premium sound system",
            "Backup camera"
        ]
    },
    {
        id: 3,
        name: "Honda Accord 2021",
        image: "https://images.pexels.com/photos/16387777/pexels-photo-16387777/free-photo-of-custom-honda-accord.jpeg?auto=compress&cs=tinysrgb&w=600",
        price: "2.6 M Ksh",
        description: "The 2021 Honda Accord offers a refined driving experience with its spacious interior, smooth ride, and excellent fuel efficiency. A perfect choice for daily commuting.",
        features: [
            "15,500 miles",
            "Automatic transmission",
            "Front-wheel drive",
            "1.5L Turbo engine",
            "Apple CarPlay/Android Auto",
            "Lane keeping assist",
            "Adaptive cruise control"
        ]
    }
];

// Testimonial data
const testimonialData = [
    {
        text: "I found my dream car at Tosh Autohub. The process was smooth and transparent. Highly recommended!",
        author: "John M."
    },
    {
        text: "Excellent service and a great selection of vehicles. The team was very helpful throughout the entire process.",
        author: "Sarah K."
    },
    {
        text: "The best car buying experience I've ever had. No pressure sales and fair pricing.",
        author: "Michael T."
    },
    {
        text: "I was nervous about buying a used car, but Tosh Autohub made me feel confident in my purchase.",
        author: "David P."
    }
];

// DOM elements
const carsGrid = document.getElementById('carsGrid');
const testimonialSlider = document.getElementById('testimonialSlider');
const interestSelect = document.getElementById('interest');
const carModal = document.getElementById('carModal');
const closeBtn = document.querySelector('.close-btn');
const modalCarTitle = document.getElementById('modalCarTitle');
const modalCarImage = document.getElementById('modalCarImage');
const modalCarDescription = document.getElementById('modalCarDescription');
const modalCarPrice = document.getElementById('modalCarPrice');
const modalCarFeatures = document.getElementById('modalCarFeatures');
const testDriveBtn = document.getElementById('testDriveBtn');
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const currentYearSpan = document.getElementById('currentYear');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();
    
    // Load cars
    loadCars();
    
    // Load testimonials
    loadTestimonials();
    
    // Populate car options in select
    populateCarOptions();
    
    // Initialize event listeners
    initEventListeners();
});

function loadCars() {
    carsGrid.innerHTML = '';
    
    carData.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.innerHTML = `
            <div class="car-image" style="background-image: url('${car.image}')"></div>
            <div class="car-details">
                <h3>${car.name}</h3>
                <div class="car-price">${car.price}</div>
                <div class="car-features">
                    <span>${car.features[0]}</span>
                    <span>${car.features[1]}</span>
                    <span>${car.features[2].split(' ')[0]}</span>
                </div>
                <button class="btn view-details" data-id="${car.id}">View Details</button>
            </div>
        `;
        carsGrid.appendChild(carCard);
    });
}

function loadTestimonials() {
    testimonialSlider.innerHTML = '';
    
    testimonialData.forEach(testimonial => {
        const testimonialElement = document.createElement('div');
        testimonialElement.className = 'testimonial';
        testimonialElement.innerHTML = `
            <p class="testimonial-text">"${testimonial.text}"</p>
            <p class="testimonial-author">- ${testimonial.author}</p>
        `;
        testimonialSlider.appendChild(testimonialElement);
    });
}

function populateCarOptions() {
    carData.forEach(car => {
        const option = document.createElement('option');
        option.value = car.name;
        option.textContent = car.name;
        interestSelect.appendChild(option);
    });
    
    // Add "Other" option
    const otherOption = document.createElement('option');
    otherOption.value = 'other';
    otherOption.textContent = 'Other';
    interestSelect.appendChild(otherOption);
}

function initEventListeners() {
    // Car details buttons (using event delegation)
    carsGrid.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-details')) {
            const carId = parseInt(e.target.getAttribute('data-id'));
            const car = carData.find(c => c.id === carId);
            
            if (car) {
                showCarModal(car);
            }
        }
    });
    
    // Close modal
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === carModal) {
            closeModal();
        }
    });
    
    // Test drive button
    testDriveBtn.addEventListener('click', function() {
        const carName = this.getAttribute('data-car');
        interestSelect.value = carName;
        closeModal();
        
        // Scroll to contact form
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Form validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        validateForm();
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Interactive testimonial slider
    let isDown = false;
    let startX;
    let scrollLeft;
    
    testimonialSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - testimonialSlider.offsetLeft;
        scrollLeft = testimonialSlider.scrollLeft;
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        isDown = false;
    });
    
    testimonialSlider.addEventListener('mouseup', () => {
        isDown = false;
    });
    
    testimonialSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - testimonialSlider.offsetLeft;
        const walk = (x - startX) * 2;
        testimonialSlider.scrollLeft = scrollLeft - walk;
    });
}

function showCarModal(car) {
    modalCarTitle.textContent = car.name;
    modalCarImage.style.backgroundImage = `url('${car.image}')`;
    modalCarDescription.textContent = car.description;
    modalCarPrice.textContent = car.price;
    
    // Clear previous features
    modalCarFeatures.innerHTML = '';
    
    // Add new features
    car.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        modalCarFeatures.appendChild(li);
    });
    
    // Set data attribute for test drive button
    testDriveBtn.setAttribute('data-car', car.name);
    
    // Show modal
    carModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    carModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function validateForm() {
    // Reset errors
    document.querySelectorAll('.error').forEach(el => {
        el.style.display = 'none';
    });
    
    let isValid = true;
    
    // Validate name
    const name = document.getElementById('name').value.trim();
    if (name === '') {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    
    // Validate phone (optional but if provided must be valid)
    const phone = document.getElementById('phone').value.trim();
    if (phone && !/^[\d\s\-()+]{10,}$/.test(phone)) {
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    }
    
    // Validate message
    const message = document.getElementById('message').value.trim();
    if (message === '') {
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        // In a real application, you would send the form data to a server here
        successMessage.style.display = 'block';
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
}