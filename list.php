<!DOCTYPE html>
<html lang="en">
<head>
    <title>用户信息列表</title>
    <meta charset="UTF-8">
    <meta name="format-detection" content="telephone=no" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <style type="text/css">
        body {
          font: normal medium/1.4 sans-serif;
        }
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th, td {
          padding: 0.25rem;
          text-align: left;
          border: 1px solid #ccc;
        }
        tbody tr:nth-child(odd) {
          background: #eee;
        }
    </style>
</head>
<body>
 <?php
require 'conn.php';
require 'models/user.php';

$result = getAllUsers();
// print_r($result);
 ?>
<div class="pages">
 <table>
    <thead>
    <tr>
        <th>头像</th>
        <th>用户名</th>
        <th>分数</th>
        <th>电话</th>
        <th>类型</th>
        <th>地址</th>
    </tr>
    </thead>
    <tbody>
    <?php 
        for($i=0; $i< count($result); $i++) {
            if($result[$i]["type"] == 1) {
                $type = '布袋';
            }else if($result[$i]["type"] == 2) {
                $type = '小公仔';
            }else if($result[$i]["type"] == 3) {
                $type = '大公仔';
            }else {
                $type = $result[$i]["type"];
            }
            echo '<tr>';
            echo '<td><img src="'.$result[$i]["thumb"].'" alt="photo"  width="50" height="50"/></td><td>'.$result[$i]["name"].'</td><td>'.$result[$i]["score"].'</td><td>'.$result[$i]["phone"].'</td><td>'.$type.'</td><td>'.$result[$i]["address"].'</td>';
            echo '</tr>';
        }
    ?>
    </tbody>
 </table>
</div>
<script type="text/javascript">
</script>

</body>
</html>