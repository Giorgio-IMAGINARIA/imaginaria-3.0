var position = 0;
var playlist;
var video;

function getFormatExtension() {
    if (video.canPlayType("video/mp4") != "") {
        return "mp4";
    } else if (video.canPlayType("video/webm") != "") {
        return "webm";
    }    
}
function chooseResolution() {
    if ((window.orientation == 0) && (screen.width <= 640)) // Portrait mobile
    {
        position = 0;
    }
    else if ((window.orientation == 0) && (screen.width >= 641) && (screen.width <= 1079)) // Portrait tablet
    {
        position = 1;
    }
    else if ((window.orientation == 0) && (screen.width >= 1080)) // Portrait desktop
    {
        position = 2;
    }
    else if (!(window.orientation == 0) && (screen.width <= 960)) // Landscape mobile
    {
        position = 0;
    }
    else if (!(window.orientation == 0) && (screen.width >= 961) && (screen.width <= 1334)) // Landscape tablet
    {
        position = 1;
    }
    else if (!(window.orientation == 0) && (screen.width >= 1335)) // Landscape desktop
    {
        position = 2;
    }
    else if (screen.width <= 960) // General mobile
    {
        position = 0;
    }
    else if ((screen.width >= 961) && (screen.width <= 1334)) // General tablet
    {
        position = 1;
    }
    else if (screen.width >= 1335) // General desktop
    {
        position = 2;
    }
    else // Any other modes
    {
        position = 0;
    }
}