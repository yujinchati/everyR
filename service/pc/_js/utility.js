define(["jquery"], function($) {
	var idleState = true;
    var idleTimer = null;
    var count = 100;
    var textCount = 0;
    var textIndex = 0;
	var util = {
		'animate':{
			'typing':function(target,text,timeInterval,strEnd,timeIndex,CB){
				if(strEnd == '|'){
					$('.txt_bar').remove();
				}
				var strongStart = text.indexOf('{');
				var strongEnd = text.indexOf('}');
				var strongText = text.substring(strongStart+1,strongEnd);
				var re = new RegExp('{' + strongText + '}');
				text = text.replace(re,'$');
			
				var atrAry = text.split('<br>');
				var strAry = [];
				for(var i = 0; i < atrAry.length; i++){
					if(i != 0){
						strAry.push('<br>');
					}
					strAry = strAry.concat(atrAry[i].split(''));
				}
				var strlength = atrAry.length;
				timeIndex = 0;
				if(textCount == 0)
					textCount = strAry.length + strongText.length;
				var endIndex = strAry.length;
				target.append('<span style="margin-left:-7px" class="txt_bar">|</span>');
				var playAlert = setInterval(function(){
						if(endIndex <= timeIndex){
							clearInterval(playAlert);
							
							var contents = target.html().replace(/\|/gi,'');
							//target.html(contents + '<span class="txt_bar">|</span>');
							if(strongText){
								setTimeout(function(){ 
									util.animate.typing($('#HIGHLIGHT'),strongText,200,'|',0,CB);
									strongText = '';
									
								},2000);
								
								var ltime = 0;
								for(var j = 0 ; j < 5; j++){
									ltime = ltime + 200
									setTimeout(function(){ 
										
										$(".txt_bar").after($(".txt_bar").prev());
									},ltime);
								}
							
							}
							else{
								setTimeout(function(){ 
									$('.txt_bar').remove();
								},1000);
							}
							return;
						}
						//var contents = target.html().replace(/\|/gi,'');
						if(strAry[timeIndex] == '$'){
							strAry[timeIndex] = '<span id="HIGHLIGHT"></span>';
						}
						target.children('.txt_bar').before('<span>' + strAry[timeIndex] + '</span>');
						timeIndex++;
						textIndex++;
						util.add(textIndex,CB);
					}, timeInterval);
				
			}
		},
		'add':function(index,CB){
			count = 100 - (index / textCount * 100);
				$(".wrap_intro .intro_progress .bg_progress").animate({
				    width: count + '%'
				}, 100,function(){
					if(count == 0){
						CB();
					}
				});
		},
		'data':{
			'valid': function(data){
				return typeof data == 'undefined' ? null : data;
			}
		},
		'target':{
			'preventEvent':function(e){
				if (e.preventDefault) {
				    e.preventDefault();
				} else {
				    e.returnValue = false;
				}
			},
			'stopPropagation':function(e){
				if (e.stopPropagation) {
					e.stopPropagation();
				} else {
					e.cancelBubble = true;
				}
			},
			'get':function(e){
				return (e.currentTarget) ? $(e.currentTarget) : $(e.srcElement);
				
			},
			'active':function(target) {
				target.addClass('active');
				target.prop('disabled',true);
			},
			'deactive':function(target){
				target.removeClass('active');
				target.prop('disabled',false);
			}
		},
		'dom':{
			'create':function(tagName,option){
				tagName = '<' + tagName + '/>';
				var	$container = $(tagName, option);
				return $container;
			}
		},
		'excel':{
			'exports':function(targetId,title){
				var targetId = targetId;
				var title = title
				require( [
				          	'jquery.battatech.excelexport'
				         
				      ],function (){
					var agnt = navigator.userAgent.toLowerCase();   
					 if(agnt.search('msie') >= 0 || agnt.search('trident') >=0){
						
						 var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
							var textRange; var j=0;
							var tab = document.getElementById(targetId); // id of table

							for(j = 0 ; j < tab.rows.length ; j++) 
							{     
								tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
							}

							tab_text=tab_text+"</table>";
							tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
							tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
							tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params


							var txtArea1 = document.getElementById('txtArea1');
							txtArea1.contentWindow.document.open("txt/html","replace");
							txtArea1.contentWindow.document.write(tab_text);
							txtArea1.contentWindow.document.close();
							txtArea1.contentWindow.focus(); 
							
							var sa=txtArea1.contentWindow.document.execCommand("SaveAs",true,title + '.xls');
					 }
					 else{
						 $("#" + targetId).battatech_excelexport({
					            containerid: "tblExport"
					           , datatype: 'table',
					           name: title
					        	
					        });
						
					 }
				
				});
				
				
			}
		},
		'print':function(targetId){
			win = window.open();
		    self.focus();
		    win.document.open();
		    win.document.write('<html><head>');
		    win.document.write('</head><body class="print">');
		    win.document.write($('#'+ targetId).clone().wrapAll("<div/>").parent().html());
		    win.document.write('</body><html>');
		    win.document.close();
		    setTimeout(function(){ 
		    win.print();
		   	win.close(); }, 500);

		   
		},
		'toastMsg':function(text){
			if($('#toastpop').length == 0){
				var pTag = util.dom.create('p',{'id':'toastpop','class': 'try'});
				var spanTag = util.dom.create('span',{'text':text});
				$('body').append($(pTag).append(spanTag));
			}
			else{
				$('#toastpop').children('span').text(text);
			}
			if($('#toastpop').is(":visible")){
				
			}
			else{
				$('#toastpop').fadeIn();
				setTimeout(function(){
					$('#toastpop').fadeOut();
				},2000);
			}
			
			
		},
		'cookie':{
			'set':function(_key,_value,time){
				//set cookies
				var todayDate = new Date();
				
				if(time == 'session'){
					document.cookie = _key +"="+ _value + ";expires=session" + ";path=/;" /*+ "domain=howser.co.kr"*/;
				}
				else{
					//todayDate.setDate( todayDate.getDate() + _day);
					document.cookie = _key +"="+ _value + ";expires="+ time + ";path=/;" /*+ "domain=howser.co.kr"*/;
				}
				
			},
			'remove':function(cookieName){
				var expireDate = new Date();

				expireDate.setDate( expireDate.getDate() - 1 );
				document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
			},
			'get':function(name){
				var cname = name + "=";
				var dc = document.cookie;
				if (dc.length > 0) {
				begin = dc.indexOf(cname);
				if (begin != -1) {
				begin += cname.length;
				end = dc.indexOf(";", begin);
				if (end == -1)
				end = dc.length;
				return unescape(dc.substring(begin, end));
				}
				}
				return null;
			}
		},
		'bindInputBox':function(e){
			util.target.preventEvent(e);
			var target = util.target.get(e);
			
			if(e.which == 13){
				
			}
			else{
				if(target.val().length==0){
					target.prev().attr('class','txt_placeholder');
				}else{
					target.prev().attr('class','screen_out');
				}
			}
		},
		'HashManager':{
			'add' :function(value){
				location.href = (location.href).split('#')[0] + '#' + value;
			},
			'get':function(key){
				var index = (location.href).lastIndexOf('?');//(location.href).split("?")[1];
				var hash = null;
				if(index){
					hash = (location.href).substring(index + 1);
				}
				if(typeof hash == "undefined"){
					return null;
				}
				//hash = hash.replace(/\&$/, '');
				var keyAry = hash.split('&');
				for(var i=0; i < keyAry.length; i++){
					if(keyAry[i].indexOf(key + "=") == 0){
						hash = keyAry[i].substring(key.length+1);
						
						return hash;
					}
				}
				
				return null;
				
				
			}
		},
		'naverMap':{
			'create':function(option,CBfn){
				var detailAdd = new naver.maps.LatLng(option.geoLatitude,option.geoLongitude),
				    map = new naver.maps.Map('map', {
				        center: detailAdd.destinationPoint(10, 200),
				        zoom: 10,
				        scaleControl: false,
				        logoControl: false,
				        mapDataControl: false,
				        zoomControl: true,
				        minZoom: 1
				    }),
				    marker = new naver.maps.Marker({
				        map: map,
				        position: detailAdd
				    });

				var contentString = [
				        '<div class="iw_inner" style="padding:10px">',
				        '<p>'+option.address+'</p>',
				        '</div>'
				    ].join('');

				var infowindow = new naver.maps.InfoWindow({
				    content: contentString,
				    maxWidth: 140,
				    backgroundColor: "#fff",
				    borderColor: "#444",
				    borderWidth: 1,
				    anchorSize: new naver.maps.Size(10, 1),
				    anchorColor: "#fff",
				    pixelOffset: new naver.maps.Point(10, -10)
				});

				naver.maps.Event.addListener(marker, "click", function(e) {
				    if (infowindow.getMap()) {
				        infowindow.close();
				    } else {
				        infowindow.open(map, marker);
				    }
				});
				infowindow.open(map, marker);
			}
		},
		
	}
	return util;
});



/*function drawDot(_width,_height,text){
	require( [
	          'lib/jquery.dotdotdot.min'
	         
	      ],function (){
		var styleWidth = "position:absolute;top:-999px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;height:" + _height + ";width:" +  _width + ";";
		var spantag = createTag('span',{'class':'cal_dot','style': styleWidth,'text':text});
		
		$('body').append(spantag);
		spantag.dotdotdot();
	
	});
	
	
}*/
