// Product array
const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

// DOM elements
const productSelect = document.getElementById('productName');
const totalReviewsElement = document.getElementById('totalReviews');

// Populate product select options
function populateProductOptions() {
    // Clear any existing options (except the first placeholder)
    while (productSelect.options.length > 1) {
        productSelect.remove(1);
    }
    
    // Add product options from the array
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} (Rating: ${product.averagerating}/5)`;
        productSelect.appendChild(option);
    });
}

// Load total reviews count from localStorage
function loadTotalReviews() {
    let totalReviews = localStorage.getItem('totalReviews');
    
    if (totalReviews === null) {
        // Initialize if not exists
        totalReviews = 0;
        localStorage.setItem('totalReviews', totalReviews);
    }
    
    totalReviewsElement.textContent = totalReviews;
}

// Form validation
function setupFormValidation() {
    const form = document.getElementById('reviewForm');
    
    form.addEventListener('submit', function(event) {
        // Check if all required fields are filled
        const productName = document.getElementById('productName').value;
        const rating = document.querySelector('input[name="rating"]:checked');
        const installDate = document.getElementById('installDate').value;
        
        let isValid = true;
        
        // Validate product selection
        if (!productName) {
            isValid = false;
            highlightInvalidField(productSelect);
        } else {
            removeHighlight(productSelect);
        }
        
        // Validate rating
        if (!rating) {
            isValid = false;
            const ratingContainer = document.querySelector('.rating-container');
            ratingContainer.classList.add('invalid');
        } else {
            const ratingContainer = document.querySelector('.rating-container');
            ratingContainer.classList.remove('invalid');
        }
        
        // Validate installation date
        if (!installDate) {
            isValid = false;
            const installDateInput = document.getElementById('installDate');
            highlightInvalidField(installDateInput);
        } else {
            const installDateInput = document.getElementById('installDate');
            removeHighlight(installDateInput);
        }
        
        if (!isValid) {
            event.preventDefault();
            alert('Please fill in all required fields (marked with *) before submitting.');
        }
    });
    
    // Add CSS for invalid fields
    const style = document.createElement('style');
    style.textContent = `
        .invalid { border: 2px solid #e74c3c !important; }
        input:invalid, select:invalid { border-color: #e74c3c; }
    `;
    document.head.appendChild(style);
}

function highlightInvalidField(element) {
    element.classList.add('invalid');
}

function removeHighlight(element) {
    element.classList.remove('invalid');
}

// Initialize date input to today's date
function initializeDateInput() {
    const dateInput = document.getElementById('installDate');
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    dateInput.value = formattedDate;
    
    // Set max date to today
    dateInput.max = formattedDate;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    populateProductOptions();
    loadTotalReviews();
    setupFormValidation();
    initializeDateInput();
    
    // Set up tab order
    const focusableElements = form.querySelectorAll(
        'input:not([type="hidden"]), select, textarea, button, [tabindex]:not([tabindex="-1"])'
    );
    
    // Add tabindex to rating stars
    const ratingInputs = document.querySelectorAll('.rating-stars input');
    ratingInputs.forEach((input, index) => {
        input.setAttribute('tabindex', index + 1);
    });
});