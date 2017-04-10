<?php
/**
 * @license see LICENSE
 */
namespace Hatcher\Sonde\Test;

use Hatcher\Sonde\Profile;

class ProfileTest extends \PHPUnit_Framework_TestCase
{

    public function testProfile()
    {

        $start = microtime(true);

        $profile = new Profile('foo');

        $this->assertEquals('foo', $profile->getType());
        $this->assertGreaterThan($start, $profile->getStartTime());
        $this->assertLessThan(microtime(true), $profile->getStartTime());
    }
}
