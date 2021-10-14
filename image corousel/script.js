"use strict";
const leftbtn = document.querySelector("#left");
const rightbtn = document.querySelector("#right");
const imgs = document.getElementById("imgs");

const img = document.querySelectorAll("#imgs img");

let index = 0;

let interval = setInterval(run, 4000);

function run() {
  index++;
  changeimage();
}

function changeimage() {
  if (index > img.length - 1) {
    index = 0;
  } else if (index < 0) {
    index = img.length - 1;
  }

  imgs.style.transform = `translateX(${-index * 500}px)`;
}

function resetint() {
  clearInterval(interval);
  interval = setInterval(run, 4000);
}

leftbtn.addEventListener("click", () => {
  index--;
  changeimage();
  resizeint();
});

rightbtn.addEventListener("click", () => {
  index++;
  changeimage();
  resizeint();
});
