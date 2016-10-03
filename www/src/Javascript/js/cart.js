/**
 * Created by my on 2016/10/3.
 */
$(function(){
    var cookie = getCookie("goods");
    if(cookie != "") {
        var $img = null;
        var $pname = null;
        var $price = null;
        var $count = null;
        var sum = 0;
        $("#cart").css("display","block");
        $("#empty").css("display","none");
        var cookies = cookie.split("$");
        //console.log(cookies)
        for( var i = 0 ; i<cookies.length; i++ ) {
            var _values = cookies[i].split("&")
            //console.log(_values.length)
            var $tr = $("<tr></tr>")
            $("#cart table").append($tr);
            for (var j = 0; j < _values.length; j++) {
                var _infos = _values[j].split(":");
                //console.log(_infos[1])
                switch (_infos[0]) {
                    case "imgSrc":
                        $img = $("<img src='" + _infos[1] + "'>");
                        break;
                    case "pName":
                        $pname = ("<p>" + _infos[1] + "</p>");
                        break;
                    case "pRice":
                        $price = _infos[1];
                        break;
                    case "count":
                        $count = _infos[1];
                        break;
                }
            }
            for (var j = 0; j < 5; j++) {
                //创建td
                var $td = $('<td></td>');
                $tr.append($td);
                if (j == 0) {
                    $input=("<input type='checkbox'/>");
                    $td.append($img);
                    $td.append($pname);
                    $td.append($input);
                } else if (j == 1) {
                    $td.html($price);
                } else if (j == 2) {
                    $td.html($count);
                } else if (j == 3) {
                    $td.addClass("total")
                    var total="￥" + parseInt($price.split("￥")[1]) * parseInt($count);
                    $td.html(total);
                    sum += parseInt($price.split("￥")[1]) * parseInt($count);
                    //console.log(sum) ;
                   //money.innerHTML = parseInt(price.split("￥")[1]) * parseInt(count)
                }else{
                    var $btn1= $("<button id='add'>增加</button>");
                    $td.append($btn1);
                    var $btn2= $("<button id='del'>减少</button>");
                    $td.append($btn2);
                }
            }
        }
        $("#money").html("￥"+sum);
    }
})
$("#add").live("click",function(){
   var $tdCount =  $(this).parent().parent().children().eq(2);
    $tdCount.html(parseInt($tdCount.html())+1)
    var $tdPrice = $(this).parent().parent().children().eq(3);
})