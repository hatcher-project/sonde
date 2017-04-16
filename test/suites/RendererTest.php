<?php
/**
 * @license see LICENSE
 */

namespace Hatcher\Sonde\Test;

use Hatcher\Sonde\Profile;
use Hatcher\Sonde\Profiler;
use Hatcher\Sonde\Renderer;
use Hatcher\Sonde\Sonde;

class RendererTest extends \PHPUnit_Framework_TestCase
{

    public function testPlugins()
    {
        $sonde = new Sonde();
        $sonde->addJsPluginFile(__DIR__ . '/../resources/rendererTestPlugin.js');

        $setup = Renderer::getInlineJavascriptSetup($sonde);

        $this->assertContains('var a = "renderTest plugin content";', $setup);
    }
}
