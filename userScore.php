<?php
require 'conn.php';
require 'models/user.php';

$result = array('error' => 'params error.');
if (!empty($_POST)){
	$openid = $_POST["openid"];
	$score = $_POST["score"];
	$row = getUserByOpenid($openid);
	if($score - $row["score"] > 0) {
		$result = updateScore($openid, $score);
	}else{
		$result = false;
	}
}
echo json_encode($result);

?>