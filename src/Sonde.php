<?php
/**
 * @license see LICENSE
 */

namespace Hatcher\Sonde;

class Sonde
{

    protected $jsPluginFiles = [];

    /**
     * Construct a new sonde with profiler and message plugin by default
     */
    public function __construct()
    {
        $this->plug('profiler', new Profiler());
        $this->plug('messages', new Messages());
    }

    /**
     * @var Sondable[]
     */
    protected $sondables = [];

    /**
     * Adds a Sondable
     * @param $name
     * @param Sondable $sondable
     */
    public function plug($name, Sondable $sondable)
    {
        $this->sondables[$name] = $sondable;
    }

    /**
     * get a Sondable previously registered with @see Sonde::plug method
     * @param $name
     * @return Sondable
     */
    public function get($name)
    {
        return $this->sondables[$name];
    }

    /**
     * Collect all data and returns them as an associative array
     * @return array
     */
    public function collectData()
    {
        $data = [];
        foreach ($this->sondables as $s) {
            $s->reportData($data);
        }
        return $data;
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


    /**
     * Adds a javascript file that will be injected in the setup script.
     * @param string $path path to the file
     */
    public function addJsPluginFile($path)
    {
        $this->jsPluginFiles[] = $path;
    }

    /**
     * Files to be injected in the setup scripts
     * @return array
     */
    public function getJsPluginFiles()
    {
        return $this->jsPluginFiles;
    }
}
