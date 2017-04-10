<?php


require __DIR__ . '/../../vendor/autoload.php';




$profiler = new \Hatcher\Sonde\Profiler();


$p1 = new \Hatcher\Sonde\Profile('Request');


usleep(1000);


$p2 = new \Hatcher\Sonde\Profile('database');
$p2->addData('foo', 'bar');

usleep(100);
$p2->stop();



$p3 = new \Hatcher\Sonde\Profile('foo');
$p4 = new \Hatcher\Sonde\Profile('bar');
$p4->stop();
$p3->stop();

usleep(100);

$p1->stop();

$profiler->addProfile($p1);
$profiler->addProfile($p2);
$profiler->addProfile($p3);
$profiler->addProfile($p4);


$messages = new \Hatcher\Sonde\Messages();
$messages->addMessage('foo');



$sonde = new \Hatcher\Sonde\BaseSonde();
$sonde->plug('time', $profiler);
$sonde->plug('messages', $messages);

$profiles = $sonde->collectData();




$html = file_get_contents(__DIR__ . '/webpage.html');

$html = str_replace('[[DATA]]', str_replace('\\\\', '\\\\\\\\', json_encode($profiles)), $html);


echo $html;
