$(document).ready(function () {
    console.log('SideBar.js loaded');
    $('#sidebar').css('transition', 'all 250ms');

    $('#sidebar-toggle').click(function (event) {
        toggleSideBar()

        $("#sidebar").swipe({
            swipeStatus:function(event, phase, direction, distance, duration, fingers)
            {
      /*           if (phase=="move" && direction =="right") {
                    toggleSideBar()
                return false;
                } */
                if (phase=="move" && direction =="left") {
                    toggleSideBar()
                return false;
                }
            }
        });
    });
});

$(document).mouseup(function (e) {
    if ($(e.target).closest("#sidebar").length === 0 && $(e.target).closest("#sidebar-toggle").length === 0 && $('#sidebar').hasClass('translate-x-0')) {
        toggleSideBar()
    }
})



function toggleSideBar() {
    $('#sidebar').toggleClass('translate-x-0');
    $('#sidebar').toggleClass('-translate-x-full');
}