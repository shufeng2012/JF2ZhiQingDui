/*
JavaScript函数
*/

//加入执勤队
function JiaRu()
{
    localStorage.setItem(jiaru_name,{
        class:jiaru_class,
        state:'未实习',
        daoshi_class:null,
        daoshi_name:null
    });
    jiaru_class = null;
    jiaru_name = null;
    names.push(jiaru_name);
    alert('加入成功！');
}

//添加实习
function ShiXi()
{
    localStorage[shixi_duiyuan_name] = {
        class:shixi_duiyuan_class,
        state:'未转正',
        daoshi_class:shixi_daoshi_class,
        daoshi_name:shixi_daoshi_name
    };
    shixi_daoshi_class = null;
    shixi_daoshi_name = null;
    shixi_duiyuan_class = null;
    shixi_duiyuan_name = null;
    alert('修改成功！');
}

//转正队员
function ZhuangZheng()
{

    localStorage[zhuangzheng_duiyuan_name] = {
        class:zhuangzheng_duiyuan_class,
        state:'已转正',
        daoshi_class:null,
        daoshi_name:null
    };
    zhuangzheng_daoshi_class = null;
    zhuangzheng_daoshi_name = null;
    zhuangzheng_duiyuan_class = null;
    zhuangzheng_duiyuan_name = null;
    alert('修改成功！');
}

//踢出队员
function TiChu()
{
    localStorage.removeItem(tichu_name);
    tichu_class = null;
    tichu_name = null;
    names.splice(names.indexOf(tichu_name,1));
    alert('踢出成功！');
}

//查看队员
function ChaKan(){
    var str = "";
    names.forEach(function(item){// 遍历学生数据数组,每一个学生的数据都要生成一个tr行
      str +="<tr><td>"+localStorage.item.class+"</td><td>"+item+"</td><td>"+localStorage.item.state+"</td><td>"+localStorage.item.daoshi_class+"</td><td>",localStorage.item.daoshi_name,"</td></tr>"
    });
    tbody.innerHTML = str; // 把tr渲染到tbody元素。
  }
/*
JavaScript变量
*/

//jiaru.html
var jiaru_class = document.getElementById('jiaru_class');
var jiaru_name = document.getElementById('jiaru_name');

//shixi.html
var shixi_duiyuan_class = document.getElementById('shixi_duiyuan_class');
var shixi_duiyuan_name = document.getElementById('shixi_duiyuan_name');
var shixi_daoshi_class = document.getElementById('shixi_daoshi_class');
var shixi_daoshi_name = document.getElementById('shixi_daoshi_name');

//zhuangzheng.html
var zhuangzheng_daoshi_class = document.getElementById('zhuangzheng_daoshi_class');
var zhuangzheng_daoshi_name = document.getElementById('zhuangzheng_daoshi_name');
var zhuangzheng_duiyuan_class = document.getElementById('zhuangzheng_duiyuan_class');
var zhuangzheng_duiyuan_name = document.getElementById('zhuangzheng_duiyuan_name');

//tichu.html
var tichu_class = document.getElementById('tichu_class');
var tichu_name = document.getElementById('tichu_name');

//执勤队名单
var names = [];