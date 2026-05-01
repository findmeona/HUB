// IMAGE POPUP
const images = document.querySelectorAll(".gallery-img");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const closeBtn = document.getElementById("close");

images.forEach(img => {
  img.addEventListener("click", () => {
    popup.style.display = "flex";
    popupImg.src = img.src;
  });
});

closeBtn.onclick = () => popup.style.display = "none";

popup.onclick = () => popup.style.display = "none";
