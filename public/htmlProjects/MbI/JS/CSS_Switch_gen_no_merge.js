var navU = navigator.userAgent;
// Android Mobile
var isAndroidMobile = navU.indexOf('Android') > -1 && navU.indexOf('Mozilla/5.0') > -1 && navU.indexOf('AppleWebKit') > -1;
// Android Browser (not Chrome)
var regExAppleWebKit = new RegExp(/AppleWebKit\/([\d.]+)/);
var resultAppleWebKitRegEx = regExAppleWebKit.exec(navU);
var appleWebKitVersion = (resultAppleWebKitRegEx === null ? null : parseFloat(regExAppleWebKit.exec(navU)[1]));
var isAndroidBrowser = isAndroidMobile && appleWebKitVersion !== null && appleWebKitVersion < 537;

window.onload = function () {
    if (isAndroidBrowser) {
        // It's Android's native browser (and not Chrome), so do something
        //alert("Stock Android");
        changeCSS();
    }
}
function changeCSS() {
    var oldlink = document.getElementsByTagName("link").item(0);
    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", "../CSS/style-SAN.css");
    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}