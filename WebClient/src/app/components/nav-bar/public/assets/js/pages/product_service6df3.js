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
        dots: true,
        responsive : [
            {
                breakpoint:768,
                settings: {
                    item: 4.5,
                  }
            },
            {
                breakpoint:480,
                settings: {
                    item: 4.5,
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
    // slide đơn hàng mới nhất
    $('.owl-carousel-order').owlCarousel({
        items:4,
        margin:10,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        slideBy: 2,
        responsive:{
            0:{items:2},
            600:{items:3},
            1000:{items:4}
        },
    });  
    $(".owl-prev").html('<i class="fa fa-chevron-left" aria-hidden="true"></i>');
    $(".owl-next").html('<i class="fa fa-chevron-right" aria-hidden="true"></i>');

    // Hiển thị tất cả và ẩn bài viết giới trong Sản phẩm
    $( ".product-detail-content" ).each(function( index ) {
        console.log($(this).height());
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
        $(this).parent().parent().children('.box_shadow').css('display', 'none');
        $(this).parent().parent().children('.product-detail-content').css('height','auto');
    });
    $('#product-detail-viewdefault').click(function() {
        $(this).css('display', 'none');
        $(this).parent().css('position', 'absolute');
        $(this).parent().parent().children('.box_shadow').css('display', 'block');
        $(this).parent().children('#product-detail-viewall').css('display', 'inline-block');
        $(this).parent().parent().children('.product-detail-content').animate({height: '1550px'}, 1000);
    });
    // Box phụ
    $('.product-detail-viewall').click(function() {
        $(this).css('display', 'none');
        $(this).parent().css('position', 'relative');
        $(this).parent().children('.product-detail-viewdefault').css('display', 'inline-block');
        $(this).parent().parent().children('.box_shadow').css('display', 'none');
        $(this).parent().parent().children('.product-detail-content').css('height','auto');
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
    function init() {
       $('#slider_video_home .iframe').each(function() {
           var ifa = $(this).attr('data-iframe');
           var videoid = getIdVideo(ifa);
           var title = $(this).closest('#slider_video_home').attr('data-title')+' '+videoid[1];
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
           var videoid = getIdVideo(ifa);

           var title = $(this).closest('#slider_video_home').attr('data-title')+' '+ videoid[1];
           var embed = getIdYoutube(ifa,title);
           $('#slider_video_home .iframe').html(embed);
       });
    }
    setTimeout(function() {
        init();
    },5000);

    // lightbox
    $('.show-lightbox-btn').click(function() {
        // $('html, body').css({ 'overflow': 'hidden', 'height': '100%' });
        $('body').css('overflow-y', 'hidden');
        $('.lightbox').css('display', 'block');
    });
    $('.close-lightbox-btn').click(function() {
        // $('html, body').css({ 'overflow': 'auto', 'height': 'auto' });
        $('.lightbox').css('display', 'none');
        $('body').css('overflow-y', 'auto');
    });

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
    openPopup('.buy-pay-later', '.popup');
    closePopup('.popup_close', '.popup');
    var hrefMessenger = checkEmpty($('.mobilecity-messenger').attr('href')) ? 'javascript:;' : $('.mobilecity-messenger').attr('href');
    $('.buy-box .chat').attr('href', hrefMessenger);

    var isSync = $('#is_sync').data('is_sync') ? 1 : 0;
    var productId = parseInt($('#product_id').data('product_id'));
    var isSaleAccessory = parseInt($('#product_id').data('is_sale_accessory'));

    var button_buy_now = `<a href="javascript:;" data-target="#popup-register-service" class="buy buy-now">ĐẶT LỊCH SỬA CHỮA</a>`;
    var button_buy_accessory = isSaleAccessory ? `<a href="javascript:;" class="buy v2-buy btn-buy-accessory" data-target="#popup-buy-accessory"><div class="icon"></div><span>MUA LINH KIỆN</span></a>` : '';
    var button_chat = `<a href="${ hrefMessenger }" rel ="nofollow" target="_blank" class="chat">CHAT TƯ VẤN</a>`;
    var button_accessory_chat = `<div class="action action__chat"><a href="${ hrefMessenger }" rel ="nofollow" target="_blank" class="chat">CHAT TƯ VẤN</a></div>`;
    var button_pre_order = `
        <a href="javascript:;"
            class="buy appointment not_sync"
            data-service_id="${ productId }"
            data-web_id="0"
            data-product_id="0"
            data-location_id="1"
            >ĐẶT LỊCH TRƯỚC
        </a>`;

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
    // đã chọn biến thể
    var isChoosed = $('.variant-list .variant-item').length <= 1 ? true : false;
    var variantIdSelected = 0;
    var variantNameSelected = '';
    var locationIdSelected = 1;
    var priceShow = '0 đ';
    var priceVariant = 0;

    showNotifPrice();
    getSaleAccessory();
    getSelectedVariantId();
    getLocationId();
    getInstock();
    function showNotifPrice() {
        let priceTable = $('.variants #services_price_table');
        let notif = `<div style="margin-top: 5px">(Giá trên không bao gồm công tháo lắp, thay thế)</div>`;
        if (priceTable.length) {
            $('#services_price_table > table').after(notif);
            return false;
        }
        $('.variants > .variant-list').after(notif);
    }
    $('body').on('click', '.variant-list .variant-item', function() {
        let _this = $(this);
        let isActived = _this.hasClass('active');
        $('.variant-list .variant-item').removeClass('active');
        isChoosed = false;

        if (!isActived) {
            isChoosed = true;
            _this.addClass('active');
            if (!checkEmpty(_this.data('show_warranty'))) {
                $('.warranty-default-box .warranty-content-default').html(_this.data('show_warranty'));
                $('.warranty-default-box .warranty-text').show();
            } else {
                $('.warranty-default-box .warranty-text').hide();
            }
            let variantId = _this.data('web_id');
            let image = $(`.v2-product-image li img[data-id="${ variantId }"]`);
            if (image.length) {
                $('.v2-product-image li').removeClass('active');
                $(image).closest('li').addClass('active');
            }
        }
        getSelectedVariantName();
        getSelectedVariantId();
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

        // đặt dịch vụ
        $('select#customer-store option').hide();
        $(`select#customer-store option[data-location=0]`).show();
        $(`select#customer-store option[data-location=${ val }]`).show();
        //thay đổi thông tin khuyến mãi theo địa điểm
        $('.v2-promotion .promotion-location').css('display', 'none');
        $(`.v2-promotion .promotion-location.location_${ val }`).css('display', 'block');
        getLocationId();
        updateOnChange();
    });

    // Thay đổi địa điểm mua linh kiện
    $('body').on('change', '#popup-buy-accessory .location', function(){
        let val = $(this).val();
        $('#popup-buy-accessory .product-content-box select#location-message').val(val);
        $('#popup-buy-accessory .product-content-box select#location').val(val);
        $('#popup-buy-accessory .store-list ul li').css('display', 'none');
        $('#popup-buy-accessory .store-list ul').find(`li[data-location=0]`).css('display', 'list-item');
        $('#popup-buy-accessory .store-list ul').find(`li[data-location=${ val }]`).css('display', 'list-item');
        updateOnChangeBuyAccessory();
    });

    $('body').on('click', '.buy-now', function(e) {
        e.preventDefault();
        if (!isChoosed) {
            let variants = div_product.find('.variants');
            if (!variants.hasClass('required')) {
                variants.addClass('required').append(`<p class="error-message">Vui lòng chọn phiên bản!</p>`);
            }
            $('html, body').animate({
                scrollTop: variants.offset().top - 50
            }, 300);
            return false;
        }

        let popup = $($(this).data('target'));
        loadAjax('/logged', {}, {
            beforeSend: function(){
                $("#loading_box").css({visibility:"visible", opacity: 0.0}).animate({opacity: 1.0},200);
            },
            success: function(result){
                if(result == 1) {
                    $("#loading_box").animate({opacity: 0.0}, 200, function(){
                        $("#loading_box").css("visibility","hidden");
                    });
                    let webId = $('.variant-list').find('.variant-item.active').data('web_id');
                    if ($('.variant-list .variant-item').length <= 1) {
                        webId = $('.variant-list .variant-item').first().data('web_id');
                    }
                    let priceTable = $('.variants #services_price_table');
                    if (priceTable.length) {
                        let softId = $('.variant-list').find('.variant-item.active').data('variant_id');
                        popup.find('#soft_id').val(softId)
                    }
                    popup.find('#web_id').val(webId)
                    popup.find('.popup_title .title').html(variantNameSelected)
                    popup.find('.popup_product_info .popup_product_title').html(variantNameSelected)
                    popup.find('.popup_product_info .popup_product_price').html(priceShow)
                    popup.find('#price_variant').val(priceVariant)
                    popup.bPopup({
                        speed: 450,
                        transition: 'slideDown',
                        zIndex:99999,
                        positionStyle: 'fixed',
                        onOpen: function() {
                            popup.css('visibility', "visible");
                        },
                        onClose: function() {
                            popup.css('visibility', "hidden");
                        }
                    });
                } else {
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
    $('body').on('click', '.btn-buy-accessory', function(e) {
        e.preventDefault();
        let popup = $($(this).data('target'));
        popup.bPopup({
            speed: 450,
            transition: 'slideDown',
            zIndex:99999,
            onOpen: function() {
                popup.css('visibility', "visible");
            },
            onClose: function() {
                popup.css('visibility', "hidden");
            }
        });
    })

    $('body').on('click', '.buy-box .appointment', function() {
        let _this = $(this);
        if (!isChoosed) {
            let variants = div_product.find('.variants');
            if (!variants.hasClass('required')) {
                variants.addClass('required').append(`<p class="error-message">Vui lòng chọn phiên bản!</p>`);
            }
            $('html, body').animate({
                scrollTop: variants.offset().top - 50
            }, 300);
            return false;
        }
        let web_id = parseInt($(this).attr('data-web_id'));
        let priceTable = $('.variants #services_price_table');
        if (!web_id && !priceTable.length) return false;

        let softId = $(this).attr('data-product_id');
        let popup = $('#popup-register-service');
        loadAjax('/logged', {}, {
            beforeSend: function(){
                $("#loading_box").css({visibility:"visible", opacity: 0.0}).animate({opacity: 1.0},200);
            },
            success: function(result){
                if(result == 1) {
                    $("#loading_box").animate({opacity: 0.0}, 200, function(){
                        $("#loading_box").css("visibility","hidden");
                    });
                    let webId = $('.variant-list').find('.variant-item.active').data('web_id');
                    if ($('.variant-list .variant-item').length <= 1) {
                        webId = $('.variant-list .variant-item').first().data('web_id');
                    }
                    popup.find('#soft_id').val(softId)
                    popup.find('#web_id').val(webId)
                    popup.find('.popup_product_info .popup_product_title').html(variantNameSelected)
                    popup.find('.popup_product_info .popup_product_price').html(priceShow)
                    popup.find('#price_variant').val(priceVariant)
                    popup.bPopup({
                        speed: 450,
                        transition: 'slideDown',
                        zIndex:99999,
                        positionStyle: 'fixed',
                        onOpen: function() {
                            popup.css('visibility', "visible");
                        },
                        onClose: function() {
                            popup.css('visibility', "hidden");
                        }
                    });
                } else {
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

    // Linh kiện
    $('body').on('change', 'input[name=accessory_id]', function() {
        updateOnChangeBuyAccessory();
    })
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

        // return false;
        loadAjax('/ajax/check-instock-service', {
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
                    updatePriceServices(productId);
                },
        });
    }

    function getSelectedVariantId() {
        if ($('.variant-list .variant-item').length <= 1) {
            variantIdSelected = $('.variant-list .variant-item').first().data('variant_id');
        } else {
            variantIdSelected = $('.variant-list').find('.variant-item.active').data('variant_id');
        }
        if (checkEmpty(variantIdSelected)) variantIdSelected = 0;
        return variantIdSelected;
    }

    function getSelectedVariantName() {
        if ($('.variant-list .variant-item').length <= 1) {
            variantNameSelected = $('.variant-list .variant-item').first().data('variant_name');
        } else {
            variantNameSelected = $('.variant-list').find('.variant-item.active').data('variant_name');
        }
        if (checkEmpty(variantNameSelected)) variantNameSelected = '';
        return variantNameSelected;
    }

    function getLocationId() {
        locationIdSelected = $('select#location').val();
        if (checkEmpty(locationIdSelected)) locationIdSelected = 1;
        return locationIdSelected;
    }

    function setOutstockVariant() {
        $.each($('.variant-list .variant-item'), (key, value) => {
            let variantId = parseInt($(value).attr('data-variant_id'));
            let isInstock = instocks.find(x => x.product_id == variantId);
            if (checkEmpty(isInstock)) {
                $(value).find('.product-variation__tick').addClass('out-stock');
                $(value).find('.svg-icon.icon-tick-bold').addClass('out-stock');
            }
        })
    }

    function getInstockByVariant(tmpInstocks = instocks) {
        if (isChoosed) tmpInstocks = tmpInstocks.filter(x => x.product_id == variantIdSelected);
        return tmpInstocks;
    }
    function getInstockByLocation(tmpInstocks = getInstockByVariant()) {
        let locationId = locationIdSelected;
        if (locationId) tmpInstocks = tmpInstocks.filter(x => x.location_id == locationId);
        return tmpInstocks;
    }

    function setOutstockStore(instockByVariant = getInstockByVariant(), instockByLocation = getInstockByLocation()) {
        let locationId = locationIdSelected;
        let liItemOnline = $(`.product-store-list .store-list li[data-location=0]`);
        let liItem = $(`.product-store-list .store-list li[data-location=${locationId}]`);

        // cửa hàng trong popup đơn đặt hàng
        let optionItemOnline = $(`select#customer-store option[data-location=0]`);
        let optionItem = $(`select#customer-store option[data-location=${locationId}]`);

        if (checkEmpty(instockByVariant)) {
            liItemOnline.find('span.status-stock').removeClass('instock').addClass('outstock').html('(Hết hàng)');
            liItem.find('span.status-stock').removeClass('instock').addClass('outstock').html('(Hết hàng)');

            optionItemOnline.prop('disabled', true);
            optionItem.prop('disabled', true);
            return false;
        }
        liItemOnline.find('span.status-stock').removeClass('outstock').addClass('instock').html('(Còn hàng)');
        optionItemOnline.prop('disabled', false);

        if (checkEmpty(instockByLocation)) {
            liItem.find('span.status-stock').removeClass('instock').addClass('outstock').html('(Hết hàng)');

            optionItemOnline.prop('disabled', true);
            optionItem.prop('disabled', true);
            return false;
        }
        liItem.find('span.status-stock').removeClass('outstock').addClass('instock').html('(Còn hàng)');
        optionItem.prop('disabled', false);

        $.each(liItem, (key, value) => {
            let tmpInstocks = instockByLocation;
            let storeId = parseInt($(value).data('id'));
            tmpInstocks = tmpInstocks.find(x => x.store_id == storeId);
            if (checkEmpty(tmpInstocks)) {
                $(value).find('span.status-stock').removeClass('instock').addClass('outstock').html('(Hết hàng)');
            } else {
                $(value).find('span.status-stock').removeClass('outstock').addClass('instock').html('(Còn hàng)');
            }
        })

        $.each(optionItem, (key, value) => {
            let tmpInstocks = instockByLocation;
            let storeId = parseInt($(value).data('id'));
            tmpInstocks = tmpInstocks.find(x => x.store_id == storeId);
            if (checkEmpty(tmpInstocks)) {
                $(value).prop('disabled', true);
            } else {
                $(value).prop('disabled', false);
            }
        })
    }

    function getMessage() {
        let instockByVariant = getInstockByVariant();
        div_button.html(button_chat + button_pre_order)
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

        div_button.html(button_buy_accessory + button_buy_now);
        setDataInButtonBuy();
        return '';
    }

    function setDataInButtonBuy() {
        webId = $('.variant-list').find('.variant-item.active').data('web_id');
        if ($('.variant-list .variant-item').length <= 1) {
            webId = $('.variant-list .variant-item').first().data('web_id');
        }
        div_button.find('.buy').attr('data-web_id', webId)
            .attr('data-product_id', variantIdSelected)
            .attr('data-location_id', locationIdSelected);

        if (!isSync) {
            return false;
        }
        if (isChoosed && !variantIdSelected) {
            div_button.html(button_chat + button_pre_order)
            div_button.find('.buy').attr('data-web_id', webId)
                .attr('data-product_id', variantIdSelected)
                .attr('data-location_id', locationIdSelected);
            return false;
        }
    }

    function setShowMessage() {
        let message = getMessage();
        if (message) {
            div_message.html(message).show();
            // if (isShowCaptchaRegisterProduct()) div_captcha.show();
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
        $('.product-price-box .price-product .price').attr('data-price', 0);
        if (variantItem.hasClass('active')) {
            let price = parseInt($('.variants .variant-item.active').data('price'));
            priceVariant = price == 0 ? 0 : (price + extraPrice);
            priceShow = format_price(priceVariant);
            $('.product-price-box .price-product .price').attr('data-price', priceVariant);
            $('.product-price-box .price-product .price').html(priceShow);
            $('.product-content-right .product-summary-price').html(priceShow);
            return false;
        }
        let min = 68000000;
        let max = 0;
        $.each(variantItem, function() {
            let value = parseInt($(this).data('price'));
            min = value && (value < min) ? value : min;
            max = (value > max) ? value : max;
        });
        min += extraPrice;
        max += extraPrice;
        priceVariant = min;
        priceShow = format_price(min);
        // if (min < 68000000 && max > 0 && min != max) priceShow = format_price(min) + ' - ' + format_price(max);
        $('.product-price-box .price-product .price').html(priceShow);
        $('.product-price-box .price-product .price').attr('data-price', priceVariant);
        $('.product-content-right .product-summary-price').html(priceShow);
    }

    function removeRequiredMessage() {
        let variants = div_product.find('.variants');
        variants.removeClass('required').find('.error-message').remove();
    }

    function updateVariantName() {
        let isServicesPriceTable = $('#services_price_table').length;
        if (isServicesPriceTable)
            $('#services_price_table > .show-variant-name').remove();
        else
            $('.variants > .show-variant-name').remove();

        if (variantNameSelected) {
            let price = $('.product-price-box .price-product .price').html();
            if (isServicesPriceTable)
                $('#services_price_table > table').after(`<div class="show-variant-name">${ variantNameSelected }: ${ price }</div>`);
            else
                $('.variants > .variant-list').after(`<div class="show-variant-name">${ variantNameSelected }: ${ price }</div>`);
        }
    }

    function updateOnChange() {
        setPrice();
        setDataInButtonBuy();
        updateVariantName();
        if (!isSync) return false;
        setOutstockStore();
        setShowPromotionBox();
        setShowMessage();
        removeRequiredMessage();
    }


    // Mua linh kiện
    var instockAccessory = [];
    function getSaleAccessory() {
        if (!isSaleAccessory) return false;
        let variantIds = [];
        $.each($('.variant-list .variant-item'), (key, value) => {
            let variantId = parseInt($(value).attr('data-variant_id'));
            if (variantId) variantIds.push(variantId)
        });

        loadAjax('/ajax/get-sale-accessory', {
                'variant_ids': variantIds,
            }, {
                success: function(result) {
                    let accessoryList = ``;
                    if (!checkEmpty(result.info_accessory)) {
                        $.each(result.info_accessory, (key, value) => {
                            accessoryList += accessoryItem(value);
                        })
                    }
                    instockAccessory = result.info_instock;
                    if (checkEmpty(instockAccessory)) {
                        $('#popup-buy-accessory .popup_main').html('<p class="m-2 text-center" style="margin: 30px">Dịch vụ không có linh kiện!</p>');
                        return false;
                    }
                    updateOnChangeBuyAccessory();
                    $('.accessory-list').html(accessoryList);
                },
        });
    }

    function accessoryItem(data) {
        return `
            <div class="item">
                <input type="radio"
                    name="accessory_id"
                    id="accessory_id_${ data.id }"
                    class="accessory"
                    data-price="${ data.price }"
                    data-id="${ data.id }"
                    data-extra_prices=${JSON.stringify(data.extra_prices)}
                >
                <span class="checkmark"></span>
                <label for="accessory_id_${ data.id }" class="label-detail">
                    <div class="item__detail" for="accessory_id_${ data.id }">
                        <div class="item__name">${ data.variant_name }</div>
                        <div class="item__price">Giá: ${ format_price(data.price) }</div>
                        <div class="item__warranty">Bảo hành ${ data.show_warranty }</div>
                    </div>
                </label>
            </div>
        `;
    }

    function getAccessoryLocationId() {
        return parseInt($('#popup-buy-accessory .location').val());
    }

    function getAccessoryInstockByVariant(tmpInstocks = instockAccessory) {
        let getChooseAccesory = $('#popup-buy-accessory input[name=accessory_id]:checked');
        if (getChooseAccesory.length) tmpInstocks = tmpInstocks.filter(x => x.product_id == getChooseAccesory.data('id'));
        return tmpInstocks;
    }

    function getAccessoryInstockByLocation(tmpInstocks = getAccessoryInstockByVariant()) {
        let locationId = getAccessoryLocationId();
        if (locationId) tmpInstocks = tmpInstocks.filter(x => x.location_id == locationId);
        return tmpInstocks;
    }

    function setAccessoryOutstockStore(instockAccessoryByVariant = getAccessoryInstockByVariant(), instockAccessoryByLocation = getAccessoryInstockByLocation()) {
        let locationId = getAccessoryLocationId();
        let liItemOnline = $(`#popup-buy-accessory .product-store-list .store-list li[data-location=0]`);
        let liItem = $(`#popup-buy-accessory .product-store-list .store-list li[data-location=${locationId}]`);

        if (checkEmpty(instockAccessoryByVariant)) {
            console.log('het')
            liItemOnline.find('span.status-stock').removeClass('instock').addClass('outstock').html('(Hết hàng)');
            liItem.find('span.status-stock').removeClass('instock').addClass('outstock').html('(Hết hàng)');
            return false;
        }
        liItemOnline.find('span.status-stock').removeClass('outstock').addClass('instock').html('(Còn hàng)');

        if (checkEmpty(instockAccessoryByLocation)) {
            liItem.find('span.status-stock').removeClass('instock').addClass('outstock').html('(Hết hàng)');
            return false;
        }
        liItem.find('span.status-stock').removeClass('outstock').addClass('instock').html('(Còn hàng)');

        $.each(liItem, (key, value) => {
            let tmpInstocks = instockAccessoryByLocation;
            let storeId = parseInt($(value).data('id'));
            tmpInstocks = tmpInstocks.find(x => x.store_id == storeId);
            if (checkEmpty(tmpInstocks)) {
                $(value).find('span.status-stock').removeClass('instock').addClass('outstock').html('(Hết hàng)');
            } else {
                $(value).find('span.status-stock').removeClass('outstock').addClass('instock').html('(Còn hàng)');
            }
        })
    }

    var button_accessory_add_to_cart = `<div class="action action-btn-buynow"><a href="javascript:;" data-product_type="accessory_variants" data-product_id="0" data-location_id="1" class="buy buy-now btn-add-cart">Mua ngay</a></div>`;
    var button_accessory_buy_now =  `<div class="action add-to-cart"><a href="javascript:;" data-product_type="accessory_variants" data-product_id="0" data-location_id="1" class="buy btn-add-cart add-to-cart">Thêm vào giỏ</a></div>`;
    var button_accessory_register = `<div class="action register"><a href="javascript:;" data-product_type="accessory_variants" data-product_id="0" data-location_id="1" class="buy register btn-add-cart">ĐẶT HÀNG TRƯỚC</a></div>`;

    function getAccessoryMessage() {
        let instockByVariant = getAccessoryInstockByVariant();
        $(`#popup-buy-accessory .action_list`).html(button_accessory_chat + button_accessory_register)
        setAccessoryDataInButtonBuy();
        // Hết hàng toàn cửa hàng
        if (checkEmpty(instockAccessory)) {
            return message_out_stock;
        }

        // Sp hết hàng ở khu vực (không lọc biến thể)
        if (checkEmpty(getAccessoryInstockByLocation(instockAccessory))) {
            return message_out_stock_location;
        }

        // Hết hàng theo phiên bản tất cả khu vực
        if (checkEmpty(instockByVariant)) {
            return message_out_stock_variant_all_location;
        }

        // Hết hàng theo phiên bản và khu vực
        if (checkEmpty(getAccessoryInstockByLocation(instockByVariant))) {
            return message_out_stock_variant_this_location;
        }

        // // Chỉ còn hàng onl
        // tmpInstocks = instockByVariant.filter(x => x.store_id != 0);
        // if (checkEmpty(tmpInstocks)) {
        //     return message_instock_online;
        // }

        $(`#popup-buy-accessory .action_list`).html(button_accessory_add_to_cart + button_accessory_buy_now);
        setAccessoryDataInButtonBuy();
        return '';
    }

    function setAccessoryShowMessage() {
        let message = getAccessoryMessage();
        if (message) {
            $('#popup-buy-accessory .accessory-product-messsage').html(message).show();
            // if (isShowCaptchaRegisterProduct()) div_captcha.show();
            return false;
        }
        $('#popup-buy-accessory .accessory-product-messsage').html('').hide()
    }

    function getAccessoryPrice() {
        let getChooseAccesory = $('#popup-buy-accessory input[name=accessory_id]:checked');

        if (!getChooseAccesory.length) {
            $('#popup-buy-accessory .total-accessory-price').html('0 đ');
            return false;
        }

        let extraPrice = JSON.parse($(getChooseAccesory).attr('data-extra_prices'));
        let locationId = getAccessoryLocationId();
        let extra = 0;
        if (!checkEmpty(extraPrice[locationId])) {
            extra = extraPrice[locationId];
        }
        $('#popup-buy-accessory .total-accessory-price').html(format_price($(getChooseAccesory).data('price') + extra));
    }

    function setAccessoryDataInButtonBuy() {
        let getChooseAccesory = $('#popup-buy-accessory input[name=accessory_id]:checked').data('id');
        $(`#popup-buy-accessory .action_list`).find('.buy').attr('data-product_id', getChooseAccesory).attr('data-location_id', getAccessoryLocationId());
    }

    function updateOnChangeBuyAccessory() {
        setAccessoryOutstockStore();
        getAccessoryPrice();
        setAccessoryShowMessage();
    }

    function updateStatusInstock(isInstock = false) {
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'POST',
            url: '/admin/services/update-status-instock',
            data: {
                id: productId,
                is_instock: isInstock ? 1 : 0,
            }
        })
    }
    /** Update giá ở dịch vụ */
    function updatePriceServices(id) {
        var price = $('.product-price-box .price-product .price').attr('data-price');
        var price_old = $('.product-price-box .price-product .before_price').val();
        if(price_old === price) {
            return false;
        }
        $.ajax({
            url: '/ajax/update-price-service',
            type: "POST",
            data: {
                id: id,
                price: price,
            },
            success: function(result) {
                return true;
            },
        });
    }
});