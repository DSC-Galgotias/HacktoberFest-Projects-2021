var p1 = 0;
var comp = 0;
var loop = 5;


function play1() {
  if (loop>0)
  {
  document.querySelector(".result1").setAttribute("src", "1.png");
  var randomNumber = Math.floor(Math.random() * 3 + 1);
  document.querySelector(".result2").setAttribute("src", randomNumber + ".png");
  points();
  loop--;
 }
 else {
   win();
 }
}

function play2() {
  if(loop>0)
  {
  document.querySelector(".result1").setAttribute("src", "2.png");
  var randomNumber = Math.floor(Math.random() * 3 + 1);
  document.querySelector(".result2").setAttribute("src", randomNumber + ".png");
  points();
  loop--;
  }
  else {
    win();
  }
}

function play3() {
  if(loop>0)
  {
  document.querySelector(".result1").setAttribute("src", "3.png");
  var randomNumber = Math.floor(Math.random() * 3 + 1);
  document.querySelector(".result2").setAttribute("src", randomNumber + ".png");
  points();
  loop--;
  }
  else {
    win();
  }
}

function points() {
  var image1 = document.querySelector(".result1").getAttribute("src");
  var imgsplit1 = image1.slice(0, 1);
  var image2 = document.querySelector(".result2").getAttribute("src");
  var imgsplit2 = image2.slice(0, 1);


  if (imgsplit1 === imgsplit2) {

  } else if (imgsplit1 === '1' && imgsplit2 === '2') {
    document.querySelector(".comp").innerHTML = ++comp;
  } else if (imgsplit1 === '1' && imgsplit2 === '3') {
    document.querySelector(".p1").innerHTML = ++p1;
  } else if (imgsplit1 === '2' && imgsplit2 === '1') {
    document.querySelector(".p1").innerHTML = ++p1;
  } else if (imgsplit1 === '2' && imgsplit2 === '3') {
    document.querySelector(".comp").innerHTML = ++comp;
  } else if (imgsplit1 === '3' && imgsplit2 === '1') {
    document.querySelector(".comp").innerHTML = ++comp;
  } else if (imgsplit1 === '3' && imgsplit2 === '2') {
    document.querySelector(".p1").innerHTML = ++p1;
  }
}

function win(){
  var p1 = document.querySelector(".p1").innerHTML;
  var comp = document.querySelector(".comp").innerHTML;
  if (parseInt(p1)>parseInt(comp))
  {
    document.querySelector(".win").innerHTML="PLAYER 1 Wins !";
  }
  else if(parseInt(p1)<parseInt(comp)) {
    document.querySelector(".win").innerHTML="COMPUTER Wins !";
  }
  else{
      document.querySelector(".win").innerHTML="It's a DRAW !";
  }
}
function refresh(){
  location.reload();
}
