$(document).ready(function() {
    // Gallery Ảnh
    $('#image-gallery').lightSlider({
        item: 4.5,
        loop: false,
        slideMargin: 5,
        controls: true,
        speed: 600,
        keyPress: true,
        freeMove: true,
        enableDrag: true,
        enableTouch: true,
        currentPagerPosition: 'middle',
        thumbItem: 4,
        auto: false,
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
                selector: '#image-gallery .lslide',
            });
        }
    });

    // youtube action
    $('.slide_video').owlCarousel({
        loop: false,
        margin: 10,
        autoplay: false,
        nav: true,
        dots: false,
        smartSpeed: 500,
        mouseDrag: true,
        pullDrag: true,
        touchDrag: true,
        responsive:{
            0:{items:3},
            600:{items:3},
            1000:{items:3}
        },
        // onInitialized: responsiveVideoReview
    });
    $(".owl-prev").html('<i class="fa fa-chevron-left" aria-hidden="true"></i>');
    $(".owl-next").html('<i class="fa fa-chevron-right" aria-hidden="true"></i>');

    function init() {
       $('#slider_video_home .iframe').each(function() {
           var ifa = $(this).attr('data-iframe');
           var videoid = getIdVideo(ifa);
           var title = $(this).closest('#slider_video_home').attr('data-title')+' '+videoid[1];
           var replacement = '<iframe src="https://www.youtube.com/embed/' + videoid[1] + '" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen width="650" height="350" loading="lazy" title ="'+title+'"></iframe>';
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
           var videoid = getIdVideo(ifa);

           var title = $(this).closest('#slider_video_home').attr('data-title')+' '+ videoid[1];
           var embed = getIdYoutube(ifa,title);
           $('#slider_video_home .iframe').html(embed);
       });
    }
    setTimeout(function() {
        init();
    },5000);

    // Hiển thị tất cả và ẩn bài viết giới trong Sản phẩm
    $( ".product-detail-content" ).each(function( index ) {
        if($(this).height() > 1550) {
            $( this ).addClass('more-height');
            if ($(this).hasClass('more-height')) {
                $(this).parent(".product-detail").css("margin-bottom", "40px");
            }
        } else {
            $(this).parent().find('.product-detail-show').css('display', 'none');
            $(this).parent().find('.box_shadow').css('display', 'none');
        }
    });
    // Box chính
    $('#product-detail-viewall').click(function() {
        $(this).css('display', 'none');
        $(this).parent().css('position', 'relative');
        $(this).parent().children('#product-detail-viewdefault').css('display', 'inline-block');
        $(this).parent().parent().children('.product-detail-content').css('height','auto');
        $(this).parent().parent().children('.box_shadow').css('display', 'none');
    });
    $('#product-detail-viewdefault').click(function() {
        $(this).css('display', 'none');
        $(this).parent().css('position', 'absolute');
        $(this).parent().children('#product-detail-viewall').css('display', 'inline-block');
        $(this).parent().parent().children('.box_shadow').css('display', 'block');
        $(this).parent().parent().children('.product-detail-content').animate({height: '1550px'}, 1000);
    });
    // Box phụ
    $('.product-detail-viewall').click(function() {
        $(this).css('display', 'none');
        $(this).parent().css('position', 'relative');
        $(this).parent().children('.product-detail-viewdefault').css('display', 'inline-block');
        $(this).parent().parent().children('.product-detail-content').css('height','auto');
        $(this).parent().parent().children('.box_shadow').css('display', 'none');
    });
    $('.product-detail-viewdefault').click(function() {
        $(this).css('display', 'none');
        $(this).parent().css('position', 'absolute');
        $(this).parent().children('.product-detail-viewall').css('display', 'inline-block');
        $(this).parent().parent().children('.box_shadow').css('display', 'block');
        $(this).parent().parent().children('.product-detail-content').animate({height: '1550px'}, 500);
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
            $(target).closest('.product-detail-content').css('height', 'auto');
            $(target).closest('.product-detail').find('#product-detail-viewdefault').css('display', 'inline-block');
            $(target).closest('.product-detail').find('.product-detail-viewdefault').css('display', 'inline-block');
            $(target).closest('.product-detail').find('#product-detail-viewall').css('display', 'none');
            $(target).closest('.product-detail').find('.product-detail-viewall').css('display', 'none');
            $(target).closest('.product-detail').find('.box_shadow').css('display', 'none');
            smoothScrollTo($(target).offset().top - 110);
        }
    }
    // Đánh giá sao
    $('.rating-star').on('click', 'i', function() {
        value_star = $(this).data('value');
        $('#rating').val(value_star);
        $('.rating-star').empty();
        var j = 0;
        for (var i = 0; i < value_star; i++) {
            j++;
            $('.rating-star').append('<i class="fa start fa-star" data-value="'+j+'" aria-hidden="true"></i>');
        }
        for (var i = 0; i < 5-value_star; i++) {
            j++;
            $('.rating-star').append('<i class="fa start fa-star-o" data-value="'+j+'" aria-hidden="true"></i>');
        }
    });
    $('.buy-box .chat').attr('href', $('.mobilecity-messenger').attr('href') ?? 'javascript:;');

    var isSync = $('#is_sync').data('is_sync') ? 1 : 0;
    var productId = $('#product_id').data('product_id') ?? 0;

    var button_buy_now = `<a href="javascript::" data-product_type="fitting_variants" data-product_id="0" data-location_id="1" class="buy buy-now v2-buy btn-add-cart">MUA NGAY</a>`;
    var button_add_to_cart = `<a href="javascript::" data-product_type="fitting_variants" data-product_id="0" data-location_id="1" class="buy add-to-cart v2-buy btn-add-cart"><div class="icon"></div><span>THÊM VÀO GIỎ HÀNG</span></a>`;
    var button_register = `<a href="#" class="buy register btn-add-cart" data-product_type="fitting_variants" data-product_id="0" data-location_id="1">ĐẶT HÀNG TRƯỚC</a>`;
    var button_chat = `<a href="${$('.mobilecity-messenger').attr('href') ?? 'javascript:;'}" rel ="nofollow" target="_blank" class="chat">CHAT TƯ VẤN</a>`;
    var button_pre_order = `
        <a href="javascript:;"
            data-product_type="fitting_variants"
            data-product_id="${ productId }"
            data-variant_id="0"
            class="pre-order"
        >ĐẶT HÀNG TRƯỚC</a>`;

    var message_not_sync = `<p class="message">Phiên bản hiện tại đang tạm hết hàng, quý khách vui lòng liên hệ để được tư vấn hoặc đặt hàng trước hoặc chọn phiên bản khác!</p>`;
    var message_stop_business = `<p class="message">Sản phẩm đã ngừng kinh doanh, quý khách vui lòng liên hệ để được tư vấn hoặc tham khảo sản phẩm tương tự!</p>`;
    var message_out_stock = `<p class="message">Sản phẩm hiện tại đang tạm hết hàng, quý khách có thể đặt trước sản phẩm hoặc tham khảo sản phẩm tương tự!</p>`;
    var message_instock_online = `<p class="message">Còn hàng bán online!</p>`;
    var message_out_stock_location = `<p class="message">Sản phẩm đang tạm hết hàng ở khu vực này. Bạn có thể đặt trước sản phẩm này hoặc chọn khu vực khác!</p>`;
    var message_out_stock_variant_this_location = `<p class="message">Phiên bản đã chọn ở khu vực này đang tạm hết hàng, quý khách có thể đặt trước sản phẩm hoặc chọn khu vực khác!`;
    var message_out_stock_variant_all_location = `<p class="message">Phiên bản đã chọn đang tạm hết hàng, quý khách vui lòng chọn phiên bản khác hoặc đặt trước sản phẩm!`;

    var div_product = $('.product-content-box');
    var div_button = $('.buy-box-v2');
    var div_captcha = $('.product-captcha');
    var div_status_box = $('.product-content-box .status-box');
    var div_message = $('.product-messsage');
    var div_product_store_list = $('.product-store-list');
    var div_store_list = $('.product-store-list .store-list');

    getInstock();

    $('body').on('click', '.variant-list > .variant-item', function() {
        let _this = $(this);
        let isActived = _this.hasClass('active');
        $('.variant-list > .variant-item').removeClass('active');

        if (!isActived) {
            _this.addClass('active');
            if (!checkEmpty(_this.data('show_warranty')))
                $('.warranty-default-box .warranty-content-default').html(_this.data('show_warranty'))
            let variantId = _this.data('web_id');
            let image = $(`.v2-product-image li img[data-id="${ variantId }"]`);
            if (image.length) {
                $('.v2-product-image li').removeClass('active');
                $(image).closest('li').addClass('active');
            }
        }
        updateOnChange();
    })

    // Thay đổi địa điểm
    $('body').on('change', '.product-content-box select#location, .product-content-box select#location-message', function(){
        let val = $(this).val();
        $('.product-content-box select#location-message').val(val);
        $('.product-content-box select#location').val(val);
        $('.store-list ul li').css('display', 'none');
        $('.store-list ul').find(`li[data-location=0]`).css('display', 'list-item');
        $('.store-list ul').find(`li[data-location=${ val }]`).css('display', 'list-item');
        //thay đổi thông tin khuyến mãi theo địa điểm
        $('.v2-promotion .promotion-location').css('display', 'none');
        $(`.v2-promotion .promotion-location.location_${ val }`).css('display', 'block');
        updateOnChange();
    });

    // ấn nút mua
    $('body').on('click', '.buy-box-v2 .buy', function(e) {
        let _this = $(this);
        if (checkEmpty(_this.attr('data-product_id')) ||
            checkEmpty(_this.attr('data-location_id')) ||
            _this.attr('data-product_id') == 0 ||
            _this.attr('data-location_id') == 0
        ) {
            e.preventDefault();
            let variants = div_product.find('.variants');
            if (!variants.hasClass('required')) {
                variants.addClass('required').append(`<p class="error-message">Vui lòng chọn phiên bản!</p>`);
            }
            $('html, body').animate({
                scrollTop: variants.offset().top - 50
            }, 300);
        }
    });

    var isInstock = false;
    var instocks = [];
    function getInstock() {
        if (!isSync) {
            div_button.html(button_chat + button_pre_order)
            updateOnChange();
            return false;
        }
        let variantIds = [];
        $.each($('.variant-list .variant-item'), (key, value) => {
            let variantId = parseInt($(value).attr('data-variant_id'));
            if (variantId) variantIds.push(variantId)
        });
        loadAjax('/ajax/check-instock-all-location', {
                'product_id': variantIds,
                'product_type': 'fitting_variants',
                'only_total': 0 // Get in store
            }, {
                success: function(result) {
                    if (!checkEmpty(result.data)) {
                        $.each(result.data, (key, value) => {
                            instocks.push({
                                product_id: parseInt(value.product_id),
                                location_id: parseInt(value.location_id),
                                store_id: 0,
                                quantity: parseInt(value.quantity),
                            });
                            $.each(value.store, (key_store, value_store) => {
                                instocks.push({
                                    product_id: parseInt(value.product_id),
                                    location_id: parseInt(value.location_id),
                                    store_id: parseInt(value_store.store_id),
                                    quantity: parseInt(value_store.quantity),
                                });
                            });
                        })
                    } else {
                        $('.status-instock').html('Hết hàng');
                    }
                    setOutstockVariant();
                    updateOnChange();
                    updateStatusInstock(!checkEmpty(instocks));
                },
        });
    }

    function getSelectedVariantId() {
        if ($('.variant-list .variant-item').length <= 1) {
            return $('.variant-list .variant-item').first().data('variant_id') ?? -1;
        }
        return $('.variant-list').find('.variant-item.active').data('variant_id') ?? 0;
    }

    function getLocationId() {
        return $('select#location').val() ?? 1;
    }

    function setOutstockVariant() {
        $.each($('.variant-list > .variant-item'), (key, value) => {
            let variantId = parseInt($(value).attr('data-variant_id'));
            let isInstock = instocks.find(x => x.product_id == variantId);
            if (checkEmpty(isInstock)) {
                $(value).find('.product-variation__tick').addClass('out-stock');
                $(value).find('.svg-icon.icon-tick-bold').addClass('out-stock');
            }
        })
    }

    function getInstockByVariant(tmpInstocks = instocks) {
        let variantId = getSelectedVariantId();
        if (variantId) tmpInstocks = tmpInstocks.filter(x => x.product_id == variantId);
        return tmpInstocks;
    }
    function getInstockByLocation(tmpInstocks = getInstockByVariant()) {
        let locationId = getLocationId();
        if (locationId) tmpInstocks = tmpInstocks.filter(x => x.location_id == locationId);
        return tmpInstocks;
    }

    function setOutstockStore(instockByVariant = getInstockByVariant(), instockByLocation = getInstockByLocation()) {
        let locationId = getLocationId();
        let liItemOnline = $(`.product-store-list .store-list li[data-location=0]`);
        let liItem = $(`.product-store-list .store-list li[data-location=${locationId}]`);
        if (checkEmpty(instockByVariant)) {
            liItemOnline.find('span.status-stock').removeClass('instock').addClass('outstock').html('(Hết hàng)');
            liItem.find('span.status-stock').removeClass('instock').addClass('outstock').html('(Hết hàng)');
            return false;
        }
        liItemOnline.find('span.status-stock').removeClass('outstock').addClass('instock').html('(Còn hàng)');

        if (checkEmpty(instockByLocation)) {
            liItem.find('span.status-stock').removeClass('instock').addClass('outstock').html('(Hết hàng)');
            return false;
        }
        liItem.find('span.status-stock').removeClass('outstock').addClass('instock').html('(Còn hàng)');

        $.each(liItem, (key, value) => {
            let tmpInstocks = instockByLocation;
            let storeId = $(value).data('id') ?? 0;
            tmpInstocks = tmpInstocks.find(x => x.store_id == storeId);
            if (checkEmpty(tmpInstocks)) {
                $(value).find('span.status-stock').removeClass('instock').addClass('outstock').html('(Hết hàng)');
            } else {
                $(value).find('span.status-stock').removeClass('outstock').addClass('instock').html('(Còn hàng)');
            }
        })
    }

    function getMessage() {
        let instockByVariant = getInstockByVariant();
        div_button.html(button_chat + button_register)
        setDataInButtonBuy();
        // Hết hàng toàn cửa hàng
        if (checkEmpty(instocks)) {
            return message_out_stock;
        }

        // Sp hết hàng ở khu vực (không lọc biến thể)
        if (checkEmpty(getInstockByLocation(instocks))) {
            return message_out_stock_location;
        }

        // Hết hàng theo phiên bản tất cả khu vực
        if (checkEmpty(instockByVariant)) {
            return message_out_stock_variant_all_location;
        }

        // Hết hàng theo phiên bản và khu vực
        if (checkEmpty(getInstockByLocation(instockByVariant))) {
            return message_out_stock_variant_this_location;
        }

        // // Chỉ còn hàng onl
        // tmpInstocks = instockByVariant.filter(x => x.store_id != 0);
        // if (checkEmpty(tmpInstocks)) {
        //     return message_instock_online;
        // }

        div_button.html(button_add_to_cart + button_buy_now);
        setDataInButtonBuy();
        return '';
    }

    function setDataInButtonBuy() {
        let variantIdTmp = getSelectedVariantId();
        if (getSelectedVariantId() == -1 || !isSync) {
            variantIdTmp = $('.variant-list').find('.variant-item.active').data('web_id');
            if ($('.variant-list .variant-item').length <= 1) {
                variantIdTmp = $('.variant-list .variant-item').first().data('web_id');
            }
        }

        if (!isSync) {
            div_button.find('.pre-order').attr('data-variant_id', variantIdTmp);
            return false;
        }
        if (getSelectedVariantId() == -1) {
            div_button.html(button_chat + button_pre_order)
            div_button.find('.pre-order').attr('data-variant_id', variantIdTmp);
            return false;
        }
        div_button.find('.buy').attr('data-product_id', getSelectedVariantId()).attr('data-location_id', getLocationId());
    }

    function setShowMessage() {
        let message = getMessage();
        if (message) {
            div_message.html(message).show();
            if (isShowCaptchaRegisterProduct()) div_captcha.show();
            return false;
        }
        div_message.html('').hide()
    }

    // Ẩn box khuyến mãi để hiển thị thông báo
    function setShowPromotionBox() {
        let display = 'block';
        let opacity = 1;
        let visibility = 'visible';
        if (!checkEmpty(getMessage())) {
            display = 'none';
            opacity = 0;
            visibility = 'hidden';
        }
        let box = $('.product-price-box .v2-promotion, .product-price-box .product-info-general, .product-price-box .warranty-default-box, .product-price-box .deal-combo-box');
        if($(window).width() > 768){
            box.css({'opacity': opacity, 'visibility': visibility});
        } else {
            box.css({'display': display});
        }
    }

    function setPrice() {
        let variantItem = $('.variants .variant-item');
        let extraPrice = parseInt($('#location :selected').data('price'));
        if (variantItem.hasClass('active')) {
            let price = parseInt($('.variants .variant-item.active').data('price'));
            $('.product-price-box .price-product .price').html(format_price(price + extraPrice));
            $('.product-content-right .product-summary-price').html(format_price(price + extraPrice));
            return false;
        }
        let min = 68000000;
        let max = 0;
        $.each(variantItem, function() {
            let value = parseInt($(this).data('price'));
            min = (value < min) ? value : min;
            max = (value > max) ? value : max;
        });
        min += extraPrice;
        max += extraPrice;
        show = format_price(min);
        // if (min < 68000000 && max > 0 && min != max) show = format_price(min) + ' - ' + format_price(max);
        $('.product-price-box .price-product .price').html(show);
        $('.product-content-right .product-summary-price').html(show);
    }

    function removeRequiredMessage() {
        let variants = div_product.find('.variants');
        variants.removeClass('required').find('.error-message').remove();
    }

    function updateOnChange() {
        setPrice();
        setDataInButtonBuy();
        if (!isSync) return false;
        setOutstockStore();
        setShowPromotionBox();
        setShowMessage();
        removeRequiredMessage();
    }

    function updateStatusInstock(isInstock = false) {
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'POST',
            url: '/admin/fits/update-status-instock',
            data: {
                id: productId,
                is_instock: isInstock ? 1 : 0,
            }
        })
    }
});