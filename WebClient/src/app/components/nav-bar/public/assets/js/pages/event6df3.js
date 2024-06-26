$(document).ready(function() {
    // Gallery Ảnh
    $('.image-gallery').lightSlider({
        item: 4.5,
        loop: false,
        slideMargin: 5,
        controls: false,
        speed: 600,
        keyPress: false,
        freeMove: false,
        enableDrag: false,
        enableTouch: false,
        currentPagerPosition: 'middle',
        thumbItem: 4,
        auto: false,
        pager:false,
        responsive : [
            {
                breakpoint:768,
                settings: {
                    item:3,
                  }
            },
            {
                breakpoint:480,
                settings: {
                    item:3,
                  }
            }
        ],
        onSliderLoad: function(el) {
            el.lightGallery({
                download: false,
                selector: '.image-gallery .lslide',
            });
        }
    });
    $('.product-box-mobile').owlCarousel({
        loop: false,
        margin: 10,
        autoplay: false,
        nav: true,
        items:3,
        dots: false,
        smartSpeed: 500,
        mouseDrag: true,
        pullDrag: true,
        touchDrag: true,
        responsive:{
            0:{items:2},
            600:{items:3},
            1000:{items:3}
        },
        // onInitialized: responsiveVideoReview
    });
    $(".owl-prev").html('<i class="fa fa-chevron-left" aria-hidden="true"></i>');
    $(".owl-next").html('<i class="fa fa-chevron-right" aria-hidden="true"></i>');
    $('.phone-related-box.product-related-box-mobile').show();

    //tat popup
    closePopup('.popup_close', '.popup');
    closePopup('.btn-danger', '.popup');
});
$('.events-content-list .see-more').on('click', function() {
    var page = parseInt($(this).attr('data-page'));
    var id = $(this).attr('data-id');
    $(this).attr('data-page', page + 1);
    $.ajax({
        url: '/ajax/event_seemore',
        type:"POST",
        data:{
            page:page,
            id:id,
        },
        success:function(result){
            $(".category--list").append(result['html']);
        },
    });
});

$('body').on('click', '.buy-now', function(e){
    let popup = $($(this).data('target'));
    let data = $($(this).data('list'));
    e.preventDefault();
    loadAjax('/logged', {}, {
        beforeSend: function(){
            $("#loading_box").css({visibility:"visible", opacity: 0.0}).animate({opacity: 1.0},200);
        },
        success: function(result){
            if(result == 1){
                $("#loading_box").animate({opacity: 0.0}, 200, function(){
                    $("#loading_box").css("visibility","hidden");
                });
                popup.bPopup({
                    speed: 450,
                    transition: 'slideDown',
                    zIndex:9999,
                    positionStyle: 'fixed',
                    onOpen: function() {
                        popup.css('visibility', "visible");
                    },
                    onClose: function() {
                        popup.css('visibility', "hidden");
                    }
                });
            }else{
                window.location.href = '/login';
            }
        },
        error:function(error){
            if(error.status == 419){
                window.location.href = '/login';
            }else{
                $("#loading_box").animate({opacity: 0.0}, 200, function(){
                    $("#loading_box").css("visibility","hidden");
                });
                alertMessage('Đã xảy ra lỗi! Vui lòng thử lại!');
            }
        }
    })
})


