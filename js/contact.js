// Contact Page Functionality
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const roleCheckboxes = document.querySelectorAll('.role-tag input[type="checkbox"]');
  
  // Handle role tag selection
  roleCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const roleTag = this.closest('.role-tag');
      if (this.checked) {
        roleTag.style.background = 'rgba(124, 58, 237, 0.2)';
        roleTag.style.borderColor = 'var(--primary)';
      } else {
        roleTag.style.background = '';
        roleTag.style.borderColor = '';
      }
    });
  });
  
  // Form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      company: document.getElementById('company').value,
      purpose: document.getElementById('purpose').value,
      message: document.getElementById('message').value,
      roles: Array.from(roleCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value)
    };
    
    // Validate form
    if (!formData.name || !formData.email || !formData.purpose || !formData.message) {
      showMessage('Please fill in all required fields.', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showMessage('Please enter a valid email address.', 'error');
      return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (in production, connect to backend)
    setTimeout(() => {
      // In production, you would send this data to your backend
      // For now, we'll just show a success message
      
      // Create mailto link as fallback
      const subject = `Contact from ${formData.name} - ${formData.purpose}`;
      const body = `
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Purpose: ${formData.purpose}
Interested Roles: ${formData.roles.join(', ')}

Message:
${formData.message}
      `.trim();
      
      // Redirect to mailto (as fallback for static sites)
      window.location.href = `mailto:amittiwari5728@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Show success message
      showMessage('Thank you! Your message has been sent. Redirecting to email...', 'success');
      
      // Reset form after delay
      setTimeout(() => {
        contactForm.reset();
        
        // Reset role tags
        roleCheckboxes.forEach(checkbox => {
          checkbox.checked = false;
          const roleTag = checkbox.closest('.role-tag');
          roleTag.style.background = '';
          roleTag.style.borderColor = '';
        });
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 3000);
    }, 1500);
  });
  
  // Quick contact actions
  document.querySelectorAll('.quick-contact-actions .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (this.classList.contains('whatsapp-btn')) {
        // Track WhatsApp click
        console.log('WhatsApp contact initiated');
      }
    });
  });
  
  // Helper function to show messages
  function showMessage(message, type) {
    // Remove existing message
    const existingMsg = document.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${message}</span>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .form-message {
        position: fixed;
        top: 120px;
        right: 20px;
        padding: 15px 20px;
       