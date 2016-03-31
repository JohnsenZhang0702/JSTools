author:Johnsen Zhang

updateTime:2016-03-24

discription:自己写的一些功能组件，今后不断完善中。<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
组件存放在components文件夹中<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
工具类放在utils文件夹中

#拖动滚动组件:comp.PanComponent

参数列表: <br />
* element：需要拖动滚动的容器对象
* itemCount：拖动滚动容器中的子项数量
* pageItems：每页显示的数量
* childTag：子项内容的Html标签名

代码使用示例：
```
var scroll = this.element.querySelector('ul[data-gnId="csSeckillScroll"]');
var scrollPan = new comp.PanComponent();
scrollPan.initialize(scroll,liLen,3,"li");
```

**注意：该组件需要jQuery与Hammer v2.0.4的支持**

#RequestAnimationFrame管理器

参数列表: <br/>
* animateName：   动画名称
* animateHandler：动画代理函数

创建动画代码使用示例:
```
utils.RequestAnimateManager.getInstance().getAnimate(scorllAnimateName,scrollBanner);
```

参数列表: <br/>
* animateName：   动画名称

取消动画代码使用示例
```
utils.RequestAnimateManager.getInstance().cancelAnimate(scorllAnimateName);
```

**注意：该组件需要jQuery的支持**