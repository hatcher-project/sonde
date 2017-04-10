<?php
/**
 * @license see LICENSE
 */

namespace Hatcher\Sonde;

/**
 * Collects messages to make them displayable in the bar
 */
class Messages implements Sondable
{
    protected $messages;

    /**
     * Adds a message
     * @param string $message
     */
    public function addMessage($message){
        $this->messages[] = ['text' => $message];
    }

    /**
     * @inheritdoc
     */
    public function reportData(&$data)
    {
        $data['messages'] = $this->messages;
    }


}
