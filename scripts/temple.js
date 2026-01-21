// Hamburger menu toggle
const hamMenu = document.getElementById('ham-menu');
const menu = document.querySelector('.menu');

if (hamMenu && menu) {
    hamMenu.addEventListener('click', function() {
        hamMenu.classList.toggle('active');
        menu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
const menuLinks = document.querySelectorAll('.menu a');
menuLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamMenu.classList.remove('active');
        menu.classList.remove('active');
    });
});

// Update footer with current year and last modified date
document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    document.getElementById('currentyear').textContent = `©${new Date().getFullYear()}🌴 Mubiru Richard Innocent 🌴 Uganda`;
    
    // Update last modified date
    const lastModified = document.lastModified;
    document.getElementById('LastModified').textContent = `Last Modified: ${lastModified}`;
    
});