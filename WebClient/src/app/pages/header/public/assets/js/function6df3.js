// Chức năng đang dùng:
// - Sắp xếp giá tại Trang chủ
	function go_link_on_select(name_select){
	    var domain = location.host;
	    $(name_select).on('change',function(){
	        var link = $(name_select+' option:selected').attr('data-link');
	        window.location = link;
	    });
	};
// Kết thúc toàn bộ function chức năng

// Chức năng đang dùng
// - Hiển thị load video tại trang chủ
	// lấy dữ liệu ảnh của youtube
	function getIdVideo(link) {
		var videoid = link.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
		return videoid;
	}
	function getThumbYoutube(url, size) {
	    var video, results;
	    if (url === null) { return ''; }
	    if (size == 'big') { size = 'big'; } else { size = 'small'; }
	    results = url.match('[\\?&]v=([^&#]*)');
	    if (results == null) { video = url; } else { video = results[1]; }
	    if (size == 'small') {
            return 'https://img.youtube.com/vi/' + video + '/2.jpg';
        } else {
        	return 'https://img.youtube.com/vi/' + video + '/0.jpg';
        }
   	};
	// lấy thông tin youtuber
	// function getVideoTitle(videoId,apiKey) {
	// 	return new Promise((resolve, reject) => { 
	// 	const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
	// 	fetch(apiUrl)
	// 		.then(response => response.json())
	// 		.then(data => {
	// 		info = data.items[0].snippet;
	// 		resolve(info);
	// 		})
	// 		.catch(error => reject(error));
	// 	});
	// }
	// Chuyển đổi iframe
	function getIdYoutube(html,title ='') {
	    var pattern1 = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/g;
	    var pattern2 = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;
	    var pattern3 = /([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?(?:jpg|jpeg|gif|png))/gi;
	    if(pattern1.test(html)){
	       var replacement = '<iframe src="https://player.vimeo.com/video/$1?autoplay=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen title="'+title+'"></iframe>';
	       var html = html.replace(pattern1, replacement);
	    }
	    if(pattern2.test(html)){
	          var replacement = '<iframe src="https://www.youtube.com/embed/$1?autoplay=1" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen title="'+title+'"></iframe>';
	          var html = html.replace(pattern2, replacement);
	    }
	    if(pattern3.test(html)){
	        var replacement = '<a href="$1" target="_blank"><img class="sml" src="$1" /></a><br />';
	        var html = html.replace(pattern3, replacement);
	    }
	    return html;
	};
	function getUrlYoutube(url) {
		video_id = getIdVideo(url);

		url = 'https://www.youtube.com/watch?v='+video_id[1];
		return url;
	}
// Kết thúc toàn bộ function chức năng

// Chức năng đang dùng
// - Hiển thị tất cả và ẩn bài viết giới trong Danh Mục và Sản phẩm
// Giải thích tham số
// - height: Chiều cao muốn hiển thị của box
// - show_btn_id: id của button đang bị ẩn
// - hidden_btn_id: id của button đang click
// - show_box_class: class của box bị tác động
	function view_detail(height, show_btn_id, hidden_btn_id, show_box_class ) {
		$('#'+show_btn_id).css('display', 'none');
		$('#'+hidden_btn_id).css('display', 'inline-block');

		if (height == 'auto') {
			// var curHeight = $('.'+show_box_class).height();
			// var autoHeight = $('.'+show_box_class).css('height', 'auto').height();
			// $('.'+show_box_class).height(curHeight).animate({height: autoHeight}, 1000);
			$('.'+show_box_class).css('max-height', 'none');
		} else {
			$('.'+show_box_class).animate({maxHeight: height}, 1000);
		};
	};

// Kết thúc toàn bộ function chức năng

// Kiểm tra trùng trong mảng
	// Dùng hiển thị giá trong trang sản phẩm
	function isExist(arr, x) {
		for(let i = 0; i < arr.length; i++) {
	      	if (arr[i] === x) return true;
	    }
	    return false;
	}
	function removeDeduplicate(arr) {
		var ans = [];
		arr.forEach(
			function(element) {
				if(!isExist(ans, element)) {
					ans.push(element);
				}
			}
		);
		return ans;
	}
// Kết thúc toàn bộ function chức năng

// Định dạng số tiền
	function format_number(number) {
	    number += '';
	    x = number.split('.');
	    x1 = x[0];
	    x2 = x.length > 1 ? '.' + x[1] : '';
	    var rgx = /(\d+)(\d{3})/;
	    while (rgx.test(x1)) {
	        x1 = x1.replace(rgx, '$1' + '.' + '$2');
	    }
	    return x1 + x2;
	}
	function format_price(number = 0, is_deal = 0) {
		if(is_deal && number == 0){
			return '0 ₫';
		}
		if (number >= 68000000 || number == 0) {
			number = "Liên hệ";
		} else {
			number += '';
		    x = number.split('.');
		    x1 = x[0];
		    x2 = x.length > 1 ? '.' + x[1] : '';
		    var rgx = /(\d+)(\d{3})/;
		    while (rgx.test(x1)) {
		        x1 = x1.replace(rgx, '$1' + '.' + '$2');
		    }
		    number = x1 + x2 +" ₫";
		}
		return number;
	}
	function textarea_to_array(str) {
		return str.split('\n');
	}

	/* format datetime dạng H:i d/m/Y */
	function format_datetime(date) {
		var date = new Date(date);
		year = date.getFullYear();
		month = date.getMonth()+1;
		day = date.getDate();
	    hour = date.getHours();
	    minute = date.getMinutes();
	    second = date.getSeconds();
		return hour+':'+minute+' '+day+'/'+month+'/'+year;
	}
// check định dạng email
function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}
// Kết thúc toàn bộ function chức năng

