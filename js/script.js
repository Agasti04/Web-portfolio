// script.js - Section reveal on scroll, typewriter effect, and particle animation for bubbles

console.log("Welcome to my portfolio website!");

document.addEventListener("DOMContentLoaded", function () {
  // Typewriter effect for the hero name
  const typedNameElement = document.getElementById("typed-name");
  const fullText = "SHARMAD KALPANDE";
  let currentText = "";
  let index = 0;
  const speed = 150; // milliseconds per character

  function typeWriter() {
    if (index < fullText.length) {
      currentText += fullText.charAt(index);
      typedNameElement.textContent = currentText;
      index++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter();

  // Section reveal on scroll
  const sections = document.querySelectorAll("section");
  const observerOptions = { threshold: 0.2 };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // Particle animation for bubbles in the hero section
  const circles = document.querySelectorAll('.hero-circles .circle');
  circles.forEach(circle => {
    let computedStyle = getComputedStyle(circle);
    let left = parseFloat(computedStyle.left);
    let top = parseFloat(computedStyle.top);
    // Store current positions in data attributes
    circle.dataset.left = left;
    circle.dataset.top = top;
    // Assign random velocities (in pixels per frame)
    circle.dataset.vx = (Math.random() * 2 - 1) * 2; // e.g., -2 to 2 px per frame
    circle.dataset.vy = (Math.random() * 2 - 1) * 2;
  });

  function animateCircles() {
    circles.forEach(circle => {
      let vx = parseFloat(circle.dataset.vx);
      let vy = parseFloat(circle.dataset.vy);
      let left = parseFloat(circle.dataset.left);
      let top = parseFloat(circle.dataset.top);

      // Update positions based on velocities
      left += vx;
      top += vy;

      // Get hero container dimensions
      const hero = document.querySelector('.hero');
      const heroRect = hero.getBoundingClientRect();
      const circleWidth = circle.offsetWidth;
      const circleHeight = circle.offsetHeight;

      // Bounce off left/right edges
      if (left < 0) { left = 0; vx = -vx; }
      if (left > heroRect.width - circleWidth) { left = heroRect.width - circleWidth; vx = -vx; }
      // Bounce off top/bottom edges
      if (top < 0) { top = 0; vy = -vy; }
      if (top > heroRect.height - circleHeight) { top = heroRect.height - circleHeight; vy = -vy; }

      // Update element styles and dataset
      circle.style.left = left + "px";
      circle.style.top = top + "px";
      circle.dataset.left = left;
      circle.dataset.top = top;
      circle.dataset.vx = vx;
      circle.dataset.vy = vy;
    });
    requestAnimationFrame(animateCircles);
  }
  animateCircles();
});
