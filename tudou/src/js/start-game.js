var $            = require('jquery');
var stagePage    = require('./sh-page.js')
var $startPage   = $('#startPage');
var $mark        = $startPage.find('.mark');
var $ruleContent = $startPage.find('.rule-content');
var $ruleBack    = $startPage.find('.rule-back');
var $ruleBtn     = $startPage.find('.rule,.rule-arrow');
var $startBtn    = $startPage.find('.start-game-btn');
var clickName    = "ontouchend" in document ? 'touchstart':'click';

function startEvent(){
	var map = new stagePage.Map();
	
	map.mapEvent();
	map.markEvent();


	$ruleBtn.bind(clickName,function(){
		showExplain();
	});

	$ruleBack.bind(clickName,function(){
		hideExplain();
	});

	$startBtn.bind(clickName,function(){
		
		$('#map').addClass('mapShow').show();
		setTimeout(function(){
			$startPage.hide();
		},500);

		map.initPosition();
		//位这句随机显示
		if(map.getRandFlag){
			map.isOnMapPage = true;
			map.showJuan(5);
		}
	});
}

function showExplain(){
	$mark.addClass('showMark');
	$ruleContent.addClass('show-rule-content');
	$ruleBack.addClass('show-rule-back');

}


function hideExplain(){
	$mark.addClass('hideObj');
	$ruleContent.addClass('hideObj');
	$ruleBack.addClass('hideObj');

	setTimeout(function(){
		$mark.removeClass('showMark hideObj');
		$ruleContent.removeClass('show-rule-content hideObj');
		$ruleBack.removeClass('show-rule-back hideObj');
	},600);
}

function initPageSize(){
	var winWidth = $(window).width();
	if(winWidth>550){
		winWidth = 550;
	}
	$('.page').css({'width':winWidth});
}


function initVideo(){
	var pageWidth = $(window).width();
	var pageHeight= $(window).height();
	var height    = parseInt(pageWidth*498/640);
	$('#videoFrame').attr({'width':pageWidth,'height':height});
	$('#video-box').css({'top':(pageHeight-height)/2,'height':height});
}

function init(){
	initPageSize();
	startEvent();
	initVideo();
}



module.exports ={
	init:init
}

