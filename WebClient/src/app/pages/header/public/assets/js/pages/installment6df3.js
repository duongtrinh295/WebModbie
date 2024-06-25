$(document).ready(function() {

});

function filter(dataAttribute,option) {
    return dataAttribute.filter(function (item) {
        for (var key in option) {
            if(item[key] != option[key]) {
                return false;
            }
        }
        return true;
    });
}

function price_pay(price) {
    if (price == 68000000) {
        $('.pay_before').empty().append("<p class='name'>Trả trước</p>");
        $('.pay_before').append("<p class='price'>Liên hệ</p>");
        $('.pay_month').empty().append("<p class='name'>Trả mỗi tháng</p>");
        $('.pay_month').append("<p class='price'>Liên hệ</p>");
    } else {
        pay_before = $('.installment-percen').val();
        pay_month = $('.installment-time').val();
        price_pay_before = price*(pay_before/100);
        price_pay_month = (price-price_pay_before)/pay_month;
        $('.pay_before').empty().append("<p class='name'>Trả trước</p>");
        $('.pay_before').append("<p class='price'>"+format_number(Math.floor(price_pay_before))+" ₫</p>");
        $('.pay_month').empty().append("<p class='name'>Trả mỗi tháng</p>");
        $('.pay_month').append("<p class='price'>"+format_number(Math.floor(price_pay_month))+" ₫</p>");
    }
}

function change_price(dataAttribute,price,warranty,custom_key,parent,price_number,price_sg) {
    var currenWarranty = $(parent+' '+warranty).val();
    var currenColor = 0;
    var currentStorage = 0;
    var currentAspect = 0;
    var currentRam = 0;
    var currentPrice = 0;
    var currentMadeby = 0;
    // id địa chỉ hà nội
    location_address = 1;

    for(var i = 0; i < custom_key.length; i++) {
        switch (custom_key[i]) {
            case 'color': currenColor = $(parent+' .'+custom_key[i]+".active").data('color'); break;
            case 'storage': currentStorage = $(parent+' .'+custom_key[i]).val(); break;
            case 'aspect' : currentAspect = $(parent+' .'+custom_key[i]).val(); break;
            case 'ram' : currentRam = $(parent+' .'+custom_key[i]).val(); break;
            case 'madeby' : currentMadeby = $(parent+' .'+custom_key[i]).val(); break;
        }
    }

    data = {};
    if (currenColor != 0) { data["color"] = currenColor; }
    if (currentStorage != 0) { data["storage"] = currentStorage; }
    if (currentAspect != 0) { data["aspect"] = currentAspect; }
    if (currentRam != 0) { data["ram"] = currentRam; }
    if (currentMadeby != 0) { data["madeby"] = currentMadeby; }

    var res = filter(dataAttribute,data);
    if (res.length != 0) {
        if (res[0]['image'] != undefined) {
            $('.lSPager img[src="'+resizeImage(res[0]['image'],'tiny')+'"]:first').click();
        }
        
        $(price).empty();
        if (price_number == 0) {
            $(price).empty();
            $(price).append("Liên hệ");
        } else if (price_number == 68000000) {
            $(price).empty();
            $(price).append("Liên hệ");
        } else {
            currentPrice = res[0]["price"];
            if(price_sg)
                if (getCookie('location') == location_address) {
                    var price_sg = 0;
                } else {
                    var price_sg = ''+price_sg+'';
                }
            else {
                var price_sg = 0;
            }
            currentPrice = parseInt(currentPrice) + parseInt(currenWarranty) + parseInt(price_sg);
            $(price).append(format_price(currentPrice));
        }
        return res;
    } else {
        $(price).empty();
        if(price_number)
            if (price_number == 68000000) {
                price_current = "Liên hệ";
                current = 68000000;
            } else if(price_number == 0) {
                price_current = "Liên hệ";
                current = 0;
            } else {
                if (getCookie('location') == location_address) {
                    price_current = format_price(price_number);
                    current = price_number;
                } else {
                    if(price_sg) {
                        price_current = format_price(price_number+price_sg);
                        current = price_number+price_sg
                    }
                    else {
                        price_current = format_price(price_number);
                        current = price_number;
                    }
                }
            }
        else {
            price_current = "Liên hệ";
        }

        $(price).append(price_current);

        res = [
            {
                'price':current,
                'color_name':'Không',
                'storage':'Không',
                'aspect':'Không'
            }
        ];
        return res;
    }
}
function gender_param(custom_key,colorArray,storageArray,aspectArray,ramArray,madebyArray) {
    for (var i = 0; i < custom_key.length; i++) {
        switch (custom_key[i]) {
            case 'color': 
                $('.color-list').empty();
                $('.color-list').append('<p>Màu Sắc</p>');
                colorArray.forEach( function(element, index) {
                    $('.color-list').append("<div data-color='"+element+"' style='background-color:"+element+";' class='color-item "+custom_key[i]+"'></div>");
                });
                $('.color-item:first').addClass('active');
            break;
            case 'storage': 
                $('.custom-param-list').append("<div class='custom-param-item'><p>Chọn bộ nhớ </p><select class='param-option "+custom_key[i]+"'></select></div>");
                storageArray.forEach( function(element, index) {
                    if (element != undefined) {
                        $('.'+custom_key[i]).append("<option value='"+element+"'>"+element+"</option>")
                    }
                });
            break;
            case 'aspect': 
                $('.custom-param-list').append("<div class='custom-param-item'><p>Tình trạng máy </p><select class='param-option "+custom_key[i]+"'></select></div>");
                aspectArray.forEach( function(element, index) {
                    if (element != undefined) {
                        $('.'+custom_key[i]).append("<option value='"+element+"'>"+element+"</option>")
                    }
                });
            break;
            case 'ram': 
                $('.custom-param-list').append("<div class='custom-param-item'><p>Ram </p><select class='param-option "+custom_key[i]+"'></select></div>");
                ramArray.forEach( function(element, index) {
                    if (element != undefined) {
                        $('.'+custom_key[i]).append("<option value='"+element+"'>"+element+"</option>")
                    }
                });
            break;
            case 'madeby': 
                $('.custom-param-list').append("<div class='custom-param-item'><p>Xuất xứ </p><select class='param-option "+custom_key[i]+"'></select></div>");
                madebyArray.forEach( function(element, index) {
                    if (element != undefined) {
                        $('.custom-param-list .'+custom_key[i]).append("<option value='"+element+"'>"+element+"</option>");
                    }
                });
            break;
        }
    }
}
function select_param(dataAttribute,custom_key,price_number,price_sg) {
    //click nút chọn màu
    $('.color-item').on('click',function(){
        var el = $(this);
        $('.color-item').removeClass('active');
        $('.color-item').empty();
        el.addClass('active');
        value = change_price(dataAttribute,'.product-info .product_price', '.warranty', custom_key, '.product-info',price_number,price_sg);
        price_pay(value[0]['price']);
    });
    //chọn dung lượng
    $('.storage').on('change',function(){
        value = change_price(dataAttribute,'.product-info .product_price', '.warranty', custom_key, '.product-info',price_number,price_sg);
        price_pay(value[0]['price']);
    });
    //chọn dung lượng
    $('.aspect').on('change',function(){
        value = change_price(dataAttribute,'.product-info .product_price', '.warranty', custom_key, '.product-info',price_number,price_sg);
        price_pay(value[0]['price']);
    });
    //chọn bhv
    $('.warranty').on('change',function(){
        value = change_price(dataAttribute,'.product-info .product_price', '.warranty', custom_key, '.product-info',price_number,price_sg);
        price_pay(value[0]['price']);
    });
    $('.ram').on('change',function(){
        value = change_price(dataAttribute,'.product-info .product_price', '.warranty', custom_key, '.product-info',price_number,price_sg);
        price_pay(value[0]['price']);
    });
    $('.madeby').on('change',function(){
        value = change_price(dataAttribute,'.product-info .product_price', '.warranty', custom_key, '.product-info',price_number,price_sg);
        price_pay(value[0]['price']);
    });

    // Giá ảo
    // % trả trước
    $('.installment-percen').on('change',function(){
        value = change_price(dataAttribute,'.product-info .product_price', '.warranty', custom_key, '.product-info',price_number,price_sg);
        price_pay(value[0]['price']);
    });
    // Số tháng trả trước
    $('.installment-time').on('change',function(){
        value = change_price(dataAttribute,'.product-info .product_price', '.warranty', custom_key, '.product-info',price_number,price_sg);
        price_pay(value[0]['price']);
    });
}

