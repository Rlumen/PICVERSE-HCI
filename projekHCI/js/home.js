document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.hero-slide');
  const artistDisplay = document.querySelector('.hero-artist');
  const artists = ['@renjianshilian0', '@15907300wer'];
  let currentSlide = 0;
  
  function changeSlide() {
    // Hide current slide
    slides[currentSlide].classList.remove('active');
    
    // Update current slide index
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Show next slide
    slides[currentSlide].classList.add('active');
    
    // Update artist name
    if (artistDisplay) {
      artistDisplay.textContent = `Featured Artist: ${artists[currentSlide]}`;
    }
    
    // Set timeout for next transition
    setTimeout(changeSlide, 6000);
  }
  
  // Initialize first slide
  if (slides.length > 0) {
    slides[0].classList.add('active');
    if (artistDisplay) {
      artistDisplay.textContent = `Featured Artist: ${artists[0]}`;
    }
    // Start slideshow
    setTimeout(changeSlide, 6000);
  }
});