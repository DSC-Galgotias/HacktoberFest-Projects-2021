// JavaScript source code
//alert("hello Ji kaiso ho sare");
window.onload = function () {
    var sec = 00;
    var ten = 00;
    var append_sec = document.getElementById("first");
    var append_tens = document.getElementById("second");
    var button_start = document.getElementById("stbutton");
    var button_stop = document.getElementById("spbutton");
    var button_restart = document.getElementById("rbutton");
    var interval;
    function startTimer() {
        ten++;
        if (ten < 10) {
            append_tens.innerHTML='0' + ten;
        }
        if (ten > 9) {
            append_tens.innerHTML = ten;
        }
        if (ten > 99) {
            sec++;
            append_sec.innerHTML = '0' + sec;
            ten = 0;
            append_tens.innerHTML = '0' + ten;
        }
        if (sec > 9) {
            append_sec.innerHTML = sec;
        }
    }
    button_start.onclick = function () {
        clearInterval(interval);
        interval = setInterval(startTimer, 10);
    }
    button_stop.onclick = function () {
        clearInterval(interval);
    }
    button_restart.onclick = function () {
        clearInterval(interval);
        ten = "00";
        sec = "00";
        append_tens.innerHTML = ten;
        append_sec.innerHTML = sec;
    }
}