/**
 * Created by my on 2016/9/29.
 */
//跳转到免费注册
$("#freeRegsiter").bind("click",function(){
    window.open("register.html","_blank")
})
//验证用户邮箱和密码
$("#login").on("click",function(){
    //把用户名传到cookie看是否
    var cookie = getCookie($("#email").val());
        if(cookie==""){
            $("#email").prev().html("<span>该用户不存在</span>")
        }else{
            $("#email").prev().html("邮箱地址<span>*</span>")
            //console.log(cookie);
            var value = cookie.split("&");
            //console.log(value)
            var password = value[1].split(":")[1]
            //alert(password)
            if($("#password").val() == password){
                $("#password").prev().html("密码<span>*</span>")
                window.open("../index.html","_self")
            }else {
                $("#password").prev().html("<span>密码不正确</span>")
            }
        }
})

