<?php
/**
 * @license see LICENSE
 */

namespace Hatcher\Sonde;

class Profiler implements Sondable
{

    /**
     * @var Profile[]
     */
    protected $profiles = [];

    public function addProfile(Profile $profile)
    {
        $this->profiles[] = $profile;
    }

    public function reportData(&$data)
    {
        if (count($this->profiles) > 0) {
            usort(
                $this->profiles,
                function (Profile $a, Profile $b) {
                    $aStart = $a->getStartTime();
                    $bStart = $b->getStartTime();

                    return $aStart - $bStart;
                }
            );


            $first = $this->profiles[0]->getStartTime();
            $last = $this->getLastTime();
            $totalTime = $last - $first;

            $profilesOutput = [];

            foreach ($this->profiles as $p) {
                $profileExport = [
                    'type' => $p->getType(),
                    'start' => round(1000000 * ($p->getStartTime() - $first)),
                    'stop' => round(1000000 * ($p->getStopTime() - $first)),
                    'trace' => $p->getStartTraceText()
                ];

                if($profileData = $p->getData()){
                    $profileExport[] = $profileData;
                }

                $profilesOutput[] = $profileExport;
            }

            $data['profiles'] = $profilesOutput;
            $data['duration'] = round(1000000 * $totalTime);
        }
    }

    private function getLastTime()
    {
        $last = null;
        $l = null;
        foreach ($this->profiles as $p) {
            if ($last === null || $p->getStopTime() > $last) {
                $last = $p->getStopTime();
                $l= $p;
            }
        }
        return $last;
    }
}
