/* =====================================================
   Auto Alpina Auctions — script.js
   Vehicle data, filtering, and contact form handling
   ===================================================== */

'use strict';

// =====================================================
// SAMPLE VEHICLE DATA
// =====================================================
const vehicles = [
    {
        id: 1,
        make: 'BMW',
        model: '3 Series 320i',
        year: 2022,
        price: 689000,
        mileage: 28000,
        condition: 'Certified Pre-Owned',
        bodyType: 'Sedan',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        color: 'Alpine White',
        image: 'car1.jpg',
        description: 'Immaculate condition with full service history. Sport Line trim with sunroof.'
    },
    {
        id: 2,
        make: 'Mercedes-Benz',
        model: 'C 200 AMG Line',
        year: 2023,
        price: 890000,
        mileage: 12000,
        condition: 'Certified Pre-Owned',
        bodyType: 'Sedan',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        color: 'Obsidian Black',
        image: 'car2.jpg',
        description: 'Near-new with premium AMG exterior package, panoramic roof and Burmester sound.'
    },
    {
        id: 3,
        make: 'Audi',
        model: 'A4 2.0 TDI S-Line',
        year: 2021,
        price: 565000,
        mileage: 45000,
        condition: 'Used',
        bodyType: 'Sedan',
        transmission: 'Automatic',
        fuelType: 'Diesel',
        color: 'Mythos Black',
        image: 'car3.jpg',
        description: 'Well-maintained with full dealer service history. Virtual cockpit and Bang & Olufsen audio.'
    },
    {
        id: 4,
        make: 'Porsche',
        model: 'Cayenne S',
        year: 2022,
        price: 1950000,
        mileage: 19500,
        condition: 'Certified Pre-Owned',
        bodyType: 'SUV',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        color: 'Moonlight Blue',
        image: null,
        description: 'Stunning Cayenne S with Bose Surround Sound, Sport Chrono Package and 21" wheels.'
    },
    {
        id: 5,
        make: 'Toyota',
        model: 'Land Cruiser 200',
        year: 2020,
        price: 1100000,
        mileage: 62000,
        condition: 'Used',
        bodyType: 'SUV',
        transmission: 'Automatic',
        fuelType: 'Diesel',
        color: 'Pearl White',
        image: null,
        description: 'Legendary reliability. 7-seater, full leather interior and multi-terrain select.'
    },
    {
        id: 6,
        make: 'Volkswagen',
        model: 'Golf 8 GTI',
        year: 2023,
        price: 649000,
        mileage: 8000,
        condition: 'New',
        bodyType: 'Hatchback',
        transmission: 'DSG',
        fuelType: 'Petrol',
        color: 'Tornado Red',
        image: null,
        description: 'Brand-new unregistered GTI. 245 hp, IQ.DRIVE assistance package included.'
    },
    {
        id: 7,
        make: 'Lexus',
        model: 'RX 350 F Sport',
        year: 2021,
        price: 870000,
        mileage: 38000,
        condition: 'Certified Pre-Owned',
        bodyType: 'SUV',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        color: 'Sonic Titanium',
        image: null,
        description: 'Outstanding build quality with Mark Levinson audio, panoramic roof and heated seats.'
    },
    {
        id: 8,
        make: 'Ford',
        model: 'Mustang GT 5.0',
        year: 2019,
        price: 620000,
        mileage: 55000,
        condition: 'Used',
        bodyType: 'Coupe',
        transmission: 'Manual',
        fuelType: 'Petrol',
        color: 'Race Red',
        image: null,
        description: 'Pure V8 muscle. Recaro seats, Brembo brakes and performance-tuned suspension.'
    }
];

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

/**
 * Format a number as South African Rand.
 * @param {number} amount
 * @returns {string}
 */
function formatZAR(amount) {
    return 'R\u00a0' + amount.toLocaleString('en-ZA');
}

/**
 * Filter the vehicle inventory based on filter criteria.
 * @param {Array}  inventory
 * @param {Object} filters
 * @returns {Array}
 */
