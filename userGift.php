<?php
require 'conn.php';
require 'models/user.php';

$result = getTodayUsers();

$a = 0;
$b = 0;
$c = 0;
for($i=0; $i< count($result); $i++) {
    if($result[$i]["type"] == 1) {
        $a++;
    }else if($result[$i]["type"] == 2) {
        $b++;
    }else if($result[$i]["type"] == 3) {
        $c++;
    }
}
$ret = array(
	array('name'=>'布袋', 'type'=> '1', 'count'=>$a),
	array('name'=>'小公仔','type'=> '2', 'count'=>$b),
	array('name'=>'大公仔', 'type'=> '3', 'count'=>$c),
	);
echo json_encode($ret);

?>