// Mở và đóng PopUp
// - Chức năng đặt hàng tại trang sảm phẩm
	function openPopup(clickShowBtn, popupShow) {
		$(clickShowBtn).on('click',function(){
	        $(popupShow).bPopup({
	            speed: 450,
	            transition: 'slideDown',
	            zIndex:99999,
	            onOpen: function() {
	            	$(popupShow).css('visibility', 'visible');
	            },
	            onClose: function() {
	            	$(popupShow).css('visibility', 'hidden');
	            }
	        });
	    });
	}
	function closePopup(clickCloseBtn, popupClose) {
		$(clickCloseBtn).on('click' ,function() {
			$(popupClose).css('visibility', 'hidden');
			$(popupClose).bPopup().close();
			$(".b-modal").css('visibility', 'hidden');
			$(".b-modal").css('opacity', '0');
		})
	}
// Kết thúc toàn bộ function chức năng

// thêm cookie
function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';path=/;expires=' + expires.toUTCString();
}
function setCookieWithPath(key, path ,value) {
	var expires = new Date();
    expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';path='+path+';expires=' + expires.toUTCString();
}
// lấy cookie
function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}
// Xóa cookie
function deleteCookie(key,path) {
	var expires = new Date();
    expires.setTime(expires.getTime()-1);
    document.cookie = key + '=; path='+path+'; expires=' + expires.toUTCString();
}

