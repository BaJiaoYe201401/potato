var $            = require('jquery');
var util         = require('./util');
var $stagePage   = $('#shPage');
var stageBg      = 'gk0';
var totalScore   = 0;
var $stageBox    = $stagePage.find('.stage-box');
var $mark        = $('#mark');
var clickName    = "ontouchend" in document ? 'touchstart':'click';
var pageWidth    = $stagePage.width(); 
var $pageStyle   = $('#pageStyle');
var $pageStyleCon= $('#pageStyleCon');
var stageHeight  = $stageBox.height();
var $failPop     = $('#failPop');
var $passPop     = $('#passPop');
var stOrignHei    = 40;
var guanScore    = 0;
var $tudou       = $stagePage.find('.tudou');
var $st          = $stagePage.find('.st');
var tudou,st,stage,map;

var sorceMap     = {
	'gk0':100,
	'gk1':100,
	'gk2':100
}
var debug = false;

function Map(){
	this.$ele  = $('#map');
	this.$mark = $('#mark');
	this.$td   = this.$ele.find('.maptd');
	this.$juanBox   = $('#juanBox');
	this.$finger    = this.$ele.find('.finger');
	this.juan5Text  = '￥AAhgDVFX￥';
	this.juan10Text = '￥AAhgGLQv￥';
	this.$shareBox  = $('#share-box');
	this.bagPop01   = $('#bagPop-01');
	this.bagPop02   = $('#bagPop-02');
	this.babyPop01  = $('#babyPop-01');
	this.babyPop02  = $('#babyPop-02');
	this.popSure    = $('#pop-sure');
	this.$stagePage  = $stagePage;
}

