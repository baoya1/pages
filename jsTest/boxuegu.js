
$(function(){
	
	var bowerSupport = false;
	var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
	(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] : (s = ua
			.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : (s = ua
			.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] : (s = ua
			.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : (s = ua
			.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] : (s = ua
			.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
	if (Sys.firefox)
		bowerSupport = true;
	if (Sys.chrome)
		bowerSupport = true;
//	if (Sys.safari)
//		bowerSupport = true;
	if (!bowerSupport) {
		$('.warning').removeClass('bowerSupport');
		$.messager.alert('警告','请不要使用火狐、谷歌以外的浏览器访问本系统');
	}
	
	/**
	 * 点击登录按钮
	 */
	$('#loginBtn').on('click', function(){
		submitForm();
   	});
	
	 /**
     * 回车键查询列表
     */
    document.onkeydown = function (event) {
    	//lan:按顺序取值为第一个不是undefined null "" false的值
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) {// enter 键
            //触发登录事件
        	submitForm();
        }
    };
	
  	history.pushState({}, "TLIAS.后台登陆", "/");
	  	
  	var username = getCookie('remember_pwd_username');
  	var passowrd = getCookie('remember_pwd_passowrd');
  	if(!isnull(username)){
  		$("#rememberPwd").attr("checked","true"); 
  		 $("#username").val(username);
  		passowrd=$.base64.decode(passowrd);
  		 $("#passowrd").val(passowrd);
  	}else{
  		$("#rememberPwd").removeAttr("checked"); 
  		$("#username").val("");
 		 $("#passowrd").val("");
  	}
})

/**
 * 提交表单
 */
function submitForm(){
	var username = $("#username").val();
	var passowrd = $("#passowrd").val();
	if(isnull(username) || isnull(passowrd)){
		return;
	}
	
	$.messager.progress({    text: 'PROCESSING.......'    }); 
	$.post("/login/doLogin", {'userName' : username, 'password' : passowrd}, function(data){
//		 var data = $.parseJSON(d);
		 $.messager.progress('close'); 
		 if(data.success){
			//是否记住密码
				if($("#rememberPwd").is(":checked")){
					setCookie("remember_pwd_username",username,"7d");
					//加密
					passowrd=$.base64.encode(passowrd);
					setCookie("remember_pwd_passowrd",passowrd,"7d");
				}else{
					setCookie("remember_pwd_username","","7s");
					setCookie("remember_pwd_passowrd","","7s");
				}
			 window.location.href = '/login/doSuccess';
		 }else{
			 $(".errorInfo").text(data.result);
		 }
	}); 
}

/**
 * 判断为空
 * @param data
 * @returns {Boolean}
 */
function isnull(data) {
    if (data == null || data == undefined || data == "" || data == "undefined") {
        return true;
    } else {
        return false;
    }
}
//将字符串时间转换为毫秒,1秒=1000毫秒
function getMsec(str)
{
	var timeNum=str.substring(0,str.length-1)*1; //时间数量
	var timeStr=str.substring(str.length-1,str.length); //时间单位前缀，如h表示小时

	if (timeStr=="s") //20s表示20秒
	{
		return timeNum*1000;
	}
	else if (timeStr=="h") //12h表示12小时
	{
		return timeNum*60*60*1000;
	}
	else if (timeStr=="d")
	{
		return timeNum*24*60*60*1000; //30d表示30天
	}
}
/**
 * 设置自定义过期时间cookie
 *  name    设置存放的数据名称
 *  value	设置存放的值
 *  time	设置存放时长，如 1s, 1h , 1d等
 */
function setCookie(name,value,time)
{
	var msec = getMsec(time); //获取毫秒
	var exp = new Date();
	exp.setTime(exp.getTime() + msec*1);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); //正则匹配
	if(arr=document.cookie.match(reg)){
		return unescape(arr[2]);
	}
	else{
		return null;
	}
} 