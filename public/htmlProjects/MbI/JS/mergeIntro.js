window.onload = function () {


    playlist = ["./videos/StampingLogo-mobile", "./videos/StampingLogo-tablet", "./videos/StampingLogo-HD"];
    video = document.getElementById("video");
    chooseResolution()
    video.src = playlist[position] + "." + getFormatExtension();
    video.type = "video/" + getFormatExtension();
    video.load();
    video.play();





    if (isAndroidBrowser) {
        // It's Android's native browser (and not Chrome), so do something
        //alert("Stock Android");
        changeCSS();
    }
}