Map.prototype = {
	init:function(){
		//this.mapEvent();

	},
	initPosition:function(){
		this.$ele.attr('class','map page');
		this.$finger.show();
		this.$ele.find('.td01').attr('class','td01 td-point-01').hide();
		this.$ele.find('.td02').attr('class','td02 td02Start').hide();
		this.$ele.find('.td03').attr('class','td03 td03Start').hide();
	},
	getRandFlag:function(){
		var rand = Math.random()*100;
		var flag = true;
		if(rand>50){
			flag = false;
		}
		//for test
		//flag = true;
		return flag;
	},
	mapEvent:function(){
		var self        =  this;
		
 		this.$ele[0].addEventListener('webkitAnimationEnd',function(){
			if(self.$ele.hasClass('mapShow')){
				self.$ele.removeClass('mapShow').css({'display':'block','opacity':1});
			}else if(self.$ele.hasClass('mapMoveTo2')){
				self.$ele.removeClass('mapMoveTo2').addClass('mapPoint2');
				self.$ele.find('.td01').removeClass('mtdMoveToP2').addClass('td-point-02');

				setTimeout(function(){
					self.hideMapPage();
					self.$juanBox.css('display','none');
					$stagePage.css({'visibility':'visible','display':'block'}).addClass('showEle');
					stage.musicBox.show();

					stage.stageReSet();
					tudou.tudouReset();
					st.stReset();
				},300);
				
			}else if(self.$ele.hasClass('mapMoveTo3')){
				self.$ele.removeClass('mapMoveTo3').addClass('mapPoint3');
				self.$td.removeClass('mtdMoveToP3').addClass('td-point-03');
				setTimeout(function(){
					self.hideMapPage();
					$stagePage.css({'visibility':'visible','display':'block'}).addClass('showEle');
					stage.musicBox.show();
				},300);
			}
		},false);


        //mtdMoveToP4
		self.$ele.find('.td03')[0].addEventListener('webkitAnimationEnd',function(){
			if(self.$ele.find('.td03').hasClass('mtdMoveToP4')){
				self.hideMapPage();
				$stagePage.hide();
				stage.musicBox.hide();
				tudou.showLastChou();
			}
		},false);

 		//for common
 		var $contBtn = this.$juanBox.find('.continue-btn')
 		$contBtn.bind('touchstart',self,self.handleContFun);
		//for common 
		$('.share-btn').bind('touchstart',function(){
			$(this).parent().hide();
			self.$shareBox.css({'display':'block'}).addClass('showEle')
			.find('.share-img-01').show();
		});

		

		self.$shareBox.find('img').bind('touchstart',function(){
			var $outBox = $(this).parent();
			$(this).hide();
			if($(this).hasClass('share-img-01')){
				$outBox.find('.share-img-02').show();
			}else{
				$outBox.find('.share-img-01').show();
			}
			return false;
		});

		self.popBagEvent();
		self.popBabyEvent();
		//selt.shareEvent();
 		
	},

	markEvent:function(){
		var self  = this;
		self.$shareBox.bind('touchstart',function(){
			if(self.$mark.css('display') != 'none'){
				self.$mark.hide();
				self.$shareBox.hide();
			}
			return false;
		});
	},
	popBabyEvent:function(){
		var self = this;
		self.babyPop01.find('.con-baby01-btn').bind('touchstart',function(){
			self.babyPop01.removeClass('showEle').hide();
			self.babyPop02.find('.popScore').text(tudou.score);
			self.babyPop02.css({'display':'block'}).addClass('showEle');
			self.initBabyPop02();
		});

		self.babyPop02.find('.submit-btn').bind('touchstart',function(){
			if($(this).hasClass('imgGray')) return;
			self.babyPop02.removeClass('showEle').hide();
			self.popSure.css({'display':'block'}).addClass('showEle');
			self.submitDataForBaby();
		});

		var nameInput    = self.babyPop02.find('.name');
		var phoneInput   = self.babyPop02.find('.phone');
		var addressInput = self.babyPop02.find('.address');
		var submitBtn    = self.babyPop02.find('.submit-btn');
		self.babyPop02.find('input').bind('input',function(){
			var nameVal    = nameInput.val().trim();
			var phoneVal   = phoneInput.val().trim();
			var addressVal = addressInput.val().trim();
			if(nameVal && phoneVal && addressVal){
				submitBtn.removeClass('imgGray');
			}else{
				submitBtn.addClass('imgGray');
			}
		});


	},
	initBabyPop02:function(){
		this.babyPop02.find('input').val('');
		this.babyPop02.find('.submit-btn').addClass('imgGray');
	},
	initBagPop02:function(){
		this.bagPop02.find('input').val('');
		this.bagPop02.find('.submit-btn').addClass('imgGray');
	},
	popBagEvent:function(){
		var self  = this;
		self.bagPop01.find('.con-bag01-btn').bind('touchstart',function(){
			self.bagPop01.removeClass('showEle').hide();
			self.bagPop02.find('.popScore').text(tudou.score);
			self.bagPop02.css({'display':'block'}).addClass('showEle');
			self.initBagPop02();
		});
		//con-bag01-btn

		self.bagPop02.find('.submit-btn').bind('touchstart',function(){
			if($(this).hasClass('imgGray')) return;
			self.bagPop02.removeClass('showEle').hide();
			self.popSure.css({'display':'block'}).addClass('showEle');
			self.submitDataForBag();
		});

		var nameInput    = self.bagPop02.find('.name');
		var phoneInput   = self.bagPop02.find('.phone');
		var addressInput = self.bagPop02.find('.address');
		var submitBtn    = self.bagPop02.find('.submit-btn');
		self.bagPop02.find('input').bind('input',function(){
			var nameVal    = nameInput.val().trim();
			var phoneVal   = phoneInput.val().trim();
			var addressVal = addressInput.val().trim();
			if(nameVal && phoneVal && addressVal){
				submitBtn.removeClass('imgGray');
			}else{
				submitBtn.addClass('imgGray');
			}
		});

		self.popSure.find('.sure-btn').bind('touchstart',function(){

			self.popSure.removeClass('showEle').hide();
			self.$mark.removeClass('showEle').hide();
			stage.startNewGuKa();
		});
	},

	hideMapPage:function(){
		var self  = this;
		this.$ele.addClass('hideObj');
		setTimeout(function(){
			self.$ele.css('display','none').removeClass('hideObj');
			self.$mark.css('display','none').removeClass('hideObj');
		},500);
	},
	showMapPage:function(){
		this.$ele.removeClass('mapShow').css({'display':'block','opacity':'1'}).addClass('mapShow');
		$stagePage.css({'visibility':'hidden','display':'none'});
		stage.musicBox.hide();
	},
	gotoNextGaKa:function(){
		this.showMapPage();		
		/*var rand    = Math.random()*100;
		var hasJuan = rand<33.3?true:false; 
		this.showMark();*/
		if(stage.gkaIndex == 2){
			map.$ele.find('.td01,.td03').hide();
			var curTd = map.$ele.find('.td02').show();
			curTd.css('display','block');
			curTd.attr('class','td02 td02Start');
					map.$ele.addClass('mapMoveTo3');
					curTd.addClass('mtdMoveToP3');
		}else if(stage.gkaIndex == 3){
			map.$ele.find('.td01,.td02').hide();
			var curTd = map.$ele.find('.td03').show();
			curTd.css('display','block');
			curTd.attr('class','td03 td03Start');
					curTd.addClass('mtdMoveToP4');
		}
	},
	showMark:function(){
		$mark.css('display','block').addClass('showMark');
	},
	showJuan:function(type){
		var juanNum = type;
		this.setJuan(juanNum);
		this.showMark();
		this.$juanBox.css({'display':'block'}).removeClass('hideObj').addClass('showPopBox');
	},
	showBag01:function(){
		var self = this;
		map.showMark();
		self.bagPop01.find('.popScore').text(tudou.score);
		self.bagPop01.css({'display':'block'}).addClass('showEle');	
	},
	showBady01:function(){
		var self = this;
		this.badyType = Math.random()*100>50?2:3;
		//bady_x_01.png
		//bady_01.png

		//bady_x_02.png
		//bady_02.png
		self.showMark();
		if(this.badyType == 3){
			this.babyPop01.find('.body-01').attr('src','./images/popup/bady_01.png');
			this.babyPop02.find('.baby-02').attr('src','./images/popup/bady_02.png');
		}else{
			this.babyPop01.find('.body-01').attr('src','./images/popup/bady_x_01.png');
			this.babyPop02.find('.baby-02').attr('src','./images/popup/bady_x_02.png');
		}
		self.babyPop01.find('.popScore').text(tudou.score);
		self.babyPop01.css({'display':'block'}).addClass('showEle');
	},
	submitDataForBaby:function(){
		var self  = this;
		var name  = self.babyPop02.find('.name').val().trim();
		var phone = self.babyPop02.find('.phone').val().trim();
		var address = self.babyPop02.find('.address').val().trim();
		var type    = 3;
		var param   = {
			name:name,
			phone:phone,
			address:address,
			type:type,
			openid:window.login.openid
		}
		if(!debug){
			self.submitUserInfo(param);
		}
	},
	submitUserInfo:function(param){
		$.ajax({
			type:'post',
			url:'http://www.manglab.com/h5/potato/userInfo.php',
			data:param,
			succes:function(){
				alert('submit success~~~');
				console.log('babyPop02 submit all right.');
			}
		});
	},
	submitDataForBag:function(){
		var self = this;
		var name  = self.bagPop02.find('.name').val().trim();
		var phone = self.bagPop02.find('.phone').val().trim();
		var address = self.bagPop02.find('.address').val().trim();
		var type    = 2;
		var param   = {
			name:name,
			phone:phone,
			address:address,
			type:type,
			openid:window.login.openid
		}
		if(!debug){
			self.submitUserInfo(param);
		}
	},
	//contiune按钮来自 开始和第一关优惠券弹框
	handleContFun:function(event){
		var map = event.data;
		if(map.isOnMapPage){
			map.hideJuanBox();
			map.isOnMapPage = false;
		}else{
			map.afterCloseJuan(map);
		}
		setTimeout(function(){
			map.$juanBox.css({'display':'none'}).removeClass('hideObj');
			map.$mark.css({'display':'none'}).removeClass('hideObj');
		},500);
	},

	afterCloseJuan:function(map){

		map.$stagePage.hide();
		stage.musicBox.hide();
		map.showMapPage();
		map.hideJuanBox();
		map.$finger.hide();
		if(stage.gkaIndex == 1){
			map.$ele.find('.td02,.td03').hide();
			var curTd = map.$ele.find('.td01');
			curTd.css('display','block');
			map.$ele.addClass('mapMoveTo2');
			curTd.addClass('mtdMoveToP2');
		}
	},
	hideJuanBox:function(){
		this.$mark.removeClass('showMark').addClass('hideObj');
		this.$juanBox.removeClass('showPopBox').addClass('hideObj');
	},
	setJuan:function(num){
		if(num == 5){
			this.$juanBox.find('.juanText p').text(this.juan5Text);
			var imgSrc = this.$juanBox.find('.juanImg').attr('src');
			imgSrc = imgSrc.replace('10','5');
			this.$juanBox.find('.juanImg').attr('src',imgSrc);
		}else{
			this.$juanBox.find('.juanText p').text(this.juan10Text);
			var imgSrc = this.$juanBox.find('.juanImg').attr('src');
			imgSrc = imgSrc.replace('5','10');
			this.$juanBox.find('.juanImg').attr('src',imgSrc);
		}
	}
}


