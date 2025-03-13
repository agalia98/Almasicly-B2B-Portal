document.addEventListener('DOMContentLoaded', function() {
    // Cambia vista (griglia/lista)
    const gridViewButton = document.querySelector('.grid-view');
    const listViewButton = document.querySelector('.list-view');
    const productsGrid = document.querySelector('.products-grid');
    
    if (gridViewButton && listViewButton && productsGrid) {
        gridViewButton.addEventListener('click', function() {
            productsGrid.classList.remove('products-list');
            gridViewButton.classList.add('active');
            listViewButton.classList.remove('active');
            localStorage.setItem('catalogView', 'grid');
        });
        
        listViewButton.addEventListener('click', function() {
            productsGrid.classList.add('products-list');
            listViewButton.classList.add('active');
            gridViewButton.classList.remove('active');
            localStorage.setItem('catalogView', 'list');
        });
        
        // Controlla se c'è una vista salvata
        const savedView = localStorage.getItem('catalogView');
        if (savedView === 'list') {
            productsGrid.classList.add('products-list');
            listViewButton.classList.add('active');
            gridViewButton.classList.remove('active');
        }
    }
    
    // Quick View Modal
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const quickViewModal = document.getElementById('quickViewModal');
    const closeModalButton = document.querySelector('.close-modal');
    
    if (quickViewButtons.length > 0 && quickViewModal) {
        // Dati fittizi dei prodotti (in un'app reale, questi dati verrebbero dal server)
        const products = {
            1: {
                name: "Nero d'Avola Riserva",
                category: "Vini Rossi",
                price: "€12.90",
                rating: 4.5,
                reviewCount: 24,
                image: "images/products/vino-nero-davola.jpg",
                description: "Un vino rosso corposo con note di frutti di bosco e spezie. Perfetto per accompagnare carni rosse e formaggi stagionati.",
                sku: "VIN-001",
                availability: "In stock"
            },
            2: {
                name: "Olio EVO Nocellara",
                category: "Oli",
                price: "€15.50",
                rating: 5,
                reviewCount: 18,
                image: "images/products/olio-nocellara.jpg",
                description: "Olio extra vergine di oliva prodotto con olive Nocellara del Belice. Sapore fruttato e leggermente piccante.",
                sku: "OLI-002",
                availability: "In stock"
            },
            3: {
                name: "Pasta di Tumminia",
                category: "Pasta",
                price: "€4.90",
                rating: 4,
                reviewCount: 11,
                image: "images/products/pasta-tumminia.jpg",
                description: "Pasta artigianale prodotta con grano antico siciliano Tumminia. Ricca di fibre e dal sapore unico.",
                sku: "PAS-003",
                availability: "In stock"
            },
            4: {
                name: "Pesto al Pistacchio",
                category: "Conserve",
                price: "€8.50",
                oldPrice: "€9.90",
                rating: 5,
                reviewCount: 28,
                image: "images/products/pesto-pistacchio.jpg",
                description: "Pesto cremoso preparato con pistacchi di Bronte DOP. Ideale per condire la pasta o come antipasto.",
                sku: "CON-004",
                availability: "In stock"
            },
            5: {
                name: "Grillo Sicilia DOC",
                category: "Vini Bianchi",
                price: "€11.20",
                rating: 4,
                reviewCount: 15,
                image: "images/products/grillo.jpg",
                description: "Vino bianco fresco e aromatico con note di agrumi e fiori bianchi. Perfetto con pesce e frutti di mare.",
                sku: "VIN-005",
                availability: "In stock"
            },
            6: {
                name: "Conserva di Pomodoro Siccagno",
                category: "Conserve",
                price: "€5.80",
                rating: 4.5,
                reviewCount: 19,
                image: "images/products/conserva-pomodoro.jpg",
                description: "Passata di pomodoro Siccagno, coltivato in asciutto secondo tradizione. Dal sapore intenso e dolce.",
                sku: "CON-006",
                availability: "In stock"
            }
        };
        
        // Funzione per generare le stelline di rating
        function generateRatingStars(rating) {
            let starsHTML = '';
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 !== 0;
            
            for (let i = 1; i <= 5; i++) {
                if (i <= fullStars) {
                    starsHTML += '<i class="fas fa-star"></i>';
                } else if (i === fullStars + 1 && hasHalfStar) {
                    starsHTML += '<i class="fas fa-star-half-alt"></i>';
                } else {
                    starsHTML += '<i class="far fa-star"></i>';
                }
            }
            
            return starsHTML;
        }
        
        // Apri il modal con i dati del prodotto corretto
        quickViewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.productId;
                const product = products[productId];
                
                if (product) {
                    // Popola il modal con i dati del prodotto
                    document.getElementById('quickViewImage').src = product.image;
                    document.getElementById('quickViewTitle').textContent = product.name;
                    document.getElementById('quickViewCategory').textContent = product.category;
                    
                    // Genera stelle di rating
                    document.getElementById('quickViewRating').innerHTML = 
                        generateRatingStars(product.rating) + `<span>(${product.reviewCount})</span>`;
                    
                    // Prezzo (con eventuale prezzo vecchio)
                    let priceHTML = `<span class="price">${product.price}</span>`;
                    if (product.oldPrice) {
                        priceHTML += `<span class="old-price">${product.oldPrice}</span>`;
                    }
                    document.getElementById('quickViewPrice').innerHTML = priceHTML;
                    
                    // Descrizione e altri dettagli
                    document.getElementById('quickViewDescription').textContent = product.description;
                    document.getElementById('quickViewSku').textContent = product.sku;
                    document.getElementById('quickViewAvailability').textContent = product.availability;
                    
                    // Mostra il modal
                    quickViewModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Previene lo scroll della pagina
                }
            });
        });
        
        // Chiudi il modal
        if (closeModalButton) {
            closeModalButton.addEventListener('click', function() {
                quickViewModal.classList.remove('active');
                document.body.style.overflow = ''; // Ripristina lo scroll
            });
        }
        
        // Chiudi il modal se l'utente clicca fuori dal contenuto
        quickViewModal.addEventListener('click', function(e) {
            if (e.target === quickViewModal) {
                quickViewModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Gestione quantità nel modal
    const minusButton = document.querySelector('.quantity-button.minus');
    const plusButton = document.querySelector('.quantity-button.plus');
    const quantityInput = document.getElementById('quickViewQuantity');
    
    if (minusButton && plusButton && quantityInput) {
        minusButton.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        plusButton.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
    }
    
    // Bottoni "Aggiungi al carrello"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.dataset.productId;
                const productName = this.dataset.productName;
                
                // Funzione definita in main.js
                if (typeof addToCart === 'function') {
                    addToCart(productId, 1);
                    showNotification(`${productName} aggiunto al carrello`);
                    updateCartCount();
                } else {
                    console.log(`Prodotto aggiunto: ${productName} (ID: ${productId})`);
                    // Mostra una notifica
                    const notification = document.createElement('div');
                    notification.className = 'notification';
                    notification.textContent = `${productName} aggiunto al carrello`;
                    document.body.appendChild(notification);
                    
                    setTimeout(() => {
                        notification.classList.add('show');
                    }, 10);
                    
                    setTimeout(() => {
                        notification.classList.remove('show');
                        setTimeout(() => {
                            document.body.removeChild(notification);
                        }, 300);
                    }, 3000);
                }
            });
        });
    }
    
    // Bottone "Aggiungi al carrello" nel modal
    const addToCartModalButton = document.querySelector('.add-to-cart-modal');
    
    if (addToCartModalButton) {
        addToCartModalButton.addEventListener('click', function() {
            const productTitle = document.getElementById('quickViewTitle').textContent;
            const productId = getProductIdFromTitle(productTitle); // Funzione di utilità per ottenere l'ID
            const quantity = parseInt(document.getElementById('quickViewQuantity').value);
            
            // Funzione definita in main.js o implementata qui
            if (typeof addToCart === 'function') {
                addToCart(productId, quantity);
                showNotification(`${productTitle} aggiunto al carrello`);
                updateCartCount();
            } else {
                console.log(`Prodotto aggiunto: ${productTitle} (Quantità: ${quantity})`);
                // Implementare qui la gestione del carrello se non definita in main.js
            }
            
            // Chiudi il modal
            quickViewModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Funzioni di utilità
    function getProductIdFromTitle(title) {
        // Cerca l'ID del prodotto in base al titolo (simulato)
        for (const [id, product] of Object.entries(products)) {
            if (product.name === title) {
                return id;
            }
        }
        return '1'; // Default fallback
    }
    
    // Filtri
    const filterCheckboxes = document.querySelectorAll('.filter-list input[type="checkbox"]');
    const btnResetFilters = document.querySelector('.btn-reset-filters');
    
    if (filterCheckboxes.length > 0) {
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
