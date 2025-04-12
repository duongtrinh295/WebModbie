$(document).ready(function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    // thay đổi địa chỉ nhận hàng (trang thanh toán)
    $('body').on('click', '.change-address',function () {
        $('.v2-popup-address').bPopup({
            speed: 450,
            transition: 'slideDown',
            zIndex: 99999,
            onOpen: function () {
                $('.v2-popup-address').css('visibility', 'visible');
            },
            onClose: function () {
                $('.v2-popup-address').css('visibility', 'hidden');
            }
        });
    });
    // thêm mới đổi địa chỉ nhận hàng (trang thanh toán)
    $('body').on('click', '.add-address',function () {
        $('.form-signin').find('.v2-error-check').remove();
        $('.new-address').bPopup({
            speed: 450,
            transition: 'slideDown',
            zIndex: 99999,
            onOpen: function () {
                $('.new-address').css('visibility', 'visible');
            },
            onClose: function () {
                $('.new-address').css('visibility', 'hidden');
            }
        });
    });
    // Xem form đánh giá và
    $('body').on('click', '.v2-view-voucher',function () {
        var type = $(this).data('type');
        var type_id = $(this).data('type_id');
        var root_id = $(this).data('root_id');
        var check_vote = $(this).data('check_vote');
        $.ajax({
            url: '/nguoi-dung/hien-thi-danh-gia-san-pham',
            type:"POST",
            data:{
                type:type,
                type_id:type_id,
                root_id:root_id,
            },
            success:function(result){
                    var html = '';
                if (result.rank && result.content) {
                    for($i = 5; $i > 0 ; $i--) {
                        html+= `<li class="item-star item-star-`+ $i + `" data-star="`+ $i + `">`;
                            html+= `<i class="fa fa-star `;
                            if($i  <= result.rank) {
                                html+= `star-active`;
                            }
                            html+= `" aria-hidden="true"></i>`;
                        html+= `</li>`;
                    }
                    $(".list-star").html(html);
                    $(".content_vote").html(result.content)
                } else {
                    for($i = 5; $i > 0 ; $i--) {
                        html+= `<li class="item-star item-star-`+ $i + `" data-star="`+ $i + `">`;
                            html+= `<i class="fa fa-star" aria-hidden="true"></i>`;
                        html+= `</li>`;
                    }
                    $(".list-star").html(html);
                    $(".content_vote").html('')
                }
            },
       });
        $('.v2-popup-voucher').bPopup({
            speed: 450,
            transition: 'slideDown',
            zIndex: 99999,
            onOpen: function () {
                $(".v2-vote-product").attr('data-type', type);
                $(".v2-vote-product").attr('data-type_id', type_id);
                $(".v2-vote-product").attr('data-root_id', root_id);
                $(".v2-vote-product").attr('data-check_vote', check_vote);
                $('.v2-popup-voucher').css('visibility', 'visible');
            },
            onClose: function () {
                $('.v2-popup-voucher').css('visibility', 'hidden');
            }
        });

    });
    //cập nhật đánh giá
    $(".v2_popup-main__voucher").on('click', '.v2-vote-product', function(e) {
        var type = $(this).data('type');
        var type_id = $(this).data('type_id');
        var root_id = $(this).data('root_id');
        var check_vote = $(this).data('check_vote');
        var rank = $("#v2-star").val();
        var content = $(".content_vote").val();

        if (!content) {
            $(".v2_popup-main__voucher #error-content_vote").remove();
            $(".v2_popup-main__voucher #v2-error-content_vote").append('<p class="v2-error-check e v2-color-red" id="error-content_vote" style="padding-left: 5px;">Nội dung không được để trống</p>');
            $(".content_vote").focus();
        }
        $.ajax({
            url: '/nguoi-dung/danh-gia-san-pham',
            type:"POST",
            data:{
                type:type,
                type_id:type_id,
                root_id:root_id,
                rank:rank,
                content:content,
                check_vote:check_vote,
            },
            success:function(result){
                $("#v2-star").val(0);
                $('.v2-popup-address').css('visibility', 'hidden');
                $('.v2-popup-address').bPopup().close();
                $(".__b-popup1__").css('display', 'none');
                // if(result.flash_level == 'error') {
                    window.location.reload();
                // }
                alert(result.v2_flash_message)
            },
       });
    });
    // lấy số sao đánh giá
    $('body').on('click', '.item-star',function () {
        var star = $(this).attr('data-star');
        $(this).parent().find('.fa-star').css( "color", "#3E3E3E" );
        $(this).find('.fa-star').css( "color", "#FFC346" );
        $(this).nextAll().find('.fa-star').css( "color", "#FFC346" );
        $("#v2-star").val(star);
    });

    // hủy đơn hàng
    $('body').on('click', '.v2-btn-cancel',function () {
        var order_id = $(this).data('order-id');
        $('.popup_cancel_invoice').bPopup({
            speed: 450,
            transition: 'slideDown',
            zIndex: 99999,
            onOpen: function () {
                $(".v2-submit-cancel").attr('data-order-id', order_id);
                $('.popup_cancel_invoice').css('visibility', 'visible');
            },
            onClose: function () {
                $('.popup_cancel_invoice').css('visibility', 'hidden');
            }
        });
    });
    // nhập lý do và xác nhận hủy đơn
    $(".v2_popup-main__voucher").on('click', '.v2-submit-cancel', function(e) {
        var order_id = $(this).data('order-id');
        var note_cancel = $(".note_cancel").val();

        if (!note_cancel) {
            $(".v2_popup-main__voucher #error-note_cancel").remove();
            $(".v2_popup-main__voucher #v2-error-note_cancel").append('<p class="v2-error-check e v2-color-red" id="error-note_cancel" style="padding-left: 5px;">Lý do hủy không được để trống</p>');
            $(".note_cancel").focus();
            return;
        }
        $.ajax({
            url: '/nguoi-dung/huy-don-hang',
            type:"POST",
            data:{
                order_id:order_id,
                note_cancel:note_cancel,
            },
            success:function(result){
                $('.popup_cancel_invoice').css('visibility', 'hidden');
                $('.popup_cancel_invoice').bPopup().close();
                if(result.flash_level == 'success') {
                    alert(result.flash_message)
                    window.location.reload();
                }
            },
       });
    });

    // điều kiện voucher ở ví voucher
    $('body').on('click', '.v2-condition a',function () {
        $('.v2-popup-condition').bPopup({
            speed: 450,
            transition: 'slideDown',
            zIndex: 99999,
            onOpen: function () {
                $('.v2-popup-condition').css('visibility', 'visible');
            },
            onClose: function () {
                $('.v2-popup-condition').css('visibility', 'hidden');
            }
        });
    });

    // ẩn alert ở form đăng nhập
    $('body').on('click', '.close',function () {
        $(this).parents().find('.v2-alert').slideUp();
    });

    // hover menu user
    $('.v3_username').hover( function(e) {
        e.preventDefault();
        $(this).find('.v3_profile').addClass('v3-menu-show');
    }, function(){
        $(this).find('.v3_profile').removeClass('v3-menu-show');
    });
    // menu mobile
    $('body').on('click', '.v2-username',function () {
        $(this).find('.v2-profile').toggleClass('v2-menu-show');
    });

    $(document).bind('click', function(e) {
        if (!$(e.target).closest('a').hasClass('icon-notif') && !$(e.target).closest('.v2-notification').hasClass('result'))
            $('.v2-notification-dropdown').removeClass('v2-menu-show');
    });

    $('.v2-notification').on('click', '.icon-notif', function() {
        if (!$('.v2-notification-dropdown').hasClass('v2-menu-show')) getNotification();
        $('.v2-notification-dropdown').toggleClass('v2-menu-show');
    });

    //tat popup chon voucher chon ma giam gia
    closePopup('.v2_popup_voucher .back', '.popup');
    // back popup change-address
    $('body').on('click', '.v2-popup-address .back', function () {
        $(".v2-popup-address").bPopup().close();
        $(".v2-popup-address").css('visibility', 'hidden');
    });

    // Đánh dấu đã đọc
    $('body').on('click', '.v2-notification .marked-read', function() {
        const _this = $(this);
        const id = _this.data('id') ?? 0;
        // $.get('/ajax/notifications/marked-read/' + id, function(result) {
        //     if (result.success) {
        //         if (id) {
        //             _this.closest('.notif-item').removeClass('v2-not-read');
        //             _this.parent().remove();
        //         } else {
        //             $('.v2-notification #notification').html(0);
        //         }
        //         alert('Bạn đã đánh dấu đã đọc thành công ' + result.data + ' bản ghi');
        //         $('.v2-notification-dropdown').removeClass('v2-menu-show');
        //     }
        //     else {
        //         alert(result.message);
        //     }
        // });
        loadAjaxGet('/ajax/notifications/marked-read/' + id, {
            success:function(result){
                if (result.success) {
                    if (id) {
                        _this.closest('.notif-item').removeClass('v2-not-read');
                        _this.parent().remove();
                    } else {
                        $('.v2-notification #notification').html(0);
                    }
                    alert('Bạn đã đánh dấu đã đọc thành công ' + result.data + ' bản ghi');
                    $('.v2-notification-dropdown').removeClass('v2-menu-show');
                }
                else {
                    if(typeof result.success === 'undefined'){
                        window.location.href = '/login';
                        return;
                    }
                    alert(result.message);
                }
            },
            error:function(error){
                if(error.status == 419){
                    window.location.href = '/login';
                }else{
                    alert('Đã xảy ra lỗi! Vui lòng thử lại!');
                }
            }
        });
    });
    // sử dụng js điều hướng khi click
    $('body').on('click', '.link_name',function () {
        var link = $(this).data('link');
        window.location.href = link;
    });
});

