<?php
require 'libs/Cache.class.php';

$appId = 'wxa13312503e5d3929';
$url = $_GET["url"];
$url = urldecode($url);

$cache = new Cache(3600, 'cache/');
$key = 'weixin_access_token';

function generateToken() {
	$appId = 'wxa13312503e5d3929';
	$appSecret = '7f87edfdcc99b4a21dd8b119c03b5e55';
	$tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.$appId.'&secret='.$appSecret;
	$res = file_get_contents($tokenUrl);
	$resToken = json_decode($res, true);
	// print_r($resToken);
	// Array ( [access_token] => I5BR3VkuWJyFBoo5Z5YQ3y31Lj0dQPJR36k9lUNfyn8kw3ceQ5xBtJvjj2TYrL3ooyaWxV3HcGk3PN_GX_J7Ra8hTlhLzl6fEaSUOfU7Z4c [expires_in] => 7200 )
	$token = $resToken['access_token'];
	$ticketUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='.$token.'&type=jsapi';
	$res = file_get_contents($ticketUrl);
	$resTicket = json_decode($res, true);
	// {"errcode":0,"errmsg":"ok","ticket":"sM4AOVdWfPE4DxkXGEs8VMKv7FMCPm-I98-klC6SO3Q3AwzxqljYWtzTCxIH9hDOXZCo9cgfHI6kwbe_YWtOQg","expires_in":7200}
	// print_r($resTicket);
	$ticket = $resTicket['ticket'];
	return $ticket;
}
//从缓存从读取键值 $key 的数据
$ticket = $cache->get($key);
//如果没有缓存数据
if ($ticket == false) {
	$cacheData = generateToken();
	//写入键值 $key 的数据
	$cache->put($key, $cacheData);
	$ticket = $cacheData;
}
// signature
$timestamp = time();
$nonceStr = "potato";
//$wxticket = wx_get_jsapi_ticket();
$wxOri = 'jsapi_ticket='.$ticket.'&noncestr='.$nonceStr.'&timestamp='.$timestamp.'&url='.$url;
$signature = sha1($wxOri);
$ret = array();
$ret['appId'] = $appId;
$ret['timestamp'] = $timestamp;
$ret['nonceStr'] = $nonceStr;
$ret['signature'] = $signature;
echo json_encode($ret);
?>