function Stage($ele){
	this.$ele = $ele;
	this.totalScore = 0;
	this.gkaIndex   = 0;
	this.stageBg    = $('#stage-bg');
	this.$feitan    = $('#feitan');
	this.$tdfei     = $('#tdfei');
	this.$mapPage   = $('#map');
	this.$scorcBox  = $('#scorcBox');
	this.$lastchouBox = $('#lastchouBox');
	this.$startPage   = $('#startPage');
	this.$videoBox    = $('#video-box');
	this.music = $('#myMusic');
	this.musicBox  = $('#music-box');
	this.$phangBox  = $('#phangBox');
	this.$tdfeiImg  = this.$tdfei.find('img');
	//this.stageBox   = $stageBox;
	this.toCurLeft  = 86;
	this.leftStage  = 86;
	this.riverWid   = 0;
	this.riverStage = 0;
	this.left       = -6;
	this.originText = '<aside class="oneStage"><div class="stageBg"></div></aside>';
}

Stage.prototype = {
	stageReSet:function(){
		this.toCurLeft  = 86;
		this.leftStage  = 86;
		this.riverWid   = 0;
		this.riverStage = 0;
		this.left       = -6;
		this.stageBg.removeClass('sh-bg_0'+ (this.gkaIndex ));
		this.$scorcBox.addClass('scorcBox-0' + (this.gkaIndex));

		this.stageBg.addClass('sh-bg_0'+ (this.gkaIndex +1));
		this.$scorcBox.addClass('scorcBox-0' + (this.gkaIndex +1)).find('.curScore').text('0');
		this.$ele.removeAttr('style');
		this.$ele.html(this.originText);
		this.$tdfei.css({'bottom':stageHeight - 21});
		this.setNewStage();
	},

	init:function(){
		this.stageEvent();
		this.setNewStage();
		this.initSize();
		this.palyMusic();
	},
	palyMusic:function(){
		this.music[0].play();
	},
	pauseMusic:function(type){
		var myAudio = this.music[0];
		if(myAudio.paused){
            myAudio.play();
            this.musicBox.removeClass('music-off');
        }else{
            myAudio.pause();
            this.musicBox.addClass('music-off');
        }

        if(type == 'off'){
        	myAudio.pause();
            this.musicBox.addClass('music-off');
        }
	},
	initSize:function(){
		var img    = this.$tdfeiImg;
		var width  = img.width();
		var height = width*60/83;
		//83*60
		this.$tdfei.css({'width':width,'height':height,'bottom':stageHeight - 21});
	},
	stageEvent:function(){
		var self   =  this;
		this.$ele[0].addEventListener("webkitAnimationEnd", function(){    //动画结束时事件 
			var classStr = self.$ele.attr('class');
			if(self.$ele.hasClass(stageBg +'_stageBackToNewStart_'+ tudou.bridgeNum)){
				var left = self.$ele.css('left');
				self.$ele.attr('class','stage-box').css('left',left);
				self.delHideStage();
				if(self.hasFeiTan){
					self.$tdfeiImg.addClass('tdfeiTop');
					self.setNewThreeRiver();
					self.crossThreeRiver();
				}else{
					self.setNewStage();
				}
			}else if(self.$ele.hasClass(stageBg + '_stagebackThreeRiver_' + tudou.bridgeNum)){
				
			}
		}, false); 

		this.$tdfei[0].addEventListener('webkitAnimationEnd',function(){
			var classStr = self.$tdfei.attr('class');
			if(self.$tdfei.hasClass('tdfeiTop')){
				self.$tdfei.css({'bottom':'31%'}).removeClass('tdfeiTop').addClass('tdflying');
			}else if(self.$tdfei.hasClass(stageBg + '_tdfeiCrossThreeRiver_' + tudou.bridgeNum)){
				var left = self.$tdfei.css('left');
				self.$tdfeiImg.removeClass('tdflying').addClass('tdflyingDown');
				self.$tdfei.removeClass(stageBg + '_tdfeiCrossThreeRiver_' + tudou.bridgeNum).css('left',left);
			}
		},false);

		this.$tdfeiImg[0].addEventListener('webkitAnimationEnd',function(){
			if(self.$tdfeiImg.hasClass('tdflyingDown')){
				self.hideTudouFei();
				tudou.backFeiTudouNewStart();
				st.backFeiStNewStart();
				setTimeout(function(){
					var left = self.$ele.css('left');
					self.$ele.css({'left':left}).removeClass(stageBg + '_stagebackThreeRiver_' + tudou.bridgeNum);
					self.left = Number(left.replace('px',''));
					tudou.addupdateScore(300);
					tudou.tdBackToLeftAfterFly(0.7);
					st.stBackToLeftAfterFly(0.7);
					stage.stageBackToNewStart(0.7);

				},500);
			}
		},false);

		/*var conBtn = $('#passPop .continue-btn');
		conBtn.bind('touchstart',function(){
			if(self.gkaIndex<=1){
				self.gkaIndex ++;

				//开始下一关
				self.startNewGuKa();

			}else if(self.gkaIndex == 2){
				alert('over~~ 2');
			}
		});*/

		//chou-btn
		var $chouBtn = self.$lastchouBox.find('.chou_01 .chou-btn');
		$chouBtn.bind('touchstart',function(){
			//$chouBtn
			self.$lastchouBox.find('.chou_01').removeClass('showEle');
			self.$lastchouBox.find('.chou_02').addClass('showEle');

			if(!self.$lastchouBox.find('.chou_02').attr('data-css')){
				util.setCssData(self.$lastchouBox.find('.chou_02'),'chou_02_box');
			}

		})

		//phang-btn
		var $phangBtn = self.$lastchouBox.find('.chou_02 .phang-btn');
		$phangBtn.bind('touchstart',function(){
			self.$lastchouBox.find('.chou_02').removeClass('showEle');
			self.$lastchouBox.find('.phangBox').addClass('showEle');

			self.getPhData();
			if(!self.$lastchouBox.find('.phangBox').attr('data-css')){
				util.setCssData(self.$lastchouBox.find('.phangBox'),'phangBox');
			}
		});

		//back-btn
		var $backBtn  = self.$lastchouBox.find('.phangBox .back-btn');
		$backBtn.bind('touchstart',function(){
			replay();
			/*stage.$lastchouBox.hide();
			stage.$startPage.show();
			stage.stageReSet();
			tudou.tudouReset();
			st.stReset();
			stage.totalScore = 0;
			self.gkaIndex   = 0;
			stage.stageBg.attr('class','stage-bg sh-bg_01');*/
		});
		//
		self.musicBox.bind('touchstart',function(event){
			stage.pauseMusic();
			event.stopPropagation();
			return false;
		});

		$('#watch-btn').bind('touchstart',function(){
			map.showMark();
			map.$mark.addClass('video-mark');
			stage.$videoBox.show();
		});

		$('#close-video').bind('touchstart',function(){
			var $box = $(this).parent().hide();
			var src  = $box.find('iframe').attr('src');
			$box.find('iframe').attr('src','');
			setTimeout(function(){
				$box.find('iframe').attr('src',src);
			},100);
			map.$mark.hide().removeClass('video-mark');
		});
	},
	getPhData:function(){
		var self = this;
		if(debug){
			data = [
				{thumb:'one.jpg',name:'渡头',score:98800},
				{thumb:'two.jpg',name:'水平',score:92300},
				{thumb:'three.jpg',name:'狗仔队',score:51800},
				{thumb:'four.jpg',name:'那样有',score:46700},
				{thumb:'five.jpg',name:'墨阳の',score:18200}
			];
			self.buildph(data);
		}else{

			/*response: [
				  {
				    "id": "1",
				    "openid": "1111",
				    "score": "8889",
				    "thumb": "0",
				    "name": "aaaa",
				    "phone": "160018765889",
				    "address": "上海市静安区",
				    "type": "2"
				  }
				]*/


			$.ajax({
				type:'get',
				url:'http://www.manglab.com/h5/potato/userTop.php',
				success:function(data){
					data = window.login.toJson(data);
					self.buildph(data);
				}
			})
		}
		
	},

	buildph:function(data){
		var html = '';
		for(var i=0,len=data.length; i<len; i++){
			var itemStr = '<li>' + 
				'<label class="turn">'+ (i>=3?(i+1):'') +
				'</label>'+
				'<img src="./images/icon/'+ data[i].thumb +'"  class="icon"/>'+
				'<span class="name">'+ data[i].name +'</span>'+
				'<span class="score">'+ data[i].score +'</span>'+
			'</li>';

			html += itemStr;
			if(i == 4){
				break;
			}
		}
		this.$phangBox.find('ul').html(html).addClass('showEle');
	},
	
	delHideStage:function(){
		var stageList = this.$ele.find('.oneStage');
		this.$ele.html(this.$ele.eq(stageList.length-1).prop('outerHTML'));

	},
	hideTudouFei:function(){
		var self  = this;
		self.$tdfei.addClass('hideEle');
		setTimeout(function(){
			self.$tdfei.css({'opacity':0}).removeClass('hideEle');
			self.$tdfeiImg.removeAttr('class style');
		},500);
	},

	startNewGuKa:function(){
		// test 跳过地图显示
		map.gotoNextGaKa();
		this.stageReSet();
		tudou.tudouReset();
		st.stReset();
	},
	crossThreeRiver:function(){
		var toThreeRiverLeft = (this.toCurLeft - this.riverStage - this.myStageWidth + 6)*(-1);
		var curLeft          = Number(this.$ele.css('left').replace('px',''));
		var diffLeft         = Math.abs(toThreeRiverLeft - curLeft); 
		var className        = stageBg + '_stagebackThreeRiver_' + tudou.bridgeNum;
		var time             = diffLeft*4/1000;
		var animateCss = '100%{' +
				'left:' + toThreeRiverLeft + 'px;' +
			'}\n';
		var styleStr = '.'+ className +'{' +
							'-webkit-animation: '+ className+'_ani' + ' ' +  time +'s linear 1;' +
					        '-webkit-animation-fill-mode:forwards;' +
						'}\n' +
						'@-webkit-keyframes  '+ className+'_ani' +  '{' + animateCss + '}\n';
		util.addCss(styleStr,$pageStyle);
		this.$ele.addClass(className);
		this.tdflyingCross(time);
	},
	tdflyingCross:function(time){
		var self   = this;
		
		setTimeout(function(){
			var top  = self.$tdfeiImg.css('top');
			var left = self.$tdfeiImg.css('left');
			self.$tdfeiImg.css({'top':top,'left':left}).attr('class','tdflying');
			var toLeft     = self.myStageWidth + self.riverStage- 12 - self.$tdfei.width();
			var className  = stageBg + '_tdfeiCrossThreeRiver_' + tudou.bridgeNum;
			var animateCss = '100%{' +
				'left:' + toLeft + 'px;' +
			'}\n';
			var styleStr = '.'+ className +'{' +
								'-webkit-animation: '+ className +'_ani' + ' ' +  time +'s linear 1;' +
						        '-webkit-animation-fill-mode:forwards;' +
							'}\n' +
							'@-webkit-keyframes  '+ className+'_ani' +  '{' + animateCss + '}\n';
			util.addCss(styleStr,$pageStyle);
			var tdfeiLeft = self.$tdfei.css('left');
			self.$tdfei.css('left',tdfeiLeft).removeClass(stageBg + '_tdfeiBackToNewStart_'+ tudou.bridgeNum).addClass(className);
		},410);
	},
	setNewThreeRiver:function(){
		var html = '';
		var myStageWidth = '';
		for(var i=0;i<3;i++){
			html += this.getNewRiverStageHtml();
			if(i==1){
				myStageWidth = this.riverStage - this.riverWid;
				this.myStageWidth = myStageWidth;
			}
		}
		$(html).appendTo($stageBox);
		this.hasFeiTan = false;
	},
	getNewRiverStageHtml:function(){
		var str     = '';
		var win2    = pageWidth/2;
		var win3    = pageWidth/3;
		var win4    = pageWidth/4;
		var win5    = pageWidth/5;
		var win7    = pageWidth/7;

		var riverWid = parseInt(win7 + Math.random()*win4);
		var stageWid = parseInt(win7 + Math.random()*(win4 - win7));
		stageWid = stageWid<67? 67:stageWid;
		str = '<aside class="oneStage showStage" style="width:'+ stageWid +'px; left:'+ (this.toCurLeft+riverWid) +'px;"><div class="stageBg"></div></aside>';
		if(this.riverStage - this.riverWid!==0){
			this.leftStage = this.riverStage - this.riverWid;
		}

		this.toCurLeft  += (riverWid + stageWid);
		this.riverWid   = riverWid;
		this.riverStage = riverWid + stageWid;
		return str;
	},
	setNewStage:function(){

		var str = this.getNewRiverStageHtml();

		$(str).appendTo($stageBox);
		self.hasFeiTan = false;
		this.generateFeiTan();
	},
	generateFeiTan:function(){
		var self = this;
		var rand = Math.random()*100;
		var stageHei = stageHeight - 21;
		var left     = this.leftStage + this.riverStage - self.$feitan.width();
		// for test
		if(rand<33){
			self.hasFeiTan = true;
			self.$feitan.css({'bottom':stageHei,'left':left});
			self.$tdfei.css({'bottom':stageHei,'left':left});
			setTimeout(function(){
				self.$feitan.addClass('showEle');
			},200);
		}
	},
	tdfeiBackToNewStart:function(time){
		var className    = stageBg + '_tdfeiBackToNewStart_' + tudou.bridgeNum;
		var leftDiff     = (this.leftStage + this.riverWid)*(-1);
		var tdToLeft     = Number(this.$tdfei.css('left').replace('px','')) + leftDiff;
		var animateCss = '100%{' +
				'left:' + tdToLeft + 'px;' +
			'}\n';
		var styleStr = '.'+ className +'{' +
							'-webkit-animation: '+stageBg+'_tdfeiBackToNewStart_' + tudou.bridgeNum + ' ' +  time +'s linear 1;' +
							'-webkit-animation-delay:0.1s;'+
					        '-webkit-animation-fill-mode:forwards;' +
						'}\n' +
						'@-webkit-keyframes  '+stageBg+'_tdfeiBackToNewStart_' + tudou.bridgeNum + '{' + animateCss + '}\n';
		util.addCss(styleStr,$pageStyle);
		this.$tdfei.removeClass('showEle').css('opacity',1).addClass(className);
	},
	stageBackToNewStart:function(time){
		var className = stageBg + '_stageBackToNewStart_' + tudou.bridgeNum;
		var toLeft    =  (this.leftStage + this.riverWid)*(-1) + this.left;
		var animateCss = '100%{' +
				'left:' + toLeft + 'px;' +
			'}\n';
		var styleStr = '.'+ className +'{' +
							'-webkit-animation: '+stageBg+'_stageBackToNewStart_' + tudou.bridgeNum + ' ' +  time +'s linear 1;' +
					        '-webkit-animation-delay:0.1s;'+
					        '-webkit-animation-fill-mode:forwards;' +
						'}\n' +
						'@-webkit-keyframes  '+stageBg+'_stageBackToNewStart_' + tudou.bridgeNum + '{' + animateCss + '}\n';
		util.addCss(styleStr,$pageStyle);
		this.$ele.addClass(className);
		this.left = toLeft;
		this.leftStage =  this.riverStage - this.riverWid;
	}
}

