jquery-scroll
=============
基于jquery的自定义滚动条，依赖jquery.mousewheel.js插件
注意：ie6下需要设置容器对象css的overflow值为hidden
demo:
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>SCROLL</title>
    <link rel="stylesheet" type="text/css" href="public/css/scroll.css" />
    <script type="text/javascript" src="public/js/jquery.js"></script>
    <script type="text/javascript" src="public/js/jquery.mousewheel.js"></script>
    <script type="text/javascript" src="public/js/jquery.scroll.js"></script>
    <style type="text/css">
        *{
            margin: 0;
            padding: 0;
        }
        #wrapper{
            width: 600px;
            height: 200px;
            background: blue;
            margin: 20px auto;
            overflow: hidden;
        }
        #content{
            width: 100%;
        }
        #content ul{
            width: 100%;
            overflow: hidden;
        }
        #content ul li{
            width: 100%;
            height: 20px;
            line-height: 20px;
            float: left;
        }
    </style>
</head>
<body>
    <div id="wrapper">
        <div id="content"></div>
    </div>
<script type="text/javascript">
    $(function(){
        var html = ['<ul>'];
        for(var i = 0 ; i < 40 ; i++){
            html.push('<li>This is li content! This is i : '+i+'</li>');
        }
        html.push('</ul>');
        $('#content').append(html.join(''));
        new NAVY.Scroll($('#content'),$('#wrapper'),{mouseWheelSpace:5,hoverHideScroll:true});
    });
</script>
</body>
</html>
