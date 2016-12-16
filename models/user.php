<?php

// Get one user by id
function getUserById($id) {
	$result = mysql_query("SELECT * FROM user where id = $id");
	$row = mysql_fetch_array($result, MYSQL_ASSOC);
	mysql_free_result($result);
	return $row;
}

// Get one user by openid
function getUserByOpenid($openid) {
	$result = mysql_query("SELECT * FROM user where openid = '$openid'");
	$row = mysql_fetch_array($result, MYSQL_ASSOC);
	mysql_free_result($result);
	return $row;
}

function getTopScoreList() {
	$result = mysql_query("SELECT * FROM user ORDER BY score DESC LIMIT 0,5");
	$ret = array();
	while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
	    array_push($ret, $row);
	}
	mysql_free_result($result);
	return $ret;

}

function getAllUsers() {
	$result = mysql_query("SELECT * FROM user ORDER BY id DESC");
	$ret = array();
	while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
	    array_push($ret, $row);
	}
	mysql_free_result($result);
	return $ret;

}

// Add one user
function addUser($openid) {
	$ret = false;
	$sql = "INSERT INTO user (openid) values ('$openid')";
	mysql_query($sql);
	if(mysql_insert_id()) {
		$ret = getUserById(mysql_insert_id());
	}
	
	return $ret;
}

// update score
function updateScore($openid, $score) {
	$ret = false;
	$sql = "UPDATE user SET score = '$score' WHERE openid = '$openid'";
	$ret = mysql_query($sql);
	return $ret;
}

// update thumb
function updateThumb($openid, $thumb, $nickname) {
	$ret = false;
	$sql = "UPDATE user SET thumb = '$thumb', nickname = '$nickname' WHERE openid = '$openid'";
	$ret = mysql_query($sql);
	return $ret;
}

// update thumb
function updateUserInfo($user) {
	$ret = false;
	$sql = "UPDATE user SET ";
	if(!empty($user->name)) {
		$sql .= "name = '$user->name', ";
	}
	if(!empty($user->address)) {
		$sql .= "address = '$user->address', ";
	}
	if(!empty($user->phone)) {
		$sql .= "phone = '$user->phone', ";
	}
	if(!empty($user->type)) {
		$sql .= "type = '$user->type'";
	}
	$sql .= " WHERE openid = '$user->openid'";
	// echo $sql;
	$ret = mysql_query($sql);
	return $ret;
}

?>