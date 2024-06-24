$(document).ready(function() {
	// slideshow
	$('.owl-carousel').owlCarousel({
        items:1,
        loop:true,
        autoplay:true,
        autoplayTimeout:4000,
        autoplayHoverPause:true,
        lazyLoad:true,
        lazyLoadTimeout: 0,
        slideBy: 1,
	});

    function init() {
    	// youtube action
    	$('#slider_video_home li:not(:first)').each(function(){
            var ifa = $(this).attr('data-iframe');
            var thum = getThumbYoutube(getUrlYoutube(ifa), 'small');
            $(this).append("<img loading='lazy' src='"+thum+"' data-original='"+thum+"' alt='Video MobileCity'>");
        });
        $('#slider_video_home li:first-child').each(function(){
            var ifa = $(this).attr('data-iframe');
            var videoid = getIdVideo(ifa);
            var title = $(this).attr('data-title');
            var replacement = '<iframe src="https://www.youtube.com/embed/'+videoid[1]+'" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen  loading="lazy" title="'+title+'"></iframe>';
            $(this).html(replacement);
        });
        $('#slider_video_home li').on('click', function () {
            var ifa = $(this).attr('data-iframe');
            var title = $(this).attr('data-title');
            var embed = getIdYoutube(ifa,title);
            $('#video').html(embed);
        });
    }
    setTimeout(function() {
        init();
    },5000);
    // select chuyển link
    go_link_on_select("#order_phone");
    go_link_on_select("#go_phone_made");
    $(window).resize(checkWidth);
    var $window = $(window);
    function checkWidth() {
        var windowsize = $window.width();
        if (windowsize < 768) {
            $('.slideshow .banner-owl').attr('width', 400);
            $('.slideshow .banner-owl').attr('height', 150);
        }
    }
    checkWidth();
});