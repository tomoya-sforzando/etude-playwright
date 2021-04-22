/*>*>*>*>*>*>*>*>*>*>*>*>*>*>*>*>*>*>*>*>
 
-- simplePlayer4iRep.jquery.js
-- last update - ver.1.0 2014-10-01
-- written by 9cc.jp (BIGM2Y)
-- (c) 9cc.jp (BIGM2Y)

-- require irepAlterSwipe.js

<*<*<*<*<*<*<*<*<*<*<*<*<*<*<*<*<*<*<*<*/
(function($){

	$.fn.sp4iRep = function(options,i) {

		var touch = ('ontouchstart' in window) ? 'touchstart' : 'mousedown';
		var sp4i = [];

		/** 初期化オプション */
		if ( options === "tidy" ) {
			if (!i){
				for ( sp4i in i ){
					sp4i[i].tidy();
					delete(sp4i[i]);
				}
			} else {
				sp4i[i].tidy();
				delete(sp4i[i]);
			}
			return $(this);
		}

		/** 補助関数埋め込み */
		$.fn.resetSp4i = function(){
			sp4i[0].init();			
		};

		return $(this).each(function(i){
			var o = sp4i[i] = {};

			console.log('it works!');

			o.$video = $(this);		
			o.$elm_video_wrapper = $('<div />').addClass('sp4i-player');
			o.$elm_video_controls = $(
				 '<div class="sp4i-play-overlay sp4i-parts"></div>'
				+'<div class="sp4i-controls sp4i-parts">'

				+'	<div class="sp4i-left">'
				+'	<a class="sp4i-play sp4i-parts" title="再生／一時停止"></a>'
				+'	<div class="sp4i-timer sp4i-parts">0:00</div>'
				+'	</div>'

				+'	<div class="sp4i-right">'
				+'	<div class="sp4i-right1">'
				+'	<div class="sp4i-seek sp4i-parts"></div>'
				+'	</div>'

				+'	<div class="sp4i-right2">'
				+'	<div class="sp4i-timer-rest sp4i-parts">-0:00</div>'
				+'	<a class="sp4i-fullscreen sp4i-parts" title="全画面表示"></a>'
				+'	</div>'
				+'	<div>'

				+'</div>'
			);
			o.pause = 'sp4i-paused-button';

			o.$parts = $('.sp4i-parts');
			o.$video.wrap(o.$elm_video_wrapper);
			o.$video.after(o.$elm_video_controls);
			o.$controls = $('.sp4i-controls');
			o.$overlay = $('.sp4i-play-overlay');
			o.$play = $('.sp4i-play');
			o.$seek = $('.sp4i-seek');
			o.$timer = $('.sp4i-timer');
			o.$timer_rest = $('.sp4i-timer-rest');
			o.$fullscreen = $('.sp4i-fullscreen');
      o.$overlay.hide();
			o.playing = false;
			o.timer = 0;
			o.timer2 = 0;

			o.video_controls_show = function(){
				o.timer2;
				o.$controls.css('display','block')
				o.timer2 = setTimeout(function(){
					o.$controls.removeClass('off').addClass('on');
				},10);
			};

			o.video_controls_hide = function(){
				clearTimeout(o.timer2);
				o.$controls.removeClass('on').addClass('off');
				o.timer2 = setTimeout(function(){ o.$controls.css('display','none'); },400);
			};

			o.$controls.on('touchstart touchmove touchend',function(event){
				clearTimeout(o.timer);
				if ( o.$video[0].paused == false ) o.timer = setTimeout(function(){ o.video_controls_hide(); },5000);
			});

			o.$controls.on('touchstart　touchend',function(event){ event.stopPropagation(); });

			o.$video.on(touch,function(){
				if ( o.$overlay.css('display') === 'none' ) {
					clearTimeout(o.timer);
					if ( o.$controls.css('opacity') === '0' ) o.video_controls_show();
					else o.video_controls_hide();
					if ( o.$video[0].paused == false ) o.timer = setTimeout(function(){ o.video_controls_hide(); },5000);
				}
			});

			o.$play.on(touch, function(){
				if ( o.$video[0].paused == false ) {
					o.$video[0].pause();
					o.playing = false;
					clearTimeout(o.timer);
				} else {
					o.video_controls_show();
					o.$video[0].play();
					o.playing = false;
					clearTimeout(o.timer);
					o.timer = setTimeout(function(){ o.video_controls_hide(); },5000);
				}
			});

			o.$overlay.on(touch, function(){
				if ( o.$video[0].paused == false ) {
					o.$video[0].pause();
					o.playing = false;
					clearTimeout(o.timer);
				} else {
					$(this).hide();
					o.video_controls_show();
					o.$video[0].play();
					o.playing = false;
					clearTimeout(o.timer);
					o.timer = setTimeout(function(){ o.video_controls_hide(); },5000);
				}
			});

			o.$video.on('play', function() {
        o.$play.addClass(o.pause); 
      });
			o.$video.on('pause', function() { 
        o.$play.removeClass(o.pause); 
      });
			o.$video.on('ended', function() { o.$play.removeClass(o.pause); });

			o.createSeek = function() {

				var seeksliding;

				var timeFormat = function(seconds){
					var m = Math.floor(seconds / 60);
					var s = Math.floor(seconds - (m * 60)) < 10 ? '0' + Math.floor(seconds - (m * 60)) : Math.floor(seconds - (m * 60));
					return m + ':' + s;
				};

				var seekUpdate = function() {
					var currenttime = o.$video[0].currentTime;
					if(!seeksliding) o.$seek.slider("value",currenttime);
					o.$timer.text(timeFormat(currenttime));
					o.$timer_rest.text('-'+timeFormat(o.$video[0].duration-currenttime));
				};

				if(o.$video[0].readyState) {
					var video_duration = o.$video[0].duration;
					o.$seek.slider({
						value: 0,
						step: 0.01,
						orientation: 'horizontal',
						range: 'min',
						max: video_duration,
						animate: true,
						slide: function(){
							seeksliding = true;
						},
						stop:function(e,ui){
							seeksliding = false;
							o.$video[0].currentTime = ui.value;
						}
					});

				o.$video.on('timeupdate', seekUpdate);
				o.$fullscreen.on(touch, function(){ o.$video[0].webkitEnterFullscreen(); });

				}
				else setTimeout(o.createSeek, 150);
			};

			o.createSeek();			
			o.$video.removeAttr('controls');

			/* 片付ける */
			o.tidy = function () {
				o.$parts.remove(true);
				$elm_video_wrapper.replaceWith(o.$video);
			}

			/** リセット */
			o.init = function () {
				o.$video[0].pause();
				o.$video[0].currentTime = 0;
				o.video_controls_hide();
				o.$overlay.hide();
			};


		});

	};
})(jQuery);