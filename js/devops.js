// DevOps Page Interactions
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling for section navigation
  const sectionLinks = document.querySelectorAll('a[href^="#"]');
  
  sectionLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add progress animation to path items
  const pathItems = document.querySelectorAll('.path-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.1 });
  
  pathItems.forEach(item => {
    observer.observe(item);
  });
  
  // Add copy code functionality
  const codeSnippets = document.querySelectorAll('.code-snippet');
  
  codeSnippets.forEach(snippet => {
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-btn';
    copyButton.innerHTML = '<i class="far fa-copy"></i>';
    copyButton.title = 'Copy code';
    
    copyButton.addEventListener('click', function() {
      const code = snippet.querySelector('code').textContent;
      navigator.clipboard.writeText(code).then(() => {
        copyButton.innerHTML = '<i class="fas fa-check"></i>';
        copyButton.style.color = '#10b981';
        
        setTimeout(() => {
          copyButton.innerHTML = '<i class="far fa-copy"></i>';
          copyButton.style.color = '';
        }, 2000);
      });
    });
    
    snippet.style.position = 'relative';
    copyButton.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid var(--glass-border);
      border-radius: 5px;
      color: var(--gray-text);
      padding: 5px 10px;
      cursor: pointer;
      transition: var(--transition);
    `;
    
    copyButton.addEventListener('mouseenter', function() {
      this.style.background = 'rgba(124, 58, 237, 0.2)';
      this.style.color = 'var(--primary)';
    });
    
    copyButton.addEventListener('mouseleave', function() {
      if (!this.innerHTML.includes('fa-check')) {
        this.style.background = '';
        this.style.color = '';
      }
    });
    
    snippet.appendChild(copyButton);
  });
  
  // Add interactive status toggles
  const statusBadges = document.querySelectorAll('.path-status, .difficulty-badge');
  
  statusBadges.forEach(badge => {
    badge.addEventListener('click', function() {
      if (this.classList.contains('completed')) {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 200);
      }
    });
  });
  
  // Tooltip for learning resources
  const resourceItems = document.querySelectorAll('.resource-list li');
  
  resourceItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.color = 'var(--primary)';
      this.style.paddingLeft = '30px';
      this.style.transition = 'all 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.color = '';
      this.style.paddingLeft = '25px';
    });
  });
  
  // Add typing effect to perspective section
  const perspectiveText = document.querySelector('.perspective-text');
  if (perspectiveText) {
    const originalText = perspectiveText.textContent;
    perspectiveText.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < originalText.length) {
        perspectiveText.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 20);
      }
    }
    
    // Start typing when section is in view
    const perspectiveObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && perspectiveText.textContent === '') {
          typeWriter();
        }
      });
    }, { threshold: 0.5 });
    
    perspectiveObserver.observe(document.querySelector('.perspective-section'));
  }
  
  // Add animation to concept cards
  const conceptCards = document.querySelectorAll('.concept-card');
  
  conceptCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.concept-icon');
      if (icon) {
        icon.style.transform = 'rotate(15deg) scale(1.1)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.concept-icon');
      if (icon) {
        icon.style.transform = '';
      }
    });
  });
  
  // Add expand/collapse for project details
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'details-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Details';
    
    const details = card.querySelector('.project-details');
    if (details) {
      details.style.maxHeight = '0';
      details.style.overflow = 'hidden';
      details.style.transition = 'max-height 0.3s ease';
      
      card.insertBefore(toggleBtn, details);
      
      toggleBtn.addEventListener('click', function() {
        if (details.style.maxHeight === '0px' || details.style.maxHeight === '') {
          details.style.maxHeight = details.scrollHeight + 'px';
          toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Details';
        } else {
          details.style.maxHeight = '0';
          toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Details';
        }
      });
    }
  });
});