// Modern JavaScript for CMORTON Blog
// ES6+ features for theme switching, PWA, and responsive navigation

// Theme Switcher
class ThemeSwitcher {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    
    // Create theme switcher if it doesn't exist
    if (!document.querySelector('.theme-switcher')) {
      this.createThemeSwitcher();
    }
    
    // Set up event listeners
    this.setupEventListeners();
  }

  createThemeSwitcher() {
    const switcher = document.createElement('div');
    switcher.className = 'theme-switcher';
    switcher.setAttribute('role', 'group');
    switcher.setAttribute('aria-label', 'Theme switcher');
    
    const themes = [
      { name: 'light', icon: '☀️', label: 'Light theme' },
      { name: 'dark', icon: '🌙', label: 'Dark theme' },
      { name: 'blue', icon: '🌊', label: 'Blue theme' }
    ];
    
    themes.forEach(theme => {
      const button = document.createElement('button');
      button.className = theme.name === this.currentTheme ? 'active' : '';
      button.setAttribute('data-theme', theme.name);
      button.setAttribute('aria-label', theme.label);
      button.setAttribute('title', theme.label);
      button.textContent = theme.icon;
      switcher.appendChild(button);
    });
    
    document.body.appendChild(switcher);
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.theme-switcher button')) {
        this.switchTheme(e.target.dataset.theme);
      }
    });
  }

  switchTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update active button
    document.querySelectorAll('.theme-switcher button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
  }
}

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

// PWA Service Worker Registration
class PWAManager {
  constructor() {
    this.init();
  }

  init() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        this.registerServiceWorker();
      });
    }
    
    // Listen for install prompt
    this.setupInstallPrompt();
  }

  async registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration.scope);
      
      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker available
            this.showUpdateNotification();
          }
        });
      });
    } catch (error) {
      console.log('Service Worker registration failed:', error);
    }
  }

  setupInstallPrompt() {
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      this.showInstallButton(deferredPrompt);
    });
  }

  showInstallButton(deferredPrompt) {
    // You can create a custom install button here
    console.log('PWA install available');
  }

  showUpdateNotification() {
    // Show a notification that an update is available
    if (confirm('A new version is available. Reload to update?')) {
      window.location.reload();
    }
  }
}

// Skeleton Loader
class SkeletonLoader {
  static show(container) {
    container.classList.add('skeleton');
  }

  static hide(container) {
    container.classList.remove('skeleton');
  }

  static createTextSkeleton(lines = 3) {
    const skeleton = document.createElement('div');
    for (let i = 0; i < lines; i++) {
      const line = document.createElement('div');
      line.className = 'skeleton skeleton-text';
      skeleton.appendChild(line);
    }
    return skeleton;
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme switcher
  new ThemeSwitcher();
  
  // Initialize mobile navigation
  new MobileNav();
  
  // Initialize lazy loading
  new LazyLoader();
  
  // Initialize PWA
  new PWAManager();
  
  // Add skip-to-content link if it doesn't exist
  if (!document.querySelector('.skip-to-content')) {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
  
  // Mark main content area
  const mainContent = document.querySelector('main, .page-content');
  if (mainContent && !mainContent.id) {
    mainContent.id = 'main-content';
  }
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ThemeSwitcher,
    MobileNav,
    LazyLoader,
    PWAManager,
    SkeletonLoader
  };
}
