// Blogs Page Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Simple click tracking for blog links (optional)
  const blogLinks = document.querySelectorAll('.blog-link');
  
  blogLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.classList.contains('btn-disabled')) {
        e.preventDefault();
        return;
      }
      
      // You can add analytics or tracking here
      console.log('Blog link clicked:', this.href);
    });
  });
  
  // Add hover effect to blog cards
  const blogCards = document.querySelectorAll('.blog-card');
  
  blogCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});