/**动画管理器 */
utils.RequestAnimateManager = (function(window,$,undefind){
    "use strict";
    
    var prefers = ["webkit","moz","ms","o"];
    for(var i = 0,pre,len = prefers.length ; i < len && !window.requestAnimationFrame ; i++){
        pre = prefers[i];
        window.requestAnimationFrame = window[pre+"RequestAnimationFrame"];
        window.cancelAnimationFrame = window[pre+"CancelAnimationFrame"] || window[pre+"CancelRequestAnimationFrame"];
    }
    
    if(!window.requestAnimationFrame){
            //创建setTimeout模拟animation
    }
    
    var animateDic = {};
    
    function RequestAnimateManager(){
        
    }
    
    var rqmp = RequestAnimateManager.prototype;
    rqmp.getAnimate = function(animateName,animateHandler){
        var animate = animateDic[animateName];
        //创建一个animate
        animate = window.requestAnimationFrame(animateHandler);
        animateDic[animateName] = animate;
        return animate;
    }
    
    rqmp.cancelAnimate = function(animateName){
        var animate = animateDic[animateName];
        if(animate){
            window.cancelAnimationFrame(animate);
            animate = null;
            delete animateDic[animateName];
        }
    }
    
    var instance;
    
    return {
        getInstance:function(){
            if(!instance){
                instance = new RequestAnimateManager();
            }
            return instance;
        }
    }
})(window,jQuery);