// タッチイベント存在判定
var touch = ('ontouchstart' in window) ? 'touchstart' : 'mousedown';

// タッチムーブ禁止
$(document).bind('touchmove',function(e) { e.preventDefault(); });

// 遅延データスライド解除
$(function(){
	setTimeout(function(){1
		$('[data-slide-delay]').each(function(){
			$(this).attr('data-slide',$(this).attr('data-slide-delay'));
		});
		iRep.init();
	},400);
});

	/** クラス切り替え */
	var myScroll = {};
	var iScrollVerticalScrollbarHideTime;
	$('[data-toggle-target][data-toggle-class]').each(function(){
		var $self = $(this);
		var $target = $($self.data('toggleTarget'));
		var $targetClose = $target.not('.popup_wrapper').find('.close');
		var classValue = $self.data('toggleClass');
		var selector = $self.data('toggleScroll');

		console.log($self,$target,$targetClose,classValue,selector);

		/** 対象がスクロールを含む要素だった場合 */
		if($target.hasClass('scroll') && selector ){
			myScroll[selector] = new IScroll(selector, {
		        mouseWheel: true,
		        scrollbars: true,
		        fadeScrollbars: true,
		    });
			myScroll[selector].on('scrollStart',function(){
		    	clearTimeout(iScrollVerticalScrollbarHideTime);
		    });
		}

		/** イベント登録 */
		$self.add($targetClose).on(touch,function(ev){
			ev.preventDefault();
			ev.stopPropagation();
			$target.toggleClass(classValue);
			if($target.hasClass('scroll') && selector ){
				setTimeout(function(){
					/** リフレッシュ */
					myScroll[selector].refresh();

					/** 展開時にスクロールバー表示 */
					setTimeout (function(){
						$('.iScrollVerticalScrollbar').css({opacity:'1', transition:'0.5s'});
					},200);

					/** スクロールバー非表示 */
					iScrollVerticalScrollbarHideTime = setTimeout (function(){
						$('.iScrollVerticalScrollbar').css({opacity:'0'});
					},1000);
				},100);
			}
		});
	});



// iRepLibrary linksCustomTag 関数の上書き
// 必須：iRepLibrary.js
//------------------------------

iRep.init = function () {
	var a = function (selector, f) { Array.prototype.forEach.call(document.querySelectorAll(selector), f); }
	var b = function (){ return (/webOS|iPhone|iPad|iPod|Android|BlackBerry/i.test(navigator.userAgent)); }
	var c = function (e) {
		e.preventDefault();
		var s = e.currentTarget.dataset.slide;
		if (!s) return;
		if (/\.zip$/i.test(s)) s = s.slice(0, -4);
		s = s.split('/');
		if (b())
			document.location = (s.length == 1 ? ('veeva:gotoSlide(' + s[0] + '.zip)') : ('veeva:gotoSlide(' + s[1] + '.zip,' + s[0] + ')'));
		else
			window.location = (s.length == 1 ? ('../' + s[0] + '/' + s[0] + '.html') : ('../../' + s[0] + '/' + s[1] + '/' + s[1] + '.html'));
	}
	$('[data-slide]').unbind('click touchstart',false);
	a('[data-slide]', function(el) { el.addEventListener('click', c); el.addEventListener('touchstart', c); });
};

//------------------------------