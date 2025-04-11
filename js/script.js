// script.js - Section reveal on scroll, typewriter effect, and bubble animation

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

  // Bubble Animation for the hero circles
  const circles = document.querySelectorAll('.hero-circles .circle');
  circles.forEach(circle => {
    // Get initial positions from inline CSS
    const computedStyle = window.getComputedStyle(circle);
    const left = parseFloat(computedStyle.left);
    const top = parseFloat(computedStyle.top);
    // Store initial positions in data attributes
    circle.dataset.left = left;
    circle.dataset.top = top;
    // Assign random velocities (in pixels per frame)
    circle.dataset.vx = (Math.random() * 2 - 1) * 2;
    circle.dataset.vy = (Math.random() * 2 - 1) * 2;
  });

  function animateCircles() {
    const hero = document.querySelector('.hero');
    const heroRect = hero.getBoundingClientRect();

    circles.forEach(circle => {
      let vx = parseFloat(circle.dataset.vx);
      let vy = parseFloat(circle.dataset.vy);
      let left = parseFloat(circle.dataset.left);
      let top = parseFloat(circle.dataset.top);

      left += vx;
      top += vy;

      const circleWidth = circle.offsetWidth;
      const circleHeight = circle.offsetHeight;

      if (left < 0) {
        left = 0;
        vx = -vx;
      }
      if (left > heroRect.width - circleWidth) {
        left = heroRect.width - circleWidth;
        vx = -vx;
      }
      if (top < 0) {
        top = 0;
        vy = -vy;
      }
      if (top > heroRect.height - circleHeight) {
        top = heroRect.height - circleHeight;
        vy = -vy;
      }

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
