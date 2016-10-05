/**
 * Created by my on 2016/10/5.
 */
_init_area();
$("#getaddress").focus(function(){
    var add = $("#s_province").val()+$("#s_city").val()+$("#s_county").val();
   $("#getaddress").val(add);
});
//订单价格的计算
$("#accounts table td span").eq(0).bind("click",function(){
    var count = $("#accounts table td p").html();
    count--;
    Calculate(count);
});
$("#accounts table td span").eq(1).bind("click",function(){
    var count = $("#accounts table td p").html();
    count++;
    Calculate(count);
});
//函数Calculate
function Calculate(count){
    $("#accounts table td p").html(count);
    var prize = parseInt($("#accounts table .price").html().split("￥")[1]);
    prize = prize * parseInt(count);
    $("#subtotal").html("￥"+prize);
    $("#total").html("￥"+(prize-10));
}
//将地址保存
$("#saveaddress").change(function(){
    if($(this).is(":checked")){
        var value = $("#s_province").val()+$("#s_city").val()+$("#s_county").val();
        var cookie = getCookie("add");
        if(cookie){
            value = cookie +"&"+value;
        }
        setCookie("add",value,7);
    }
});
//提交订单
$("#sure").bind("click",function(){
    window.open("../index.html","_self")
})
//判断是否有add
$(function(){
    var cookie = getCookie("add");
    //console.log(cookie);
    var cookies = cookie.split("&");
    for( var i = 0 ; i < cookies.length ; i++ ){
        var $option = $("<option></option>");
        $option.html(cookies[i]);
        $("#address .creatAdress").append($option);
    }
    //倒计时
    var  time = 6 * 60 * 60 * 1000;
    setInterval(function(){
        time -= 1;
        $("#emsmessage .last").eq(1).html(Time(time));
    },1);

});
//时间差
function Time(_time){
    var h = Math.floor(_time/1000/60/60%24);
    var m = Math.floor(_time/1000/60%60);
    var s = Math.floor(_time/1000%60);
    var ms = Math.floor(_time%1000);
    if(_time<=0){
        h = 0 ;
        m = 0 ;
        s = 0 ;
        ms = 0
    }
    return h+"时"+m+"分"+s+"."+ms;
}
//tocart
$("#sidebar #tocart").bind("click",function(){
    window.open("cart.html");
});