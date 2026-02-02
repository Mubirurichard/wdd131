// Array of Temple Objects
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Adding three more temples as required
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253000,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
  },
  {
    templeName: "Hong Kong China",
    location: "Hong Kong, China",
    dedicated: "1996, May, 26",
    area: 21700,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/hong-kong-china/400x250/hong-kong-china-temple-lds-82707-wallpaper.jpg"
  },
  {
    templeName: "Kona Hawaii",
    location: "Kailua-Kona, Hawaii, United States",
    dedicated: "2000, January, 23",
    area: 12000,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/kona-hawaii/400x250/kona-hawaii-temple-lds-1020910-wallpaper.jpg"
  }
];

// DOM Elements
const templeContainer = document.getElementById('temple-container');
const navLinks = document.querySelectorAll('.navigation a');

// Function to create temple card HTML
function createTempleCard(temple) {
  return `
    <div class="temple-card">
      <img src="${temple.imageUrl}" 
           alt="${temple.templeName}" 
           loading="lazy"
           width="400"
           height="250">
      <div class="temple-info">
        <h3>${temple.templeName}</h3>
        <p><strong>Location:</strong> ${temple.location}</p>
        <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
        <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
      </div>
    </div>
  `;
}

// Function to display temples
function displayTemples(templesArray) {
  templeContainer.innerHTML = '';
  templesArray.forEach(temple => {
    templeContainer.innerHTML += createTempleCard(temple);
  });
}

// Filter functions
function filterOldTemples() {
  return temples.filter(temple => {
    const year = parseInt(temple.dedicated.split(',')[0]);
    return year < 1900;
  });
}

function filterNewTemples() {
  return temples.filter(temple => {
    const year = parseInt(temple.dedicated.split(',')[0]);
    return year > 2000;
  });
}

function filterLargeTemples() {
  return temples.filter(temple => temple.area > 90000);
}

function filterSmallTemples() {
  return temples.filter(temple => temple.area < 10000);
}

// Navigation event handlers
function handleNavClick(e) {
  e.preventDefault();
  
  // Remove active class from all links
  navLinks.forEach(link => link.classList.remove('active'));
  
  // Add active class to clicked link
  this.classList.add('active');
  
  // Get filter type from id
  const filterType = this.id;
  
  // Filter temples based on selection
  switch(filterType) {
    case 'old':
      displayTemples(filterOldTemples());
      break;
    case 'new':
      displayTemples(filterNewTemples());
      break;
    case 'large':
      displayTemples(filterLargeTemples());
      break;
    case 'small':
      displayTemples(filterSmallTemples());
      break;
    default:
      displayTemples(temples); // Show all for 'home'
  }
}

// Initialize page
function init() {
  // Display all temples initially
  displayTemples(temples);
  
  // Add click event listeners to navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
  });
  
  // Set current year in footer
  document.getElementById('currentyear').textContent = `©${new Date().getFullYear()}🌴 Mubiru Richard Innocent 🌴`;
  
  // Set last modified date
  document.getElementById('lastModifiedDate').textContent = document.lastModified;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);