function filterInventory(inventory, filters) {
    return inventory.filter(item => {
        if (filters.make      && item.make !== filters.make)           return false;
        if (filters.model     && !item.model.toLowerCase().includes(filters.model.toLowerCase())) return false;
        if (filters.year      && item.year < Number(filters.year))     return false;
        if (filters.condition && item.condition !== filters.condition) return false;
        if (filters.maxPrice  && item.price > Number(filters.maxPrice)) return false;
        return true;
    });
}

/**
 * Return the badge class for a given condition string.
 * @param {string} condition
 * @returns {string}
 */
function badgeClass(condition) {
    if (condition === 'New') return 'badge-new';
    if (condition === 'Certified Pre-Owned') return 'badge-certified';
    return 'badge-used';
}

// =====================================================
// DOM RENDERING
// =====================================================

/**
 * Build and return the HTML string for one vehicle card.
 * @param {Object} vehicle
 * @returns {string}
 */
function buildVehicleCard(vehicle) {
    const imageHtml = vehicle.image
        ? `<img src="${vehicle.image}" alt="${vehicle.year} ${vehicle.make} ${vehicle.model}" loading="lazy">`
        : `<div class="vehicle-img-placeholder">
               <span>&#9651;</span>
               <span>${vehicle.make}</span>
           </div>`;

    return `
        <article class="vehicle-card" data-id="${vehicle.id}">
            <div class="vehicle-card-image">
                ${imageHtml}
                <span class="vehicle-badge ${badgeClass(vehicle.condition)}">${vehicle.condition}</span>
            </div>
            <div class="vehicle-card-body">
                <h3 class="vehicle-card-title">${vehicle.year} ${vehicle.make} ${vehicle.model}</h3>
                <p class="vehicle-card-sub">${vehicle.description}</p>
                <div class="vehicle-card-specs">
                    <span class="spec-tag">${vehicle.transmission}</span>
                    <span class="spec-tag">${vehicle.fuelType}</span>
                    <span class="spec-tag">${vehicle.mileage.toLocaleString('en-ZA')} km</span>
                    <span class="spec-tag">${vehicle.color}</span>
                </div>
                <p class="vehicle-card-price">${formatZAR(vehicle.price)}</p>
            </div>
            <div class="vehicle-card-actions">
                <button class="btn btn-outline enquire-btn" data-id="${vehicle.id}" data-title="${vehicle.year} ${vehicle.make} ${vehicle.model}">Enquire Now</button>
            </div>
        </article>`;
}

/**
 * Render the given vehicles into #vehicleGrid.
 * @param {Array} list
 */
function renderVehicles(list) {
    const grid     = document.getElementById('vehicleGrid');
    const noResult = document.getElementById('noResults');
    const countEl  = document.getElementById('resultsCount');

    if (!grid) return;

    if (list.length === 0) {
        grid.innerHTML = '';
        noResult.classList.remove('hidden');
        countEl.textContent = 'No vehicles found.';
    } else {
        noResult.classList.add('hidden');
        grid.innerHTML = list.map(buildVehicleCard).join('');
        countEl.textContent = `Showing ${list.length} vehicle${list.length !== 1 ? 's' : ''}`;

        // Attach enquire buttons
        grid.querySelectorAll('.enquire-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const title = btn.getAttribute('data-title');
                prefillContactForm(title);
            });
        });
    }
}

// =====================================================
// FILTERING
// =====================================================

function getFilterValues() {
    return {
        make:      document.getElementById('filterMake')?.value      || '',
        model:     document.getElementById('filterModel')?.value     || '',
        year:      document.getElementById('filterYear')?.value      || '',
        condition: document.getElementById('filterCondition')?.value || '',
        maxPrice:  document.getElementById('filterMaxPrice')?.value  || ''
    };
}

function applyFilters() {
    const filtered = filterInventory(vehicles, getFilterValues());
    renderVehicles(filtered);
}

function clearFilters() {
    ['filterMake', 'filterModel', 'filterYear', 'filterCondition', 'filterMaxPrice'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    renderVehicles(vehicles);
}

// =====================================================
// CONTACT FORM
// =====================================================

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s\+\-\(\)]{7,20}$/;

/**
 * Validate a single field and display inline error messages.
 * Returns true if field is valid.
 * @param {HTMLElement} input
 * @param {string}      errorId
 * @param {string}      message
 * @returns {boolean}
 */
