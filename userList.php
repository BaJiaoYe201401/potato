<?php
require 'conn.php';
require 'models/user.php';

$result = getAllUsers();
echo json_encode($result);

?>