function TudouJun($ele){
	this.$ele  = $ele;
	this.$failPop  = $('#failPop');
	this.width = Math.round($ele.width());
	this.height= Math.round(this.width*130/126);
	this.bridgeNum = 0;
	this.$stageBox = $stageBox;
	this.score = 0
}

TudouJun.prototype = {
	initPosition:function(){
		var bottom = stageHeight - 14;
		var left   = stage.leftStage - this.width*1.3;
		this.oLeft = left;
		this.oBottom = bottom;
		this.$ele.css({'width':this.width,height:this.height,bottom:bottom,left:left});
	},
	tdBackToLeftAfterFly:function(time){
		var tdLeft    = this.$ele.css('left');
		var toLeft    = (stage.riverStage - stage.riverWid)  - this.$ele.width()*1.3;
		this.$ele.css({'opacity':1,'left':tdLeft}).removeClass('showEle');
		var className   = stageBg + '_tdToLeftAfterFly_' + this.bridgeNum;
		var animateCss  = 
		'100%{' +
			'left:' + toLeft + 'px;' +
		'}\n';

		var styleStr = '.'+ className +'{' +
							'-webkit-animation:' + stageBg + '_tobackNewStart_' + this.bridgeNum + ' ' +  time +'s linear 1;' +
					        '-webkit-animation-delay:0.1s;'+
					        '-webkit-animation-fill-mode:forwards;' +
						'}\n' +
						'@-webkit-keyframes  ' + stageBg + '_tobackNewStart_' + this.bridgeNum + '{' + animateCss + '}\n';
		util.addCss(styleStr,$pageStyle);
		setTimeout(function(){
			this.$ele.addClass(className);
		},100);
		
		var self = this;

		self.$ele.addClass(className);
	},
	backFeiTudouNewStart:function(){
		var left = stage.leftStage + stage.riverStage - this.width*1.3;
		this.$ele.css({'opacity':0,'left':left}).removeClass('tudouHide').addClass('showEle');
	},
	tudouReset:function(){
		this.bridgeNum = 0;
		this.score = 0;
		this.$ele.attr('class','tudou').removeAttr('style');
		this.initPosition();
	},
	addupdateScore:function(score){
		this.score += (score?score:100);
		$stagePage.find('.curScore').text(this.score);
		this.$failPop.find('.fail-score').text(this.score);
	},

	tudowEvent:function(){
		var self   =  this;
		this.$ele[0].addEventListener("webkitAnimationEnd", function(){    //动画结束时事件 
			var className = self.$ele.attr('class');
			if(self.$ele.hasClass(stageBg + '_tudouToBridge_' + self.bridgeNum)){
				if(st.stLong){
					self.addupdateScore();
					if(stage.hasFeiTan){
						self.showTdfeiHideSt();
						stage.tdfeiBackToNewStart(0.7);
						stage.stageBackToNewStart(0.7);
					}else{
						self.tudouBackToNewStart();
						st.stBackToNewStart();
					}
				}else{
					if(self.score>=sorceMap['gk'+ stage.gkaIndex]){
						// 通过一关，此处升级
						stage.totalScore += self.score;
						stage.gkaIndex ++;

						if(stage.gkaIndex == 1){
							if(map.getRandFlag()){
								map.showJuan(10);
							}else{
								setTimeout(function(){
									map.afterCloseJuan(map);
								},200);
							}
						}else if(stage.gkaIndex == 2){
							if(map.getRandFlag()){
								map.showBag01();
							}else{
								setTimeout(function(){
									stage.startNewGuKa();
								},200);
							}
						}else if(stage.gkaIndex == 3){
							//抽奖在最后一程,不是此处
							//self.showLastChou();
							if(map.getRandFlag()){
								map.showBady01();
							}else{
								stage.startNewGuKa();
							}
							tudou.submitScore();
							stage.pauseMusic('off');
						}
					}else{
						self.showDown();
						tudou.submitScore();
						stage.pauseMusic('off');
					}
				}
			}else if(self.$ele.hasClass(stageBg +'_BackToNewStart_'+ self.bridgeNum)){
				var left = tudou.$ele.css('left');
				tudou.$ele.css('left',left).removeClass(stageBg +'_BackToNewStart_'+ self.bridgeNum);
			}else if(self.$ele.hasClass(stageBg +'_tdToLeftAfterFly_'+ self.bridgeNum)){
				var left = self.$ele.css('left');
				self.$ele.css({'left':left}).removeClass(stageBg +'_tdToLeftAfterFly_'+ self.bridgeNum);

				var stLeft = (stage.riverStage - stage.riverWid)  - tudou.width*0.3 - st.owidth/2;
				if( parseInt(st.$ele.css('left').replace('px','')) - parseInt(stLeft) >2 ){
					st.$ele.addClass(stageBg +'_stToLeftAfterFly_'+ self.bridgeNum);
				} 
				//
			}
		}, false); 
	},


	showLastChou:function(){
		var $chouBox = stage.$lastchouBox;
		$chouBox.addClass('showEle');
		$chouBox.find('.chou_01').addClass('showEle');
		$chouBox.find('.sorce-text').text(stage.totalScore);

		if(!$chouBox.find('.chou_01').attr('data-css')){
			util.setCssData($chouBox.find('.chou_01'),'chou_01_box');
		}
	},
	showChou2:function(){
		var $chouBox = this.$lastchouBox;
		$chouBox.find('.chou_01').hide();
		$chouBox.find('.chou_02').show();
	},
	showTdfeiHideSt:function(){
		var tudouLeft = this.$ele.css('left');
		this.$ele.css({'left':tudouLeft}).attr('class','tudou tdBgNone tudouHide');
		stage.$feitan.removeClass('showEle').addClass('hideEle');
		stage.$tdfei.addClass('showEle');
		st.hideSt();
	},
	showPassStagePop:function(){
		$passPop.addClass('showPopBox');
		$passPop.find('.pass-score').text(tudou.score);
		$mark.css('display','block').addClass('showMark');

		if(!$passPop.attr('data-css')){
			util.setCssData($passPop,'passPop');
		}
	},
	showDown:function(){
		$failPop.addClass('showPopBox');
		$mark.css('display','block').addClass('showMark');

		if(!$failPop.attr('data-css')){
			util.setCssData($failPop,'failPop');
		}


	},
	submitScore:function(){
		/*
		http://www.manglab.com/h5/potato/userScore.php post method
post data: openid=1111&score=8889
response: true/false*/
		var self = this;
		var param = {
			openid:window.login.openid,
			score:stage.totalScore
		}
		if(!debug){
			$.ajax({
				url:'http://www.manglab.com/h5/potato/userScore.php',
				type:'post',
				data:param,
				succes:function(data){
					alert('submitScore success~~~' + data);
				}
			})
		}
	},
	getNextLeft:function(){
		return stage.riverStage - stage.riverWid - this.width*1.3;
	},
	crossRiver:function(){
		this.bridgeNum ++;
		var toLeft   = Number(this.$ele.css('left').replace('px','')) + 45;
		var toBottom = Number(this.$ele.css('bottom').replace('px','')) + 10;
		var tleft    = toLeft - 15 + Number(st.$ele.css('width').replace('px',''));
		var feiTanLeft = Number(stage.$feitan.css('left').replace('px','')) + 5;
		var time     = tleft*6/1000;
		var className= stageBg + '_tudouToBridge_'+ this.bridgeNum;
		var stLong   = st.stLong;
		if(stLong){
			if(stage.hasFeiTan){
				tleft = feiTanLeft;
			}
			animateCss = '10%{' +
				'left:' + toLeft + 'px;' +
				'bottom:' + toBottom + 'px;'+
			'}\n' +
			'90%{' +
				'left:' + tleft + 'px;' +
				'bottom:' + toBottom + 'px;'+
			'}\n' +
			'100%{' +
				'left:' + (tleft + 10) + 'px;' +
				'bottom:' + (toBottom -10) + 'px;'+
			'}\n';
		}else{
			animateCss = '10%{' +
				'left:' + toLeft + 'px;' +
				'bottom:' + toBottom + 'px;'+
			'}\n'+
			'60%{' +
				'left:' + tleft + 'px;' +
				'bottom:' + toBottom + 'px;'+
			'}\n'+
			'100%{' +
				'left:' + tleft + 'px;' +
				'bottom:-' + 90 + 'px;'+
			'}\n';
			time = time*1.3;
		}

		var styleStr = '.'+ className +'{' +
							'-webkit-animation: toBridge_' + this.bridgeNum + ' ' + time +'s linear 1;' +
					        '-webkit-animation-fill-mode:forwards;' +
						'}\n' +
						'@-webkit-keyframes toBridge_' +this.bridgeNum + '{' + animateCss + '}\n';
						
		util.addCss(styleStr,$pageStyle);
		tudou.$ele.html('<div class="tdGo"></div>').addClass('tdBgNone ' + className);
		st.index ++;
	},
	tudouBackToNewStart:function(){
		var className   = stageBg+'_BackToNewStart_'+ this.bridgeNum;
		var toLeft      = this.getNextLeft();
		var time        = toLeft*12/1000;
		var tdCurLeft   = this.$ele.css('left').replace('px',0); 
		if(time<0.7){
			time = 0.7;
		}
		var animateCss  = 
		'100%{' +
			'left:' + toLeft + 'px;' +
		'}\n';

		var styleStr = '.'+ className +'{' +
							'-webkit-animation: tobackNewStart_' + this.bridgeNum + ' ' +  time +'s linear 1;' +
							'-webkit-animation-delay:0.1s;'+
					        '-webkit-animation-fill-mode:forwards;' +
						'}\n' +
						'@-webkit-keyframes  tobackNewStart_' + this.bridgeNum + '{' + animateCss + '}\n';
		util.addCss(styleStr,$pageStyle);
		stage.stageBackToNewStart(time);
		this.$ele.css({'left':this.$ele.css('left')}).removeClass(stageBg + '_tudouToBridge_' + this.bridgeNum)
				 .addClass(className);
	}
	
}

