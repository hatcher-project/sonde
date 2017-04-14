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

$sonde->addMessage('foo');

$profiles = $sonde->collectData();



$html = file_get_contents(__DIR__ . '/webpage.html');

$html = \Hatcher\Sonde\Renderer::addExternalJs('/dist/index.js', $html);
$html = \Hatcher\Sonde\Renderer::addExternalCss('/dist/index.css', $html);
$html = \Hatcher\Sonde\Renderer::renderSetupInHtml($html, $sonde);


echo $html;
