<?php
require 'conn.php';
require 'models/user.php';

$ret = array('error' => 'params error.');
if (!empty($_GET)){
	$ret = getUserByOpenid($_GET["openid"]);
}
echo json_encode($ret);

?>