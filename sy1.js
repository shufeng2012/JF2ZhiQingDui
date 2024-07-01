var studentsData = [];// 存放所有学生的数据
var add = document.querySelector("#add");
var modal = document.querySelector(".modal");
var btns = document.querySelectorAll(".modal button");
var inputs = document.querySelectorAll(".modal input");
var tbody = document.querySelector(".table>tbody");
var checkAll = document.querySelector("#checkall");
// 进入页面判断storage里面是否有data数据，如果有则需要取出来赋值给studentsData，并且要渲染到界面。
if(localStorage.getItem("data")){ 
  studentsData = JSON.parse(localStorage.getItem("data")); // 把json数据转为js对象
  showSudentToTable(); // 渲染函数
}
add.onclick=function(){ // 添加学生，显示弹框
  modal.style.display = "flex";
  // input框输入值需要清空
  for(var i=0;i<inputs.length;i++){
    inputs[i].value = ""
  }
}
btns[1].onclick=function(){ // 取消弹窗
  modal.style.display = "none";
}
btns[0].onclick=function(){ // 点击确定按钮，保存学生信息
  var name = inputs[0].value; // 获取学生姓名
  var age = inputs[1].value; // 获取学生年龄
  var num = inputs[2].value; // 获取学生学号
  var id = inputs[3].value; // 获取学生id号
  
  // 去掉输入数据的前后空格，判断用户是否输入了信息，没有输入信息则提醒
  if(!name.trim() || !age.trim() || !num.trim() || !id.trim()){ 
    return alert("请填写完整信息!");
  }
  // 学号和id不能重复
  for(var i=0;i<studentsData.length;i++){
    if(studentsData[i].id === id) {
      return alert("学生id重复!");
    } else if(studentsData[i].num === num){
      return alert("学生学号重复!");
    }
  }
  studentsData.push({
    name: name,
    age: Number(age),
    num: Number(num),
    id: Number(id)
  });
  // 学生数据需要持久化存储,要localStorage,storage存储只能存字符串。
  localStorage.setItem("data",JSON.stringify(studentsData));
  modal.style.display = "none";

  showSudentToTable();
}
// 渲染(把js数据显示到网页上面)studentsData数据到table表格显示的方法
function showSudentToTable(){
  var str = "";
  studentsData.forEach(function(item){// 遍历学生数据数组,每一个学生的数据都要生成一个tr行
    str +="<tr><td><input οnclick='changeCk(this,"+item.id+")' type='checkbox' ></td><td>"+item.id+"</td><td>"+item.name+"</td><td>"+item.age+"</td><td>"+item.num+"</td><td><button οnclick='handleDel("+item.id+")'>删除</button></td></tr>"
  });
  tbody.innerHTML = str; // 把tr渲染到tbody元素。
}
// 根据学生的id号删除学生的函数
function handleDel(id){
  for(var i=0;i<studentsData.length;i++){
    if(Number(studentsData[i].id) === id) {
      studentsData.splice(i, 1);// 根据数组索引删除索引的元素
      break
    }
  }
  localStorage.setItem("data",JSON.stringify(studentsData));// 删除以后需要数据同步到storage里面
  showSudentToTable(); // 重新渲染数据
}

// 全选操作,需要创建一个变量，把所有学生的id记录
var delIdArr = [] // 记录需要删除学生的数据
// table 里面每个checkbox多选框的点击事件
function changeCk(that, id){ //  that 代表当前点击的dom对象
  if(that.checked) { //  如果当前checkbox选中，则把学生id放入delIdArr
    delIdArr.push(id)
  } else {
    var index = delIdArr.indexOf(id) // 如果取消选中，则需要把id从delIdArr数组移除。数组的indexOf()返回查询元素的索引
    delIdArr.splice(index,1)
  }
  if(delIdArr.length === studentsData.length){ // 如果每个学生都选中，则全选状态需要为选中，否则全选状态为非选中
    checkAll.checked = true;
  } else {
    checkAll.checked = false;
  }
}
// 全选按钮点击事件
checkAll.onclick=function(){ // 给全选按钮添加点击事件
  // 由于tbody里面的tr数据是动态渲染的，需要每次点击的时候去获取最新的checkbox元素
  var checkbox = document.querySelectorAll(".table input[type=checkbox]") // 选择table下面 type属性为checkbox的input元素
  for(var i=0;i<checkbox.length;i++){
    if(this.checked) { // 如果全选按钮选中则把table里面的每个checkbox设置为选中
      checkbox[i].checked = true
    } else {
      checkbox[i].checked = false // 如果全选按钮没有选中，则移除table所有的checkbox的checked属性。
    }
  }
  delIdArr = []
  // 全选后需要把学生的id全都放入delIdArr
  if(this.checked){
    studentsData.forEach(function(item){
      delIdArr.push(item.id)
    })
  }
  console.log(delIdArr)
}
// 批量删除操作
document.querySelector("#delall").onclick=function(){
  for(var i=0;i<studentsData.length;i++){
    if(delIdArr.indexOf(studentsData[i].id) > -1) { // 查询学生id是否在删除的数组里面
      studentsData.splice(i,1);
      i--;
    }
  }
  localStorage.setItem("data",JSON.stringify(studentsData));// 删除以后需要数据同步到storage里面
  showSudentToTable();
}
