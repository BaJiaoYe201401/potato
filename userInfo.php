<?php
require 'conn.php';
require 'models/user.php';

$result = array('error' => 'params error.');
if (!empty($_POST)){
	$openid = $_POST["openid"];
	$name = $_POST["name"];
	$phone = $_POST["phone"];
	$address = $_POST["address"];
	$type = $_POST["type"];
	$obj = (object) array(
		'openid' => $openid,
		'name' => $name,
		'phone' => $phone,
		'address' => $address,
		'type' => $type
		);
	$result = updateUserInfo($obj);
}
echo json_encode($result);

?>