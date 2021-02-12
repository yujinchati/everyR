//var TEMP_TOKEN = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJhIjpmYWxzZSwiciI6MCwicyI6WzBdLCJkIjoxLCJ0IjoxNDYzOTg2OTc0MTM0LCJ1IjoxLCJleHAiOjE0NjQ1OTE3NzQsInJleHAiOjE0NjQ1OTE3NzQxMzQsImp0aSI6ImZjYzg2YWJjLWU5NzgtNDhkYy05MWViLTdmYTk1NjMzNWMxNyJ9.I4IcT8EhjsIgeIoDnA-8jl2MTPm_i3pOfA4eHPYkaRBM3U_eMXn9rrgKnqaEsFJunM4CKdUEZXiI3YaGfZKeOA"; 
var ADRESS_SERVER = "";
var DELIVERY_SERVER = "";
var ACCOUNT_SERVER = "";
define(["jquery"], function($) {
		var POST_MAIL = "/sendmail";
		var webapi= {
				'putMail':function(data,successCB, errorCB) {
					network.useAjax("POST", POST_MAIL, JSON.stringify(data),successCB, errorCB);
				}
		}
		var network = {
				'useAjax' : function (method, reqUrl, reqData, successCB, errorCB,target) {
					/*var data = {};
					data.CODE = reqData ? reqData : "";
					data.METHOD = method;
					data.URL = reqUrl;*/
					$.ajax({
						type: method,
						url: reqUrl,
						data:  reqData,
						dataType:"json",
						contentType:"application/json",
						beforeSend: function (xhr) {
							//var token = getCookie('token');
							//if(token) {
							//xhr.setRequestHeader("Authorization", TEMP_TOKEN);
							//}
			            },
						success: function(response, textStatus, request){
							successCB(response,target);
						},
						error : function(response,textStatus, request){   
							 errorCB(response);
						},
						timeout: 24000
					});
				},
				'useAjaxNV' : function (method, reqUrl, reqData, successCB, errorCB) {
					
					$.ajax({
						type: method,
						url: reqUrl,
						data: reqData,
						dataType:"json",
						contentType:"application/json",
						/*X-Naver-Client-Id:"I1fT1gyfp4Yxv5Ndvh0H",
						X-Naver-Client-Secret:"TPJT72X9SL",*/
						beforeSend: function (request) {
							request.setRequestHeader("X-Naver-Client-Id", 'I1fT1gyfp4Yxv5Ndvh0H');
							request.setRequestHeader("X-Naver-Client-Secret", 'TPJT72X9SL');
							
			            },
						success: function(response, textStatus, request){
							/*var token = request.getResponseHeader("token");
							if(token)
								setCookies("token",token,365);*/
							successCB(response);
						},
						error : function(response){    
							errorCB(response);
						},
						timeout: 24000
					});
				}
		}
		return webapi;
	});


