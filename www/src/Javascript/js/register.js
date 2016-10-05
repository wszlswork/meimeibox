/**
 * Created by my on 2016/9/28.
 */
//正则表达封装;
function reqTest(obj,num,req){
    var $obj = $(obj);
    if($obj.val()===""){
        $("table span").eq(num).html("*内容不能为空");
        return false;
    }else if(!req.test($obj.val())){
        $("table span").eq(num).html("*请输入正确的格式");
        return false;
    }else{
        $("table span").eq(num).html("*");
        return true;
    }
}
//表单验证;
var emailBoolen=false;
var phoneBoolen=false;
var passwordBoolen=false;
var sureBoolen=false;
//验证email;
$("#email").blur(function(){
    var reqEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    //reqTest($(this),0,reqEmail);
    emailBoolen= reqTest($(this),0,reqEmail);
    //console.log(phoneBoolen);
});
$("#referer").blur(function(){
    var reqEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
});
//验证手机号;iiiiiii
$("#phone").blur(function(){
    var reqPhone = /^1[34578]\d{9}$/;
     phoneBoolen = reqTest($(this),1,reqPhone);
});
//验证密码;
$("#password").blur(function(){
    var reqPassword = /^[a-zA-Z]\w{5,17}$/;
    passwordBoolen = reqTest($(this),2,reqPassword);
});
//确认密码;
$("#surepassword").blur(function(){
    if($(this).val()===""){
        $("table span").eq(3).html("*内容不能为空");
    }else if($(this).val()!=($("#password").val())){
        $("table span").eq(3).html("*两次输入的密码不一样");
    }else{
        sureBoolen = true;
        $("table span").eq(3).html("*");
    }
});
//产生随机验证码;
var anwser = 9;
$("div .button").bind("click",function(){
    var num1 = getRandom(100,0);
    var num2 = getRandom(100,0);
    var sign = getRandom(2,0);
    switch (sign){
        case 0:
            sign = "+";
            anwser= parseInt(num1)+parseInt(num2);
            break;
        case 1:
            sign = "-";
            anwser= parseInt(num1)-parseInt(num2);
            break;
    }
    $(this).parent().children().first().html(num1+sign+num2+"=");
});
//将用户名密码写入cookie;
$("#submit").bind("click",function(){
    //判断是否全部满足条件;
        if(emailBoolen && phoneBoolen && passwordBoolen && sureBoolen){
            if($("#anwser").val()==anwser){
                var cookie = getCookie($("#email").val());
                //console.log(cookie)
                if(cookie!==""){
                    $("table span").eq(0).html("该用户名已使用");
                }else{
                    var value = "Email:"+ $("#email").val()+ "&password:" + $("#password").val();
                    setCookie($("#email").val(),value,7);
                    window.open("login.html","_self");
                }
            }else{
                $("div .button").parent().children().first().html("验证码输入错误");
            }
        }else{
            alert("请正确输入内容");
        }
});
//返回;
$('.back').click(function(){
    window.open("login.html","_self");
});
//移到侧边购物车事件;
$("#sidebar #tocart").bind("mouseenter",function(){
    $(this).children().attr("src","../images/redcart.jpg");
});
$("#sidebar #tocart").bind("mouseleave",function(){
    $(this).children().attr("src","../images/blackcart.jpg");
});
//tocart
$("#sidebar #tocart").bind("click",function(){
    window.open("cart.html");
});