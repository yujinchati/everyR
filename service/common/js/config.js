(function(){
	var ver = '20200131';
	require.config({
		baseUrl:'/resources',
/*		baseUrl:'https://s3.ap-northeast-2.amazonaws.com/webcontents.howser.co.kr/resources',*/
	   	 paths: {
	   		 'jquery': '/resources/common/js/jquery-1.11.2.min', 
		     'jquery-touch': '/resources/common/js/jquery.touchSlider',
		     'jquery-drag': '/resources/common/js/jquery.event.drag-1.5.1.min',
		     'jquery-mobile': '/resources/common/js/jquery.mobile-1.4.5.min'
		    },
		  shim:{
			 'jquery': {
				 exports:'$'
			 },
			 'jquery-touch':['jquery'],
			 'jquery-drag':['jquery'],
			 'jquery-mobile':['jquery']
			 
		 },	 
		 urlArgs:function(id, url) {
		        var args = 'ts=' + ver;
		        if (url.indexOf('common/js/lib/') >= 0) {
		            args = 'ts=20191203';
		        }

		        return (url.indexOf('?') === -1 ? '?' : '&') + args;
		    }

	   });
})();



