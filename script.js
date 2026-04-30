gsap.registerPlugin(ScrollTrigger);

// Loader FIX (force hide even if animation fails)
window.addEventListener("load", () => {
  gsap.to("#loader", {
    y: "-100%",
    duration: 1,
  });
});
