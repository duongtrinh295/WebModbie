var getUrlParameter = function(url,name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(url);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}
$(document).ready(function() {
	// map render
	cs = getUrlParameter(window.location.href,'cs');
	if (cs == null) {
		data_location = 1;
	} else {
		data_location = cs;
	}
	loadmap(data_location);
	$('.location_tab ul li:nth-child('+data_location+')').addClass('active');
	$('.location_tab .location_info .location_info_item:nth-child('+data_location+')').css('display', 'block');

	// truyên data_location để lấy link goole và hiển thị map vào từng box
	function loadmap(data_id){
		$('.map .map-item').css('display', 'none');
		$('.map .map-item[data-location='+data_id+']').css('display', 'block');
		var map_id = $('.map .map-item[data-location='+data_id+']').data('map');
        var replaceElement = "<iframe src='"+map_id+"' width='600' height='450' frameborder='0' style='border:0' allowfullscreen=''></iframe>";
		$('.map .map-item').empty();
		$('.map .map-item[data-location='+data_id+']').append(replaceElement);
	};
	
	$('.location_tab ul li').on('click', function() {
		$('.location_tab ul li').removeClass('active');
		$(this).addClass('active');
		data_location = $(this).data('location');
		loadmap(data_location);
		$('.location_tab .location_info .location_info_item').css('display', 'none');
		$('.location_tab .location_info .location_info_item:nth-child('+data_location+')').css('display', 'block');
	})
});
