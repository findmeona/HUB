// SCROLL ANIMATION
const boxes = document.querySelectorAll(".img-box");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});

boxes.forEach(box => observer.observe(box));
