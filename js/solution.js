// Solutions Engineering Page Interactions
document.addEventListener('DOMContentLoaded', function() {
  // Animate proficiency bars on scroll
  const proficiencyBars = document.querySelectorAll('.proficiency-bar');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = '0%';
        
        setTimeout(() => {
          entry.target.style.transition = 'width 1.5s ease-in-out';
          entry.target.style.width = width;
        }, 300);
      }
    });
  }, { threshold: 0.5 });
  
  proficiencyBars.forEach(bar => {
    observer.observe(bar);
  });
  
  // Add hover effects to case studies
  const caseStudies = document.querySelectorAll('.case-study-card');
  
  caseStudies.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const metrics = this.querySelectorAll('.metric-value');
      metrics.forEach(metric => {
        metric.style.transform = 'scale(1.1)';
        metric.style.color = 'var(--secondary)';
      });
    });
    
    card.addEventListener('mouseleave', function() {
      const metrics = this.querySelectorAll('.metric-value');
      metrics.forEach(metric => {
        metric.style.transform = 'scale(1)';
        metric.style.color = 'var(--primary)';
      });
    });
  });
  
  // Interactive tool proficiency display
  const toolItems = document.querySelectorAll('.tool-item');
  
  toolItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const proficiency = this.querySelector('.proficiency-text');
      if (proficiency) {
        proficiency.style.color = 'var(--primary)';
        proficiency.style.fontWeight = '600';
      }
    });
    
    item.addEventListener('mouseleave', function() {
      const proficiency = this.querySelector('.proficiency-text');
      if (proficiency) {
        proficiency.style.color = '';
        proficiency.style.fontWeight = '';
      }
    });
  });
  
  // Add copy-to-clipboard for tech stack items
  const techItems = document.querySelectorAll('.tech-item');
  
  techItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.title = 'Click to copy';
    
    item.addEventListener('click', function() {
      const tech = this.textContent;
      navigator.clipboard.writeText(tech).then(() => {
        const originalText = this.textContent;
        this.textContent = 'Copied!';
        this.style.background = 'rgba(16, 185, 129, 0.2)';
        this.style.color = '#10b981';
        
        setTimeout(() => {
          this.textContent = originalText;
          this.style.background = '';
          this.style.color = '';
        }, 1500);
      });
    });
  });
  
  // Expandable methodology steps
  const methodologySteps = document.querySelectorAll('.methodology-step');
  
  methodologySteps.forEach(step => {
    step.addEventListener('click', function() {
      this.classList.toggle('expanded');
      
      const content = this.querySelector('.step-content p');
      if (content && this.classList.contains('expanded')) {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
      } else if (content) {
        content.style.maxHeight = '60px';
        content.style.opacity = '0.8';
      }
    });
    
    // Initialize with collapsed state
    const content = step.querySelector('.step-content p');
    if (content) {
      content.style.maxHeight = '60px';
      content.style.overflow = 'hidden';
      content.style.transition = 'all 0.3s ease';
    }
  });
  
  // Add smooth scrolling for section links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add animation to expertise cards on scroll
  const expertiseCards = document.querySelectorAll('.expertise-card');
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 200);
      }
    });
  }, { threshold: 0.1 });
  
  expertiseCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
  });
  
  // Initialize tooltip for proficiency bars
  proficiencyBars.forEach(bar => {
    bar.addEventListener('mouseenter', function() {
      const tooltip = document.createElement('div');
      tooltip.className = 'proficiency-tooltip';
      tooltip.textContent = this.style.width;
      tooltip.style.cssText = `
        position: absolute;
        background: var(--dark-card);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 1000;
        transform: translateY(-100%);
        pointer-events: none;
      `;
      this.parentElement.style.position = 'relative';
      this.parentElement.appendChild(tooltip);
    });
    
    bar.addEventListener('mouseleave', function() {
      const tooltip = this.parentElement.querySelector('.proficiency-tooltip');
      if (tooltip) {
        tooltip.remove();
      }
    });
  });
});