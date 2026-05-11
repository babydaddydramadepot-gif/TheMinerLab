/**
 * The Miner Lab - Shopify Theme JavaScript
 * Vanilla JavaScript for theme interactions
 */

// ===================================
// 1. Reveal on Scroll (IntersectionObserver)
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }
});

// ===================================
// 2. Header Scroll Effect
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  
  if (header) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }
});

// ===================================
// 3. Mobile Menu Toggle
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const menuOverlay = document.querySelector('.mobile-menu-overlay');
  const menuClose = document.querySelector('.mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav a');
  
  if (menuToggle && menuOverlay) {
    // Open menu
    menuToggle.addEventListener('click', () => {
      menuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    // Close menu
    if (menuClose) {
      menuClose.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
    
    // Close menu when clicking on a link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Close menu when clicking overlay background
    menuOverlay.addEventListener('click', (e) => {
      if (e.target === menuOverlay) {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});

// ===================================
// 4. Product Gallery (Thumbnail Switching)
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const thumbnails = document.querySelectorAll('.product-thumb');
  const mainImage = document.querySelector('.product-main-image');
  
  if (thumbnails.length > 0 && mainImage) {
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        thumb.classList.add('active');
        
        // Update main image
        const newImageSrc = thumb.dataset.image;
        if (newImageSrc) {
          mainImage.src = newImageSrc;
        }
      });
    });
  }
});

// ===================================
// 5. Variant Selector (Product Page)
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const variantButtons = document.querySelectorAll('.variant-button');
  const priceElement = document.querySelector('.product-price-value');
  const compareElement = document.querySelector('.product-compare-price');
  const addToCartButton = document.querySelector('.add-to-cart-btn');
  const variantIdInput = document.querySelector('input[name="id"]');
  
  if (variantButtons.length > 0) {
    variantButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all variant buttons
        variantButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get variant data
        const variantId = button.dataset.variantId;
        const variantPrice = button.dataset.variantPrice;
        const variantCompare = button.dataset.variantCompare;
        const variantAvailable = button.dataset.variantAvailable === 'true';
        
        // Update variant ID in form
        if (variantIdInput) {
          variantIdInput.value = variantId;
        }
        
        // Update price
        if (priceElement && variantPrice) {
          priceElement.textContent = variantPrice;
        }
        
        // Update compare price
        if (compareElement) {
          if (variantCompare && variantCompare !== variantPrice) {
            compareElement.textContent = variantCompare;
            compareElement.style.display = 'inline';
          } else {
            compareElement.style.display = 'none';
          }
        }
        
        // Update add to cart button
        if (addToCartButton) {
          if (variantAvailable) {
            addToCartButton.disabled = false;
            addToCartButton.textContent = 'Add to Cart';
          } else {
            addToCartButton.disabled = true;
            addToCartButton.textContent = 'Out of Stock';
          }
        }
      });
    });
  }
});

// ===================================
// 6. OS Option Selector (Product Page)
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const osButtons = document.querySelectorAll('.os-option-btn');
  
  if (osButtons.length > 0) {
    osButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all OS buttons
        osButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // This is cosmetic only - no form submission needed
        // Could store preference in localStorage if desired
        const selectedOS = button.dataset.os;
        console.log('Selected OS:', selectedOS);
      });
    });
  }
});

// ===================================
// 7. FAQ Accordion
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const accordionButtons = document.querySelectorAll('.accordion-button');
  
  if (accordionButtons.length > 0) {
    accordionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const accordionItem = button.parentElement;
        const accordionContent = accordionItem.querySelector('.accordion-content');
        const isActive = button.classList.contains('active');
        
        // Close all accordion items
        accordionButtons.forEach(btn => {
          btn.classList.remove('active');
          const content = btn.parentElement.querySelector('.accordion-content');
          if (content) {
            content.classList.remove('active');
          }
        });
        
        // If the clicked item wasn't active, open it
        if (!isActive) {
          button.classList.add('active');
          if (accordionContent) {
            accordionContent.classList.add('active');
          }
        }
      });
    });
  }
});

