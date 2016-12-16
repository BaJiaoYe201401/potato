<?php
require 'conn.php';
require 'models/user.php';

$result = getTopScoreList();
echo json_encode($result);

?>