// Update footer with current year and last modified date
document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    document.getElementById('currentyear').textContent = `©${new Date().getFullYear()}🌴 Mubiru Richard Innocent 🌴 Uganda`;
    
    // Update last modified date
    const lastModified = document.lastModified;
    document.getElementById('LastModified').textContent = `Last Modified: ${lastModified}`;
    
});

