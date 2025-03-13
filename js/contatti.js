document.addEventListener('DOMContentLoaded', function() {
    // Gestione FAQ (espandi/collassa)
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // Chiudi tutte le altre FAQ
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Apri/chiudi la FAQ cliccata
                item.classList.toggle('active');
                
                // Cambia l'icona
                const icon = item.querySelector('.faq-toggle i');
                if (item.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-plus');
                }
            });
        });
    }
    
    // Gestione form di contatto
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Verifica validità del form
            if (this.checkValidity()) {
                // Simulazione invio dati (in un'app