function resizeImage(image,size="") {
	remove_characters = replaceAll(image,'//','/');

	link_img_old = [
		'http:/images.mobilecity.vn/media/images',
		'https:/images.mobilecity.vn/media/images',
		'https://object-storage.tyo1.cloud.z.com/v1/zc_6c13a3172446411fab7837a8a5479710/mobilecityvn/images',
        'https:/sudospaces.com/mobilecity-vn/images',
        'https://sudospaces.com/mobilecity-vn/images',
        'https://mobilecity.vn/mcnews/wp-content/uploads',
        'https:/mobilecity.vn/mcnews/wp-content/uploads',
        'https:/cdn.mobilecity.vn/mobilecity-vn/images',
	];
	link_img_news = 'https://cdn.mobilecity.vn/mobilecity-vn/images';

	image_replace = remove_characters.replace(link_img_old,link_img_news);
	explore = image_replace.split('/');
	count_explore = explore.length;

	image_year = explore[count_explore-3];
	image_month = explore[count_explore-2];

	image_full_path = explore[count_explore-1].split('.');
	image_name = image_full_path[0];
	image_extention = image_full_path[1];
	if (size!="") {
		image = link_img_news+'/'+image_year+'/'+image_month+'/'+image_name+'-'+size+'.'+image_extention;
	} else {
		image = link_img_news+'/'+image_year+'/'+image_month+'/'+image_name+'.'+image_extention;
	}
	return image;
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
// rewrite url: thêm trên url không load lại trang
function update_url(url_page) {
    history.pushState(null, null, url_page);
}

// truyền param lên url
// param_obj: là một obj có dạng {key:value,key1:value2}
function pushOrUpdate(param_obj, isUpdateUrl = true) {
    var url = new URL(window.location.href);
    $.each(param_obj, function(key, value) {
        url.searchParams.set(key, value);
    })
    var newUrl = url.href;
    if (!isUpdateUrl) return newUrl;

    update_url(newUrl);
}
var getUrlParameter = function(url,name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(url);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}
// load ajax
function loadAjax(url,params,option){
    var _option = {
        beforeSend:function(){},
        success:function(){},
        error: function(){}
    }
    $.extend(_option,option);
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type: 'POST',
        url: url,
        data: params,
        beforeSend: function(){
            _option.beforeSend();
        },
        success:function(result){
            _option.success(result);
        },
        error: function(result) {
            _option.error(result);
        }
    })
}
function loadAjaxGet(url,option){
    var _option = {
        beforeSend:function(){},
        success:function(){},
        error: function(){}
    }
    $.extend(_option,option);
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type: 'GET',
        url: url,
        beforeSend: function(){
            _option.beforeSend();
        },
        success:function(result){
            _option.success(result);
        },
        error: function(result) {
            _option.error(result);
        }
    })
}
function show_paginate(result,data_link,pagination) {
    // lấy các giá trị cần thiết để phân trang
    var page_number = result.last_page;
    var next_page_url = getUrlParameter(result.next_page_url,'page');
    var prev_page_url = getUrlParameter(result.prev_page_url,'page');
    var current_page = parseInt(data_link);
    var last_page = result.last_page;

    // alert(url_last_page);
    // hiển thị phân trang
    $(pagination).empty();
    // nếu là trang đầu tiên thì sẽ disable 2 nút đầu tiên còn không thì hiển thị bình thường
    if (current_page <= 1) {
        $(pagination).append("<li class='page-item'><span class='page-link'>‹</span></li>");
    } else {
        $(pagination).append("<li class='page-item'><a href='javascript:;' class='page-link' data-link='"+prev_page_url+"'>‹</a></li>");
    }

    // nếu trang < 11 thì hiển thị full link còn nêu ko sẽ tự custom
    // nếu trang > 11 thì sẽ hiển thị dạng << < 1 2 ... 4 5 6 7 8... 99 100 > >>
    if (page_number < 10) {
        for(var i = 1; i <= page_number; i++){
            // nếu là trang hiện tại thì disable đi còn ko hiển thị bình thường
            if(current_page == i) {
                $(pagination).append("<li class='page-item active'><span class='page-link'>"+i+"</span></li>");
            } else {
                $(pagination).append("<li class='page-item'><a class='page-link' data-link='"+i+"' href='javascript:;'>"+i+"</a></li>");
            }
        }
    } else {
        /* nửa đầu */
        for(var i = 1; i <= 2 && i < current_page; i++){
            $(pagination).append('<li class="page-item"><a class="page-link" data-link="'+i+'" href="javascript:;">'+i+'</a></li>');
        }
        if (current_page >= 6) {
            $(pagination).append('<li class="page-item"><span class="page-link">...</span></li>');
        }
        for(var i = Math.max(current_page - 2, 3); i < current_page; i++){
            $(pagination).append('<li class="page-item"><a class="page-link" data-link="'+i+'" href="javascript:;">'+i+'</a></li>');
        }
        /* giữa*/
        $(pagination).append('<li class="page-item active"><span class="page-link">'+current_page+'</span></li>');
        /* sau */
        for(var i = current_page + 1; i <= current_page + 2 && i <= last_page; i++){
            $(pagination).append('<li class="page-item"><a class="page-link" data-link="'+i+'" href="javascript:;">'+i+'</a></li>');
        }
        if (last_page - current_page >= 5) {
            $(pagination).append('<li class="page-item"><span class="page-link">...</span></li>');
        }
        for(var i = Math.max(current_page + 3, last_page - 1); i <= last_page; i++){
            $(pagination).append('<li class="page-item"><a class="page-link" data-link="'+i+'" href="javascript:;">'+i+'</a></li>');
        }
    }

    // nếu là trang cuối cùng thì sẽ disable 2 nút cuối cùng còn không thì hiển thị bình thường
    if (current_page >= last_page) {
        $(pagination).append("<li class='page-item'><span class='page-link'>›</span></li>");
    } else {
        $(pagination).append("<li class='page-item'><a href='javascript:;' class='page-link' data-link='"+next_page_url+"'>›</a></li>");
    }
}
// coomment
function comment_like() {
	var like = [];
	if (getCookie('comment_like')) {
		like = getCookie('comment_like').split(',');
	} else {
		deleteCookie("comment_like", window.location.pathname);
		like = [];
	}
	$('.comment-list').on('click', '.comment-like', function() {
		id = $(this).data('id');
		value = $(this).children('span.value_like');
		action_value = $(this).children('span.action');
		path = window.location.pathname;
		action = "like";
		if (like.length == 0) {
			like.push(''+id+'');
		}
		else {
			like.forEach( function(element, index) {
				if(element != id) {
					if (!like.includes(''+id+'')) {
						like.push(''+id+'');
						action = "like";
					}
				} else {
					if (like.indexOf(''+id+'') > -1) {
						like.splice(like.indexOf(''+id+''), 1);
					}
					action = "dislike";
				}
			});
		}
		setCookieWithPath("comment_like", path, like);
		if (!getCookie('comment_like')) {
			deleteCookie("comment_like", window.location.pathname);
		}
		data = {
			"action": action,
			"id": id,
		};
		loadAjax(`../ajax/comment/action`,data,{
			beforeSend:function(){},
	        success:function(result){
				value.text(' '+result+' ');
	        }
		});
	});
}