function validateField(input, errorId, message) {
    const errorEl = document.getElementById(errorId);
    if (!errorEl) return true;

    const isValid = !message; // empty message string = valid
    if (isValid) {
        input.classList.remove('input-error');
        errorEl.textContent = '';
    } else {
        input.classList.add('input-error');
        errorEl.textContent = message;
    }
    return isValid;
}

/**
 * Validate all contact form fields.
 * @returns {boolean} true if all fields pass validation
 */
function validateContactForm() {
    let valid = true;

    const name    = document.getElementById('contactName');
    const email   = document.getElementById('contactEmail');
    const phone   = document.getElementById('contactPhone');
    const message = document.getElementById('contactMessage');

    // Name
    const nameMsg = name.value.trim().length < 2 ? 'Please enter your full name.' : '';
    if (!validateField(name, 'nameError', nameMsg)) valid = false;

    // Email
    const emailMsg = !EMAIL_REGEX.test(email.value.trim()) ? 'Please enter a valid email address.' : '';
    if (!validateField(email, 'emailError', emailMsg)) valid = false;

    // Phone (optional but if provided must look valid)
    const phoneVal = phone.value.trim();
    const phoneMsg = phoneVal && !PHONE_REGEX.test(phoneVal) ? 'Please enter a valid phone number.' : '';
    if (!validateField(phone, 'phoneError', phoneMsg)) valid = false;

    // Message
    const msgMsg = message.value.trim().length < 10 ? 'Please enter a message (at least 10 characters).' : '';
    if (!validateField(message, 'messageError', msgMsg)) valid = false;

    return valid;
}

/**
 * Pre-fill the contact form message with an enquiry for a specific vehicle.
 * @param {string} vehicleTitle
 */
function prefillContactForm(vehicleTitle) {
    const msgEl = document.getElementById('contactMessage');
    if (msgEl) {
        msgEl.value = `Hi, I'm interested in the ${vehicleTitle}. Please contact me with more information.`;
    }
    // Scroll to contact section
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Handle contact form submission.
 * @param {Event} e
 */
function handleContactSubmit(e) {
    e.preventDefault();

    // Clear previous global feedback
    document.getElementById('formSuccess')?.classList.add('hidden');
    document.getElementById('formError')?.classList.add('hidden');

    if (!validateContactForm()) {
        document.getElementById('formError')?.classList.remove('hidden');
        return;
    }

    const btn = document.getElementById('submitBtn');
    if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending…';
    }

    // Simulate async submission (replace with fetch() to a real endpoint)
    setTimeout(() => {
        document.getElementById('formSuccess')?.classList.remove('hidden');
        document.getElementById('contactForm')?.reset();

        // Clear inline errors
        ['nameError', 'emailError', 'phoneError', 'messageError'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '';
        });
        ['contactName', 'contactEmail', 'contactPhone', 'contactMessage'].forEach(id => {
            document.getElementById(id)?.classList.remove('input-error');
        });

        if (btn) {
            btn.disabled = false;
            btn.textContent = 'Send Message';
        }
    }, 1000);
}

// =====================================================
// MOBILE NAV TOGGLE
// =====================================================
function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const links  = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
    });

    // Close nav on link click
    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            links.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// =====================================================
// INIT
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    // Render all vehicles on load
    renderVehicles(vehicles);

    // Filter buttons
    document.getElementById('applyFilters')?.addEventListener('click', applyFilters);
    document.getElementById('clearFilters')?.addEventListener('click', clearFilters);

    // Real-time filtering on Enter key in model text input
    document.getElementById('filterModel')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') applyFilters();
    });

    // Contact form
    document.getElementById('contactForm')?.addEventListener('submit', handleContactSubmit);

    // Clear field errors on input
    ['contactName', 'contactEmail', 'contactPhone', 'contactMessage'].forEach((id, i) => {
        const errorIds = ['nameError', 'emailError', 'phoneError', 'messageError'];
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => {
                el.classList.remove('input-error');
                const errEl = document.getElementById(errorIds[i]);
                if (errEl) errEl.textContent = '';
            });
        }
    });

    // Mobile nav
    initMobileNav();
});