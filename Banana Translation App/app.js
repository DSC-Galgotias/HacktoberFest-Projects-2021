var inputBox = document.querySelector("#txt-input");
var btnTranslate = document.querySelector("#btn-translate");
var outputBox = document.querySelector("#txt-output");

var url = "https://api.funtranslations.com/translate/minion.json";

function addText(text) {

    return url + '?' + 'text=' + text;
}

function clickHandler() {

    var inputText = inputBox.value;
    var urlTxt = addText(inputText);
  
    fetch(urlTxt)
        .then(response => response.json())
        .then(json => outputBox.innerHTML = json.contents.translated);
}

btnTranslate.addEventListener('click', clickHandler);