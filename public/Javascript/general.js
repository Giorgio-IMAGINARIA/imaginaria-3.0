$(document).ready(function () {

    if( !window.location.hash && window.addEventListener ){
        window.addEventListener( "load",function() {
            window.scrollTo(0, 0);
        });
        window.addEventListener( "orientationchange",function() {
            location.reload();
        });
        window.addEventListener( "touchstart",function() {
            window.scrollTo(0, 0);
        });
    }



    var cont=0;
    var mov=false;
    var slideTwice=false;
    var trans=800;
    var eas="cubic-bezier(1,0,0,1)";
    var easmenu="ease-in";
    var wh;
    var blurred=false;

    $("#contentsReserve #section0").clone().appendTo("main");
    $( "#sideNavButton" + cont ).addClass( "sideNavButtonChecked" + cont );
    $( "#phoneText" ).addClass( "phoneTextCol" + cont );
    $( ".menuLine" ).addClass( "menuLineCol" + cont );
    $( "#contactText" ).addClass( "headerText" + cont);
    $( ".menuText" ).addClass( "headerText" + cont);



  

















    







    function slideUp(cs) {
        if (!slideTwice) mov=true;
        $( "main #section" + cs ).remove();
        delete $( "main #section" + cs );
        $("#contentsReserve #section" + cs).clone().appendTo("main");
        var ns = cs - 1;
        $( "#sideNav a Div" ).removeClass( "sideNavButtonChecked" + cs );
        $( "#phoneText" ).removeClass( "phoneTextCol" + cs );
        $( ".menuLine" ).removeClass( "menuLineCol" + cs );
        $( "#contactText" ).removeClass( "headerText" + cs );
        $( ".menuText" ).removeClass( "headerText" + cs );
        $("#logo" + cs).velocity("fadeOut", {duration: trans } );
        $("#logo" + ns).velocity("fadeIn", {duration: trans } );

        $("#contentsReserve #section" + ns).clone().prependTo("main");
        $( "#sideNav a Div" ).removeClass( "sideNavButtonChecked" + cs );

        wh=$(window).height();
        $("main #section" + ns).css('top', -wh);

        $("main #section" + cs).css("-webkit-transform","translateY(" + wh + "px)");
        $("main #section" + cs).css("-moz-transform","translateY(" + wh + "px)");
        $("main #section" + cs).css("-ms-transform","translateY(" + wh + "px)");
        $("main #section" + cs).css("-o-transform","translateY(" + wh + "px)");
        $("main #section" + cs).css("transform","translateY(" + wh + "px)");

        $("main #section" + cs).css("-webkit-transition-duration",trans/1000 + "s");
        $("main #section" + cs).css("-moz-transition-duration",trans/1000 + "s");
        $("main #section" + cs).css("-o-transition-duration",trans/1000 + "s");
        $("main #section" + cs).css("transition-duration",trans/1000 + "s");

        $("main #section" + cs).css("-webkit-transition-timing-function",eas);
        $("main #section" + cs).css("-moz-transition-timing-function",eas);
        $("main #section" + cs).css("-o-transition-timing-function",eas);
        $("main #section" + cs).css("transition-timing-function",eas);

        $( "#sideNavButton" + ns ).addClass("sideNavButtonChecked" + ns );
        $( "#logo" ).addClass( "logo" + ns );
        $( "#phoneText" ).addClass( "phoneTextCol" + ns );
        $( ".menuLine" ).addClass( "menuLineCol" + ns );
        $( "#contactText" ).addClass( "headerText" + ns );
        $( ".menuText" ).addClass( "headerText" + ns );

        $("main #section" + ns).css("-webkit-transform","translateY(" + wh + "px)");
        $("main #section" + ns).css("-moz-transform","translateY(" + wh + "px)");
        $("main #section" + ns).css("-ms-transform","translateY(" + wh + "px)");
        $("main #section" + ns).css("-o-transform","translateY(" + wh + "px)");
        $("main #section" + ns).css("transform","translateY(" + wh + "px)");

        $("main #section" + ns).css("-webkit-transition-duration",trans/1000 + "s");
        $("main #section" + ns).css("-moz-transition-duration",trans/1000 + "s");
        $("main #section" + ns).css("-o-transition-duration",trans/1000 + "s");
        $("main #section" + ns).css("transition-duration",trans/1000 + "s");

        $("main #section" + ns).css("-webkit-transition-timing-function",eas);
        $("main #section" + ns).css("-moz-transition-timing-function",eas);
        $("main #section" + ns).css("-o-transition-timing-function",eas);
        $("main #section" + ns).css("transition-timing-function",eas);

        setTimeout(function()
        {
            $( "main #section" + cs ).remove();
            delete $( "main #section" + cs );
            cont=ns;
            if (!slideTwice) mov=false;
        }, trans);

    }






    function slideDown(cs) {
        if (!slideTwice) mov=true;
        $( "main #section" + cs ).remove();
        delete $( "main #section" + cs );
        $("#contentsReserve #section" + cs).clone().appendTo("main");
        var ns = cs + 1;
        $("#contentsReserve #section" + ns).clone().appendTo("main");
        $( "#sideNav a Div" ).removeClass( "sideNavButtonChecked" + cs );
        $( "#phoneText" ).removeClass( "phoneTextCol" + cs );
        $( ".menuLine" ).removeClass( "menuLineCol" + cs );
        $( "#contactText" ).removeClass( "headerText" + cs );
        $( ".menuText" ).removeClass( "headerText" + cs );
        $("#logo" + cs).velocity("fadeOut", {duration: trans } );
        $("#logo" + ns).velocity("fadeIn", {duration: trans } );

        wh=$(window).height();
        $("main #section" + ns).css('top', wh);

        $("main #section" + cs).css("-webkit-transform","translateY(-" + wh + "px)");
        $("main #section" + cs).css("-moz-transform","translateY(-" + wh + "px)");
        $("main #section" + cs).css("-ms-transform","translateY(-" + wh + "px)");
        $("main #section" + cs).css("-o-transform","translateY(-" + wh + "px)");
        $("main #section" + cs).css("transform","translateY(-" + wh + "px)");

        $("main #section" + cs).css("-webkit-transition-duration",trans/1000 + "s");
        $("main #section" + cs).css("-moz-transition-duration",trans/1000 + "s");
        $("main #section" + cs).css("-o-transition-duration",trans/1000 + "s");
        $("main #section" + cs).css("transition-duration",trans/1000 + "s");

        $("main #section" + cs).css("-webkit-transition-timing-function",eas);
        $("main #section" + cs).css("-moz-transition-timing-function",eas);
        $("main #section" + cs).css("-o-transition-timing-function",eas);
        $("main #section" + cs).css("transition-timing-function",eas);

        $( "#sideNavButton" + ns ).addClass("sideNavButtonChecked" + ns );
        $( "#phoneText" ).addClass( "phoneTextCol" + ns );
        $( ".menuLine" ).addClass( "menuLineCol" + ns );
        $( "#contactText" ).addClass( "headerText" + ns );
        $( ".menuText" ).addClass( "headerText" + ns );

        $("main #section" + ns).css("-webkit-transform","translateY(-" + wh + "px)");
        $("main #section" + ns).css("-moz-transform","translateY(-" + wh + "px)");
        $("main #section" + ns).css("-ms-transform","translateY(-" + wh + "px)");
        $("main #section" + ns).css("-o-transform","translateY(-" + wh + "px)");
        $("main #section" + ns).css("transform","translateY(-" + wh + "px)");

        $("main #section" + ns).css("-webkit-transition-duration",trans/1000 + "s");
        $("main #section" + ns).css("-moz-transition-duration",trans/1000 + "s");
        $("main #section" + ns).css("-o-transition-duration",trans/1000 + "s");
        $("main #section" + ns).css("transition-duration",trans/1000 + "s");

        $("main #section" + ns).css("-webkit-transition-timing-function",eas);
        $("main #section" + ns).css("-moz-transition-timing-function",eas);
        $("main #section" + ns).css("-o-transition-timing-function",eas);
        $("main #section" + ns).css("transition-timing-function",eas);
        setTimeout(function()
        {
            $("main #section" + cs).remove();
            delete $( "main #section" + cs );
            cont=ns;
            $( "#sideNavButton" + cont ).addClass( "sideNavButtonChecked" );
            if (!slideTwice) mov=false;
        }, trans);
    }

    function slideUpTwice(){
        var chainDefSU = $.Deferred();
        chainDefSU.then(function () {
            slideTwice=true;
            mov=true;
            console.log(mov);
            var def1s = new $.Deferred();
            slideUp(cont);
            setTimeout(function () {def1s.resolve();},trans);
            return def1s.promise();
        })
            .then(function () {
                var def2s = new $.Deferred();
                slideUp(cont);
                setTimeout(function () {
                    def2s.resolve();
                    mov=false;
                    slideTwice=false;
                    console.log(mov);
                },trans);
                return def2s.promise();
            });
        chainDefSU.resolve();
    }

    function slideDownTwice(){
        var chainDefSD = $.Deferred();
        chainDefSD.then(function () {
            slideTwice=true;
            mov=true;
            console.log(mov);
            var def1s = new $.Deferred();
            slideDown(cont);
            setTimeout(function () {def1s.resolve();},trans);
            return def1s.promise();
        })
            .then(function () {
                var def2s = new $.Deferred();
                slideDown(cont);
                setTimeout(function () {
                    def2s.resolve();
                    mov=false;
                    slideTwice=false;
                    console.log(mov);
                },trans);
                return def2s.promise();
            });
        chainDefSD.resolve();
    }






    $(document).mousewheel(function(event) {
        console.log(event.deltaX, event.deltaY, event.deltaFactor);
        console.log("step");
        if((event.deltaY>1) && (cont!=0) && !mov && !blurred){
            slideUp(cont);
        }
        if((event.deltaY<-1) && (cont!=2) && !mov && !blurred){
            slideDown(cont);
        }
    });



    $("main").swipe( {
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {

            if ((direction=="down") && (cont!=0) && !mov && !blurred){
                slideUp(cont);
            }
            else if ((direction=="up") && (cont!=2) && !mov && !blurred){
                slideDown(cont);
            }
            else return;

        },
        threshold:0,
        fingers:"all"
    });




    $(document).keydown(function(e) {

        // up
        if((e.which==38) && (cont!=0) && !mov && !blurred){
            slideUp(cont);
        }
        // down
        else if((e.which==40) && (cont!=2) && !mov && !blurred){
            slideDown(cont);
        }
        // exit this handler for other keys
        else return;

        e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    $("#sideNavButton0").click(function (){
        if((cont==1)&& !mov && !blurred){
            slideUp(cont);
        }

        if((cont==2)&& !mov && !blurred){
            slideUpTwice(cont);
            //chain();
        }
    });

    $("#sideNavButton1").click(function (){
        if ((cont==0)&& !mov && !blurred){
            slideDown(cont);
        }
        if((cont==2)&& !mov && !blurred){
            slideUp(cont);
        }
    });

    $("#sideNavButton2").click(function (){
        if ((cont==0)&& !mov && !blurred){
            slideDownTwice()
        }
        if ((cont==1)&& !mov && !blurred){
            slideDown(cont);
        }
    });
});
