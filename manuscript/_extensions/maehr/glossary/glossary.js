/**
 * Bootstrap Popover Initialization for Glossary
 * Uses Quarto's built-in Bootstrap functionality
 */

(function() {
  'use strict';

  /**
   * Initialize Bootstrap popovers for glossary terms
   */
  function initializeGlossaryPopovers() {
    // Check if Bootstrap is available
    if (typeof window.bootstrap === 'undefined') {
      console.warn('Bootstrap not found. Popovers will not work.');
      return;
    }

    // Initialize all glossary popovers
    const glossaryElements = document.querySelectorAll('.glossary[data-bs-toggle="popover"]');
    
    glossaryElements.forEach(function(element) {
      // Skip if already initialized
      if (window.bootstrap.Popover.getInstance(element)) {
        return;
      }

      new window.bootstrap.Popover(element, {
        trigger: 'click',
        placement: 'top',
        html: false,
        sanitize: true,
        container: 'body'
      });
    });

    // Close other popovers when one is opened (only one at a time)
    glossaryElements.forEach(function(element) {
      element.addEventListener('show.bs.popover', function() {
        // Hide all other popovers
        glossaryElements.forEach(function(otherElement) {
          if (otherElement !== element) {
            const popover = window.bootstrap.Popover.getInstance(otherElement);
            if (popover) {
              popover.hide();
            }
          }
        });
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGlossaryPopovers);
  } else {
    initializeGlossaryPopovers();
  }

  // Re-initialize if new content is added dynamically
  const observer = new MutationObserver(function(mutations) {
    let shouldReinitialize = false;
    
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.matches && node.matches('.glossary[data-bs-toggle="popover"]')) {
              shouldReinitialize = true;
            } else if (node.querySelectorAll) {
              const newElements = node.querySelectorAll('.glossary[data-bs-toggle="popover"]');
              if (newElements.length > 0) {
                shouldReinitialize = true;
              }
            }
          }
        });
      }
    });

    if (shouldReinitialize) {
      setTimeout(initializeGlossaryPopovers, 0);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();