function ShuTiao($ele,tudou){
	this.$ele  = $ele;
	this.tudou = tudou;
	this.owidth = Math.floor(tudou.width/6);
	this.oheight= stOrignHei; 
	this.curHeight   = stOrignHei;
	this.stTopHeight = this.owidth*16/22;
	this.stBotHeight = this.owidth*15/22;
	this.$center     = $ele.find('.st-center');
	this.index       = 0; 
	this.toRightRiver = 0;  
}

ShuTiao.prototype = {
	heightIsOver:function(){
		var index      = this.index;
		var riverWidth = stage.riverWid;
		var toRight    = this.getToRightRiver();
		if(this.curHeight - toRight < riverWidth || this.curHeight - toRight>stage.riverStage){
			this.stLong = false;
		}else{
			this.stLong = true;
		}
	},
	stBackToLeftAfterFly:function(time){
		var stLeft    = this.$ele.css('left');
		//var toLeft    = Number(stLeft.replace('px','')) - (stage.leftStage + stage.riverWid);
		var toLeft    = (stage.riverStage - stage.riverWid)  - tudou.width*0.3 - this.owidth/2;
		this.$ele.css({'opacity':1,'left':stLeft}).removeClass('showEle');
		var className   = stageBg + '_stToLeftAfterFly_' + tudou.bridgeNum;
		var animateCss  = 
		'100%{' +
			'left:' + toLeft + 'px;' +
		'}\n';

		var styleStr = '.'+ className +'{' +
							'-webkit-animation:' + stageBg + '_sttobackNewStart_' + tudou.bridgeNum + ' ' +  time +'s linear 1;' +
					        '-webkit-animation-delay:0.1s;'+
					        '-webkit-animation-fill-mode:forwards;' +
						'}\n' +
						'@-webkit-keyframes ' + stageBg + '_sttobackNewStart_' + tudou.bridgeNum + '{' + animateCss + '}\n';
		util.addCss(styleStr,$pageStyle);
		//this.$ele.addClass(className);
		var self = this;
		setTimeout(function(){
			self.$ele.addClass(className);
		},100);
	},
	backFeiStNewStart:function(){
		var left = stage.leftStage + stage.riverStage - this.tudou.width*0.3 - this.owidth/2;
		this.setStHeight(this.oheight);
		this.$ele.css({'transform':'rotate(0deg)','opacity':0,'left':left})
			.removeClass('stHide')
			.addClass('showEle');


	},
	hideSt:function(){
		if(this.$ele.hasClass('stDao')){
			this.$ele.css({'transform':'rotate(90deg)','transform-origin':'90% 100%'}).removeClass('stDao').addClass('stHide');
		}
	},
	getToRightRiver:function(){
		var left   = this.getStLeft(this.index);
		return stage.leftStage - 6 - left - this.owidth;
	},
	initPosition:function(){
		var bottom = stageHeight - 10;
		var left   = this.getStLeft(this.index);
		this.$ele.css({'width':this.owidth,height:this.oheight,bottom:bottom,left:left});
		this.setStHeight(this.oheight);
		this.toRightRiver = this.getToRightRiver();
	},
	stReset:function(){
		this.$ele.attr('class','st').removeAttr('style');
		this.index = 0;
		this.toRightRiver = 0;
		st.initPosition();
	},
	stEvent:function(){
		var self   =  this;
		this.$ele[0].addEventListener("webkitAnimationEnd", function(){    //动画结束时事件 
			if(self.$ele.hasClass('stShow')){
				self.$ele.removeClass('stShow')
						.css({'opacity':1});
			}else if(self.$ele.hasClass(stageBg +'_stToLeftAfterFly_'+ tudou.bridgeNum)){
				var left = self.$ele.css('left');
				self.$ele.css({'left':left}).removeClass(stageBg +'_stToLeftAfterFly_'+ tudou.bridgeNum);
			}
		}, false); 
	},
	getStLeft:function(){
		return stage.leftStage - this.tudou.width*0.3 - this.owidth/2;
	},

	setStHeight:function(height){
		var cenHeight = height - this.stTopHeight - this.stBotHeight + 2;
		this.$ele.css({height:height});
		this.$center.css({'height':cenHeight,'margin-top':this.stTopHeight-1});
		this.curHeight = height;
	},
	stBackToNewStart:function(){
		var bottom = stageHeight - 10;
		var left   = this.getStLeft(this.index);
		var height = this.oheight;
		this.setStHeight(height);
		this.$ele.css({'bottom':bottom,'left':left,'opacity':0})
				.removeClass('stDao')
				.addClass('stShow');

	}
}

