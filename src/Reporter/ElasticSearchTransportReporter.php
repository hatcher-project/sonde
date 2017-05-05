<?php
/**
 * @license see LICENSE
 */

namespace Hatcher\Sonde\Reporter;

use Elasticsearch\ConnectionPool\AbstractConnectionPool;
use Elasticsearch\Transport;
use Hatcher\Sonde\Sonde;
use Psr\Log\LoggerInterface;

class ElasticSearchTransportReporter extends Transport
{
    /**
     * @var Transport
     */
    protected $transport;

    /**
     * @var Sonde
     */
    protected $sonde;

    /**
     * ElasticSearchTransportReporter constructor.
     * @param Transport $transport
     */
    public function __construct(Transport $transport, Sonde $sonde)
    {
        $this->transport = $transport;
        $this->sonde = $sonde;
    }


    /**
     * @inheritdoc
     */
    public function getConnection()
    {
        return parent::getConnection();
    }

    /**
     * @inheritdoc
     */
    public function performRequest($method, $uri, $params = null, $body = null, $options = [])
    {
        $p = $this->sonde->startProfile('Elasticsearch');
        $p->addData('method', $method);
        $p->addData('uri', $uri);
        $p->addData('params', $params);
        $p->addData('body', $body);
        $data = $this->transport->performRequest($method, $uri, $params, $body, $options);
        $p->stop();
        return $data;
    }

    /**
     * @inheritdoc
     */
    public function resultOrFuture($result, $options = [])
    {
        return $this->transport->resultOrFuture($result, $options);
    }

    /**
     * @inheritdoc
     */
    public function shouldRetry($request)
    {
        return $this->transport->shouldRetry($request);
    }

    /**
     * @inheritdoc
     */
    public function getLastConnection()
    {
        return $this->transport->getLastConnection();
    }
}
