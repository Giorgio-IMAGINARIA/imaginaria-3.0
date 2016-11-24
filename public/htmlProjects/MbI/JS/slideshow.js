var positionBefore;
var position = 0;
var sentences = ["Because Heaven is where the cooks are Italian", "Because life is too short to not eat well", "Eat better live better"];
var circles = ["C0","C1","C2"];
var slogan;
var button;

function changePeriodically() {
    positionBefore = position;
    position++;
    if (position == 3)
        position = 0;
    slogan.innerHTML = sentences[position];
    changeButton();//changebutton from position-before to position
}

function changeButton() {
    button = document.getElementById(circles[positionBefore]);
    button.style.backgroundColor = "#ffffff";
    button = document.getElementById(circles[position]);
    button.style.backgroundColor = "#999999";
}