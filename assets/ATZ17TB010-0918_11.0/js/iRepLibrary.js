var iRep = {};
iRep = (function(window){

	function lockScroll(){
		if(!window.navigator.standalone){ return; }
		var startX;
		var startY;
		function tstart(event){
			startX = event.touches[0].pageX;
			startY = event.touches[0].pageY;
		}
		function preventScroll(event) {
			var c = event.target;
			var overflow;
			var prevent = true;
			while(c != null){
				o = getComputedStyle(c);
				overflow = o ? o['overflow'] : null;
				if(overflow == 'scroll' || overflow == 'auto'){
					if(
						Math.abs(startX - event.touches[0].pageX) < Math.abs(startY - event.touches[0].pageY) &&
						startY - event.touches[0].pageY >= 0 && //上方向
						c.scrollHeight - c.clientHeight - c.scrollTop == 0 || //スクロールが一番上

						Math.abs(startX - event.touches[0].pageX) < Math.abs(startY - event.touches[0].pageY) &&
						startY - event.touches[0].pageY <= 0 && //下方向
						c.scrollTop == 0 //スクロールが一番下
						)
					{
						event.preventDefault();
					}else{
						prevent = false;
					}
				}
				c = c.parentNode;
			}
			startY = event.touches[0].pageY;
			if(prevent){
				event.preventDefault();
			}
		}
		document.addEventListener("touchstart", tstart, false);
		document.addEventListener("touchmove", preventScroll, false);
	}

	/* The following functions have been copied from iRep Core v1.1. */
	function isMobile(){
		return (/webOS|iPhone|iPad|iPod|Android|BlackBerry/i.test(navigator.userAgent));
	}

	function linksCustomTag(){
		$('[data-slide]').bind('click touchstart',function(e){
			e.preventDefault();

			var slideLink=$(this).attr('data-slide');
			var slideName = slideLink.substring(0, slideLink.length - 4);
			
			if(slideLink!=''){
				if(isMobile()){
					var detailerType = 'veeva';

					if(detailerType!='veeva'){
						document.location="melt://navigatetoitem:"+slideName+'.html';
					}else{
						document.location='veeva:gotoSlide('+slideName+'.zip)';
					}
				}else{
					//for desktop browsers 
					window.location='../'+slideName+'/'+slideName+'.html';
				}
			}
		});
	}


	return {
		init: function(){
			linksCustomTag();
			lockScroll();
		}
	};
})(window);

$(function(){
	iRep.init();
});
