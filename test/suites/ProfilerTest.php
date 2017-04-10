<?php
/**
 * @license see LICENSE
 */

namespace Hatcher\Sonde\Test;

use Hatcher\Sonde\Profile;
use Hatcher\Sonde\Profiler;

class ProfilerTest extends \PHPUnit_Framework_TestCase
{

    public function testProfiles()
    {
        $profiler = new Profiler();

        $p1 = new Profile('foo');
        usleep(10);
        $p2 = new Profile('bar');

        usleep(10);
        $p2->stop();
        $p1->stop();

        $profiler->addProfile($p1);
        $profiler->addProfile($p2);

        $profiles = $profiler->renderProfiles();

        $this->assertCount(2, $profiles['profiles']);
        $this->assertEquals('foo', $profiles['profiles'][0]['type']);
        $this->assertEquals('bar', $profiles['profiles'][1]['type']);
    }
}
