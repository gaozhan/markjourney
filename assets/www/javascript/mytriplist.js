function initMyTrip(){
    var myScroll;
    function loaded() {
        myScroll = new iScroll('wrapper');
    }
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    document.addEventListener('DOMContentLoaded', setTimeout(function () { loaded(); }, 200), false);
}
