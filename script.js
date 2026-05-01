//// SCROLL ANIMATION
const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});

cards.forEach(card => observer.observe(card));

//// SLIDER
let index = 0;
const slides = document.querySelector(".slides");
const total = document.querySelectorAll(".slides img").length;

document.querySelector(".next").onclick = () => {
  index = (index + 1) % total;
  updateSlider();
};

document.querySelector(".prev").onclick = () => {
  index = (index - 1 + total) % total;
  updateSlider();
};

function updateSlider(){
  slides.style.transform = `translateX(-${index * 100}%)`;
}

// AUTO SLIDE
setInterval(() => {
  index = (index + 1) % total;
  updateSlider();
}, 4000);
document.querySelectorAll(".slides img").forEach(img => {
  img.onload = () => img.classList.add("loaded");
});
