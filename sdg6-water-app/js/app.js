// ===== DOM Elements =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const pledgeForm = document.getElementById('pledge-form');
const successModal = document.getElementById('success-modal');
const filterBtns = document.querySelectorAll('.filter-btn');
const tipCards = document.querySelectorAll('.tip-card');

// ===== Water Usage Rates (Liters) =====
const WATER_RATES = {
    shower: 12, // liters per minute
    toilet: 9,  // liters per flush
    faucet: 8,  // liters per minute
    laundry: 50, // liters per load
    dishwasher: 15, // liters per load
    carwash: 150 // liters per wash
};

// ===== Navigation =====
// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===== Counter Animation =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = formatNumber(Math.floor(start));
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = formatNumber(target);
        }
    }
    
    updateCounter();
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return num.toLocaleString();
    }
    return num.toString();
}

// ===== Statistics Animation =====
function animateStatistics() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statBars = document.querySelectorAll('.stat-progress');
    const regionBars = document.querySelectorAll('.bar');
    
    // Animate numbers
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        animateCounter(stat, target);
    });
    
    // Animate progress bars
    statBars.forEach(bar => {
        const width = bar.dataset.width;
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 300);
    });
    
    // Animate region bars
    regionBars.forEach(bar => {
        const width = bar.dataset.width;
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 500);
    });
}

// ===== Hero Counter Animation =====
function animateHeroCounter() {
    const heroCounter = document.querySelector('.hero .counter');
    if (heroCounter) {
        const target = parseInt(heroCounter.dataset.target);
        animateCounter(heroCounter, target, 3000);
    }
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'statistics') {
                animateStatistics();
            }
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ===== Water Calculator =====
const calculatorInputs = {
    shower: document.getElementById('shower'),
    toilet: document.getElementById('toilet'),
    faucet: document.getElementById('faucet'),
    laundry: document.getElementById('laundry'),
    dishwasher: document.getElementById('dishwasher'),
    carwash: document.getElementById('carwash')
};

const calculatorValues = {
    shower: document.getElementById('shower-value'),
    toilet: document.getElementById('toilet-value'),
    faucet: document.getElementById('faucet-value'),
    laundry: document.getElementById('laundry-value'),
    dishwasher: document.getElementById('dishwasher-value'),
    carwash: document.getElementById('carwash-value')
};

const usageDisplays = {
    shower: document.getElementById('shower-usage'),
    toilet: document.getElementById('toilet-usage'),
    faucet: document.getElementById('faucet-usage'),
    laundry: document.getElementById('laundry-usage'),
    dishwasher: document.getElementById('dishwasher-usage'),
    carwash: document.getElementById('carwash-usage')
};

const totalUsageDisplay = document.getElementById('total-usage');
const ratingIcon = document.getElementById('rating-icon');
const ratingText = document.getElementById('rating-text');

function calculateWaterUsage() {
    // Get values
    const showerMinutes = parseInt(calculatorInputs.shower.value);
    const toiletFlushes = parseInt(calculatorInputs.toilet.value);
    const faucetMinutes = parseInt(calculatorInputs.faucet.value);
    const laundryLoads = parseInt(calculatorInputs.laundry.value);
    const dishwasherLoads = parseInt(calculatorInputs.dishwasher.value);
    const carWashes = parseInt(calculatorInputs.carwash.value);
    
    // Update display values
    calculatorValues.shower.textContent = showerMinutes + ' min';
    calculatorValues.toilet.textContent = toiletFlushes + ' times';
    calculatorValues.faucet.textContent = faucetMinutes + ' min';
    calculatorValues.laundry.textContent = laundryLoads + ' loads';
    calculatorValues.dishwasher.textContent = dishwasherLoads + ' loads';
    calculatorValues.carwash.textContent = carWashes + ' times';
    
    // Calculate daily usage
    const showerUsage = showerMinutes * WATER_RATES.shower;
    const toiletUsage = toiletFlushes * WATER_RATES.toilet;
    const faucetUsage = faucetMinutes * WATER_RATES.faucet;
    const laundryUsage = (laundryLoads * WATER_RATES.laundry) / 7; // Convert weekly to daily
    const dishwasherUsage = (dishwasherLoads * WATER_RATES.dishwasher) / 7; // Convert weekly to daily
    const carwashUsage = (carWashes * WATER_RATES.carwash) / 30; // Convert monthly to daily
    
    // Update breakdown displays
    usageDisplays.shower.textContent = Math.round(showerUsage) + ' L';
    usageDisplays.toilet.textContent = Math.round(toiletUsage) + ' L';
    usageDisplays.faucet.textContent = Math.round(faucetUsage) + ' L';
    usageDisplays.laundry.textContent = Math.round(laundryUsage) + ' L';
    usageDisplays.dishwasher.textContent = Math.round(dishwasherUsage) + ' L';
    usageDisplays.carwash.textContent = Math.round(carwashUsage) + ' L';
    
    // Calculate total
    const totalUsage = showerUsage + toiletUsage + faucetUsage + laundryUsage + dishwasherUsage + carwashUsage;
    
    // Animate total display
    animateValue(totalUsageDisplay, parseInt(totalUsageDisplay.textContent) || 0, Math.round(totalUsage), 500);
    
    // Update rating
    updateRating(totalUsage);
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.round(start + (range * progress));
        element.textContent = value;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function updateRating(usage) {
    ratingIcon.className = 'rating-icon';
    
    if (usage < 100) {
        ratingIcon.classList.add('excellent');
        ratingIcon.innerHTML = '<i class="fas fa-leaf"></i>';
        ratingText.textContent = 'Excellent! You\'re a water conservation champion!';
    } else if (usage < 150) {
        ratingIcon.classList.add('good');
        ratingIcon.innerHTML = '<i class="fas fa-thumbs-up"></i>';
        ratingText.textContent = 'Good job! You\'re below the global average.';
    } else if (usage < 200) {
        ratingIcon.classList.add('average');
        ratingIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
        ratingText.textContent = 'Average usage. There\'s room for improvement!';
    } else {
        ratingIcon.classList.add('high');
        ratingIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
        ratingText.textContent = 'High usage! Check our tips to reduce consumption.';
    }
}

// Add event listeners to calculator inputs
Object.values(calculatorInputs).forEach(input => {
    if (input) {
        input.addEventListener('input', calculateWaterUsage);
    }
});

// Initial calculation
document.addEventListener('DOMContentLoaded', () => {
    calculateWaterUsage();
    animateHeroCounter();
});

// ===== Tips Filter =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        // Filter cards
        tipCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===== Pledge Form =====
let pledgeCount = 1247;

pledgeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const pledges = document.querySelectorAll('input[name="pledges"]:checked');
    
    if (pledges.length === 0) {
        alert('Please select at least one pledge!');
        return;
    }
    
    // Increment pledge count
    pledgeCount++;
    
    // Update displays
    document.getElementById('pledge-count').textContent = pledgeCount.toLocaleString();
    document.getElementById('modal-count').textContent = pledgeCount.toLocaleString();
    
    // Update water saved (rough estimate)
    const waterSaved = (pledgeCount * 2000).toLocaleString();
    document.getElementById('water-saved').textContent = (pledgeCount * 2000 / 1000000).toFixed(1) + 'M';
    
    // Add to recent pledges
    addRecentPledge(name);
    
    // Show success modal
    successModal.classList.add('active');
    
    // Reset form
    pledgeForm.reset();
});

