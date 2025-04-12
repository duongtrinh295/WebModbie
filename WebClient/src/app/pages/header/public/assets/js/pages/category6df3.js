$(document).ready(function() {
	// Hiển thị tất cả và ẩn bài viết giới trong Danh Mục
	if ($('.intro-category-content').parents().height() < 1999) {
        $('.intro-category-show').css('display','none');
		$('.box_shadow').css('display', 'none');
    }else {
		$('.intro-category_viewmore').css('margin-bottom', '40px');
	}
	$('#intro-category-viewall').click(function() {
		$('.intro-category-show').css('position', 'relative');
		view_detail('auto', 'intro-category-viewall', 'intro-category-viewdefault', 'intro-category-content');
		$('.box_shadow').css('display', 'none');
		$('.intro-category_viewmore').css('margin-bottom', '0');
		$('.intro-category-show').css('bottom', '0');
	});
	$('#intro-category-viewdefault').click(function() {
		$('.intro-category-show').css('position', 'absolute');
		view_detail('2000px', 'intro-category-viewdefault', 'intro-category-viewall', 'intro-category-content');
		$('.box_shadow').css('display', 'block');
		$('.intro-category_viewmore').css('margin-bottom', '40px');
		$('.intro-category-show').css('bottom', '-40px');
	});

	$('.product-fillter-box li a[href="javascript:;"]').click(function(e) {
		e.preventDefault();
	})
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
			$(target).closest('.intro-category-content').css('height', 'auto');
			$(target).closest('.intro-category-content').css('max-height', 'none');
			$(target).closest('.intro-category').find('#intro-category-viewdefault').css('display', 'inline-block');
			$(target).closest('.intro-category').find('#intro-category-viewall').css('display', 'none');
			$(target).closest('.intro-category').find('.box_shadow').css('display', 'none');
  			smoothScrollTo($(target).offset().top - 110);
		}
	}
});