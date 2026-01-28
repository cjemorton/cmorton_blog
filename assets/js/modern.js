// Modern JavaScript for CMORTON Blog
// ES6+ features for responsive navigation

// Set compact theme as default (no switching)
document.documentElement.setAttribute('data-theme', 'compact');

// Mobile Navigation
class MobileNav {
  constructor() {
    this.isOpen = false;
    this.init();
  }

  init() {
    // Create mobile nav toggle if it doesn't exist
    if (!document.querySelector('.mobile-nav-toggle') && window.innerWidth <= 768) {
      this.createToggle();
    }
    
    this.setupEventListeners();
  }

  createToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'mobile-nav-toggle';
    toggle.setAttribute('aria-label', 'Toggle navigation menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '☰';
    document.body.appendChild(toggle);
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.mobile-nav-toggle')) {
        this.toggle();
      }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
      const nav = document.querySelector('.site-nav');
      const toggle = document.querySelector('.mobile-nav-toggle');
      if (this.isOpen && nav && !nav.contains(e.target) && e.target !== toggle) {
        this.close();
      }
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    const nav = document.querySelector('.site-nav');
    const toggle = document.querySelector('.mobile-nav-toggle');
    if (nav) {
      nav.classList.add('open');
      this.isOpen = true;
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'true');
        toggle.innerHTML = '✕';
      }
    }
  }

  close() {
    const nav = document.querySelector('.site-nav');
    const toggle = document.querySelector('.mobile-nav-toggle');
    if (nav) {
      nav.classList.remove('open');
      this.isOpen = false;
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '☰';
      }
    }
  }
}

// Lazy Image Loading
class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        { rootMargin: '50px' }
      );
      
      this.images.forEach(img => this.observer.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      this.loadAllImages();
    }
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadImage(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  loadImage(img) {
    const src = img.dataset.src;
    if (src) {
      img.src = src;
      img.classList.add('loaded');
      img.removeAttribute('data-src');
    }
  }

  loadAllImages() {
    this.images.forEach(img => this.loadImage(img));
  }
}

// Print Handler - small unobtrusive button at bottom
class PrintHandler {
  constructor() {
    this.init();
  }

  init() {
    // Add print buttons to posts and pages
    this.addPrintButtons();
    this.setupEventListeners();
  }

  addPrintButtons() {
    // Find article content areas (posts, pages, docs, projects)
    const articles = document.querySelectorAll('.post, .page, article.doc, article.project');
    
    articles.forEach(article => {
      // Check if print button already exists
      if (!article.querySelector('.print-button')) {
        const printBtn = this.createPrintButton();
        // Insert at the end of the article
        article.appendChild(printBtn);
      }
    });
  }

  createPrintButton() {
    const button = document.createElement('button');
    button.className = 'print-button';
    button.setAttribute('aria-label', 'Print this page');
    button.textContent = '🖨️ Print';
    return button;
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.print-button') || e.target.closest('.print-button')) {
        e.preventDefault();
        this.print();
      }
    });
  }

  print() {
    window.print();
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile navigation
  new MobileNav();
  
  // Initialize lazy loading
  new LazyLoader();
  
  // Initialize print handler
  new PrintHandler();
  
  // Mark main content area
  const mainContent = document.querySelector('main, .page-content');
  if (mainContent && !mainContent.id) {
    mainContent.id = 'main-content';
  }
});
