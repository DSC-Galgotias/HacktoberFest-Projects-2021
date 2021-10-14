"use strict";
const button = document.querySelector(".ripple");
const toasts = document.querySelector("#toasts");

button.addEventListener("click", function (e) {
  const x = e.clientX;
  const y = e.clientY;

  const btntop = e.target.offsetTop;

  const btnleft = e.target.offsetLeft;

  const xins = x - btnleft;
  const yins = y - btntop;

  const circle = document.createElement("span");
  circle.classList.add("circle");
  circle.style.top = yins + "px";
  circle.style.left = xins + "px";

  this.appendChild(circle);

  setTimeout(() => circle.remove(), 500);
});

const messages = [
  `Hello World!👋`,
  `Error !`,
  `404 Not Found!`,
  `2b || !2b`,
  `Message`,
];

button.addEventListener("click", createnotification);

function createnotification() {
  const notif = document.createElement("div");
  notif.classList.add("toast");

  toasts.appendChild(notif);
  notif.innerText = getrandommsg();
  if (notif.innerText === "Error !") {
    notif.style.backgroundColor = "Red";
  }
  if (notif.innerText === "404 Not Found!") {
    notif.style.backgroundColor = "Red";
  }
  if (notif.innerText === "Hello World!👋") {
    notif.style.backgroundColor = "Purple";
  }

  setTimeout(() => {
    notif.remove();
  }, 4000);
}

function getrandommsg() {
  return messages[Math.floor(Math.random() * messages.length)];
}
