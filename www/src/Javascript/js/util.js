// JavaScript Document

//设置指定的日期函数
function _getDate(num){
	var d = new Date();
	var ms = 24 * 60 * 60 * 1000 * num + d.getTime();
	return new Date(ms);
}
//写入cookie
function setCookie(key,value,expires){ //expires当有值时，则为true，否则为false
	var _value = key + "=" + encodeURIComponent(value);
	if(expires){
		_value += ";expires=" + _getDate(expires);	
	}
	document.cookie = _value;
}


//根据指定的key获取对应的value
function getCookie(key){
	var result = "";
	var cookies = document.cookie;
	//console.log(cookies);
	cookies = cookies.split("; ");
	//console.log(cookies);
	for(var i = 0;i < cookies.length;i++){
		var cookie = cookies[i].split("=");
		//console.log(cookie);
		if(cookie[0] == key){
			result = cookie[1];
		}
	}
	return decodeURIComponent(result);
}
//根据key删除指定的cookie
function removeCookie(key){
	document.cookie = key + "=;expires=" + new Date(0);
}

//Ajax
var utility = {
	Ajax:{
		send:function(method,url,async,successFn){
			var req = new XMLHttpRequest();
			req.onreadystatechange = function(){
				if(req.readyState == 4 && req.status == 200){
					//var n = req.responseText;
					//console.log(typeof successFn);  //function
					if(typeof successFn == "function"){
						//将服务器端的响应信息作为实参进行传递
						successFn(req.responseText);	
					}
				}
			};
			req.open(method,url,async);
			req.send(null);
		}
	}
};

var timer = null;
//根据属性名称获取内部或外部的属性值
function getStyle(obj,att){
	if(obj.currentStyle){
		return obj.currentStyle[att];
	}else{
		return getComputedStyle(obj,null)[att];
	}
}
//移动元素
function startMove(obj,json,fn){
	//alert(1);
	clearInterval(obj.timer);
	obj.timer = setInterval(show,100);
	function show(){
		for(var att in json){ //att表示json对象中属性的名称
			var _value;
			if(att == "opacity"){
				_value = parseInt(getStyle(obj,att) * 100);
			}else{
				_value = parseInt(getStyle(obj,att));	
			}
			var speed = (json[att] - _value) / 10;  
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(_value == json[att]){
				clearInterval(obj.timer);
				if(fn){ //当fn没有具体值时，则fn为false,否则为true
					fn();
				}
			}else{
				if(att == "opacity"){
					obj.style[att] = (_value + speed) / 100;
					obj.style.filter = "alpha(opacity="+(_value + speed)+")";
					console.log(_value)
				}else{
					obj.style[att] = _value + speed + "px";
					console.log(obj.style[att])
				}
			}
		}
	}
}
//获取随机数
function getRandom(max,min){
	return parseInt(Math.random()*(max-min)+min);
}