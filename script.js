// Register plugin
gsap.registerPlugin(ScrollTrigger);

// Loader animation
gsap.to("#loader", {
  y: "-100%",
  duration: 1.5,
  delay: 1
});

// Text reveal animation
gsap.from(".reveal", {
  y: 100,
  opacity: 0,
  duration: 1,
  stagger: 0.3
});

// Parallax effect
gsap.to(".parallax", {
  backgroundPosition: "50% 100%",
  ease: "none",
  scrollTrigger: {
    trigger: ".parallax",
    scrub: true
  }
});

// Cards animation
gsap.from(".card", {
  scrollTrigger: {
    trigger: ".cards",
    start: "top 80%"
  },
  y: 100,
  opacity: 0,
  stagger: 0.2
});

// Mouse movement effect
document.addEventListener("mousemove", (e) => {
  gsap.to(".hero", {
    x: (e.clientX - window.innerWidth / 2) * 0.02,
    y: (e.clientY - window.innerHeight / 2) * 0.02
  });
});