<?php
require 'conn.php';
require 'models/user.php';

$ret = array('error' => 'params error.');
if (!empty($_GET)){
	//	获取token
	$code = $_GET["code"];
	$appId = 'wxa13312503e5d3929';
	$appSecret = '7f87edfdcc99b4a21dd8b119c03b5e55';
	$tokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$appId.'&secret='.$appSecret.'&code='.$code.'&grant_type=authorization_code';
	$resToken = file_get_contents($tokenUrl);
    $tokenData = json_decode($resToken, true);
    //
    if(!$tokenData['errcode']) {
    	$openid = $tokenData['openid'];
		$access_token = $tokenData['access_token'];
		$userObj = getUserByOpenid($openid);
		if(!$userObj && $openid) {
			addUser($openid);
		}
		if($openid && $access_token) {
			$userInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$access_token.'&openid='.$openid.'&lang=zh_CN';
			$res = file_get_contents($userInfoUrl);
			$userInfoData = json_decode($res, true);
			if($userInfoData['headimgurl']) {
				$img = updateThumb($openid, $userInfoData['headimgurl'], $userInfoData['nickname']);
				if($img) {
					$ret = array('openid' => $openid);
				}
			}else{
				$ret = $userInfoData;
			}
		}
    }else{
    	$ret = $tokenData;
    }
}
echo json_encode($ret);

?>
