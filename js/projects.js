// Projects Page Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Filter projects
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          // Trigger reflow for animation
          card.style.animation = 'none';
          setTimeout(() => {
            card.style.animation = 'fadeInUp 0.6s ease forwards';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Project modal functionality
  const modal = document.querySelector('.project-modal');
  const modalClose = document.querySelector('.modal-close');
  const viewDetailsButtons = document.querySelectorAll('.view-details');
  
  // Project details data
  const projectDetails = {
    'smarttime-scheduler': {
      title: 'SmartTime Table Scheduler',
      status: 'in-development',
      description: 'An intelligent scheduling system that optimizes timetables using genetic algorithms and constraint satisfaction. The system automatically generates conflict-free schedules while maximizing resource utilization and considering faculty preferences.',
      technologies: ['Python', 'JavaScript', 'Node.js', 'PostgreSQL', 'Flask', 'React'],
      features: [
        'AI-powered scheduling algorithms',
        'Real-time conflict detection',
        'Faculty preference management',
        'Resource optimization',
        'Export to multiple formats',
        'Admin dashboard'
      ],
      timeline: 'Jan 2024 - Present',
      github: '#',
      liveDemo: null,
      challenges: [
        'Optimizing algorithm for large datasets',
        'Real-time updates for schedule changes',
        'Balancing multiple constraints'
      ]
    },
    'portfolio-website': {
      title: 'Modern Portfolio Website',
      status: 'live',
      description: 'A fully responsive portfolio website built with modern web technologies. Features glassmorphism design, smooth animations, and optimized performance. Hosted with GitHub Pages and configured with a CI/CD pipeline for automatic deployment.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'GitHub Pages'],
      features: [
        'Responsive design for all devices',
        'Glassmorphism UI effects',
        'Smooth scroll animations',
        'Dark/Light mode (planned)',
        'SEO optimized',
        'Fast loading times'
      ],
      timeline: 'Nov 2023 - Dec 2023',
      github: '#',
      liveDemo: 'index.html',
      challenges: [
        'Implementing complex CSS animations',
        'Ensuring cross-browser compatibility',
        'Optimizing for Core Web Vitals'
      ]
    },
    'netflix-clone': {
      title: 'Netflix Clone',
      status: 'in-progress',
      description: 'A full-featured streaming platform clone with user authentication, video streaming, personalized recommendations, and admin dashboard. Built with modern MERN stack and microservices architecture.',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Express', 'AWS', 'Redis'],
      features: [
        'User authentication & authorization',
        'Video streaming with multiple qualities',
        'Personalized recommendations',
        'Watchlist and history',
        'Admin content management',
        'Payment integration'
      ],
      timeline: 'Feb 2024 - Present',
      github: '#',
      liveDemo: null,
      challenges: [
        'Implementing secure video streaming',
        'Building recommendation algorithm',
        'Handling large media files'
      ]
    }
  };
  
  // Open modal on view details
  viewDetailsButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      const projectCard = this.closest('.project-card');
      const projectTitle = projectCard.querySelector('.project-title').textContent;
      let projectKey = '';
      
      if (projectTitle.toLowerCase().includes('smarttime')) {
        projectKey = 'smarttime-scheduler';
      } else if (projectTitle.toLowerCase().includes('portfolio')) {
        projectKey = 'portfolio-website';
      } else if (projectTitle.toLowerCase().includes('netflix')) {
        projectKey = 'netflix-clone';
      } else {
        // Default to portfolio website if no match
        projectKey = 'portfolio-website';
      }
      
      if (projectDetails[projectKey]) {
        showProjectModal(projectDetails[projectKey]);
      }
    });
  });
  
  // Close modal
  modalClose.addEventListener('click', function() {
    closeModal();
  });
  
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Escape key to close modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
  
  function showProjectModal(project) {
    const modalBody = document.querySelector('.modal-body');
    
    const techList = project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('');
    const featuresList = project.features.map(feature => `<li>${feature}</li>`).join('');
    const challengesList = project.challenges.map(challenge => `<li>${challenge}</li>`).join('');
    
    // Status icon
    let statusIcon = 'tools';
    if (project.status === 'live') statusIcon = 'rocket';
    if (project.status === 'completed') statusIcon = 'check-circle';
    
    modalBody.innerHTML = `
      <div class="modal-project">
        <div class="modal-header">
          <h2>${project.title}</h2>
          <span class="project-status ${project.status}">
            <i class="fas fa-${statusIcon}"></i>
            ${project.status === 'in-development' ? 'In Development' : 
              project.status === 'in-progress' ? 'In Progress' : 
              project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
        
        <div class="modal-description">
          <p>${project.description}</p>
        </div>
        
        <div class="modal-section">
          <h3><i class="fas fa-code"></i> Technologies Used</h3>
          <div class="modal-tags">
            ${techList}
          </div>
        </div>
        
        <div class="modal-section">
          <h3><i class="fas fa-star"></i> Key Features</h3>
          <ul class="modal-list">
            ${featuresList}
          </ul>
        </div>
        
        <div class="modal-section">
          <h3><i class="fas fa-bullseye"></i> Challenges & Solutions</h3>
          <ul class="modal-list">
            ${challengesList}
          </ul>
        </div>
        
        <div class="modal-section">
          <h3><i class="fas fa-calendar-alt"></i> Project Timeline</h3>
          <div class="modal-timeline">
            <div class="timeline-item">
              <i class="fas fa-calendar"></i>
              <span>${project.timeline}</span>
            </div>
          </div>
        </div>
        
        <div class="modal-actions">
          ${project.github ? `
            <a href="${project.github}" class="btn btn-primary" target="_blank">
              <i class="fab fa-github"></i> View Code
            </a>
          ` : ''}
          
          ${project.liveDemo ? `
            <a href="${project.liveDemo}" class="btn btn-secondary" target="_blank">
              <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
          ` : ''}
          
          <button class="btn btn-secondary modal-close-btn">
            <i class="fas fa-times"></i> Close
          </button>
        </div>
      </div>
    `;
    
    // Add event listener to close button inside modal
    modalBody.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});