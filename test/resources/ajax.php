<?php


require __DIR__ . '/../../vendor/autoload.php';


$sonde = new Hatcher\Sonde\Sonde();



$p1 = $sonde->startProfile('Request');


usleep(1000);


$p2 = $sonde->startProfile('database');
$p2->addData('foo', 'bar');

usleep(100);
$p2->stop();



$p3 = $sonde->startProfile('foo');
$p4 = $sonde->startProfile('bar');
$p4->stop();
$p3->stop();

usleep(100);

$p1->stop();

$sonde->addMessage('bar');

$profiles = $sonde->collectData();



$headers = \Hatcher\Sonde\Renderer::renderAsResponseHeaders($sonde);

//var_dump($headers);die();

foreach($headers as $n=>$v){
    header("$n: $v");
}