//ajax load thông báo
function getNotification() {
    $('.v2-notification.result').hide();
    $('.v2-notification .loading').show();

    loadAjaxGet('/ajax/notifications', {
        beforeSend:function(){
            $('.v2-notification.result').hide();
            $('.v2-notification .loading').show();
        },
        success:function(result){
            if (result.success) {
                $('.v2-notification #notification').html(result.not_readed);
                $('.v2-notification .loading').hide();
                $('.v2-notification.result').html(result.list_notif).show();
            }
            else {
                if(typeof result.success === 'undefined'){
                    window.location.href = '/login';
                }
            }
        },
        error:function(error){
            if(error.status == 419){
                window.location.href = '/login';
            }else{
                alertMessage('Đã xảy ra lỗi! Vui lòng thử lại!');
            }
        }
    });
}
// scrroll header mobi and desktop
if ($("#admin-bar").length > 0) {
    $("header").removeClass("fixed-header");
}
$(window).scroll(function() {
    let current_top= $(document).scrollTop();
    if($(window).width() <= 768){
        if(current_top > 1){
            $('header').css({'position': 'fixed', 'top': '0', 'z-index': '999999'});
        }else{
            $('header').css({'position': 'relative'});
            $(".mp-pusher").css('margin-top','auto')
        }
    }else{
        if(current_top > 100){
            $('header').find('.v3_header_top').addClass("hidden_scroll");
            $('header').find('.v3_header_top').removeClass("show_scroll");
            $("header").addClass("fixed-header");
            $(".mp-pusher").css('margin-top','110px')
        }else{
            $('header').find('.v3_header_top').addClass("show_scroll");
            $('header').find('.v3_header_top').removeClass("hidden_scroll");
            $("header").removeClass("fixed-header");
            $(".mp-pusher").css('margin-top','auto')
        }
    }
});
// hiển thị nội dung chi tiết đúng vị trí
var currentUrl = window.location.href;

$(window).on("hashchange", function() {
  let target = window.location.hash;
  smoothScrollTo($(target).offset().top - 110);
});

if (hasHash(currentUrl)) {
  let target = window.location.hash;
  smoothScrollTo($(target).offset().top - 110);
}
// delay ajax
function delay(callback, ms) {
    var timer = 0;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}
$(document).bind('click', function(e) {
    if (!$(e.target).closest('td').hasClass('suggest')) {
        $('ul.address-suggest').hide().empty();
    }
});