$('body').on('click', '.btn-submit-join', function(e) {
    e.preventDefault();
    let popup = $('.popup_confirm');
    let now = new Date();
    let datestring = ("0" + now.getDate()).slice(-2) + "/" +
        ("0" + (now.getMonth()+1)).slice(-2) + "/" +
        now.getFullYear() + " " +
        ("0" + now.getHours()).slice(-2) + ":" +
        ("0" + now.getMinutes()).slice(-2) + ":" +
        ("0" + now.getSeconds()).slice(-2);
    popup.find(`.time_now`).html(datestring);
    let valRequired = valMaxLength = true;
    // validate dữ liệu nhập vào
    $.each($('.info_input'), (key, item) => {
        let value = $(item).val();
        if ($(item).prop('required') && checkEmpty(value)) {
            valRequired = false
            $(item).focus;
        }
        if ($(item).length > $(item).maxLength) {
            valMaxLength = false
            $(item).focus;
        }
        let html = $(item).attr('type') == 'link' ? `<a href="${ value }" target="_blank">${ value }</a>` : value;
        popup.find(`.participation.info_${ key }`).attr('data-value', value).html(html);
    })
    if (!valRequired) {
        alertMessage('Vui lòng nhập đầy đủ thông tin bắt buộc!');
        return false
    }
    if (!valRequired) {
        alertMessage('Ký tự không được quá độ dài quy định, vui lòng kiểm tra lại!');
        return false
    }

    $(this).closest('#popup-register-event').bPopup().close();
     popup.find('a.btn-submit-confirm').show();
     popup.find('a.btn-retype').show();
     popup.find('a.btn-danger').hide();
     popup.bPopup({
         speed: 450,
         transition: 'slideDown',
         zIndex:9999,
         positionStyle: 'fixed',
         onOpen: function() {
             popup.css('visibility', 'visible');
         },
         onClose: function() {
             popup.css('visibility', 'hidden');
         }
     });
});

$('body').on('click', '.btn-submit-confirm', function(e) {
    e.preventDefault();
    let popup = $('.popup_confirm');
    let data = [];
    $.each($('.participation'), (key, item) => {
        data[key] = $(item).attr('data-value').trim();
    });
    data = Object.assign({}, (data));
    loadAjax('/event/tham-gia', {id: $(this).data('id'), data: data}, {
        beforeSend: function() {
            $("#loading_box").css({visibility:"visible", opacity: 0.0}).animate({opacity: 1.0},200);
        },
        success: function(result) {
            $("#loading_box").animate({opacity: 0.0}, 200, function(){
                $("#loading_box").css("visibility","hidden");
            });
            if (result.success)
                location.reload();
            else {
                alertMessage(result.message);
                setTimeout(function() {
                    location.reload();
                }, 500);
            }
        },
        error: function(error) {
            $("#loading_box").animate({opacity: 0.0}, 200, function(){
                $("#loading_box").css("visibility","hidden");
            });
            alertMessage('Đã có lỗi xảy ra, vui lòng thử lại!');
            setTimeout(function() {
                location.reload();
            }, 500);
        },
    });
});

$('body').on('click', '.btn-retype', function(e) {
    e.preventDefault();
    let popup = $('#popup-register-event');
    $(this).closest('.popup_confirm').bPopup().close();
     popup.bPopup({
         speed: 450,
         transition: 'slideDown',
         zIndex:9999,
         positionStyle: 'fixed',
         onOpen: function() {
             popup.css('visibility', 'visible');
         },
         onClose: function() {
             popup.css('visibility', 'hidden');
         }
     });
})
$('body').on('click', '.btn-info', function(e) {
    e.preventDefault();
    let popup = $('.popup_confirm');
    popup.find('a.btn-submit-confirm').hide();
    popup.find('a.btn-retype').hide();
    popup.find('a.btn-danger').show();
     popup.bPopup({
         speed: 450,
         transition: 'slideDown',
         zIndex:9999,
         positionStyle: 'fixed',
         onOpen: function() {
             popup.css('visibility', 'visible');
         },
         onClose: function() {
             popup.css('visibility', 'hidden');
         }
     });
});

 // countdown
$('[data-countdown]').each(function() {
   var _this = $(this), finalDate = $(this).data('countdown');
   var countdown=_this.find('.coutdown')
   var btn= `<div class="registration-form" id="registration">
                <a href="javascript:;" class="buy buy-now send_registration" 
                 data-target="#popup-register-event">Tham gia event</a>
            </div>`;
    _this.countdown(finalDate, {elapse: true})
      .on('update.countdown', function(event) {
        if (event.elapsed) { 
            _this.hide();
            $('.participation_event').html(btn);
        } else {
            let hours = parseInt(event.strftime('%H')) + parseInt(event.strftime('%D')) * 24;
            countdown.html(hours + event.strftime(':%M:%S'));
        }
  });
});
$('body').on('click', '.test-image', function(e) {
    $(this).closest('tr').find(".gallery img").trigger("click");
});
