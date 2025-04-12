$(document).ready(function() {
	var page = 1;
	var isEnd = false;
	var load_image = $('#load_image').val();
	// $(window).scroll(function() {
	// 	if($(window).scrollTop() + $(window).height() == $(document).height() ) {
	// 	    page++;
	// 	    if (isEnd == false) {
	// 			loadContent(page);
	// 	    }
	// 	}
	// });

	 $('.viewmore .more').click(function() {
        page++;
        if (isEnd == false) {
            loadContent(page);
        }
    })

	function loadContent(page) {
		url = window.location.href;

		if (window.location.search) {
            url = url+'&page='+page;
        } else {
            url = url+'?page='+page;
        }

		$.ajax({
	        type:'GET',
	        url: url,
	        beforeSend:function(){
	            $('.view-ajax-more').css('display', 'block');
	        },
	        success:function(result){
	        	$('.view-ajax-more').css('display', 'none');
                $('.product-list').append(result.html);
	        	if (result.status != 1) {
                    $('.alert_message').empty().append("Phụ kiện cho di động trên website đã hết! Không thể tải thêm").css('display', 'block');
                    setInterval(function() {
                        $('.alert_message').fadeOut(1000);
                    }, 5000);
                    $('.viewmore .more').css('display','none');
                    isEnd = true;
                }
                $(function() { 
                    $("img[src='"+load_image+"']").lazyload({
                        effect : "fadeIn",
                        failure_limit: 10,
                    });
                });
	        }
	    })
	}
});