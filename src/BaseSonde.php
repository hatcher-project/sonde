<?php
/**
 * @license see LICENSE
 */

namespace Hatcher\Sonde;


class BaseSonde
{

    /**
     * @var Sondable[]
     */
    protected $sondables = [];

    /**
     * Adds a Sondable to recolt data
     * @param $name
     * @param Sondable $sondable
     */
    public function plug($name, Sondable $sondable){
        $this->sondables[$name] = $sondable;
    }

    /**
     * get a Sondable previously registered with plug method
     * @param $name
     * @return Sondable
     */
    public function get($name){
        return $this->sondables[$name];
    }

    /**
     * Collect all data and returns them as an associative array
     * @return array
     */
    public function collectData(){
        $data = [];
        foreach($this->sondables as $s){
            $s->reportData($data);
        }
        return $data;
    }


}
