// # replace swipe_vod action 
// ! require clm-library-2.0.js
(function(win, $) {
    var irepAlterSwipe = (function(){
        var self = this;
        self.touchStartX;
        self.touchEndX;
        self.touchMoveX;
        self.reloadLock;
        self.lock = function(){ self.reloadLock = true; };
        self.unlock = function(){ self.reloadLock = false; };
        self.init = function(){
            $(document)
            .on("touchstart",function(e){
                self.touchStartX = e.originalEvent.changedTouches[0].pageX;
            })
            .on("touchend",function(e){
                if ( self.touchStartX !== false ) {
                    self.touchEndX = e.originalEvent.changedTouches[0].pageX;
                    touchMoveX = self.touchStartX - self.touchEndX;
                    if( touchMoveX <= -350 ){
                        if ( !self.reloadLock ) {
                            com.veeva.clm.prevSlide();
                        }
                    } else if ( 350 <= touchMoveX ) {
                        if ( !self.reloadLock ) {
                            com.veeva.clm.nextSlide();
                        }
                    }
                    self.touchStartX = false;
                }
            })
            ;
            return self;
        };
    })();
    win.irepAlterSwipe  = self.init();
})(window, jQuery);