function shEvent(){
	tdEvent();
	pageEvent();
}

function pageEvent(){
	$('.popBoxNew .restart-btn').bind('touchstart',replay);
}

function replay(){
	var curHref = location.href;
	if(curHref.indexOf('openid')==-1){
		curHref += '&openid=' + window.login.openid;
	}
	location.href = curHref;
}

function tdEvent(){
	$stagePage.bind('touchstart',stStartTime);
	$stagePage.bind('touchend',stEndTime);
	var starTime = 0;
	var endTime  = 0;
	var upTimer  = null;
	function stStartTime(event){
		var tudouClass = tudou.$ele.attr('class');
		var stClass    = st.$ele.attr('class');
		var tuDouLeft  = tudou.$ele.css('left').replace('px','');

		//console.log('start  1111');

		//var left   = stage.leftStage - this.width*1.3;
		if((tudouClass == 'tudou' || tudouClass == 'tudou tdBgNone') && stClass == 'st'  && parseInt(tuDouLeft) == parseInt(stage.leftStage - tudou.$ele.width()*1.3)){
			console.log('start  222222');
			starTime = new Date().getTime();
			upTimer  = setInterval(function(){
				var curHeight = st.curHeight + 2.5;
				st.setStHeight(curHeight);
			},8);
		};

		return false;
/*		event.stopPropagation();

		//阻止默认浏览器动作(W3C) 
		if ( e && e.preventDefault ){
			e.preventDefault(); 
		}else{
			window.event.returnValue = false; 
			return false; 
		}
		  */  
	}

	function stEndTime(){
		var tuDouLeft  = tudou.$ele.css('left').replace('px','');
		var stOpacity = st.$ele.css('opacity');
		if(!st.$ele.hasClass('stDao') && stOpacity==1 && parseInt(tuDouLeft) == parseInt(stage.leftStage - tudou.$ele.width()*1.3) ){
			clearInterval(upTimer);
			st.$ele.addClass('stDao');
			st.heightIsOver();

			setTimeout(function(){
				tudou.crossRiver();
			},400);
		}

		return false;
		/*
		//阻止默认浏览器动作(W3C) 
		if ( e && e.preventDefault ){
			e.preventDefault(); 
		}else{
			window.event.returnValue = false; 
			return false; 
		}*/
	}

}

