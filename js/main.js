document.addEventListener('DOMContentLoaded', function() {
    console.log('AlmaSicily Horeca - Sito in costruzione');
    
    // Toggle Menu Mobile
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNavigation = document.querySelector('.main-navigation');
    
    if (mobileMenuToggle && mainNavigation) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNavigation.classList.toggle('active');
        });
    }
});
