// Simple animations for page elements
document.addEventListener('DOMContentLoaded', function() {
  // Add fade-in animation to elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);
  
  // Observe elements with the 'animate-on-scroll' class
  document.querySelectorAll('.skill-card, .highlight-card').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
  
  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.fade-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    .hero-image img {
      animation: float 5s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);
});