function send_comment(url,type,id) {
	$('#send_comment').on('click', function() {
    	content = $('#content').val();
    	name = $('#name').val();
    	email = $('#email').val();
    	phone = $('#phone').val();
    	rating = $('#rating').val();
    	$(this).closest('.comment-form').find('input').css('border-color', '#ddd');
    	$(this).closest('.comment-form').find('textarea').css('border-color', '#ddd');
    	if (content == "") {
    		$('#content').css('border-color', 'red');
    		alert('Không được để trống nội dung!');
    		return;
    	}
    	if(name == "") {
    		$('#name').css('border-color', 'red');
    		alert('Họ và tên không được để trống!');
    		return;
    	}
    	if(phone == "") {
    		$('#phone').css('border-color', 'red');
    		alert('Số điện thoại không được để trống!');
    		return;
    	}
    	if(email == "") {
    		$('#email').css('border-color', 'red');
    		alert('Email không được để trống!');
    		return;
    	} else if(!validateEmail(email)) {
    		$('#email').css('border-color', 'red');
    		alert('Định dạng email chưa chính xác!');
    	} else {
    		data = {
	    		"type": type,
	    		"type_id": id,
	    		"content": content,
	    		"name": name,
	    		"email": email,
	    		"phone": phone,
	    		"rating": rating,
	    	};
	    	loadAjax(url,data,{
				beforeSend:function(){
					$("#loading_box").css({visibility:"visible", opacity: 0.0}).animate({opacity: 1.0},200);
				},
                success:function(result){
                	$("#loading_box").animate({opacity: 0.0}, 200, function(){
	                    $("#loading_box").css("visibility","hidden");
	                });
                	$('#content').val('');
			    	$('#name').val('');
			    	$('#email').val('');
			    	$('#phone').val('');
					$('.alert_message').empty().append(result).css('display', 'block');
                    setInterval(function() {
                        $('.alert_message').fadeOut(1000);
                    }, 5000);
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
    });
}

function getComment(route,type,type_id) {
	PageNumber = 1;
	data = {
		"type": type,
		"type_id": type_id,
		"PageNumber": PageNumber,
	};
	loadAjax(route,data,{
		beforeSend:function(){},
		success:function(result){
			// console.log(result)
			$('.comment-list').empty();
			if (result[0].total != 0) {
				show_paginate(result[0],PageNumber,pagination);
				result[1].forEach(function(element,index) {
					$('.comment-list').append(element);
				});
			}
		}
	});
    // load khi click page-link
	$(document).on('click', '#pagination .page-item a.page-link', function(e) {
	    e.preventDefault();
	    var PageNumber = $(this).data('link');
		data = {
			"type": type,
			"type_id": type_id,
			"PageNumber": PageNumber,
		};
		loadAjax(route,data,{
			beforeSend:function(){},
	        success:function(result){
	            // show_paginate gọi từ custom.js
	            show_paginate(result[0],PageNumber,pagination);
	            // hiển thị bảng admin ở đây
	            $('.comment-list').empty();
	            result[1].forEach(function(element,index) {
                    $('.comment-list').append(element);
                });
	        	$('html, body').animate({scrollTop: $('.comment-search').offset().top-10}, 500);
	        }
		});
	});
}

function comment_search(url,route,type,type_id) {
	var suggest = null;
	$('body').on('keyup','#search_comment',function() {
		clearTimeout(suggest);
		keyword = $(this).val();
		if (keyword.length > 0) {
			suggest = setTimeout(function() {
				data = {
					"type": type,
					"type_id": type_id,
		            'keyword': keyword,
		        };
				loadAjax(url,data,{
					beforeSend:function(){},
	                success:function(result){
	                	$('.comment-pagination').css('display','none');
	                	$('.comment-list').empty();
                        result.forEach(function(element,index) {
		                    $('.comment-list').append(element);
		                });
	                }
		    	});
			},500);
		} else {
			getComment(route,type,type_id);
			$('.comment-pagination').css('display','block');
		}
	});
}
// Trả về true nếu rỗng
function checkEmpty(value) {
    if (value == null) {
        return true;
    } else if (value == 'null') {
        return true;
    } else if (value == undefined) {
        return true;
    } else if (value == '') {
        return true;
    } else {
        return false;
    }
}

function getRelatedPhone(phoneIds) {
    loadAjax(`/ajax/get-related-phone`, { phone_ids: phoneIds }, {
        success: function(result) {
            let content = result.data;
            if (!checkEmpty(content)) {
                $('.phone-related-box .product-related-list').html(content);
            	// $('.phone-related-box').show();
            }
			responsiveRelatedProductMobi();
			console.log(1);
			responsiveRelatedProductDesktop();
        }
    });
}

function getRelatedFitting(fittingIds) {
    loadAjax(`/ajax/get-related-fitting`, { fitting_ids: fittingIds }, {
        success: function(result) {
            let content = result.data;
            if (!checkEmpty(content)) {
                $('.fit-related-box .product-related-list').html(content);
            	// $('.fit-related-box').show();
            }
			responsiveRelatedProductMobi();
			responsiveRelatedProductDesktop();
        }
    });
}

function getRelatedService(serviceIds) {
    loadAjax(`/ajax/get-related-service`, { service_ids: serviceIds }, {
        success: function(result) {
            let content = result.data;
            if (!checkEmpty(content)) {
                $('.service-related-box .product-related-list').html(content);
            	// $('.fit-related-box').show();
            }
			responsiveRelatedProductMobi();
			responsiveRelatedProductDesktop();
        }
    });
}

/** Responsive related box */
function responsiveRelatedProductMobi(){
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
	   responsive:{
		   0:{items:2},
		   600:{items:3},
		   1000:{items:3}
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
   if ($('.service-related-box.product-related-box-mobile .owl-stage').html()) {
	   $('.service-related-box.product-related-box-mobile').show();
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
function addScript(val) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.async = true;
	script.defer = true;
	script.src = val;
	$('body')[0].appendChild(script);
}

function smoothScrollTo(targetPosition) {
	const duration = 300;
	const startPosition = $(window).scrollTop();
	const distance = targetPosition - startPosition;
	let startTime;
  
	function animation(currentTime) {
	  if (!startTime) startTime = currentTime;
	  const timeElapsed = currentTime - startTime;
	  const progress = Math.min(timeElapsed / duration, 1);
	  const scrollPosition = startPosition + distance * easeOutQuart(progress);
	  $(window).scrollTop(scrollPosition);
	  if (progress < 1) requestAnimationFrame(animation);
	}

	function easeOutQuart(x) {
	  return 1 - Math.pow(1 - x, 4);
	}
  
	requestAnimationFrame(animation);
  }