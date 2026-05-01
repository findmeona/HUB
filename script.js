gsap.registerPlugin(ScrollTrigger);

/* HERO */
gsap.to(".hero .anim", {
  opacity: 1,
  y: 0,
  duration: 1,
  stagger: 0.2
});

/* STORY SECTIONS */
gsap.utils.toArray(".panel").forEach(panel => {

  gsap.to(panel.querySelectorAll(".anim"), {
    scrollTrigger: {
      trigger: panel,
      start: "top 80%"
    },
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2
  });

});

/* SMOOTH PARALLAX FEEL */
gsap.to(".box", {
  scrollTrigger: {
    trigger: ".box",
    scrub: true
  },
  scale: 1.1,
  rotate: 5
});