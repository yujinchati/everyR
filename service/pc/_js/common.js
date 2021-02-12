$(document).ready(function(){ 
	var url = window.location.pathname;
	var split = url.split('/');
	var foldername = split[split.length-2];
	var filename = url.substring(url.lastIndexOf('/')+1,url.lastIndexOf('.'));
	var params = window.location.href.slice(window.location.href.indexOf('?') + 1);
	
	$("#everyrWrap").addClass("wrap_"+filename);	
	$(".nav_main").load("./nav.html",function(){
		if(params=="nav"){
			$('.inner_nav').addClass("on");
		}
	});
	
	if(filename=="main" && params=="layer"){
		$('.dimmed_layer').show();
		$('.everyr_layer').show();
	}
	if(filename=="promo" && params=="event" || params=="eventdone"){
		$('.main_detail').hide();
		$('.main_detail').eq(0).show();
		if(params=="eventdone"){
			$('.list_ing').hide();
			$('.list_done').show();
		}
	}
	var Request = {
			'animate':function(data){
				$('body,html').animate({scrollTop:data}, '200', 'swing', function() { 
					  
				});
			},
			'imgViewer':function(data){
				slideIndex2 = eval(slideIndex + (data ? '-' : '+') + 1) % 6;
				if(!data && slideIndex2 < 0){
					slideIndex2 = 6 - 1;
				}
				
				$(".list_viewer li:hidden").css("left", (data ? '-' : '+') + "994px");
				$(".list_viewer li").eq(slideIndex).animate({left:(data ? '+' : '-') + "=994px"}, slideTime, function(){
					$(this).css("display","none").css("left",(data ? '-' : '+') + "994px");
				});
				$(".list_viewer li").eq(slideIndex2).css("display","block").animate({left:(data ? '+' : '-') + "=994px"}, slideTime);
				slideIndex = slideIndex2;
				
				if(slideIndex == 0){
					$('.layer_viewer .btn_prev').hide();
				}else if(slideIndex == 5){
					$('.layer_viewer .btn_next').hide();
				}else{
					$('.layer_viewer .btn_prev, .layer_viewer .btn_next').show();
				}
			}
	}
	//Request.animate(0);
});