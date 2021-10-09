const container = document.querySelector('.container');
const input = document.querySelector('.input-txt');
const btn = document.querySelector('.btn');
const box = document.querySelector('.box')
btn.addEventListener('click', function(){
   let color = input.value;
   if(color == '#000' || color == 'black' || color == 'Black' || color == '#000000' ){
      box.style.border = "2px solid white";
      box.style.borderRadius = "5px";
   }
   else{
      box.style.border = "none"
      box.style.borderRadius = "0"
   }
   container.style.backgroundColor = color;
});

