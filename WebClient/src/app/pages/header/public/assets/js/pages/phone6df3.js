$(document).ready(function() {
    openPopup('.buy-now', '.popup');
    closePopup('.popup_close', '.popup');

    // remove menu-home-mobile
    $('.menu-home-mobile').css('display', 'none');

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
        responsive: [{
                breakpoint: 768,
                settings: {
                    item: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    item: 3,
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
    // Hiển thị tất cả và ẩn bài viết giới trong Sản phẩm
    $(".product-detail-content").each(function(index) {
        console.log($(this).height());
        if ($(this).height() > 1550) {
            $(this).addClass('more-height');
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
        $(this).parent().parent().children('.product-detail-content').css('height', 'auto');
        $(this).parent().parent().children('.box_shadow').css('display', 'none');
    });
    $('#product-detail-viewdefault').click(function() {
        $(this).css('display', 'none');
        $(this).parent().css('position', 'absolute');
        $(this).parent().children('#product-detail-viewall').css('display', 'inline-block');
        $(this).parent().parent().children('.box_shadow').css('display', 'block');
        $(this).parent().parent().children('.product-detail-content').animate({ height: '1550px' }, 1000);
    });
    // Box phụ
    $('.product-detail-viewall').click(function() {
        $(this).css('display', 'none');
        $(this).parent().css('position', 'relative');
        $(this).parent().children('.product-detail-viewdefault').css('display', 'inline-block');
        $(this).parent().parent().children('.product-detail-content').css('height', 'auto');
        $(this).parent().parent().children('.box_shadow').css('display', 'none');
    });
    $('.product-detail-viewdefault').click(function() {
        $(this).css('display', 'none');
        $(this).parent().css('position', 'absolute');
        $(this).parent().children('.product-detail-viewall').css('display', 'inline-block');
        $(this).parent().parent().children('.box_shadow').css('display', 'block');
        $(this).parent().parent().children('.product-detail-content').animate({ height: '1550px' }, 500);
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
    // set height video bằng với thông tin sản phẩm
    // function responsiveVideoReview(event){
    //     let div_video_box = $('.product-video-box .product-video-content');
    //     if(div_video_box.length == 0) return;
    //     let height_div_info = $('.product-info-box .product-info-content').height();
    //     // let x = document.getElementById('slide_video').getElementsByTagName('img')[0].clientHeight;
    //     // console.log(x);
    //     // console.log(height_div_info, $(div_video_box.find('#slide_video .item img')[0]).height(), div_video_box.find('#slide_video .item img')[0].clientHeight, $(div_video_box.find('#slide_video .item img')[0]));
    //     // console.log(div_video_box.find('#slide_video'));
    //     // div_video_box.find('.iframe').css('height', height_div_info - div_video_box.find('#slide_video img').first().height());
    //     div_video_box.find('.iframe').css('height', height_div_info - 165-20);

    // }
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
        responsive: {
            0: { items: 3 },
            600: { items: 3 },
            1000: { items: 3 }
        },
        // onInitialized: responsiveVideoReview
    });
    $(".owl-prev").html('<i class="fa fa-chevron-left" aria-hidden="true"></i>');
    $(".owl-next").html('<i class="fa fa-chevron-right" aria-hidden="true"></i>');

    function init() {
       $('#slider_video_home .iframe').each(function(index) {
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
            $('.rating-star').append('<i class="fa start fa-star" data-value="' + j + '" aria-hidden="true"></i>');
        }
        for (var i = 0; i < 5 - value_star; i++) {
            j++;
            $('.rating-star').append('<i class="fa start fa-star-o" data-value="' + j + '" aria-hidden="true"></i>');
        }
    });

    // Fix box mua ngay tại trang sảm phẩm
    var boxParentFullHeight = $('.product-content-right').outerHeight() - $('.product-summary .product-summary-price').height();
    var boxParentWidth = $('.product-content-right').width();
    // var boxChildOffset = $('.product-summary').offset();
    // var startFix = boxChildOffset.top;
    var div_content_right = $('.fix-content-right');
    $(window).scroll(function() {
        var startFix = div_content_right.offset().top;
        var yaBox = div_content_right.outerHeight();
        var endFix = startFix + yaBox - boxParentFullHeight;
        var fromTop = jQuery(document).scrollTop();
        if (fromTop > startFix) {
            if (fromTop > endFix) {
                var stopFix = yaBox - boxParentFullHeight - $('.product-summary .buy-box-v2').height() - $('.product-summary .product-summary-price').height();
                $('.product-summary').css({ 'position': 'absolute', 'top': stopFix });
            } else {
                $('.product-summary').css({ 'position': 'fixed', 'top': '54px', 'width': boxParentWidth });
            }
        } else {
            $('.product-summary').css({ 'position': 'relative', 'top': '0', 'width': '100%' });
        }
    });

    // scroll
    $('body').on('click', '.product-content-box .product-related-box .nav-next', function() {
        let div_product_list = $(this).closest('.product-related-box').find('.product-related-list');
        div_product_list.animate({ scrollTop: div_product_list.scrollTop() + div_product_list.find('.product-related-item').first().height() + 5 }, 500);
    });
    $('body').on('click', '.product-content-box .product-related-box .nav-prev', function() {
        let div_product_list = $(this).closest('.product-related-box').find('.product-related-list');
        div_product_list.animate({ scrollTop: div_product_list.scrollTop() - (div_product_list.find('.product-related-item').first().height() + 5) }, 500);
    });
    $('body').on('click', '.container > .product-related-box .nav-next', function() {
        let div_product_list = $(this).closest('.product-related-box').find('.product-related-list');
        div_product_list.animate({ scrollLeft: div_product_list.scrollLeft() + div_product_list.find('.product-related-item').first().width() + 20 }, 500);
    });
    $('body').on('click', '.container > .product-related-box .nav-prev', function() {
        let div_product_list = $(this).closest('.product-related-box').find('.product-related-list');
        div_product_list.animate({ scrollLeft: div_product_list.scrollLeft() - (div_product_list.find('.product-related-item').first().width() + 20) }, 500);
    });
});

// Thao tác với biến thể
function doChooseVariant(pv) {
    // Click biến thể
    $('body').on('click', '.product-content-box .product-price-content .attribute-item', function(e) {
        if ($(this).hasClass('disabled')) return;
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).parent().find('.attribute-item').removeClass('active');
            $(this).addClass('active');
        }
    });
    $('body').on('click', '.product-content-box .product-price-content .attribute-item:not(.warranty-item)', function(e) {
        pv.updatePrice();
        pv.updateButtonBuy();
    });

    // Click BHV
    $('body').on('click', '.product-content-box .product-price-content .warranty-item', function(e) {
        let div_warranty_box = $('.warranty-default-box');
        let text_warranty_content_default = div_warranty_box.find('.warranty-content-default');
        let text_warranty_content_selected = div_warranty_box.find('.warranty-content-selected');
        let text_warranty_price = $(this).closest('.warranty-list').find('.price-warranty');
        let selected_name_warranty = '';
        if ($(this).hasClass('active')) {
            text_warranty_price.show().text(`+${format_price($(this).data('warranty_price'))}`);
            div_warranty_box.find('.warranty-text').show();
            if (text_warranty_content_default.length) {
                selected_name_warranty = ', ';
            }
            selected_name_warranty = selected_name_warranty + $(this).text();
        } else {
            text_warranty_price.attr('style', 'display: none !important').text(``);
            if (!text_warranty_content_default.length) {
                div_warranty_box.find('.warranty-text').hide();
            }
        }
        text_warranty_content_selected.text(selected_name_warranty);
        pv.updateButtonBuy();
    });

    // Ấn nút màu để đổi hình
    function doChooseColor(color_item) {
        if ($(color_item).hasClass('disabled')) return;
        let img = $('.product-content-box .product-slide-image .product_image li').has('img[data-color="' + $(color_item).data('color_id') + '"]');
        if (img.length) {
            $('.product-content-box .product-slide-image .product_image li').removeClass('active');
            img.addClass('active');
        }
        if ($(color_item).hasClass('active')) {
            $(color_item).closest('.color-list').find('.color-name-selected').show().text($(color_item).data('title'));
        } else {
            $(color_item).closest('.color-list').find('.color-name-selected').attr('style', 'display: none !important');
        }
    }
    $('body').on('click', '.product-content-box .color-item', function(e) {
        doChooseColor(this);
    });

    // Thay đổi địa điểm
    $('body').on('change', '.product-content-box select#location', function() {
        let val = $(this).val();
        $('.product-content-box select#location-message').val(val);
        $('.store-list ul li').css('display', 'none');
        $('.store-list ul').find(`li[data-location=0]`).css('display', 'list-item');
        $('.store-list ul').find(`li[data-location=${ val }]`).css('display', 'list-item');
        //thay đổi thông tin khuyến mãi theo địa điểm
        $('.v2-promotion .promotion-location').css('display', 'none');
        $(`.v2-promotion .promotion-location.location_${ val }`).css('display', 'block');

        pv.updateButtonBuy();
        pv.updatePrice();
    });

    $('body').on('change', '.product-content-box select#location-message', function() {
        let val = $(this).val();
        $('.product-content-box select#location').val(val);
        $('.store-list ul li').css('display', 'none');
        $('.store-list ul').find(`li[data-location=0]`).css('display', 'list-item');
        $('.store-list ul').find(`li[data-location=${ val }]`).css('display', 'list-item');
        pv.updateButtonBuy();
        pv.updatePrice();
    });
    // Chọn biến thể rẻ nhất
    function autoSelectCheapestVariant() {
        try {
            let variants = pv.phone_variants;
            let div_attribute_group = $('.product-price-content .attribute-group');
            if (div_attribute_group.length == 0 || variants.length == 0) return;

            // Lấy giá nhỏ nhất
            let min_price = variants.reduce(function(min_price, variant) {
                return min_price <= variant.price ? min_price : variant.price;
            }, Infinity);
            // Tìm các biến thể rẻ nhất
            let cheapest_variants = variants.filter(function(variant) {
                return variant.price == min_price;
            });
            // console.log(min_price, cheapest_variants);
            // Chọn thuộc tính màu
            let div_color_list = div_attribute_group.find('.color-list .attribute-item');
            if (div_color_list.length) {
                $.each(div_color_list, function(index, element) {
                    let color_id = Number($(element).data('color_id') ?? 0);
                    // Nếu có thuộc tính này trong biến thể rẻ nhất thì chọn
                    let check_variant = cheapest_variants.find(function(variant) {
                        return variant.color == color_id;
                    });
                    if (check_variant != undefined) {
                        // add class active
                        $(element).addClass('active');
                        doChooseColor(element);
                        return false;
                    }
                });
            }
            // Chọn thuộc tính bộ nhớ
            let div_storage_list = div_attribute_group.find('.storage-list .attribute-item');
            if (div_storage_list.length) {
                $.each(div_storage_list, function(index, element) {
                    let storage_id = Number($(element).data('storage_id') ?? 0);
                    // Nếu có thuộc tính này trong biến thể rẻ nhất thì chọn
                    let check_variant = cheapest_variants.find(function(variant) {
                        return variant.storage == storage_id;
                    });
                    if (check_variant != undefined) {
                        // add class active
                        $(element).addClass('active');
                        return false;
                    }
                });
            }
            // Chọn thuộc tính tình trạng
            let div_aspect_list = div_attribute_group.find('.aspect-list .attribute-item');
            if (div_aspect_list.length) {
                $.each(div_aspect_list, function(index, element) {
                    let aspect_id = Number($(element).data('aspect_id') ?? 0);
                    // Nếu có thuộc tính này trong biến thể rẻ nhất thì chọn
                    let check_variant = cheapest_variants.find(function(variant) {
                        return variant.aspect == aspect_id;
                    });
                    if (check_variant != undefined) {
                        // add class active
                        $(element).addClass('active');
                        return false;
                    }
                });
            }
            // Chọn thuộc tính nguồn gốc
            let div_origin_list = div_attribute_group.find('.origin-list .attribute-item');
            if (div_origin_list.length) {
                $.each(div_origin_list, function(index, element) {
                    let origin_id = Number($(element).data('origin_id') ?? 0);
                    // Nếu có thuộc tính này trong biến thể rẻ nhất thì chọn
                    let check_variant = cheapest_variants.find(function(variant) {
                        return variant.origin == origin_id;
                    });
                    if (check_variant != undefined) {
                        // add class active
                        $(element).addClass('active');
                        return false;
                    }
                });
            }
        } catch (error) {
            console.error(error);
        }

    }

    // init
    // autoSelectCheapestVariant();
    pv.updatePrice();
    pv.showButtonAndMessage();

}
/** Xử lý biến thể của điện thoại đồng bộ */
function showInfoVariantSync(phone_variants, extra_prices, phone_id, instock_status) {
    class PhoneVariant {
        phone_variants = {};
        extra_prices = {};
        instocks = {};
        phone_variant_ids = {};

        div_product = $('.product-content-box');
        div_captcha = $('.product-captcha');
        div_button = $('.buy-box-v2');
        div_status_box = $('.product-content-box .status-box');
        div_message = $('.product-messsage');
        div_product_store_list = $('.product-store-list');
        div_store_list = $('.product-store-list .store-list');

        button_buy_now = `<a href="javascript::" data-product_type="phone_variants" class="buy buy-now v2-buy">MUA NGAY</a>`;
        button_add_to_cart = `<a href="javascript::" data-product_type="phone_variants" class="buy add-to-cart v2-buy"><div class="icon"></div><span>THÊM VÀO GIỎ HÀNG</span></a>`;
        button_out_stock = `<a href="javascript::"  class="buy-now disabled">Hết hàng</a>`;
        button_register = `<a href="#" class="buy register" data-product_type="phone_variants">ĐẶT HÀNG TRƯỚC</a>`;
        button_chat = `<a href="${$('.mobilecity-messenger').attr('href') ?? 'javascript:;'}" rel ="nofollow" target="_blank" class="chat">CHAT TƯ VẤN</a>`;
        button_pre_order = `<a href="javascript:;" data-product_id="${ phone_id }" data-variant_id="0" data-service_product_id="0" class="pre-order">ĐẶT HÀNG TRƯỚC</a>`;

        message_not_sync = `<p class="message">Phiên bản hiện tại đang tạm hết hàng, quý khách vui lòng liên hệ để được tư vấn hoặc đặt hàng trước hoặc chọn phiên bản khác!</p>`;
        message_stop_business = `<p class="message">Sản phẩm đã ngừng kinh doanh, quý khách vui lòng liên hệ để được tư vấn hoặc tham khảo sản phẩm tương tự!</p>`;
        message_out_stock = `<p class="message">Sản phẩm hiện tại đang tạm hết hàng, quý khách có thể đặt trước sản phẩm hoặc tham khảo sản phẩm tương tự!</p>`;
        message_instock_online = `<p class="message">Còn hàng bán online!</p>`;
        message_out_stock_location = `<p class="message">Sản phẩm đang tạm hết hàng ở khu vực này. Bạn có thể đặt trước sản phẩm này hoặc chọn khu vực khác!</p>`;
        message_out_stock_variant_this_location = `<p class="message">Phiên bản đã chọn ở khu vực này đang tạm hết hàng, quý khách có thể đặt trước sản phẩm hoặc chọn khu vực khác!`;
        message_out_stock_variant_all_location = `<p class="message">Phiên bản đã chọn đang tạm hết hàng, quý khách vui lòng chọn phiên bản khác hoặc đặt trước sản phẩm!`;

        status_message_out_stock = 'Hết hàng';
        status_message_in_stock = 'Còn hàng';

        color_selected_id = 0;
        aspect_selected_id = 0;
        origin_selected_id = 0;
        storage_selected_id = 0;

        count_attribute_type = 0;
        error = 0;

        constructor(phone_variants, extra_prices, phone_id = 0, instock_status) {
            this.phone_variants = phone_variants;
            this.extra_prices = extra_prices;
            this.phone_id = phone_id;

            this.count_attribute_type = this.div_product.find('.attribute-group .attribute-list').length;
            this.phone_variant_ids = this.phone_variants.map(function(variant) {
                return variant.soft_id;
            }).filter(function(value) {
                return value > 0;
            });
        }

        // Hiển thị nút và tin nhắn lúc đầu
        showButtonAndMessage() {
            this.getInstock();
        }

        // Lấy dữ liệu tồn kho
        getInstock() {
            let pv = this;
            let is_stock = 0;
            loadAjax('/ajax/check-instock-all-location', {
                'product_id': pv.phone_variant_ids,
                'product_type': 'phone_variants',
                'only_total': 0 // Get in store
            }, {
                beforeSend: function() {},
                success: function(result) {
                    if (!result.success) {
                        // alertMessage(result.message);
                        // pv.div_status_box.find('span').html(pv.status_message_out_stock);
                        pv.div_button.html(pv.button_chat + pv.button_pre_order);
                        pv.error = 1;
                        updateIsStockProduct(phone_id, 0);
                    } else {
                        pv.instocks = result.data;
                        let status_message_tmp = pv.status_message_in_stock;
                        if (pv.instocks.length <= 0) {
                            status_message_tmp = pv.status_message_out_stock;
                        }

                        pv.div_status_box.find('span').html(status_message_tmp);
                        pv.mixInstockDataAndVariant();
                        pv.updateButtonBuy();
                        pv.div_status_box.show();
                        pv.updateAttributeInstock(false);
                        if (pv.isInstock()) {
                            is_stock = 1;
                        }
                        updateIsStockProduct(phone_id, is_stock);
                    }
                    $('.attribute-group, .warranty-list').show();
                    $('.price-product').show();
                },
                error: function(error) {
                    // alertMessage('Rất tiếc đã có lỗi trong kiểm tra tồn kho! Vui lòng thử lại!');
                    // pv.div_button.html(pv.button_chat);
                    // pv.error = 1;
                    // $('.attribute-group, .warranty-list').show();
                    // $('.price-product').show();
                },
            });
        }

        // Cập nhật nút mua hàng
        updateButtonBuy() {
                $('.store-list li .status-stock').removeClass('instock').addClass('outstock').html('(Hết hàng)');
                // this.updateAttributeInstock();
                if (this.error) return;
                // Check đồng bộ
                if (this.isNotSync()) {
                    this.updateStatusNotSync();
                    return;
                }
                let status_message_tmp = this.status_message_out_stock;
                // sau khi check tồn kho
                if (!this.isInstock()) {
                    this.updateStatusOutStock(this.message_out_stock);
                } else {
                    // Còn hàng
                    let location = this.div_product.find('.price_location select#location').val() ?? 1;
                    let instock_data = this.getInstockByLocation(location);

                    if (instock_data.length == 0) { // Hết hàng ở tất cả biến thể trong khu vực này
                        this.updateStatusOutStock(this.message_out_stock_location, true);

                        let instock_data_all_location = this.getInstockByLocation(0, true);
                        // khu vực khác còn hàng => hiển thị còn hàng cho cửa hàng onl
                        if (instock_data_all_location.length != 0) {
                            $('.store-list').find(`li[data-id=0] .status-stock`).removeClass('outstock').addClass('instock').html('(Còn hàng)');
                        }
                    } else {
                        // check hàng ở khu vực
                        instock_data = this.getInstockByLocation(location, true);
                        if (instock_data.length == 0) {
                            // Không có biến thể ở khu vực này
                            let instock_data_all_location = this.getInstockByLocation(0, true);
                            if (instock_data_all_location.length == 0) {
                                // Không có biến thể này ở tất cả khu vực
                                this.updateStatusOutStock(this.message_out_stock_variant_all_location);
                            } else {
                                // Chỉ hết biến thể ở khu vực này
                                $('.store-list').find(`li[data-id=0] .status-stock`).removeClass('outstock').addClass('instock').html('(Còn hàng)');
                                this.updateStatusOutStock(this.message_out_stock_variant_this_location, true);
                            }
                        } else {
                            // Còn hàng thì show cửa hàng
                            $('.store-list').find(`li[data-id=0] .status-stock`).removeClass('outstock').addClass('instock').html('(Còn hàng)');
                            this.div_captcha.hide();

                            let stores = this.getStores(instock_data);
                            this.showPromotionBox();
                            if (stores.length == 0) { // Chỉ còn hàng bán online
                                //    this.div_store_list.html(this.message_instock_online);
                                this.updateStatusOutStock(this.message_instock_online, false);
                            } else {
                                stores.forEach(store => {
                                    $('.store-list').find(`li[data-id=${ store.store_id }] .status-stock`).removeClass('outstock').addClass('instock').html('(Còn hàng)');
                                });
                            }
                            // Hiển thị nút mua hàng
                            this.div_button.html(this.button_add_to_cart + this.button_buy_now);
                            // this.div_product_store_list.show();
                            this.div_message.hide();
                            status_message_tmp = this.status_message_in_stock;
                        }
                    }
                }
                // this.div_status_box.find('span').html(status_message_tmp);
                // Cập nhật param cho nút mua hàng
                this.updateParamButtonBuy();
            }
            // Ẩn box khuyến mãi để hiển thị thông báo
        hiddenPromotionBox() {
                if ($(window).width() > 768) {
                    $('.product-price-box .v2-promotion, .product-price-box .product-info-general, .product-price-box .warranty-default-box, .product-price-box .deal-combo-box').css({ 'opacity': 0, 'visibility': 'hidden' });
                } else {
                    $('.product-price-box .v2-promotion, .product-price-box .product-info-general, .product-price-box .warranty-default-box, .product-price-box .deal-combo-box').css({ 'display': 'none' });
                }
            }
            // Hiển thị box khuyến mãi khi không hiển thị thông báo
        showPromotionBox() {
                if ($(window).width() > 768) {
                    $('.product-price-box .v2-promotion, .product-price-box .product-info-general, .product-price-box .warranty-default-box, .product-price-box .deal-combo-box').css({ 'opacity': 1, 'visibility': 'visible' });
                } else {
                    $('.product-price-box .v2-promotion, .product-price-box .product-info-general, .product-price-box .warranty-default-box, .product-price-box .deal-combo-box').css({ 'display': 'block' });
                }
            }
            // Hiển thị thông báo hết hàng
        updateStatusOutStock(message, is_show_in_div_message = true) {
                if (this.error) return;
                if (is_show_in_div_message) {
                    this.div_message.html(message);
                    // this.div_product_store_list.attr('style', 'display:none !important');
                    // this.div_store_list.html(``);
                    this.div_message.show();
                    // Ẩn box khuyến mãi
                    this.hiddenPromotionBox();

                } else {
                    // this.div_store_list.html(message);
                    // this.div_product_store_list.show();
                    this.div_message.hide();
                }
                // Hiển thị captcha
                if (isShowCaptchaRegisterProduct()) {
                    this.div_captcha.show();
                }
                // Đổi tên trạng thái còn hàng
                // this.div_status_box.find('span').html(this.status_message_out_stock);

                this.div_button.html(this.button_chat + this.button_register);
            }
            // Hiển thị thông báo chưa đồng bộ
        updateStatusNotSync() {
                this.div_button.html(this.button_chat + this.button_pre_order);
                this.div_message.html(this.message_not_sync);
                // this.div_product_store_list.hide();
                this.div_message.show();
                this.hiddenPromotionBox();
                // this.div_status_box.find('span').html(this.status_message_out_stock);

                let dataVariantId = 0;
                let dataServiceProductId = this.div_product.find('.warranty-item.active').data('warranty_id') ?? 0;
                if (this.isSelectedFullAttribute()) {
                    let current_variant = this.getCurrentVariant();
                    dataVariantId = current_variant.id;
                }
                $('.buy-box-v2 .pre-order').attr('data-variant_id', dataVariantId).attr('data-service_product_id', dataServiceProductId);
            }
            // Cảnh báo chọn biến thể
        addRequiredAttribute() {
            let attributeGroup = this.div_product.find('.attribute-group');
            // attributeGroup.find('.error-message').remove();
            if (!attributeGroup.hasClass('required') && !pv.isSelectedFullAttribute()) {
                attributeGroup.append(`<p class="error-message">Vui lòng chọn phiên bản!</p>`);
                attributeGroup.addClass('required');
            }
            if (attributeGroup.hasClass('required')) {
                $('html, body').animate({
                    scrollTop: attributeGroup.offset().top - 50
                }, 300);
            }
        }
        removeRequiredAttribute() {
            let attributeGroup = this.div_product.find('.attribute-group');
            if (attributeGroup.hasClass('required') && pv.isSelectedFullAttribute()) {
                attributeGroup.find('.error-message').remove();
                attributeGroup.removeClass('required');
            }
        }

        // Ghép dữ liệu tồn kho và biến thể để dễ dàng tìm kiếm
        mixInstockDataAndVariant() {
                this.instocks.forEach(element => {
                    let variant_tmp = this.phone_variants.find(function(v) {
                        return v.soft_id == element.product_id;
                    });

                    element['variant'] = variant_tmp;
                }, this);
            }
            // Lấy dữ liệu tồn kho theo miền
        getInstockByLocation(location = 0, check_attribute = false) {
                if (check_attribute) this.getCurrentAttribute();
                return this.instocks.filter(function(data) {
                    return data.quantity > 0 && (!location || data.location_id == location) &&
                        (!check_attribute || ((!this.color_selected_id || data.variant.color == this.color_selected_id) &&
                            (!this.origin_selected_id || data.variant.origin == this.origin_selected_id) &&
                            (!this.aspect_selected_id || data.variant.aspect == this.aspect_selected_id) &&
                            (!this.storage_selected_id || data.variant.storage == this.storage_selected_id)));
                }, this);
            }
            // Kiểm tra biến thể không đồng bộ
        isNotSync() {
                let sync_product = this.getSelectedVariants().find(function(variant) {
                    return variant.soft_id > 0;
                });
                return sync_product == undefined;
            }
            // Kiểm tra còn hàng
        isInstock(location = 0, check_attribute = false) {
            if (check_attribute) this.getCurrentAttribute();
            let f = this.instocks.find(function(data) {
                if (data.quantity > 0 && (location == 0 || data.location_id == location) &&
                    (!check_attribute || ((!this.color_selected_id || data.variant.color == this.color_selected_id) &&
                        (!this.origin_selected_id || data.variant.origin == this.origin_selected_id) &&
                        (!this.aspect_selected_id || data.variant.aspect == this.aspect_selected_id) &&
                        (!this.storage_selected_id || data.variant.storage == this.storage_selected_id)))) {
                    return data;
                }
            }, this);
            return typeof f !== 'undefined';
        }

        // Lấy thông tin cửa hàng
        getStores(data) {
            let obj = {};
            let result = [];
            data.forEach(function(v) {
                v['store'].forEach(function(store) {
                    if (typeof obj[store.store_id] === 'undefined') {
                        result.push({
                            'store_id': store.store_id,
                            'address': store.address
                        });
                        obj[store.store_id] = true;
                    }
                });
            })
            return result;
        }

        // Cập nhật giá
        updatePrice() {
            let div_price = $('.product-content-box .price-and-color .price, .product-content-box .product-order .price, .product-content-box .product-content-right .product-summary-price');

            let min_price = -1;
            let max_price = -1;
            this.getCurrentAttribute();
            this.phone_variants.forEach(function(variant) {
                if ((this.color_selected_id && variant.color != this.color_selected_id) || (this.storage_selected_id && variant.storage != this.storage_selected_id) ||
                    (this.origin_selected_id && variant.origin != this.origin_selected_id) || (this.aspect_selected_id && variant.aspect != this.aspect_selected_id)) {
                    return false;
                }
                if (variant.price > max_price) {
                    max_price = variant.price;
                }
                if (min_price == -1 || variant.price < min_price) {
                    min_price = variant.price;
                }
            }, this);

            // price
            if (max_price < 0) {
                div_price.text('');
                return;
            }

            // let price_warranty = Number(this.div_product.find('.warranty-item.active').data('warranty_price') ?? 0);

            let location = this.div_product.find('select#location').val();
            let extra_price = this.extra_prices[location] ?? 0;
            min_price += extra_price; // + price_warranty;
            max_price += extra_price; // + price_warranty;

            // if (min_price == max_price) {
            //     div_price.text(format_price(min_price));
            // } else if (min_price >= 68000000) {
            //     div_price.text(format_price(min_price));
            // } else {
            //     div_price.text(format_price(min_price) + ' - ' + format_price(max_price));
            // }
            div_price.text(format_price(min_price));
        }

        // lấy thông tin thuộc tính
        getCurrentAttribute() {
            this.color_selected_id = this.div_product.find('.color-item.active').data('color_id');
            this.storage_selected_id = this.div_product.find('.storage-item.active').data('storage_id');
            this.aspect_selected_id = this.div_product.find('.aspect-item.active').data('aspect_id');
            this.origin_selected_id = this.div_product.find('.origin-item.active').data('origin_id');

            if (!this.color_selected_id) this.color_selected_id = 0;
            if (!this.storage_selected_id) this.storage_selected_id = 0;
            if (!this.aspect_selected_id) this.aspect_selected_id = 0;
            if (!this.origin_selected_id) this.origin_selected_id = 0;
        }

        // Cập nhật tham số mua hàng
        updateParamButtonBuy() {
            if (this.error) return;
            let btn = this.div_button.find('.buy');
            if (this.isSelectedFullAttribute()) {
                let current_variant = this.getCurrentVariant();
                btn.addClass('btn-add-cart');
                btn.attr('data-location_id', this.div_product.find('select#location').val());
                btn.attr('data-product_id', current_variant.soft_id);
                btn.attr('data-service_product_id', this.div_product.find('.warranty-item.active').data('warranty_id') ?? 0);
                this.removeRequiredAttribute(); // Xoá cảnh báo chọn biến thể

                $('.buy-box-v2 .pre-order').attr('data-variant_id', current_variant.id).attr('data-service_product_id', this.div_product.find('.warranty-item.active').data('warranty_id') ?? 0);
            } else {
                btn.removeClass('btn-add-cart');
            }
        }

        // check đã chọn hết thuộc tính
        isSelectedFullAttribute() {
            let count_selected_type_attribute = this.div_product.find('.attribute-group .attribute-list .active:not(.warranty-item)').length;
            return count_selected_type_attribute == this.count_attribute_type;
        }

        // Lấy biến thể hiện tại sau khi đã chọn toàn bộ thuộc tính
        getCurrentVariant() {
            if (!this.isSelectedFullAttribute()) return null;
            this.getCurrentAttribute();
            let current_variant = this.phone_variants.find(function(variant) {
                if (variant.color == this.color_selected_id && variant.origin == this.origin_selected_id &&
                    variant.aspect == this.aspect_selected_id && variant.storage == this.storage_selected_id)
                    return variant;
            }, this);

            this.updateDealVariant(current_variant);
            return current_variant;
        }

        // Lấy các biến thể hiện tại
        getSelectedVariants() {
            this.getCurrentAttribute();
            return this.phone_variants.filter(function(variant) {
                return (!this.color_selected_id || variant.color == this.color_selected_id) &&
                    (!this.origin_selected_id || variant.origin == this.origin_selected_id) &&
                    (!this.aspect_selected_id || variant.aspect == this.aspect_selected_id) &&
                    (!this.storage_selected_id || variant.storage == this.storage_selected_id);
            }, this);
        }

        // Cập nhật các thuộc tính còn hàng
        updateAttributeInstock(changColor = true) {
            let classColorItem = '';
            if (changColor) classColorItem = '.color-item';
            this.div_product.find(`.attribute-item:not(.warranty-item):not(${ classColorItem }) svg.icon-tick-bold`).addClass('out-stock');
            this.div_product.find(`.attribute-item:not(.warranty-item):not(${ classColorItem }) .product-variation__tick`).addClass('out-stock');

            let location = this.div_product.find('select#location').val() ?? 0;
            let tmp_instock_variants = this.instocks;

            // if (location) tmp_instock_variants = tmp_instock_variants.filter(data => data.location_id == location);
            // if (this.color_selected_id) tmp_instock_variants = tmp_instock_variants.filter(data => data.variant.color == this.color_selected_id);
            // if (this.storage_selected_id) tmp_instock_variants = tmp_instock_variants.filter(data => data.variant.storage == this.storage_selected_id);
            // if (this.origin_selected_id) tmp_instock_variants = tmp_instock_variants.filter(data => data.variant.origin == this.origin_selected_id);
            // if (this.aspect_selected_id) tmp_instock_variants = tmp_instock_variants.filter(data => data.variant.aspect == this.aspect_selected_id);

            tmp_instock_variants.forEach(itemVarriant => {
                let colorItem = this.div_product.find(`.color-item[data-color_id="${itemVarriant.variant.color}"]`);
                colorItem.find('.product-variation__tick').removeClass('out-stock');
                colorItem.find('svg.icon-tick-bold').removeClass('out-stock');

                let storageItem = this.div_product.find(`.storage-item[data-storage_id="${itemVarriant.variant.storage}"]`);
                storageItem.find('.product-variation__tick').removeClass('out-stock');
                storageItem.find('svg.icon-tick-bold').removeClass('out-stock');

                let aspectItem = this.div_product.find(`.aspect-item[data-aspect_id="${itemVarriant.variant.aspect}"]`);
                aspectItem.find('.product-variation__tick').removeClass('out-stock');
                aspectItem.find('svg.icon-tick-bold').removeClass('out-stock');

                let originItem = this.div_product.find(`.origin-item[data-origin_id="${itemVarriant.variant.origin}"]`);
                originItem.find('.product-variation__tick').removeClass('out-stock');
                originItem.find('svg.icon-tick-bold').removeClass('out-stock');
            });
        }

        // Cập nhật biến thể ở Deal sốc
        updateDealVariant(current_variant) {
            let location = this.div_product.find('select#location').val();
            let price = parseInt(this.extra_prices[location] ?? 0) + parseInt(current_variant.price ?? 0);
            let warranty_id = this.div_product.find('.warranty-item.active').data('warranty_id') ?? 0;
            let warranty_name = this.div_product.find('.warranty-item.active').text() ?? '';

            $('.deal-content .deal-product-main input[name="main_product_id"]').val(current_variant.soft_id);
            $('.deal-content .deal-product-main input[name="main_service_product_id"]').val(warranty_id);
            $('.deal-content .deal-product-main .product-current-attribute .product-current-variant').html(current_variant.variant_text);
            $('.deal-content .deal-product-main .product-current-attribute .product-current-warranty').html(warranty_name);

            $('.deal-content .deal-product-main .deal-product-price').attr('data-price', price);
            $('.deal-content .deal-product-main .deal-product-price .deal-price').html(format_price(price));


        }
    }

    pv = new PhoneVariant(phone_variants, extra_prices, phone_id, instock_status);

    // ấn nút mua
    $('body').on('click', '.buy-box-v2 .buy', function(e) {
        e.preventDefault();
        pv.addRequiredAttribute();
    });
    doChooseVariant(pv);
}

/** Xử lý biến thể của điện thoại chưa đồng bộ */
function showInfoVariantNotSync(phone_variants, extra_prices, phone_id, instock_status) {
    class PhoneVariant {
        phone_variants = {};
        extra_prices = {};
        div_product = $('.product-content-box');
        div_button = $('.buy-box-v2');
        div_message = $('.product-messsage');
        button_chat = `<a href="${$('.mobilecity-messenger').attr('href') ?? 'javascript:;'}" rel ="nofollow" target="_blank" class="chat">CHAT TƯ VẤN</a>`;
        button_pre_order = `<a href="javascript:;" data-product_id="${ phone_id }" data-variant_id="0" data-service_product_id="0" class="pre-order">ĐẶT HÀNG TRƯỚC</a>`;

        message_not_sync = `<p class="message">Sản phẩm hiện tại đang tạm hết hàng, quý khách vui lòng liên hệ để được tư vấn hoặc tham khảo sản phẩm tương tự!</p>`;

        color_selected_id = 0;
        aspect_selected_id = 0;
        origin_selected_id = 0;
        storage_selected_id = 0;

        count_attribute_type = 0;

        constructor(phone_variants, extra_prices, phone_id, instock_status) {
                var is_stock = 0;
                if (instock_status == 1) {
                    is_stock = 1;
                }
                updateIsStockProduct(phone_id, is_stock);
                this.phone_variants = phone_variants;
                this.extra_prices = extra_prices;
                if (instock_status == 5) {
                    this.button_pre_order = ``;
                }

                this.count_attribute_type = this.div_product.find('.attribute-group .attribute-list').length;
            }
            // Hiển thị nút chat
        updateButtonBuy() {
            this.updatePrice();
        }
        showButtonAndMessage() {
                this.div_button.html(this.button_chat + this.button_pre_order);
                // this.div_message.html(this.message_not_sync);
                this.div_message.show();
                $('.attribute-group, .warranty-list').show();
                $('.price-product').show();
            }
            // Cập nhật giá
        updatePrice() {
            let div_price = $('.product-content-box .price-and-color .price, .product-content-box .product-order .price, .product-content-box .product-content-right .product-summary-price');

            let min_price = -1;
            let max_price = -1;
            this.getCurrentAttribute();
            this.phone_variants.forEach(function(variant) {
                if ((this.color_selected_id && variant.color != this.color_selected_id) || (this.storage_selected_id && variant.storage != this.storage_selected_id) ||
                    (this.origin_selected_id && variant.origin != this.origin_selected_id) || (this.aspect_selected_id && variant.aspect != this.aspect_selected_id)) {
                    return false;
                }
                if (variant.price > max_price) {
                    max_price = variant.price;
                }
                if (min_price == -1 || variant.price < min_price) {
                    min_price = variant.price;
                }
            }, this);

            // price
            if (max_price < 0) {
                div_price.text('');
                return;
            }

            // let price_warranty = Number(this.div_product.find('.warranty-item.active').data('warranty_price') ?? 0);

            let location = this.div_product.find('select#location').val();
            let extra_price = this.extra_prices[location] ?? 0;
            min_price += extra_price; // + price_warranty;
            max_price += extra_price; // + price_warranty;


            if (min_price == max_price) {
                div_price.text(format_price(min_price));
            } else if (min_price >= 68000000) {
                div_price.text(format_price(min_price));
            } else {
                div_price.text(format_price(min_price) + ' - ' + format_price(max_price));
            }
            div_price.text(format_price(min_price));

            let dataVariantId = 0;
            let dataServiceProductId = this.div_product.find('.warranty-item.active').data('warranty_id') ?? 0;

            if (this.isSelectedFullAttribute()) {
                let current_variant = this.getCurrentVariant();
                dataVariantId = current_variant.id;
            }
            $('.buy-box-v2 .pre-order').attr('data-variant_id', dataVariantId).attr('data-service_product_id', dataServiceProductId);
        }

        // lấy thông tin thuộc tính
        getCurrentAttribute() {
            this.color_selected_id = this.div_product.find('.color-item.active').data('color_id');
            this.storage_selected_id = this.div_product.find('.storage-item.active').data('storage_id');
            this.aspect_selected_id = this.div_product.find('.aspect-item.active').data('aspect_id');
            this.origin_selected_id = this.div_product.find('.origin-item.active').data('origin_id');

            if (!this.color_selected_id) this.color_selected_id = 0;
            if (!this.storage_selected_id) this.storage_selected_id = 0;
            if (!this.aspect_selected_id) this.aspect_selected_id = 0;
            if (!this.origin_selected_id) this.origin_selected_id = 0;
        }

        // Lấy biến thể hiện tại sau khi đã chọn toàn bộ thuộc tính
        getCurrentVariant() {
                if (!this.isSelectedFullAttribute()) return null;
                this.getCurrentAttribute();
                let current_variant = this.phone_variants.find(function(variant) {
                    if (variant.color == this.color_selected_id && variant.origin == this.origin_selected_id &&
                        variant.aspect == this.aspect_selected_id && variant.storage == this.storage_selected_id)
                        return variant;
                }, this);
                return current_variant;
            }
            // check đã chọn hết thuộc tính
        isSelectedFullAttribute() {
            let count_selected_type_attribute = this.div_product.find('.attribute-group .attribute-list .active:not(.warranty-item)').length;
            return count_selected_type_attribute == this.count_attribute_type;
        }
    }
    pv = new PhoneVariant(phone_variants, extra_prices, phone_id, instock_status);
    doChooseVariant(pv);
}



/** Responsive Related Product */
// function responsiveRelatedProduct(){
//     width  = $(window).width();
//     let div_related_boxes =  $('.product-related-box');
//     if(div_related_boxes.length == 0) return;
//     $.each(div_related_boxes, function(index, div_related_box){
//         let div_product_list = $(div_related_box).find('.product-related-list');
//         if($(div_product_list).find('.product-related-item').addClass('item').length >= 3){
//             div_product_list.addClass('owl-carousel');
//             if(width > 510){
//                 // div_product_list.css('max-height', $('.product-price-box').height()/2);

//                 div_product_list.owlCarousel({
//                     loop:false,
//                     margin: 5,
//                     nav:true,
//                     items:3,
//                     autoplay: false,
//                     nav: true,
//                     dots: false,
//                     // autoWidth: true,
//                     // smartSpeed: 500,
//                     mouseDrag: true,
//                     pullDrag: true,
//                     touchDrag: true,
//                     animateOut: 'slideOutUp',
//                     animateIn: 'slideInUp'
//                 });
//                 $(div_related_box).find('.owl-nav').addClass('vertical');
//                 // $(div_related_box).find(".owl-prev").html('<i class="fa fa-chevron-up" aria-hidden="true"></i>');
//                 // $(div_related_box).find(".owl-next").html('<i class="fa fa-chevron-down" aria-hidden="true"></i>');
//                 $(div_related_box).find(".owl-prev").html('<i class="fa fa-chevron-left" aria-hidden="true"></i>');
//                 $(div_related_box).find(".owl-next").html('<i class="fa fa-chevron-right" aria-hidden="true"></i>');

//             }else{
//                 div_product_list.owlCarousel({
//                     loop:false,
//                     margin: 5,
//                     nav:true,
//                     items:2,
//                     autoplay: false,
//                     nav: true,
//                     dots: false,
//                     // smartSpeed: 500,
//                     mouseDrag: true,
//                     pullDrag: true,
//                     touchDrag: true,
//                 });
//                 $(div_related_box).find('.owl-nav').addClass('horizontal');
//                 $(div_related_box).find(".owl-prev").html('<i class="fa fa-chevron-left" aria-hidden="true"></i>');
//                 $(div_related_box).find(".owl-next").html('<i class="fa fa-chevron-right" aria-hidden="true"></i>');

//             }
//         }
//     });
// }



/** hiển thị sản phẩm liên quan */
function showRelatedProduct(phone_id) {
    // load DT
    loadAjaxGet(`/ajax/phone-get-list-related-phone/${phone_id}`, {
        success: function(result) {
            if (!result.success) {
                showRelatedFit(phone_id);
                return;
            }
            let content = result.data;
            if (result.data != '') {
                $('.phone-related-box .product-related-list').html(content);
            } else {
                // $('.phone-related-box').hide();
            }
            showRelatedFit(phone_id);
        },
        error: function(error) {
            showRelatedFit(phone_id);
        },
    });
}

function showRelatedFit(phone_id) {
    loadAjaxGet(`/ajax/phone-get-list-related-fitting/${phone_id}`, {
        success: function(result) {
            if (!result.success) {
                responsiveRelatedProductMobi();
                responsiveRelatedProductDesktop();
                return;
            }
            let content = result.data;
            if (result.data != '') {
                $('.fit-related-box .product-related-list').html(content);
            } else {
                $('.fit-related-box').hide();
            }
            // set css
            // div_product_list.css('max-height', $('.product-price-box').height()/2);
            responsiveRelatedProductMobi();
			responsiveRelatedProductDesktop();
        },
        error: function(error) {
            responsiveRelatedProductMobi();
			responsiveRelatedProductDesktop();
        },
    });
}

/** Update trạng thái còn hàng ở Phone */
function updateIsStockProduct(phone_id, is_stock) {
    $.ajax({
        url: '/ajax/update-is-stock-product',
        type: "POST",
        data: {
            phone_id: phone_id,
            is_stock: is_stock,
        },
        success: function(result) {
            return true;
        },
    });
}

/** Responsive related box */
function responsiveRelatedProductMobi() {
    $('.product-box-mobile').owlCarousel({
        loop: false,
        margin: 10,
        autoplay: false,
        nav: true,
        dots: false,
        smartSpeed: 500,
        mouseDrag: true,
        pullDrag: true,
        touchDrag: true,
        responsive: {
            0: { items: 2 },
            600: { items: 3 },
            1000: { items: 3 }
        },
        // onInitialized: responsiveVideoReview
    });
    $(".owl-prev").html('<i class="fa fa-chevron-left" aria-hidden="true"></i>');
    $(".owl-next").html('<i class="fa fa-chevron-right" aria-hidden="true"></i>');

    if ($('.phone-related-box.product-related-box-mobile .owl-stage').html()) {
        $('.phone-related-box.product-related-box-mobile').show();
    }
    if ($('.fit-related-box.product-related-box-mobile .owl-stage').html()) {
        $('.fit-related-box.product-related-box-mobile').show();
    }
}
function responsiveRelatedProductDesktop() {
	if ($('.product-related-box .product-related-item').length == 0) return;
	let height_related_phone = $('.phone-related-box').height();
	let height_related_fit = $('.fit-related-box').height();
	let height_related_product = height_related_fit + height_related_phone;
	// let height_product_info = $('.product-content-box').height();
	let height_product_info = $('.product-price-box').height() - 32;

	if ($('.product-related-box.phone-related-box .product-related-list').html().trim()) {
		$('.product-related-box.phone-related-box').show();
	}
	if ($('.product-related-box.fit-related-box .product-related-list').html().trim()) {
		$('.product-related-box.fit-related-box').show();
	}

	if (height_related_product < height_product_info) return;
	// console.log($('.phone-related-box .product-related-item').length, height_related_phone, height_product_info/2.0);
	if ($('.fit-related-box .product-related-item').length == 0) {
		$('.phone-related-box .product-related-list').css('max-height', height_product_info);
		$('.phone-related-box .product-related-nav').show();
		if($(window).width() < 992){
			$('.phone-related-box .product-related-list').css('max-height', '400px');
		}
	} else if ($('.phone-related-box .product-related-item').length == 0) {
		$('.fit-related-box .product-related-list').css('max-height', height_product_info);
		$('.fit-related-box .product-related-nav').show();
		if($(window).width() < 992){
			$('.fit-related-box .product-related-list').css('max-height', '400px');
		}
	} else if (height_related_phone < height_product_info / 2.0) {
		$('.fit-related-box .product-related-list').css('max-height', height_product_info - height_related_phone);
		$('.fit-related-box .product-related-nav').show();
	} else if (height_related_fit < height_product_info / 2.0) {
		$('.phone-related-box .product-related-list').css('max-height', height_product_info - height_related_fit);
		$('.phone-related-box .product-related-nav').show();
	} else {
		$('.product-related-box .product-related-list').css('max-height', height_product_info / 2.0);
		$('.product-related-box .product-related-nav').show();
	}
}