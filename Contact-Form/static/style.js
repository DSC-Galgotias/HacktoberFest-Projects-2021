let f= document.getElementById('form');
let head= document.getElementById('heading');
let names = document.getElementById('name');
let age = document.getElementById('age');
let gender = document.getElementById('gender');
let address = document.getElementById('address');
let more = document.getElementById('more');
let image = document.getElementById('cupcake');
let submit = document.getElementById('submit');
let same = document.getElementsByClassName('same');

f.addEventListener('mouseenter',()=>{
    head.style.color= 'black';
    image.classList.toggle('active');
    f.style.borderColor = "aqua";
})
// same.classList.add('same');
f.addEventListener('mouseleave',()=>{
    head.style.color= 'rgb(252, 77, 106)';
    image.classList.toggle('active');
    f.style.borderColor = 'transparent';
})
function validation(){
    if(names.value==""){
        alert("Enter full name")
        names.focus();
        return false;
    }
    else if(age.value==""){
        alert("Enter your age")
        age.focus();
        return false;
    }
    else if(gender.value=="Enter your gender"){
        alert("Enter your gender")
        gender.focus();
        return false;
    }
    else if(more.value==""){
        alert("Enter some more about you")
        more.focus();
        return false;
    }
    else if(address.value==""){
        alert("Enter your address")
        address.focus();
        return false;
    }
    else if(isNaN(age.value)){
        alert("Enter proper age ")
        age.focus()
        return false;
    }
    else if(age.value<18){
        alert("Enter details if you are an adult. You must be 18+")
    }
    else{
        alert("Your form has been submitted successfully ! :)")
        return true;
    }
}
if(names.value!=""){
    names.style.backgroundColor="white";
}

submit.addEventListener('mouseenter',()=>{
    f.style.borderColor = "yellow";
})
submit.addEventListener('mouseleave',()=>{
    f.style.borderColor = "aqua";
})