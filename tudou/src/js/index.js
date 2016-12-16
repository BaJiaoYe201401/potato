var $    = require('jquery');
var util         = require('./util');
var less = require('./../style/app.less'); 
var startGame = require('./start-game');
var mapPage   = require('./map-page');
var shPage    = require('./sh-page');

startGame.init();
mapPage.init();
//shPage.init();
styleInit();

function styleInit(){
	var popWidth      = $(window).width()*0.85;
	var phangLiHeight = popWidth*0.1464;
	var strCss = '.phangBox .list li{ height:' + phangLiHeight + 'px;}';
	util.addJCss(strCss);
}

function Login(){
	this.loginUrl = "http%3A%2F%2Fwww.manglab.com%2Fh5%2Ftudou%2Findex.html";
	this.startUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa13312503e5d3929&redirect_uri=http%3A%2F%2Fwww.manglab.com%2Fh5%2Flogin.php&response_type=code&scope=snsapi_userinfo&state=tudoujun#wechat_redirect';
	this.code     = null;
	this.openid   = '';
	this.myWxLink = $('#myWxLink');
}

Login.prototype = {
	comeIn:function(){
		if(this.getQueryString('openid')){
			this.openid = this.getQueryString('openid');
		}else if(this.getQueryString('code')){
			this.code = this.getQueryString('code');
			this.getAuth();
		}else{
			//location.href = this.loginUrl;
		}
	},
	getQueryString:function(name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	},
	toJson:function(data){
		if(typeof data =='string'){
			try{
				data = JSON.stringify(data);
			}catch(e){
				data = {};
			}
		}
		return data;
	},
	getAuth:function(){
		var self = this;
		$.ajax({
			type:'get',
			url:'http://www.manglab.com/h5/potato/userAuth.php?code=' + this.code,
			success:function(data){
				data = self.toJson(data);
				if(data.openid){
					self.openid = data.openid;
					alert('self.openid=' + self.openid);
				}else if(data.errmsg){
					//{"errcode":40029,"errmsg":"invalid code, hints: [ req_id: Df8jRa0780s104 ]"}
					alert(data.errmsg);
				}
			}
		});
		/*1234  get method
			get param：code=1234(code是微信返回的code)
			response: {"openid": "1111"} 错误是返回：{"errcode":40029,"errmsg":"invalid code, hints: [ req_id: Df8jRa0780s104 ]"}
		}*/
	}
}



var login = new Login();
login.comeIn();
window.login = login;

module.exports ={
	
}