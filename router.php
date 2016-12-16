<?php
require 'models/user.php';

//Get top ten users by score
$app->get('/topUser', 'middleware', function () {
	$result = getTopScoreList();
	echo json_encode($result);
});

$app->post('/userScore', 'middleware', function () use ($app) {
	$request = $app->request;
	$params = $request->getBody();;
	$jsonObj = json_decode($params, true);
	$jsonObj = (object) $jsonObj;
	$result = updateScore($jsonObj->openid, $jsonObj->score);
	echo json_encode($result);
});

$app->post('/userInfo', 'middleware', function () use ($app) {
	$request = $app->request;
	$params = $request->getBody();;
	$jsonObj = json_decode($params, true);
	$jsonObj = (object) $jsonObj;
	$result = updateUserInfo($jsonObj);
	echo json_encode($result);
});

$app->get('/userAuth', 'middleware', function () {
	//	获取token
	$code = $_GET["code"];
	$appId = 'wxa13312503e5d3929';
	$appSecret = '7f87edfdcc99b4a21dd8b119c03b5e55';
	$tokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$appId.'&secret='.$appSecret.'&code='.$code.'&grant_type=authorization_code';
	$resToken = file_get_contents($tokenUrl);
    $tokenData = json_decode($resToken, true);
    //
	$openid = $tokenData['openid'];
	$access_token = $tokenData['access_token'];
	$userObj = getUserByOpenid($openid);
	if(!$userObj) {
		addUser($openid);
	}
	$userInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$access_token.'&openid='.$openid.'&lang=zh_CN';
	$res = file_get_contents($userInfoUrl);
    $userInfoData = json_decode($res, true);
    updateThumb($openid, $userInfoData['headimgurl']);
    $ret = array('openid' => $openid);
    echo json_encode($ret);
});

$app->get('/test', 'middleware', function () {
	$result = array('openid' => 444444);
    echo json_encode($result);
});


?>