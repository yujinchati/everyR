define(["jquery",'_js/utility','_js/jquery.fullpage'], function($,util,fullpage) {
var HEADER = 90;
$(".nav_main").load("./nav.html",function(){});
var Home = {
	'init':function(e){
		$(function(){
		    var hash = location.hash.replace('#','');
		    if(hash != ''){
		        location.hash = '';
		    }
		});
		$("body").attr("style","overflow:hidden");
		var width = 0;
		var mainTxt = util.animate.typing($(".txt_intro"),"인생의 로망_<br>{미리} 누리세요",150,0,0,function(){
			$(".wrap_intro .intro_progress").hide();
			//$(".wrap_intro .intro_progress").stop(true).animate({opacity:"0"},1000);
			$(".txt_intro,.wrap_intro .logo_everyr,.wrap_intro .txt_copyright").stop(true).animate({opacity:"0"},1000);
			$(".intro_bar,.intro_bg1,.intro_bg2").show();
			$(".wrap_intro").attr("style","background:none");
			$(".intro_bar").hide();
			$(".intro_bg1").stop(true).animate({left:'-100%'},2000);
			$(".intro_bg2").stop(true).animate({left:'130%'},2000);
			$(".intro_bg2").stop(true).animate({left:'130%'},2000,function(){
				$(".wrap_intro").remove();
				$("body").attr("style","");
			});
			$('#fullpage').fullpage({
				verticalCentered:true,
				autoScrolling:true,
	 			anchors: ['contIntro1', 'contIntro2', 'contIntro3','contIntro4','contIntro5'],
				navigation: true,
				navigationPosition: 'right',
				onLeave: function(origin, destination,direction) {
				    if(origin){
				    	$(".wrap_main .nav_main").removeClass("nav_main_type");
				    	if(destination==4 || destination==5){
				    		$(".wrap_main .cont_main .area_introduce .cont_intro" + destination + " .inner_cont").addClass("show");
				    		if(destination==5)
				    			$(".wrap_main .nav_main").addClass("nav_main_type");
				    	}else{
				    		$(".wrap_main .cont_main .area_introduce .cont_intro" + destination + " .tit_intro").addClass("show");
				    	}
				    }
				  },
			},2000);
			$(".wrap_main .cont_main .area_introduce .cont_intro1 .tit_intro").addClass("show");
		});
		var popupStatus = util.cookie.get("POPUP_TODAY");
		if(!popupStatus){
			var sdate= new Date("2019/12/04 00:00:00");
			var edate= new Date("2019/12/15 17:00:00");
			if(Date.now() >= sdate && Date.now() <= edate){
				$(".inner_rpay_homedeco").parent().show();
			}
		}
		$(".rpay_layer .inner_rpay_homedeco .btn_today").click(function(e){
			var d = new Date();
			d.setDate(d.getDate() + 1); 
			util.cookie.set("POPUP_TODAY",null,d.toUTCString());
			$('.rpay_layer .inner_rpay_homedeco .btn_close').trigger('click');
		});
		var scrollBnr = $(window).scrollTop();
		var HEADER = 90;
		$(window).scroll(function(e){
			scrollBnr = $(window).scrollTop();
			if(scrollBnr >= HEADER){
				$('.wrap_main #header').stop(true,true).addClass('fixed_head',10000);
			}else{
				$('.wrap_main #header').removeClass('fixed_head');
			}
			if(scrollBnr >= 1200){
				if($('.rpay_payment .txt_r').text() == "0"){
					$('.rpay_payment .txt_r').each(function(){
					    $(this).prop('Counter',0).stop().animate({
					        Counter: '45600',
					       // delay: 10000,
					    }, {
					        duration: 2000,
					        easing: 'swing',
					        step: function(now){
					            $(this).text(Math.ceil(now));
					        },
					        complete:function(){
					        	var now = $(this).text();
					        	now = now.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					        	$(this).text(now);
					        }
					    });
					});
				}
			}
		});
		if(scrollBnr >= HEADER){
			$('.wrap_main #header').stop(true,true).addClass('fixed_head',10000);
		}else{
			$('.wrap_main #header').removeClass('fixed_head');
		}
	},
	'partner':function(e){
		$('.cont_brand .main_detail .list_detail li .link_detail').bind('click',function(e){
			util.target.preventEvent(e);
			var target = util.target.get(e);
			var type = target.attr("class").split(" ");
			var index = target.parent().index();
			target.parents(".list_detail").find("li").removeClass("on");
			target.parents(".list_detail").find("li").eq(index).addClass("on");
			$('.cont_brand .main_detail .list_brand li').hide();
			if(type[1]){
				$('.cont_brand .main_detail .list_brand li[value='+type[1]+']').show();
			}else{
				$('.cont_brand .main_detail .list_brand li').show();
			}
		});
	},
	'event':function(e){
		var params = window.location.href.slice(window.location.href.indexOf('?') + 1);
		if(params=="event"){
			$(".list_tab li").eq(0).addClass("on");
			$(".cont_promo .main_detail").eq(0).show();
		}else{
			$(".list_tab li").eq(1).addClass("on");
			$(".cont_promo .main_detail").eq(1).show();
		}
		$('.list_tab li .link_tab').bind('click',function(e){
			util.target.preventEvent(e);
			var target = util.target.get(e);
			var index = target.parent().index();
			target.parents(".list_tab").find("li").removeClass("on");
			$(".cont_promo .main_detail").hide();
			target.parents(".list_tab").find("li").eq(index).addClass("on");
			$(".cont_promo .main_detail").eq(index).show();
		});
		$('.main_detail .list_detail li .link_detail').bind('click',function(e){
			util.target.preventEvent(e);
			var target = util.target.get(e);
			var index = target.parent().index();
			target.parents(".list_detail").find("li").removeClass("on");
			$(".cont_promo .main_detail .wrap_event").hide();
			
			target.parents(".list_detail").find("li").eq(index).addClass("on");
			$(".cont_promo .main_detail .wrap_event").eq(index).show();
		});
	},
	'contact':function(e){
		$(".check_comm input[type=checkbox]").change(function(e){
			var target = util.target.get(e);
			if(target.is(":checked")){
				target.closest(".check_comm").addClass("check_on");
				target.next().children().addClass("ico_focused");
				target.prop("checked",true);
				target.attr("checked","checked");
				target.parent().siblings('.emph_error').hide();
			}else{
				target.closest(".check_comm").removeClass("check_on");
				target.next().children().removeClass("ico_focused");
				target.prop("checked",false);
				target.removeAttr("checked");
			}
		});
		$('.tf_request').keyup(function(e){
			if($(this).parent().hasClass("wrong"))
				$(this).parent().removeClass("wrong")
				
			var content = $(this).val();
			$('.inner_field .txt_num .emph_now').html(content.length);
			if(content.length > 1000){
				$(this).val(content.substring(0, 1000));
			}
		});
		$('.input_comm .inp_g').keyup(function(e){
			if($(this).parent().hasClass("wrong"))
				$(this).parent().removeClass("wrong")
		});
		$('#formContact').submit(function(e){
			util.target.preventEvent(e);
			if(form.validateForm()){
			   var data ={
				"senderName":$('#userName').val(),
				"contents" :
					"추천/제안 브랜드 :&nbsp;&nbsp;" + $('#userCompnay').val()+"<br><br>"+
					"대표 상품군 :&nbsp;&nbsp;" + $('#userProduct').val()+"<br><br>"+
					"홈페이지 주소 :&nbsp;&nbsp;" + $('#userPage').val()+"<br><br>"+
					"추천자/담당자:&nbsp;&nbsp;" + $('#userName').val()+"<br><br>"+
					"전화번호:&nbsp;&nbsp;" + $('#userPhone').val()+"<br><br>"+
					"메일주소:&nbsp;&nbsp;" + $('#userMail').val()+"<br><br>"+
					"추천이유/제휴내용:&nbsp;&nbsp;" + $('#userContent').val() +"<br><br>",
					"subject": $("#userCompnay").val() + "_ 제휴문의",
				};
/*				webapi.putMail(data,function(res){
					alert("메일을 발송하였습니다.");
				},function(e){
					alert("메일 발송을 실패하였습니다. 고객센터에 문의해주세요.");
				});*/
			}
		});
	}
}
var form = {
	'validateForm':function(){
		var errmsg = '';
		var data;
		if(!$("#userCompnay").val()){
			$("#userCompnay").parent().addClass("wrong");
			errmsg = '미입력';
			$("#userCompnay").attr("placeholder",errmsg);
			data = false;
		}
		if(!$("#userProduct").val()){
			$("#userProduct").parent().addClass("wrong");
			errmsg = '미입력';
			$("#userProduct").attr("placeholder",errmsg);
			data = false;
		}
		if(!$("#userName").val()){
			$("#userName").parent().addClass("wrong");
			errmsg = '미입력';
			$("#userName").attr("placeholder",errmsg);
			data = false;
		}
		if(!$("#userPhone").val()){
			$("#userPhone").parent().addClass("wrong");
			errmsg = '미입력';
			$("#userPhone").attr("placeholder",errmsg);
			data = false;
		}else{
			var regExp = /^[0-9-]+$/;
			if ( !regExp.test( $('#userPhone').val() ) ) {
				$("#userPhone").parent().addClass("wrong");
				errmsg = '전화번호를 확인해주세요.';
				$("#userPhone").val("");
				$("#userPhone").attr("placeholder",errmsg);
				data = false;
			}
		}
		if(!$('#userMail').val()){
			$('#userMail').parent().addClass("wrong");
			errmsg = '미입력';
			$("#userMail").attr("placeholder",errmsg);
			data = false;
		}else{
			if(!(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($('#userMail').val()))) {
				$('#userMail').parent().addClass("wrong");
				errmsg = '이메일 주소를 확인 후 다시 입력해 주세요.';
				$("#userMail").val("");
				$("#userMail").attr("placeholder",errmsg);
				data = false;
			} 
		}
		if(!$('#userContent').val()){
			$("#userContent").parent().addClass("wrong");
			errmsg = '미입력';
			$("#userContent").attr("placeholder",errmsg);
			data = false;
		}
		if(!$(".check_comm input").is(':checked')){
			errmsg = "‘개인정보 수집 및 이용약관’에 동의해 주셔야 문의 등록이 가능합니다.";
			$(".check_comm").siblings(".txt_wrong").text(errmsg).attr('style','display:inline-block');
			data = false;
		}else{
			$(".check_comm").siblings(".txt_wrong").hide();
		}
		if(data==false){
			return false;
		}else{
			return true;
		}
	}
}

return Home;

});