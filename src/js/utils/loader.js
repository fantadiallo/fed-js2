// src/js/utils/loader.js

/**
 * Creates and displays a loader on the page.
 */
export function showLoader() {
  
    if (document.getElementById('loader')) return;
  

    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.className = 'loader';
  

    const spinner = document.createElement('div');
    spinner.className = 'spinner';
  

    loader.appendChild(spinner);
  
 
    document.body.appendChild(loader);
  }
  
  /**
   * Removes the loader from the page.
   */
  export function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.remove();
    }
  }
  