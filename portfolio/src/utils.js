// Utility functions for scroll animations
export const initScrollAnimations = () => {
  // Simple function to add visible class to elements for animations
  const addVisibleClass = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card');
    
    elements.forEach(element => {
      // Always add visible class (no viewport check for simplicity)
      element.classList.add('visible');
    });
  };

  // Call the function on load
  window.addEventListener('load', addVisibleClass);
  
  // Call the function on scroll
  window.addEventListener('scroll', addVisibleClass);
};

// Function to scroll to section smoothly
export const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};