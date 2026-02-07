// Modern Header Loader with Scroll Effects
document.addEventListener('DOMContentLoaded', function() {
  // Load header
  fetch('partials/header.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Header not found');
      }
      return response.text();
    })
    .then(data => {
      document.getElementById('header').innerHTML = data;
      
      // Initialize mobile menu toggle
      const hamburger = document.querySelector('.hamburger');
      const navMenu = document.querySelector('.nav-menu');
      const header = document.querySelector('header');
      
      if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
          e.stopPropagation();
          hamburger.classList.toggle('active');
          navMenu.classList.toggle('active');
          document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
          link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
          });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
          if (navMenu.classList.contains('active') && 
              !navMenu.contains(e.target) && 
              !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
          }
        });
      }
      
      // Scroll effect for header
      window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
      
      // Set active link based on current page - FIXED VERSION
      function setActiveNavLink() {
        const currentPage = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Get just the filename from the path
        let currentFile = currentPage.split('/').pop() || 'index.html';
        
        // Handle home page (empty or just /)
        if (currentFile === '' || currentFile === '/' || currentFile === 'index.html') {
          currentFile = 'index.html';
        }
        
        // Convert to lowercase for comparison
        currentFile = currentFile.toLowerCase();
        
        navLinks.forEach(link => {
          // Remove active class from all links
          link.classList.remove('active');
          
          // Get href and normalize it
          let href = link.getAttribute('href');
          
          // Make sure href is not null/undefined
          if (!href) return;
          
          // Convert to lowercase for comparison
          href = href.toLowerCase();
          
          // Handle index.html vs empty
          if (href === 'index.html' || href === '/') {
            if (currentFile === 'index.html') {
              link.classList.add('active');
            }
          } 
          // Match other pages
          else if (href === currentFile) {
            link.classList.add('active');
          }
          // Handle cases where URL might not have .html extension
          else if (currentFile === href.replace('.html', '')) {
            link.classList.add('active');
          }
          // Handle cases where href doesn't have .html but file does
          else if (href === currentFile.replace('.html', '')) {
            link.classList.add('active');
          }
        });
      }
      
      // Call function to set active link
      setActiveNavLink();
      
      // Add icons to nav links
      const navIcons = {
        'index.html': 'fas fa-home',
        'resume.html': 'fas fa-file-alt',
        'projects.html': 'fas fa-code',
        'devops.html': 'fas fa-server',
        'blogs.html': 'fas fa-blog',
        'contact.html': 'fas fa-envelope'
      };
      
      document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        const normalizedHref = href ? href.toLowerCase() : '';
        
        if (navIcons[normalizedHref]) {
          const icon = document.createElement('i');
          icon.className = navIcons[normalizedHref];
          link.prepend(icon);
          link.innerHTML = icon.outerHTML + ' ' + link.textContent;
        }
      });
      
      // Add smooth scrolling for anchor links
      document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href === '#') return;
          
          const targetElement = document.querySelector(href);
          if (targetElement) {
            e.preventDefault();
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
            });
          }
        });
      });
    })
    .catch(error => {
      console.error('Error loading header:', error);
      // Fallback header if fetch fails
      document.getElementById('header').innerHTML = `
        <header>
          <nav class="navbar">
            <div class="container">
              <div class="nav-logo">
                <a href="index.html"><h2>Amit</h2></a>
              </div>
              <ul class="nav-menu">
                <li><a href="index.html" class="nav-link">Home</a></li>
                <li><a href="resume.html" class="nav-link">Resume</a></li>
                <li><a href="projects.html" class="nav-link">Projects</a></li>
                <li><a href="devops.html" class="nav-link">DevOps</a></li>
                <li><a href="blogs.html" class="nav-link">Blogs</a></li>
                <li><a href="contact.html" class="nav-link">Contact</a></li>
              </ul>
              <div class="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
              </div>
            </div>
          </nav>
        </header>
      `;
      
      // Initialize the fallback header
      initializeFallbackHeader();
    });
  
  // Function to initialize fallback header
  function initializeFallbackHeader() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
      
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        });
      });
    }
    
    // Set active link for fallback
    setActiveLinkForFallback();
  }
  
  // Function to set active link for fallback header
  function setActiveLinkForFallback() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      
      if (href === currentPage || 
          (currentPage === '' && href === 'index.html') ||
          (currentPage === 'index.html' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
});

// In the navIcons object, add:
const navIcons = {
  'index.html': 'fas fa-home',
  'resume.html': 'fas fa-file-alt',
  'projects.html': 'fas fa-code',
  'solutions-engineering.html': 'fas fa-puzzle-piece', // Add this
  'devops.html': 'fas fa-server',
  'blogs.html': 'fas fa-blog',
  'contact.html': 'fas fa-envelope'
};