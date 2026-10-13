console.log("Welcome to my portfolio website!");

document.addEventListener("DOMContentLoaded", function () {
  
  // --- Section Reveal on Scroll ---
  const sections = document.querySelectorAll("section.reveal");
  const observerOptions = { threshold: 0.15 };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // --- Hero Section Circle Animation ---
  const heroSection = document.getElementById("hero");
  const circles = document.querySelectorAll('.hero-circles .circle');
  if (circles.length > 0 && heroSection) {
    circles.forEach(circle => {
      const computedStyle = window.getComputedStyle(circle);
      const left = parseFloat(computedStyle.left);
      const top = parseFloat(computedStyle.top);

      circle.dataset.left = left;
      circle.dataset.top = top;
      
      circle.dataset.vx = (Math.random() * 2 - 1) * 0.8;
      circle.dataset.vy = (Math.random() * 2 - 1) * 0.8;
    });

    function animateCircles() {
      const heroRect = heroSection.getBoundingClientRect();

      circles.forEach(circle => {
        let vx = parseFloat(circle.dataset.vx);
        let vy = parseFloat(circle.dataset.vy);
        let left = parseFloat(circle.dataset.left);
        let top = parseFloat(circle.dataset.top);

        left += vx;
        top += vy;

        const circleWidth = circle.offsetWidth;
        const circleHeight = circle.offsetHeight;

        if (left <= 0 || left >= heroRect.width - circleWidth) {
          vx = -vx;
        }
        if (top <= 0 || top >= heroRect.height - circleHeight) {
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
  }

  // --- Back to Top Button ---
  const backToTopButton = document.getElementById("back-to-top");
  if(backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    });
  }

  // --- Accordion Logic for Internships Page ---
  const accordionBtns = document.querySelectorAll(".accordion-btn");
  if (accordionBtns.length > 0) {
    accordionBtns.forEach(btn => {
      btn.addEventListener("click", function() {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
          panel.style.padding = "0 1.5rem";
        } else {
          panel.style.padding = "1.5rem";
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      });
    });
  }
});