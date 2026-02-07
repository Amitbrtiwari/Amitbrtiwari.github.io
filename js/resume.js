// Update the downloadPdfButton event listener
const downloadPdfButton = document.getElementById('download-pdf');
downloadPdfButton.addEventListener('click', function() {
  // Show loading state
  const originalText = downloadPdfButton.innerHTML;
  downloadPdfButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
  downloadPdfButton.disabled = true;
  
  // Path to your PDF file (relative path from root)
  const pdfUrl = 'pdf/AMIT-TIWARI-ResumeSDE.pdf';
  
  // Create a temporary anchor element to trigger download
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'Amit-Tiwari-Resume-SDE.pdf'; // This will be the downloaded filename
  
  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Reset button after a short delay
  setTimeout(() => {
    downloadPdfButton.innerHTML = originalText;
    downloadPdfButton.disabled = false;
    
    // Show success message
    showMessage('Resume downloaded successfully!', 'success');
  }, 1500);
});

// Helper function to show messages
function showMessage(message, type) {
  // Remove existing message
  const existingMsg = document.querySelector('.download-message');
  if (existingMsg) existingMsg.remove();
  
  // Create message element
  const messageEl = document.createElement('div');
  messageEl.className = `download-message ${type}`;
  messageEl.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  
  // Add styles for message
  const style = document.createElement('style');
  style.textContent = `
    .download-message {
      position: fixed;
      top: 120px;
      right: 20px;
      padding: 15px 20px;
      background: ${type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
      color: white;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 10000;
      animation: slideIn 0.3s ease;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(10px);
      border: 1px solid ${type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
    }
    
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(messageEl);
  
  // Remove message after 3 seconds
  setTimeout(() => {
    messageEl.style.animation = 'slideOut 0.3s ease forwards';
    const slideOutStyle = document.createElement('style');
    slideOutStyle.textContent = `
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(slideOutStyle);
    
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.parentNode.removeChild(messageEl);
      }
    }, 300);
  }, 3000);
}