/*that.addCss = function(cssStr){
	try {
	    var style = document.createStyleSheet();
	    style.cssText = cssStr;
	 }catch (e) {
	    var style = document.createElement("style");
	    style.type = "text/css";
	    style.textContent = cssStr;
	    document.getElementsByTagName("HEAD").item(0).appendChild(style);
	}
}*/
var $            = require('jquery');
var $pageStyleCon= $('#pageStyleCon');

var cssList = [];
function addCss(cssStr,$ele){
	cssList.push(cssStr);
	var len = cssList.length; 
	if(len>7){
		cssList.splice(0,len-5);
	}
	var newCssStr = cssList.join('\n');
	$ele.html(newCssStr);
}

function addJCss(cssStr){
	$ele = $pageStyleCon;
	var oldStr = $ele.html();
	$ele.html(oldStr + '\n' + cssStr);
}

function setCssData($ele,id,goTop){
	var eleHeight = $ele.height();
	var winHeight = $(window).height();
	var top = (winHeight - eleHeight)/2;
	top = goTop?0:top;
	var strCss = '#'+id+'{top:'+ top/4 +'px;}';
	//top 

	addJCss(strCss);
	$ele.attr('data-css','true');
}

module.exports ={
	addCss:addCss,
	addJCss:addJCss,
	setCssData:setCssData
}


