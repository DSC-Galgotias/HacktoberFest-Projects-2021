"use strict";
const insert = document.querySelector("#insert");
window.addEventListener("keydown", (e) => {
  insert.innerHTML = ` <div class="apeearlater">
  <div class="big">${e.key === " " ? "Space" : e.key}</div>

  <div class="key">
  ${e.key === " " ? "Space" : e.key}
    <small>event.key</small>
  </div>
  <div class="key">
  ${e.keyCode}
    <small>event.keyCode</small>
  </div>
  <div class="key">
  ${e.code}
    <small>event.Code</small>
  </div>
</div>`;
});