function addRecentPledge(name) {
    const pledgeList = document.getElementById('recent-pledges');
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const displayName = name.split(' ')[0] + ' ' + (name.split(' ')[1] ? name.split(' ')[1][0] + '.' : '');
    
    const newPledge = document.createElement('div');
    newPledge.className = 'pledge-item';
    newPledge.innerHTML = `
        <div class="pledge-avatar">${initials}</div>
        <div class="pledge-info">
            <span class="pledge-name">${displayName}</span>
            <span class="pledge-time">Just now</span>
        </div>
    `;
    
    // Insert at the beginning
    pledgeList.insertBefore(newPledge, pledgeList.firstChild);
    
    // Remove last item if more than 3
    if (pledgeList.children.length > 3) {
        pledgeList.removeChild(pledgeList.lastChild);
    }
    
    // Update times for other pledges
    const pledgeItems = pledgeList.querySelectorAll('.pledge-item');
    pledgeItems.forEach((item, index) => {
        if (index > 0) {
            const timeSpan = item.querySelector('.pledge-time');
            const currentTime = timeSpan.textContent;
            if (currentTime === 'Just now') {
                timeSpan.textContent = '1 minute ago';
            } else if (currentTime.includes('minute')) {
                const minutes = parseInt(currentTime) + 1;
                timeSpan.textContent = minutes + ' minutes ago';
            }
        }
    });
}

// Close modal
function closeModal() {
    successModal.classList.remove('active');
}

// Close modal on outside click
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        closeModal();
    }
});

// ===== Share Buttons =====
document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const text = "I just took the water conservation pledge with AquaGuard! Join me in saving water for SDG 6. 💧";
        const url = window.location.href;
        
        if (btn.classList.contains('facebook')) {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
        } else if (btn.classList.contains('twitter')) {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        } else if (btn.classList.contains('whatsapp')) {
            window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        }
    });
});

// ===== Newsletter Form =====
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        if (email) {
            alert('Thank you for subscribing! You\'ll receive water conservation tips and updates.');
            newsletterForm.reset();
        }
    });
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll Animations =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.about-card, .stat-card, .tip-card, .resource-card');
    
    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
};

// Initial styles for animation
document.querySelectorAll('.about-card, .stat-card, .tip-card, .resource-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ===== Water Facts Rotation =====
const waterFacts = [
    "Only 2.5% of Earth's water is freshwater.",
    "Agriculture uses 70% of global freshwater.",
    "A dripping faucet wastes 20,000 liters per year.",
    "The average shower uses 65 liters of water.",
    "It takes 2,700 liters to make one cotton t-shirt.",
    "Toilets account for 30% of household water use.",
    "A 5-minute shower uses less water than a bath.",
    "Fixing leaks can save 10% on water bills."
];

let currentFactIndex = 0;

function rotateFacts() {
    const factElement = document.querySelector('.drop-inner p');
    if (factElement) {
        factElement.style.opacity = '0';
        setTimeout(() => {
            factElement.textContent = waterFacts[currentFactIndex];
            factElement.style.opacity = '1';
            currentFactIndex = (currentFactIndex + 1) % waterFacts.length;
        }, 500);
    }
}

// Rotate facts every 5 seconds
setInterval(rotateFacts, 5000);

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal.classList.contains('active')) {
        closeModal();
    }
});

// ===== Console Easter Egg =====
console.log('%c💧 AquaGuard - SDG 6: Clean Water & Sanitation', 'font-size: 20px; color: #0077b6; font-weight: bold;');
console.log('%cEvery drop counts! Thank you for caring about water conservation.', 'font-size: 14px; color: #00b4d8;');
console.log('%cLearn more: https://www.un.org/sustainabledevelopment/water-and-sanitation/', 'font-size: 12px; color: #666;');