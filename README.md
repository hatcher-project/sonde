Sonde
=====

WIP

Sonde is a framework-independent php debug toolbar. It will help you to get insight of how your application is running.

It was inspired by [php-debugbar](https://github.com/maximebf/php-debugbar).
The reason this project was born is because php debugbar is very heavy on the frontend (lot of dependancy, including 
jquery). Sonde solves this problem by providing a very small browser footprint: 
only vanilla javascript and a very few styles.


Quick start
-----------


Install the library with composer:

``composer require hatcher/sonde``

Start playing with the bar

```php

  require 'vendor/autoload.php';

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
  $p3->startProfile('view');
  
  $html = '<html><head></head><body></body></html>';
  
  $p3->stop();
  
  $p1->stop();
  
  // Insert bar in html
  
  $html = Render::renderAllInHtml($html, $sonde);
  
  echo $html;
```

Rendering results
-----------------

Sonde requires three things to show up correctly:

- the sonde CSS
- the sonde JS library
- a setup script with data

There are 2 ways to render results in the page.

1. Inject everything in a html page

This method is the one present in the previous example, it's the easiest to get started with and does not require any
particular setup. You will just ask Sonde to inject all the requirement directly in your html and when the html
reaches the browser the bar shows by itself.

With this method all the javascript and all the css will be inlined in the html.

Demo:

```php
  use Hatcher\Sonde\Sonde;
  use Hatcher\Sonde\Renderer;

  $sonde = new Sonde();
  
  // Collect data
  
  // Render your html in a variable
  $html = ....;
  
  // Inject sonde data in the html
  $html = Render::renderAllInHtml($html, $sonde);

  echo $html;
```

2. Make the library available as an external resource and inject the setup script

With this method you will make the sonde CSS and JS library available as external resource (<link> and <script src='...'>)
and you will inject the setup script.

To do this you need to make available the content of the ``dist`` directory from http or use the cdn (TODO)

Demo:

```php
  use Hatcher\Sonde\Sonde;
  use Hatcher\Sonde\Renderer;

  $sonde = new Sonde();
  
  // Collect data
  
  // Render your html in a variable
  $html = ....;
  
  // Inject sonde data in the html
  $html = Render::addExternalCss('path/to/dist/sonde.css', $html);
  $html = Render::addExternalJs('path/to/dist/sonde.js', $html);
  $html = Render::renderSetupInHtml($html, $sonde);

  echo $html;
```

Render ajax requests
--------------------

Sonde is able to profile your ajax request as well.
It uses http headers to send data from php to browser and it's as simple as with the html version. 
It only requires that the page that initiates the ajax request has already a sonde bar initialized.

Demo:

```php
  use Hatcher\Sonde\Sonde;
  use Hatcher\Sonde\Renderer;

  $sonde = new Sonde();
  
  // Collect data
  
  // Get headers to send with request
  $headers = \Hatcher\Sonde\Renderer::renderAsResponseHeaders($sonde);
  
  // Send the headers in the response
  foreach($headers as $n=>$v){
      header("$n: $v");
  }
  
  echo 'some response';
```

Augment the javascript
----------------------

You can augment the setup script and add plugins to the bar.
To do this you will inject your own javascript into the setup script.
The example below will show how to customize color of elements in the timeline:


First write a js file that will contain the injected script:

```js
  // foo.js
  
  // bar is a javascript variable that we can modify 
  
  bar.addProfileType('foo', {
    color: "#3D00A8"
  });
```

Then in the php we add this file in the sonde:

```php
  $sonde->addJsPluginFile(__DIR__ . '/foo.js');
  
  // And now when we add a profile named foo it will get the color specified in the javascript above
  $p = $sonde->startProfile('foo');
```

When customizing javascript, you are not limited to the color. See next section for a full list of feature.


Javascript plugin
-----------------

As stated in the previous section you can add plugin to the bar. Here is the list of what you can customize

### Customize the timeline

```js
  bar.addProfileType('foo',
    {
      // All foo elements will have this color in the timeline
      color: "#3D00A8", 
      
      // The output of this function will be added after the element title in the timeline. It helps
      // To have a short details about the element at a glance 
      synopsis: function(profile){
         if (profile.data) {
            return profile.data.ok ? 'OK' : '<span style="color: red;">FAIL</span>';;
         }
         return '';
      }
    }
  );
```



Thanks
------

Thanks to [php-debugbar](https://github.com/maximebf/php-debugbar) that served as inspiration for many things in the 
php part of the application.

License
-------

[Fair License](https://opensource.org/licenses/Fair) 


TODO
----

- More plugin (twig...)
- Better data preview in timeline (array, int=0...)
- Database panel plugin
- PDO Report doc
- Handle redirection stacking
- Make colors and names configurable from php
- Provide more messages types (error, warning, success, info)
