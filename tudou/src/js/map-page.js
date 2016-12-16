var $            = require('jquery');
var shPage       = require('./sh-page');
var $mapPage     = $('#map');
var $contBtn     = $mapPage.find('.juan-con-btn');
var $shareBtn    = $mapPage.find('.juan-share-btn');
var clickName    = "ontouchend" in document ? 'touchstart':'click';
var $finger      = $mapPage.find('.finger');



function mapEvent(){
	$contBtn.bind(clickName,function(){

	});

	$shareBtn.bind(clickName,function(){
		
	});

	$finger.bind(clickName,function(){
		$mapPage.hide();
		$('#shPage').css({'visibility':'visible','display':'block'});
		$('#music-box').show();
		shPage.init();
	});

}

function init(){
	mapEvent();
}

module.exports ={
	init:init
}