// ===================================
// 8. Reviews Carousel
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.reviews-scroller');
  const prevButton = document.querySelector('.reviews-prev');
  const nextButton = document.querySelector('.reviews-next');
  
  if (carousel && prevButton && nextButton) {
    prevButton.addEventListener('click', () => {
      const scrollAmount = carousel.offsetWidth * 0.8;
      carousel.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
    
    nextButton.addEventListener('click', () => {
      const scrollAmount = carousel.offsetWidth * 0.8;
      carousel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
    
    // Optional: Hide buttons at scroll boundaries
    const updateButtonVisibility = () => {
      const scrollLeft = carousel.scrollLeft;
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      
      prevButton.style.opacity = scrollLeft <= 0 ? '0.3' : '1';
      nextButton.style.opacity = scrollLeft >= maxScroll - 10 ? '0.3' : '1';
    };
    
    carousel.addEventListener('scroll', updateButtonVisibility);
    updateButtonVisibility(); // Initial check
  }
});

// ===================================
// 9. Cart Updates (AJAX API)
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  // Cart quantity update buttons
  const quantityButtons = document.querySelectorAll('.cart-qty-update');
  
  if (quantityButtons.length > 0) {
    quantityButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const lineKey = button.dataset.lineKey;
        const action = button.dataset.action;
        const quantityInput = document.querySelector(`input[data-line-key="${lineKey}"]`);
        
        if (!quantityInput) return;
        
        let newQuantity = parseInt(quantityInput.value);
        
        if (action === 'increase') {
          newQuantity += 1;
        } else if (action === 'decrease') {
          newQuantity = Math.max(0, newQuantity - 1);
        }
        
        try {
          const response = await fetch('/cart/change.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              line: lineKey,
              quantity: newQuantity
            })
          });
          
          if (response.ok) {
            // Reload the page to update cart
            window.location.reload();
          } else {
            console.error('Failed to update cart');
          }
        } catch (error) {
          console.error('Error updating cart:', error);
        }
      });
    });
  }
  
  // Direct quantity input change
  const quantityInputs = document.querySelectorAll('.cart-qty-input');
  
  if (quantityInputs.length > 0) {
    quantityInputs.forEach(input => {
      input.addEventListener('change', async (e) => {
        const lineKey = input.dataset.lineKey;
        const newQuantity = Math.max(0, parseInt(input.value) || 0);
        
        try {
          const response = await fetch('/cart/change.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              line: lineKey,
              quantity: newQuantity
            })
          });
          
          if (response.ok) {
            window.location.reload();
          } else {
            console.error('Failed to update cart');
          }
        } catch (error) {
          console.error('Error updating cart:', error);
        }
      });
    });
  }
});

// ===================================
// Cart Drawer Toggle (Optional Enhancement)
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const cartDrawerToggle = document.querySelector('.cart-drawer-toggle');
  const cartDrawerOverlay = document.querySelector('.cart-drawer-overlay');
  const cartDrawer = document.querySelector('.cart-drawer');
  const cartDrawerClose = document.querySelector('.cart-drawer-close');
  
  if (cartDrawerToggle && cartDrawerOverlay && cartDrawer) {
    // Open cart drawer
    cartDrawerToggle.addEventListener('click', (e) => {
      e.preventDefault();
      cartDrawerOverlay.classList.add('active');
      cartDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    // Close cart drawer
    if (cartDrawerClose) {
      cartDrawerClose.addEventListener('click', () => {
        cartDrawerOverlay.classList.remove('active');
        cartDrawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
    
    // Close when clicking overlay
    cartDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === cartDrawerOverlay) {
        cartDrawerOverlay.classList.remove('active');
        cartDrawer.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});

// ===================================
// Product Tabs Switching
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  
  if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.dataset.tab;
        
        // Remove active from all buttons and content
        tabButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active');
        });
        
        // Add active to clicked button and target content
        button.classList.add('active');
        const targetContent = document.querySelector(`#${targetTab}`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }
});

// ===================================
// Newsletter Form Enhancement
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  
  if (newsletterForms.length > 0) {
    newsletterForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && !emailInput.value.trim()) {
          e.preventDefault();
          alert('Please enter a valid email address.');
        }
      });
    });
  }
});

// ===================================
// Lazy Loading Images (Optional Enhancement)
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }
});

// ===================================
// Smooth Scroll to Top Button (Optional)
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const scrollTopButton = document.querySelector('.scroll-to-top');
  
  if (scrollTopButton) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        scrollTopButton.style.display = 'flex';
      } else {
        scrollTopButton.style.display = 'none';
      }
    });
    
    scrollTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

// ===================================
// Hashrate Filter (Collection Page)
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const hashrateButtons = document.querySelectorAll('#HashrateFilters [data-hashrate]');
  const productItems = document.querySelectorAll('.product-filter-item');
  const emptyMsg = document.getElementById('HashrateEmptyMsg');
  const productsGrid = document.getElementById('ProductsGrid');

  if (hashrateButtons.length === 0) return;

  hashrateButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state on buttons
      hashrateButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedHashrate = btn.dataset.hashrate;
      let visibleCount = 0;

      productItems.forEach(item => {
        if (selectedHashrate === 'all') {
          item.classList.remove('filtered-out');
          visibleCount++;
        } else {
          const itemHashrates = (item.dataset.hashrates || '').toUpperCase();
          if (itemHashrates.includes(selectedHashrate.toUpperCase())) {
            item.classList.remove('filtered-out');
            visibleCount++;
          } else {
            item.classList.add('filtered-out');
          }
        }
      });

      // Toggle empty state message
      if (emptyMsg) {
        emptyMsg.hidden = visibleCount > 0;
      }

      // Toggle grid visibility
      if (productsGrid) {
        productsGrid.style.display = visibleCount === 0 ? 'none' : '';
      }
    });
  });
});

// ===================================
// Console Branding (Easter Egg)
// ===================================
console.log('%c🔧 The Miner Lab', 'font-size: 20px; font-weight: bold; color: #4dd4e8;');
console.log('%cPremium Crypto Mining Hardware', 'font-size: 12px; color: #94a3b8;');
console.log('%cBuilt with care by The Miner Lab team', 'font-size: 10px; color: #94a3b8;');
