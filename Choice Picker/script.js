"use strict";

const tags = document.querySelector("#tags");
const textarea = document.querySelector("#textarea");

textarea.focus();

textarea.addEventListener("keyup", (e) => {
  createtag(e.target.value);

  if (e.key === "Enter") {
    randomSelect();
  }
});

function createtag(input) {
  const tagarray = input
    .split(";")
    .filter((tag) => tag.trim() !== "")
    .map((tag) => tag.trim());
  console.log(tagarray);

  tags.innerHTML = "";
  tagarray.forEach((tag) => {
    const tagel = document.createElement("span");
    tagel.classList.add("tag");
    tagel.innerText = tag;
    tags.appendChild(tagel);
  });
}

function randomSelect() {
  const times = 40; //number of times highlight

  const interval = setInterval(() => {
    const randomtag = pickrandomtag();
    highlight(randomtag);

    setTimeout(() => {
      unhighlight(randomtag);
    }, 100);
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    setTimeout(() => {
      const random = pickrandomtag();
      highlight(random);
    }, 100);
  }, times * 100);
}

function pickrandomtag() {
  const alltags = document.querySelectorAll(".tag");
  return alltags[Math.floor(Math.random() * alltags.length)];
}

function highlight(para) {
  para.classList.add("highlight");
}

function unhighlight(para) {
  para.classList.remove("highlight");
}
