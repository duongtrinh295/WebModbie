$(document).ready(function() {
	$('.parent').hover( function(e) {
        e.preventDefault();
        $(this).find('.dropdown').addClass('v2-menu-show');
    }, function(){
        $(this).find('.dropdown').removeClass('v2-menu-show');
    });
    // $('.slide_video').owlCarousel({
    //     loop: false,
    //     margin: 10,
    //     autoplay: false,
    //     nav: true,
    //     dots: false,
    //     smartSpeed: 500,
    //     mouseDrag: true,
    //     pullDrag: true,
    //     touchDrag: true,
    //     responsive:{
    //         0:{items:3},
    //         600:{items:3},
    //         1000:{items:3}
    //     },
    //     // onInitialized: responsiveVideoReview
    // });
    $(".owl-prev").html('<i class="fa fa-chevron-left" aria-hidden="true"></i>');
    $(".owl-next").html('<i class="fa fa-chevron-right" aria-hidden="true"></i>');

    function init() {
       $('#slider_video_home .iframe').each(function() {
           var ifa = $(this).attr('data-iframe');
           var title = $(this).attr('data-title');
           var videoid = getIdVideo(ifa);
           var replacement = '<iframe src="https://www.youtube.com/embed/' + videoid[1] + '" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen width="650" height="350" loading="lazy" title="'+title+'"></iframe>';
           $(this).html(replacement);
       });
       $('#slide_video .item').each(function() {
           var ifa = $(this).attr('data-iframe');
           var thum = getThumbYoutube(getUrlYoutube(ifa), 'big');
           $(this).append("<img loading='lazy' src='"+thum+"' alt='' width='150' height='150'>");
       });
       // responsiveVideoReview();
       $('#slide_video .item').on('click', function() {
           var ifa = $(this).attr('data-iframe');
           var embed = getIdYoutube(ifa);
           $('#slider_video_home .iframe').html(embed);
       });
    }
    setTimeout(function() {
        init();
    },5000);
    // responsiveVideoReview();
    $('.news-content-list .see-more').on('click', function() {
        var page = parseInt($(this).attr('data-page'));
        var category_id = $(this).attr('data-id');
        $(this).attr('data-page', page + 1);

        $.ajax({
            url: '/ajax/news_seemore',
            type:"POST",
            data:{
                page:page,
                category_id:category_id,
            },
            success:function(result){
                $(".category--list").append(result['html']);
            },
        });
    });
    // scroll menu mobile
    $('.categories .next-nav').on('click', function() {
        $('html, .categories-list').animate({
            scrollLeft: document.getElementById('categories-list').scrollLeft + 100
        }, "fast");
    });
    var page = 1;
    var load_image = $('#load_image').val();

    $('.btn_viewmore .viewmore').on('click', function(e) {
        page++;
        e.preventDefault();
        url = window.location.href;
        if (window.location.search) {
            url = url+'&page='+page;
        } else {
            url = url+'?page='+page;
        }
        $.ajax({
            type:'GET',
            url: url,
            dataType: "JSON",
            success:function(result){
                $('.content').append(result.html);
                $('.content').find("img.lazy").lazyload({
                    effect : "fadeIn",
                    failure_limit: 10,
                });
                if (result.status != 1) {
                    $('.alert_message').empty().append("Bài viết trên website đã hết! Không thể tải thêm").css('display', 'block');
                    setInterval(function() {
                        $('.alert_message').fadeOut(1000);
                    }, 5000);
                    $('.viewmore').hide();
                } 
            }
        });
    });
});