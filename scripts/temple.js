// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamMenu = document.getElementById('ham-menu');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');

    // Toggle menu on hamburger click
    if (hamMenu && menu) {
        hamMenu.addEventListener('click', function() {
            hamMenu.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamMenu && menu) {
                hamMenu.classList.remove('active');
                menu.classList.remove('active');
            }
        });
    });

    // Update copyright year
    const currentYearElement = document.getElementById('currentyear');
    if (currentYearElement) {
        currentYearElement.textContent = `©${new Date().getFullYear()}🌴 Mubiru Richard Innocent 🌴 Uganda`;
    }
    
    // Update last modified date
    const lastModifiedElement = document.getElementById('LastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }
});