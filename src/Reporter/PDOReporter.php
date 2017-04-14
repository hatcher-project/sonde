<?php
/**
 * @license see LICENSE
 */

namespace Hatcher\Sonde\Reporter;


use Hatcher\Sonde\BaseSonde;
use Hatcher\Sonde\Sonde;
use PDO;
use Hatcher\Sonde\Reporter\PDOStatementReporter;

/**
 * A PDO proxy that reports execution time of queries.
 *
 */
class PDOReporter extends PDO
{
    /** @var PDO */
    protected $pdo;

    /**
     * @var Sonde
     */
    protected $sonde;

    public function __construct(PDO $pdo, Sonde $sonde)
    {
        $this->sonde = $sonde;
        $this->pdo = $pdo;
        $this->pdo->setAttribute(PDO::ATTR_STATEMENT_CLASS, [PDOStatementReporter::class, [$this->sonde]]);
    }

    /**
     * @inheritdoc
     */
    public function beginTransaction()
    {
        return $this->pdo->beginTransaction();
    }

    /**
     * @inheritdoc
     */
    public function commit()
    {
        return $this->pdo->commit();
    }

    /**
     * @inheritdoc
     */
    public function errorCode()
    {
        return $this->pdo->errorCode();
    }

    /**
     * @inheritdoc
     */
    public function errorInfo()
    {
        return $this->pdo->errorInfo();
    }

    /**
     * @inheritdoc
     */
    public function exec($statement)
    {
        $profile = $this->sonde->startProfile('Database');
        $profile->addData('type', 'exec');
        $profile->addData('statement', $statement);
        $result = $this->pdo->exec($statement);
        $profile->stop();

        $profile->addData('rowCount', $result);

        return $result;
    }

    /**
     * @inheritdoc
     */
    public function getAttribute($attribute)
    {
        return $this->pdo->getAttribute($attribute);
    }

    /**
     * @inheritdoc
     */
    public function inTransaction()
    {
        return $this->pdo->inTransaction();
    }

    /**
     * @inheritdoc
     */
    public function lastInsertId($name = null)
    {
        return $this->pdo->lastInsertId($name);
    }

    /**
     * @inheritdoc
     */
    public function prepare($statement, $driver_options = array())
    {
        return $this->pdo->prepare($statement, $driver_options);
    }

    /**
     * @inheritdoc
     */
    public function query($statement)
    {
        $profile = $this->sonde->startProfile('Database');
        $profile->addData('type', 'query');
        $profile->addData('statement', $statement);
        $result = $this->pdo->query($statement);
        $profile->stop();

        $profile->addData('rowCount', $result->rowCount());

        return $result;
    }

    /**
     * @inheritdoc
     */
    public function quote($string, $parameter_type = PDO::PARAM_STR)
    {
        return $this->pdo->quote($string, $parameter_type);
    }

    /**
     * @inheritdoc
     */
    public function rollBack()
    {
        return $this->pdo->rollBack();
    }

    /**
     * @inheritdoc
     */
    public function setAttribute($attribute, $value)
    {
        return $this->pdo->setAttribute($attribute, $value);
    }

    /**
     * @param $name
     * @return mixed
     */
    public function __get($name)
    {
        return $this->pdo->$name;
    }

    /**
     * @param $name
     * @param $value
     */
    public function __set($name, $value)
    {
        $this->pdo->$name = $value;
    }

    /**
     * @param $name
     * @param $args
     * @return mixed
     */
    public function __call($name, $args)
    {
        return call_user_func_array(array($this->pdo, $name), $args);
    }

}
