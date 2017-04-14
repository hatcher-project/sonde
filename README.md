Sonde
=====

WIP

Sonde is a framework-independent php debug bar.

It was inspired by [php-debugbar](https://github.com/maximebf/php-debugbar) but it is more simple and more lightweight.
The reason this project was born is because php debugbar is very heavy on the frontend (lot of dependancy, including 
jquery). Sonde solves this problem by providing a very small browser footprint: only vanilla javascript and a very few styles.


Example
-------


```php
  use Hatcher\Sonde\Sonde;
  use Hatcher\Sonde\Renderer;
  
  
  $sonde = new Hatcher\Sonde\Sonde();
  
  // Start a timer to have the execution time of the full script
  $p1 = $sonde->startProfile('Script');
  
  // Do some stuff
  
  // Start a timer to monitor a long process
  $p2 = $sonde->startProfile('process');
  // ...
  
  if($message){
    // Add a message 
    $sonde->addMessage('Process said: ' . $message);
  }
  
  $p2->stop();
  
  // Start a timer to time the rendering process
  $p3->startProfile('process');
  $html = $view->render(...);
  $p3->stop();
  
  $p1->stop();
  
  // Insert bar in html
  
  $html = Render::renderAllInHtml($html, $sonde);
  
  echo $html;
```


TODO
----

- More plugin (pdo, twig...)
- Handle redirection stacking
- Make colors and names configurable from php
- Provide more messages types (error, warning, success, info)
