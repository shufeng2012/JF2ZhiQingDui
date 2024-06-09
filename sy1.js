document.οnclick=function(e){
    var evt=e||window.event;
    var tar=evt.target||evt.srcElement;
    if( (tar.tagName.toLowerCase()=="input"&&tar.type=="button")||tar.tagName.toLowerCase()=="button")
        {
           alert("你点击的是一个按钮");
        }
    }