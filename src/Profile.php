<?php
/**
 * @license see LICENSE
 */

namespace Hatcher\Sonde;

class Profile
{

    protected $start;
    protected $stop;
    protected $type;
    protected $data = [];

    protected $startTrace;

    /**
     * Profile constructor.
     * @param $start
     * @param $type
     */
    public function __construct($type, $start = null)
    {

        if (null === $start) {
            $start = microtime(true);
        }

        $this->start = $start;
        $this->type = $type;

        $this->startTrace = debug_backtrace();
    }

    public function stop()
    {
        $this->stop = microtime(true);
    }

    public function addData($name, $value)
    {
        $this->data[$name] = $value;
    }

    public function setData($data)
    {
        $this->data = $data;
    }

    public function getStartTime()
    {
        return $this->start;
    }

    /**
     *
     * @return mixed
     */
    public function getStopTime()
    {
        return $this->stop;
    }

    /**
     * Profile type
     * @return mixed
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * User data
     * @return array
     */
    public function getData($name = null)
    {
        if (null === $name) {
            return $this->data;
        } else {
            return isset($this->data[$name]) ? $this->data[$name] : null;
        }
    }

    public function getStartTrace()
    {
        return $this->startTrace;
    }

    public function getStartTraceText()
    {
        $text = [];

        foreach ($this->startTrace as $trace) {
            $r = '';

            if (isset($trace['class'])) {
                $r .= $trace['class'] . $trace['type'] . $trace['function'] . '(...)';
            }

            if (isset($trace['file'])) {
                $r .= ' ' . $trace['file'] . ':' . $trace['line'];
            }

            $text[] = $r;
        }
        return implode(PHP_EOL, $text);
    }
}