function initTdPosition(){
	//$tdBox.css({bottom:bottom,left:left});
	setStHeight(stOrignHei);
}



//10 关 11个stage
// stageWidth 1/3 ~~1/5
//距离 1/3~~1/5
function setNewStage(){
	var str     = '';
	var win2    = pageWidth/2;
	var win3    = pageWidth/3;
	var win4    = pageWidth/4;
	var win5    = pageWidth/5;
	var win7    = pageWidth/7;
	var randWid = 0;
	var river   = '<div></div>';
	//<aside class="oneStage" style="width:86px;"><div class="stageBg"></div></aside>
	var riverWid = parseInt(win5 + Math.random()*(win2 - win7));
	var stageWid = parseInt(win7 + Math.random()*(win4 - win7));
		

	
	$stageBox.html(str);
}

function getWidthRiver(width){
	return '<div class="river" style="width:'+ width +'px"></div>';
}

function getWidthStage(width){
	return '<aside class="oneStage" style="width:'+ width + 'px;"><div class="stageBg"></div></aside>';
}

function init(){
	if(tudou||st||stage){
		$stagePage.css({'display':'block'}).addClass('showEle');
		stage.musicBox.show();
	}else{
		tudou   = new TudouJun($tudou);
		st      = new ShuTiao($st,tudou);
		stage   = new Stage($stageBox);
		map     = new Map();
		stage.init();
		tudou.initPosition();
		tudou.tudowEvent();
		st.initPosition();
		st.stEvent();
		map.init();
		shEvent();
	}
	
}

module.exports ={
	init:init,
	Map:Map
}


