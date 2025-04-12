$(document).ready(function() {
	$("#btn_share").jsSocials({
	  // An array of share networking services
	  shares: ["twitter", "facebook", "linkedin", "pinterest"],
	  // URL to share
	  url: window.location.href,
	  // text to share
	  text: "text to share",
	  // whether to show the text on the share button
	  showLabel: true,
	  // "self | blank | <a href="http://www.jqueryscript.net/tags.php?/popup/">popup</a>"
	  shareIn: "blank",
	  // whether and how to show share count
	  // true|false|"inside"|function(screenWidth)
	  showCount: true,
	  smallScreenWidth: 640,
	  largeScreenWidth: 1024,
	  resizeTimeout: 200,
	});
    // Đánh giá sao
    $('.rating-star').on('click', 'i', function() {
        value_star = $(this).data('value');
        $('#rating').val(value_star);
        $('.rating-star').empty();
        var j = 0;
        for (var i = 0; i < value_star; i++) {
            j++;
            $('.rating-star').append('<i class="fa start fa-star" data-value="' + j + '" aria-hidden="true"></i>');
        }
        for (var i = 0; i < 5 - value_star; i++) {
            j++;
            $('.rating-star').append('<i class="fa start fa-star-o" data-value="' + j + '" aria-hidden="true"></i>');
        }
    });
	$('.news-rating-star i[data-point]').on('click', function() {
		point = $(this).data('point');
		if (point) {
			data_id = $(this).data('id');
			data_type = $(this).data('type');
	        $('.news-rating-star').empty();
	        var j = 0;
	        for (var i = 0; i < point; i++) {
	            j++;
	            $('.news-rating-star').append('<i class="fa start fa-star" data-value="'+j+'" aria-hidden="true"></i>');
	        }
	        for (var i = 0; i < 5-point; i++) {
	            j++;
	            $('.news-rating-star').append('<i class="fa start fa-star-o" data-value="'+j+'" aria-hidden="true"></i>');
	        }
	        var ip = $('#ip').data('ip');
	        var slug = window.location.pathname;
	        data = {
	        	"type": data_type,
	        	"type_id": data_id,
	        	"rank": point,
	        }
	        loadAjax('../ajax/vote_star', data, {
	        	beforeSend:function(){},
		        success:function(result){
		        	value = [ip,point];
			        setCookieWithPath('vote', slug, value);
			        $('.alert_message').empty().append('Cảm ơn bạn đã quan tâm và đánh giá cho chúng tôi '+point+' sao').css('display', 'block');
                    setInterval(function() {
                        $('.alert_message').fadeOut(1000);
                    }, 5000);
			        // alert('Cảm ơn bạn đã quan tâm và đánh giá cho chúng tôi '+point+' sao');
			        $('.news-rating-info').empty().append(result[1]+"/"+result[0]+" đánh giá")
		        }
	        });
        }
	});

    $('.news-related-content').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: false,
        nav: false,
        dots: false,
        smartSpeed: 500,
        mouseDrag: true,
        pullDrag: true,
        touchDrag: true,
        responsive:{
            0:{items:2},
            768:{items:2},
            1000:{items:3}
        },
        // onInitialized: responsiveVideoReview
    });
    // trả lời bình luận
    $('.comment-reply').on('click', function() {
        $(this).closest(".comment-item").find(".reply_comment_form").css("display", "block");
    });
    // trả lời bình luận admin
    $('.comment-reply-admin').on('click', function() {
        $(this).closest(".comment-item").find(".reply_comment_form_admin").css("display", "block");
    });
    // hủy trả lời comment
    $('.comment-btn .close').on('click', function() {
        $(this).closest(".reply_comment_form").css("display", "none");
    });
    // hủy trả lời comment admin
    $('.comment-btn-admin .close').on('click', function() {
        $(this).closest(".reply_comment_form_admin").css("display", "none");
    });

    $('body').on('click', '.comment-form-client .content', function() {
    	let is_login = $(this).data('is_login') ?? 0;

    	if (!is_login) window.location.href = '/login';
    })

    // scroll menu mobile
    $('.categories .next-nav').on('click', function() {
        $('html, .categories-list').animate({
            scrollLeft: document.getElementById('categories-list').scrollLeft + 100
        }, "fast");
    });
});