<?php
/**
 * @license see LICENSE
 */

namespace Hatcher\Sonde;

interface Sondable
{

    /**
     * The given array will be modified with the collected data
     * @param $data
     * @return mixed
     */
    public function reportData(&$data);
}
