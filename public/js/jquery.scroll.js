/**
 * 基于jquery1.7+的自定义滚动条插件，依赖jquery.mousewheel.js
 * author:navy
 * email:navyxie2010@gmail.com
 * qq:951178609
 * version:1.0
 * date 2013-04-05
 */
var NAVY = NAVY || {};
NAVY.Scroll = function(jqObj,wrapperObj,options){
    this.jqObj = $(jqObj);//内容对象
    this.wrapperObj = $(wrapperObj);//内容对象容器对象
    this.wrapperObjHeight = wrapperObj.outerHeight();//容器对象的高度
    this.jqObjHeight = jqObj.outerHeight();//内容对象的高度
    if(this.wrapperObjHeight >= this.jqObjHeight){
        //若内容对象高度小于容器对象高度则返回
        return false;
    }
    this.scrollHeight = this.wrapperObjHeight*this.wrapperObjHeight/this.jqObjHeight;//滚动条的高度
    this.maxValue = this.wrapperObjHeight - this.scrollHeight;//滚动条最大的可滚动高度
    var defaultOptions = {
        speed:1, //鼠标移动多长步长触发鼠标移动事件
        mouseWheelSpace:10, //鼠标滚轮时滚动条移动的步长
        hoverHideScroll:false //鼠标移动到容器对象上时出现滚动条，移开时隐藏滚动条
    };
    $.extend(defaultOptions,options);
    this.options = defaultOptions;
    this.init();
};
NAVY.Scroll.prototype = {
    /**
     * 初始化
     * @return {*}
     */
    init:function(){
        this.makeScroll();//生成滚动条
        this.initEvent();//初始化事件
        return this;
    },
    /**
     * 初始化事件
     * @return {*}
     */
    initEvent:function(){
        var mouseDown = false;//记录鼠标是否按下
        var startPageY = 0 ;//记录鼠标按下时e.pageY的值
        var startTop = 0 ;//记录鼠标按下时滚动条的top值
        var scrollObj = this.scrollObj,scrollWrapperObj = this.scrollWrapperObj,wrapperObj = this.wrapperObj,options = this.options,_this = this;
        scrollObj.mousedown(function(e){
            mouseDown = true;
            startPageY = e.pageY;
            startTop = scrollObj.position().top;
            return false;
        });
        $(document).on('mouseup mousemove',function(e){
            switch(e.type){
                case 'mouseup':
                    mouseDown = false;
                    return false;
                    break;
                case 'mousemove':
                    if(mouseDown){
                        var curPageY = e.pageY;
                        var moveY = curPageY - startPageY;
                        if(moveY % options.speed === 0){
                            _this.setScroll(startTop+moveY);
                        }
                    }
                    return false;
                    break;
            }
        });
        //滚轮事件
        wrapperObj.mousewheel(function(e,delta){
            var curTopValue = scrollObj.position().top;
            var value = 0;
            if(delta>0){
                //向上
                curTopValue -= options.mouseWheelSpace;
            }else{
                //向下
                curTopValue += options.mouseWheelSpace;
            }
            _this.setScroll(curTopValue);
            return false;
        });
        if(options.hoverHideScroll){
            wrapperObj.hover(function(){
                scrollWrapperObj.stop(true,true).fadeIn();
            },function(){
                scrollWrapperObj.stop(true,true).fadeOut();
            });
        }
        return this;
    },
    /**
     * 生成滚动条函数
     * @return {*}
     */
    makeScroll:function(){
        var wrapperObj = this.wrapperObj;
        if(wrapperObj.css('position') === 'static'){
            wrapperObj.css('position','relative');
        }
        wrapperObj.css({'overflow':'hidden'}).append('<div class="scrollWrapper"><div class="scrollContent" style="height: '+this.scrollHeight+'px"></div></div>');
        this.scrollWrapperObj = wrapperObj.find('.scrollWrapper');
        this.scrollObj = this.scrollWrapperObj.find('.scrollContent');
        return this;
    },
    /**
     * 设置滚动条的top值和内容对象jqObj的marginTop值
     * @param value 需要设置的滚动条的top值
     * @return {*}
     */
    setScroll:function(value){
        value = Math.min(Math.max(value,0),this.maxValue);
        var marginTopValue = (this.jqObjHeight/this.wrapperObjHeight*value);//按比例计算内容对象的marginTop值
        this.scrollObj.css({top:value});
        this.jqObj.css({marginTop:-marginTopValue});
        return this;
    },
    /**
     * 销毁滚动条
     * @return {*}
     */
    destroy:function(){
        this.scrollWrapperObj.remove().unbind();
        return this;
    }
};