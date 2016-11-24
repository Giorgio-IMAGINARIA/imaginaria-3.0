/**
 * Created by giorgiomazzei on 06/02/15.
 */
$(document).ready(function () {
    $( ".featureLink" ).hover(
        function() {
            $(this).find('.featuredLetter').css ( 'color', '#CC0000');
            $(this).find('.boxes' ).css( 'background-color', 'rgba(0, 0, 0, 0.6)');
            $(this).css('color', '#fafafa');
            $(this).find('.fetPicture').css( 'filter', 'grayscale(100%)');
            $(this).find('.fetPicture').css( '-webkit-filter', 'grayscale(100%)');
        },
        function() {
            $(this).find('.featuredLetter').css ('color', '#990000');
            $(this).find('.boxes' ).css( 'background-color', 'rgba(255, 255, 255, 0.6)');
            $(this).css('color', '#333333');
            $(this).find('.fetPicture').css( 'filter', 'grayscale(0%)');
            $(this).find('.fetPicture').css( '-webkit-filter', 'grayscale(0%)');
        }
    );
});