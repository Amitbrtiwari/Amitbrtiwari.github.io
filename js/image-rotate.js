// 360° Image Rotation Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const imageContainer = document.getElementById('imageRotateContainer');
  const rotatableImage = document.getElementById('rotatableImage');
  const rotateLeftBtn = document.getElementById('rotateLeft');
  const rotateRightBtn = document.getElementById('rotateRight');
  const resetBtn = document.getElementById('resetRotation');
  
  // Rotation variables
  let rotation = 0;
  let isDragging = false;
  let previousX = 0;
  let autoRotateInterval = null;
  let isAutoRotating = false;
  
  // Mouse drag rotation
  imageContainer.addEventListener('mousedown', startDrag);
  imageContainer.addEventListener('touchstart', startDragTouch);
  
  // Prevent image selection during drag
  imageContainer.addEventListener('selectstart', function(e) {
    e.preventDefault();
  });
  
  // Rotation buttons
  rotateLeftBtn.addEventListener('click', () => rotateImage(-30));
  rotateRightBtn.addEventListener('click', () => rotateImage(30));
  resetBtn.addEventListener('click', resetRotation);
  
  // Double click for auto-rotate
  imageContainer.addEventListener('dblclick', toggleAutoRotate);
  
  // Mouse drag functions
  function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    previousX = e.clientX;
    imageContainer.classList.add('active');
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  }
  
  function startDragTouch(e) {
    if (e.touches.length === 1) {
      e.preventDefault();
      isDragging = true;
      previousX = e.touches[0].clientX;
      imageContainer.classList.add('active');
      
      document.addEventListener('touchmove', dragTouch);
      document.addEventListener('touchend', stopDrag);
    }
  }
  
  function drag(e) {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const deltaX = currentX - previousX;
    previousX = currentX;
    
    // Calculate rotation based on mouse movement
    rotation += deltaX * 0.5;
    applyRotation();
  }
  
  function dragTouch(e) {
    if (!isDragging || e.touches.length !== 1) return;
    
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - previousX;
    previousX = currentX;
    
    // Calculate rotation based on touch movement
    rotation += deltaX * 0.8;
    applyRotation();
  }
  
  function stopDrag() {
    isDragging = false;
    imageContainer.classList.remove('active');
    
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('touchmove', dragTouch);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchend', stopDrag);
    
    // Smooth stop with slight bounce back
    setTimeout(() => {
      rotation = Math.round(rotation / 15) * 15;
      applyRotation();
    }, 100);
  }
  
  // Apply rotation to image
  function applyRotation() {
    // Normalize rotation to 0-360 degrees
    rotation = rotation % 360;
    
    // Apply 3D rotation
    rotatableImage.style.transform = `
      rotateY(${rotation}deg)
      scale(1.02)
    `;
    
    // Add depth effect
    rotatableImage.style.boxShadow = `
      0 20px 40px rgba(0, 0, 0, 0.3),
      ${Math.sin(rotation * Math.PI / 180) * 20}px 0 30px rgba(124, 58, 237, 0.2)
    `;
  }
  
  // Button rotation functions
  function rotateImage(degrees) {
    rotation += degrees;
    applyRotation();
    
    // Add click feedback
    const button = degrees > 0 ? rotateRightBtn : rotateLeftBtn;
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
      button.style.transform = '';
    }, 200);
  }
  
  function resetRotation() {
    // Smooth reset animation
    const startRotation = rotation;
    const duration = 500; // ms
    const startTime = Date.now();
    
    function animateReset() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      rotation = startRotation * (1 - easeOutCubic);
      
      applyRotation();
      
      if (progress < 1) {
        requestAnimationFrame(animateReset);
      } else {
        rotation = 0;
        applyRotation();
      }
    }
    
    animateReset();
    
    // Stop auto-rotation if active
    if (isAutoRotating) {
      toggleAutoRotate();
    }
    
    // Button feedback
    resetBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
      resetBtn.style.transform = '';
    }, 200);
  }
  
  // Auto-rotate function
  function toggleAutoRotate() {
    if (isAutoRotating) {
      // Stop auto-rotation
      clearInterval(autoRotateInterval);
      isAutoRotating = false;
      imageContainer.classList.remove('rotating');
      rotatableImage.style.animation = 'none';
    } else {
      // Start auto-rotation
      isAutoRotating = true;
      imageContainer.classList.add('rotating');
      rotatableImage.style.animation = 'rotate360 8s linear infinite';
      
      autoRotateInterval = setInterval(() => {
        rotation += 2;
        applyRotation();
      }, 30);
    }
    
    // Visual feedback
    imageContainer.style.animation = isAutoRotating ? 
      'containerGlow 1s ease-in-out infinite alternate' : 'none';
  }
  
  // Keyboard controls
  document.addEventListener('keydown', function(e) {
    if (document.activeElement.tagName === 'INPUT') return;
    
    switch(e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        rotateImage(-15);
        break;
      case 'ArrowRight':
        e.preventDefault();
        rotateImage(15);
        break;
      case 'r':
      case 'R':
        if (e.ctrlKey) {
          e.preventDefault();
          resetRotation();
        }
        break;
      case ' ':
        e.preventDefault();
        toggleAutoRotate();
        break;
    }
  });
  
  // Add instructions tooltip
  const instructions = document.createElement('div');
  instructions.className = 'rotation-help';
  instructions.innerHTML = `
    <p><strong>Controls:</strong></p>
    <p>• Click & drag to rotate</p>
    <p>• Double click for auto-rotate</p>
    <p>• Use arrow keys for precision</p>
    <p>• Press R to reset</p>
  `;
  instructions.style.cssText = `
    position: absolute;
    bottom: -120px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    padding: 15px;
    border-radius: 10px;
    font-size: 12px;
    color: var(--gray-text);
    max-width: 200px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 100;
    pointer-events: none;
  `;
  
  imageContainer.parentElement.appendChild(instructions);
  
  // Show instructions on hover
  imageContainer.addEventListener('mouseenter', () => {
    instructions.style.opacity = '1';
  });
  
  imageContainer.addEventListener('mouseleave', () => {
    instructions.style.opacity = '0';
  });
  
  // Initialize
  applyRotation();
  
  // Add to window for debugging
  window.imageRotator = {
    rotate: rotateImage,
    reset: resetRotation,
    toggleAuto: toggleAutoRotate,
    getRotation: () => rotation
  };
});