function order(value,product_name,product_id,type) {
    _token          = $('#_token').val();
    name            = type;
    product_id      = product_id;
    product_name    = product_name;
    warranty        = $('.warranty option:selected').text();
    link            = window.location.href;
    info            = value;
    price           = value[0]['price'];
    gender          = $('#customer-gender').val();
    cname           = $('#customer-name').val();
    phone           = $('#customer-phone').val();
    email           = $('#customer-email').val();
    cuslocation     = $('#customer-location').val();
    address         = $('#customer-option option:selected').text();
    note            = $('#order-note').val();
    capcha =  grecaptcha.getResponse();
    pay_before         = $('.installment-percen option:selected').text();
    pay_month         = $('.installment-time option:selected').text();
    if (cname == "" || phone == "" || email == "") {
        alert('Thông tin bắt buộc cần nhập đầy đủ!');
    } else if(!validateEmail(email)) {
        alert('Định dạng email chưa chính xác!');
    } else if(capcha == '') {
        alert('captcha không được để trống');
    }
     else {
        data_order = {
            '_token'            : _token,
            'name'              : name,
            'product_id'        : product_id,
            'product_name'      : product_name,
            'warranty'          : warranty,
            'link'              : link,
            'info'              : info,
            'price'             : price,
            'gender'            : gender,
            'cname'             : cname,
            'phone'             : phone,
            'email'             : email,
            'cuslocation'       : cuslocation,
            'address'           : address,
            'note'              : note,
            'pay_before'           : pay_before,
            'pay_month'           : pay_month,
        };
        loadAjax('../ajax/orders', data_order, {
            beforeSend:function(){
                $("#loading_box").css({visibility:"visible", opacity: 0.0}).animate({opacity: 1.0},200);
            },
            success:function(result){
                $("#loading_box").animate({opacity: 0.0}, 200, function(){
                    $("#loading_box").css("visibility","hidden");
                });
                $('#customer-name').val('');
                $('#customer-phone').val('');
                $('#customer-email').val('');
                $('#order-note').val('');

                $('.alert_message').empty().append(result).css('display', 'block');
                setInterval(function() {
                    $('.alert_message').fadeOut(1000);
                }, 5000);
                grecaptcha.reset();
            },
            error: function (error) {
                /* Có lỗi sẽ ân Module Loading và thông báo */
                $("#loading_box").animate({opacity: 0.0}, 200, function(){
                    $("#loading_box").css("visibility","hidden");
                });
                $.alert('Có lỗi xảy ra! Vui lòng thử lại.');
            }
        });
    }
}