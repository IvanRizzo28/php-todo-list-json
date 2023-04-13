<?php
header('Content-Type: application/json');
$tmp=json_encode($_POST['x']);
file_put_contents("dati.json",$tmp);