<?php
/**
 * @license see LICENSE
 */

namespace Hatcher\Sonde\Reporter;

use Hatcher\Sonde\Sonde;
use PDO;

class PDOStatementReporter extends \PDOStatement
{

    /**
     * @var Sonde
     */
    protected $sonde;

    protected $boundValues = [];


    protected function __construct(Sonde $sonde)
    {
        $this->sonde = $sonde;
    }

    /**
     * @inheritdoc
     */
    public function bindColumn($column, &$param, $type = null, $maxlen = null, $driverdata = null)
    {
        $this->boundValues[$column] = $param;
        return parent::bindColumn($column, $param, $type, $maxlen, $driverdata);
    }

    /**
     * @inheritdoc
     */
    public function bindParam($parameter, &$variable, $data_type = PDO::PARAM_STR, $length = null, $driver_opts = null)
    {
        $this->boundValues[$parameter] = $variable;
        return parent::bindParam($parameter, $variable, $data_type, $length, $driver_opts);
    }

    /**
     * @inheritdoc
     */
    public function bindValue($parameter, $value, $data_type = PDO::PARAM_STR)
    {
        $this->boundValues[$parameter] = $value;
        return parent::bindValue($parameter, $value, $data_type);
    }

    /**
     * @inheritdoc
     */
    public function execute($input_parameters = null)
    {
        $bound = $this->boundValues;
        if (is_array($input_parameters)) {
            $bound = array_merge($bound, $input_parameters);
        }
        $p = $this->sonde->startProfile('Database');
        $p->addData('type', 'statementExecute');
        $p->addData('statement', $this->queryString);
        $p->addData('boundValues', $bound);
        $res = parent::execute($input_parameters);
        $p->stop();

        $p->addData('rowCount', $this->rowCount());

        return $res;
    }
}
