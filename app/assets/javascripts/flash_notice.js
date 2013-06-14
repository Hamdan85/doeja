function flash_notice(message) {
    notice = $('<div></div>').attr('id', 'flash_notice').html(message);
    notice.css('position', 'absolute');
    notice.css('z-index', 1050);
    $('body').append(notice.hide());
    notice.css('left', ($('body').width() / 2) - (notice.width() / 2)) + 'px';
    notice.css('top', $(window).scrollTop() + 'px');
    notice.fadeIn();
    function remove_notice() { notice.fadeOut(function() { notice.remove() }); }
    setTimeout(remove_notice, 3000);
}