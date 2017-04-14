<?php
/**
 * @license see LICENSE
 */

namespace Hatcher\Sonde;

class Sonde extends BaseSonde
{

    public function __construct()
    {
        $this->plug('profiler', new Profiler());
        $this->plug('messages', new Messages());
    }

    /**
     * @param $profileType
     * @return Profile
     */
    public function startProfile($profileType)
    {
        $profile = new Profile($profileType);
        $this->getProfiler()->addProfile($profile);
        return $profile;
    }

    /**
     * @return Profiler
     */
    public function getProfiler()
    {
        return $this->get('profiler');
    }


    /**
     * Adds a message to be reported in the bar
     * @param $message
     */
    public function addMessage($message)
    {
        /* @var \Hatcher\Sonde\Messages $messages; */
        $messages = $this->get('messages');
        $messages->addMessage($message);
    }
}
