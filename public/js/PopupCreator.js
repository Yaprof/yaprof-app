$(document).ready(function () {
    $('#popup_creator').css('transition', 'all 250ms');

    $('#popup_creator_toggler').click(function (event) {
        togglePopupCreator()

        $("#popup_creator").swipe({
            swipeStatus:function(event, phase, direction, distance, duration, fingers)
            {
                if (phase=="move" && direction == "down") {
                    togglePopupCreator()
                return false;
                }
            }
        });
    });
});

function togglePopupCreator() {
    $('#popup_creator_parent').toggleClass('z-[-1]');

    $('#popup_creator').toggleClass('!translate-y-0');
    $('#popup_creator').toggleClass('z-50');
}

