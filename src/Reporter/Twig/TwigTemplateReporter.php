<?php
/**
 * @license see LICENSE
 */

namespace Hatcher\Sonde\Reporter\Twig;


use Hatcher\Sonde\Sonde;

class TwigTemplateReporter implements \Twig_TemplateInterface
{

    /**
     * @var Sonde
     */
    protected $sonde;

    /**
     * @var \Twig_Template
     */
    protected $template;

    /**
     * TwigTemplateReporter constructor.
     * @param Sonde $sonde
     * @param \Twig_Template $template
     */
    public function __construct(\Twig_Template $template, Sonde $sonde)
    {
        $this->sonde = $sonde;
        $this->template = $template;
    }

    public function __call($name, $arguments)
    {
        return call_user_func_array(array($this->template, $name), $arguments);
    }

    public function __toString()
    {
        return $this->template->__toString();
    }

    public function getDebugInfo()
    {
        return $this->template->getDebugInfo();
    }

    public function getSource()
    {
        return $this->template->getSource();
    }

    public function getSourceContext()
    {
        return $this->template->getSourceContext();
    }

    public function getEnvironment()
    {
        return $this->template->getEnvironment();
    }

    public function getParent(array $context)
    {
        return $this->template->getParent($context);
    }

    public function isTraitable()
    {
        return $this->template->isTraitable();
    }

    public function displayParentBlock($name, array $context, array $blocks = array())
    {
        $this->template->displayParentBlock($name, $context, $blocks);
    }

    public function displayBlock($name, array $context, array $blocks = array(), $useBlocks = true)
    {
        $this->template->displayBlock($name, $context, $blocks, $useBlocks);
    }

    public function renderParentBlock($name, array $context, array $blocks = array())
    {
        return $this->template->renderParentBlock($name, $context, $blocks);
    }

    public function renderBlock($name, array $context, array $blocks = array(), $useBlocks = true)
    {
        return $this->template->renderBlock($name, $context, $blocks, $useBlocks);
    }

    public function hasBlock($name, array $context = null, array $blocks = array())
    {
        return $this->template->hasBlock($name, $context, $blocks);
    }

    public function getBlockNames(array $context = null, array $blocks = array())
    {
        return $this->template->getBlockNames($context, $blocks);
    }

    public function getBlocks()
    {
        return $this->template->getBlocks();
    }

    public function display(array $context, array $blocks = array())
    {
        $p = $this->sonde->startProfile('View');
        $this->template->display($context, $blocks);
        $p->stop();
        $p->addData('name', $this->template->getTemplateName());
    }

    public function render(array $context)
    {
        return $this->template->render($context);
    }





}
