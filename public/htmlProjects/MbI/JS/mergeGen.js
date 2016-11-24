window.onload = function () {
    slogan = document.getElementById("slogan");
    slogan.innerHTML = sentences[position];
    button = document.getElementById("C0");
    button.style.backgroundColor = "#999999";

    setInterval(function () { changePeriodically() }, 5000);

    var buttons = document.querySelectorAll("div.circle");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = handleControl;
    }

    function handleControl(e) {
        var id = e.target.getAttribute("id");
        if (id == "C0") {
            positionBefore = position;
            position = 0;
            slogan.innerHTML = sentences[position];
            changeButton();//changebutton from positionBefore to position
        } else if (id == "C1") {
            positionBefore = position;
            position = 1;
            slogan.innerHTML = sentences[position];
            changeButton();//changebutton from position-before to position
        } else if (id == "C2") {
            positionBefore = position;
            position = 2;
            slogan.innerHTML = sentences[position];
            changeButton();//changebutton from position-before to position
        }
    }





    if (isAndroidBrowser) {
        // It's Android's native browser (and not Chrome), so do something
        //alert("Stock Android");
        changeCSS();
    }




}