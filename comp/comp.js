comp.PanComponent = (function(window,$,Hammer,undefined){
    
    "use strict";
    
    function PanComponent(){
        this.element = null;
        this.element$ = null;
        this.elementH = null;
        this.gnId = null;
        
        this._panStartX = null;
        this._rightLimit = null;
        
        this._itemCount = null;
        this._pageItems = null;
        this._childTag = null;
    }
    
    var pcp = PanComponent.prototype;
    /**
     * 初始化方法
     * @params  element 拖动组件容器
     * @params  itemCount   组件内容数量
     * @params  pageItems   每页显示的组件数量
     * @params  childTag    子组件的html标签名
     */
    pcp.initialize = function(element,itemCount,pageItems,childTag){
        this.element = element;
        this.element$ = $(element);
        this.elementH = new Hammer(this.element);
        this.gnId = this.element.getAttribute("data-gnId");
        this._itemCount = itemCount;
        this._pageItems = pageItems;
        this._childTag = childTag;
        this.elementH.on("panmove",elementPanHandler.bind(this));
        this.elementH.on("panend",elementPanHandler.bind(this));
        this.elementH.on("panstart",elementPanHandler.bind(this))
        setSize.call(this,itemCount,pageItems,childTag);
    };
    /**
     * 重置组件尺寸
     * @params  newWidthScale   新宽度与就宽度的比例
     */
    pcp.renewSize = function(newWidthScale){
        var newMargenLeft = parseInt(this.element$.css('margin-left')) * newWidthScale;
        this.element$.css('margin-left',newMargenLeft);
        // setSize.call(this,this._itemCount,this._pageItems,this._childTag);
    };
    
    /**
     * 设置组件的尺寸
     * @params  element 拖动组件容器
     * @params  itemCount   组件内容数量
     * @params  pageItems   每页显示的组件数量
     * @params  childTag    子组件的html标签名
     */
    function setSize(itemCount,pageItems,childTag){
        var elementWidthPer;
        var itemWidthPer;
        if(itemCount <= pageItems){
            elementWidthPer = 100;
            this._rightLimit = 0;
            itemWidthPer = 100 / pageItems;
        }else{
            elementWidthPer = Math.ceil(itemCount / pageItems * 100);
            itemWidthPer = 100 / itemCount;
        }
        console.log(itemWidthPer);
        this.element$.css('width',elementWidthPer + '%');
        this.element$.find(childTag).css('width',itemWidthPer + '%');
    }
    /**
     * 拖动事件函数
     */
    function elementPanHandler(e){
        switch(e.type){
            case "panend":
                panend.call(this);
                break;
            case "panstart":
                this._panStartX = parseInt(this.element$.css('margin-left'));
                var elementW = parseInt(this.element$.css('width'));
                this._rightLimit = Math.min(0,-elementW + elementW / this._itemCount * this._pageItems);
                break;
            case "panmove":
                console.log(e);
                moveElement.call(this,e.deltaX);
                break;
        }           
    }
    /**
     * 拖动完成处理函数
     */
    function panend(){
        var currMarginLeft = parseInt(this.element$.css('margin-left'));
        if(currMarginLeft > 0){
            this.element$.animate({'margin-left':0},100);
        }else if(currMarginLeft < this._rightLimit){
            this.element$.animate({'margin-left':this._rightLimit},100);
        }else{
            
        }
    }
    /**
     * 拖动过程中的逻辑处理函数
     * @params  moveStep    移动步长
     */
    function moveElement(moveStep){
        var currMarginLeft = this._panStartX + moveStep;
        console.log(currMarginLeft);
        this.element$.css('margin-left',currMarginLeft);
    }
    
    return PanComponent;
})(window,jQuery,Hammer);