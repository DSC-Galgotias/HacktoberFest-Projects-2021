var random1=Math.random();
random1=random1*6;
random1=Math.floor(random1);
var images=["dice1.png","dice2.png","dice3.png","dice4.png","dice5.png","dice6.png"]

document.querySelector(".dice1").setAttribute("src",images[random1])


var random2=Math.random();
random2=random2*6;
random2=Math.floor(random2);
var images1=["dice1.png","dice2.png","dice3.png","dice4.png","dice5.png","dice6.png"]

document.querySelector(".dice2").setAttribute("src",images1[random2])

if(random1>random2){
    document.querySelector(".refresh-me").innerHTML="Player1 Wins🎉";
}
else if(random1===random2){
    document.querySelector(".refresh-me").innerHTML="Draw!";
}
else{
    document.querySelector(".refresh-me").innerHTML="Player2 Wins🎉";
}