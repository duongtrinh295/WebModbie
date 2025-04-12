$(document).ready(function() {
    // Hiển thị tất cả và ẩn bài viết giới trong Danh Mục
    if ($('.intro-service-content').parents().height()<1999) {
        $('.intro-service-show').css('display','none');
		$('.box_shadow').css('display', 'none');
    }else {
		$('.intro-service_viewmore').css('margin-bottom', '40px');
	}
    $('#intro-service-viewall').click(function() {
        $('.intro-service-show').css('position', 'relative');
        view_detail('auto', 'intro-service-viewall', 'intro-service-viewdefault', 'intro-service-content');
        $('.box_shadow').css('display', 'none');
		$('.intro-service_viewmore').css('margin-bottom', '40px');
		$('.intro-service-show').css('bottom', '0');
    });
    $('#intro-service-viewdefault').click(function() {
        $('.intro-service-show').css('position', 'absolute');
        view_detail('2000px', 'intro-service-viewdefault', 'intro-service-viewall', 'intro-service-content');
        $('.box_shadow').css('display', 'block');
		$('.intro-service-show').css('bottom', '-40px');
    });
    // hiển thị nội dung chi tiết đúng vị trí
    var currentUrl = window.location.href;
    $(window).on("hashchange", function() {
        let target = window.location.hash;
        scrollHeight(target);
    });
    if(hasHash(currentUrl)) {
        let target = window.location.hash;
        scrollHeight(target);
    }
    function scrollHeight(target) {
        if(target.length > 0) {
            $(target).closest('.intro-service-content').css('height', 'auto');
            $(target).closest('.intro-service-content').css('max-height', 'none');
            $(target).closest('.intro-service').find('#intro-service-viewdefault').css('display', 'inline-block');
            $(target).closest('.intro-service').find('#intro-service-viewall').css('display', 'none');
            $(target).closest('.intro-service').find('.box_shadow').css('display', 'none');
            smoothScrollTo($(target).offset().top - 110);
        }
    }
    var page = 1;
    var isEnd = false;
    var load_image = $('#load_image').val();
	// $(window).scroll(function() {
	// 	if($(window).scrollTop() == $(document).height() - $(window).height()) {
    //         page++;
    //         if (isEnd == false) {
    //             loadContent(page);
    //         }
	// 	}
	// });

    $('.viewmore .more').click(function() {
        page++;
        if (isEnd == false) {
            loadContent(page);
        }
    })

    function loadContent(page, appendHtml = true, $action = 'loading_box') {
        url = $('input[name="current_url"]').val();

        // if (window.location.search) {
        //     url = url+'&page='+page;
        // } else {
        //     url = url+'?page='+page;
        // }

        var ajax = $.ajax({
            type:'GET',
            url: url,
            data: {
                page: page
            },
            beforeSend:function() {
                if ($action == 'loading_box') {
                    $('.view-ajax-more').css('display', 'block');
                } else if ($action == 'loading_popup') {
                    $("#loading_box").css({visibility:"visible", opacity: 0.0}).animate({opacity: 1.0},200);
                }
            },
            success:function(result){
                if ($action == 'loading_box') {
                    $('.view-ajax-more').css('display', 'none');
                } else if ($action == 'loading_popup') {
                    $("#loading_box").animate({opacity: 0.0}, 200, function(){
                        $("#loading_box").css("visibility","hidden");
                    });
                }
                $('.filter-services').after(result.filter_html).remove();
                if (appendHtml == true) {
                    $('.product-list').append(result.html);
                } else {
                    $('.product-list').html(result.html);
                }
                if (result.status != 1) {
                    if ($action == 'loading_box') {
                        $('.alert_message').empty().append("Dịch vụ cho di động trên website đã hết! Không thể tải thêm").css('display', 'block');
                        setInterval(function() {
                            $('.alert_message').fadeOut(1000);
                        }, 5000);
                    }
                    isEnd = true;
                } else {
                    isEnd = false;
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

    $('body').on('click', '*[data-filter_detail]', function(e) {
        e.preventDefault();
        // Active và deactive
        if ($(this).hasClass('checked')) {
            $(this).closest('*[data-filter]').find('.filter-item').removeClass('checked');
        } else {
            $(this).closest('*[data-filter]').find('.filter-item').removeClass('checked');
            $(this).addClass('checked');
        }

        filter_detail = [];
        filter = [];
        level = $(this).data('level');
        $.each($(this).closest('.filter-services__list').find('.filter-item.checked[data-filter_detail]'), function(index, item) {
            if ($(this).data('level') <= level) {
                filter_detail.push($(this).data('filter_detail'));
                filter.push($(this).closest('*[data-filter]').data('filter'));
            }
        });

        data_filter = {
            filter: filter,
            filter_detail: filter_detail,
        };

        data_filter = JSON.stringify(data_filter);
        data_filter = btoa(data_filter);

        let url = pushOrUpdate({
            data: data_filter,
        }, false);
        $('input[name="current_url"]').val(url)
        page = 1;
        loadContent(page, false, 'loading_popup');
    })
});