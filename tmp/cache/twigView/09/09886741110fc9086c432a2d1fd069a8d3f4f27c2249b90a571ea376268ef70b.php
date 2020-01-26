<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* /Applications/MAMP/htdocs/Dropbox/mapcii_frontend/vendor/cakephp/bake/src/Template/Bake/Element/Controller/index.twig */
class __TwigTemplate_65c65d9b6fbb404b8a9008bc8e41e475531eda52c2168bf24c673dc40d64b31e extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 16
        echo "
    /**
     * Index method
     *
     * @return \\Cake\\Http\\Response|void
     */
    public function index()
    {
";
        // line 24
        $context["belongsTo"] = $this->getAttribute((isset($context["Bake"]) ? $context["Bake"] : null), "aliasExtractor", [0 => (isset($context["modelObj"]) ? $context["modelObj"] : null), 1 => "BelongsTo"], "method");
        // line 25
        if ((isset($context["belongsTo"]) ? $context["belongsTo"] : null)) {
            // line 26
            echo "        \$this->paginate = [
            'contain' => [";
            // line 27
            echo $this->getAttribute((isset($context["Bake"]) ? $context["Bake"] : null), "stringifyList", [0 => (isset($context["belongsTo"]) ? $context["belongsTo"] : null), 1 => ["indent" => false]], "method");
            echo "]
        ];
";
        }
        // line 30
        echo "        \$";
        echo twig_escape_filter($this->env, (isset($context["pluralName"]) ? $context["pluralName"] : null), "html", null, true);
        echo " = \$this->paginate(\$this->";
        echo twig_escape_filter($this->env, (isset($context["currentModelName"]) ? $context["currentModelName"] : null), "html", null, true);
        echo ");

        \$this->set(compact('";
        // line 32
        echo twig_escape_filter($this->env, (isset($context["pluralName"]) ? $context["pluralName"] : null), "html", null, true);
        echo "'));
    }
";
    }

    public function getTemplateName()
    {
        return "/Applications/MAMP/htdocs/Dropbox/mapcii_frontend/vendor/cakephp/bake/src/Template/Bake/Element/Controller/index.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  61 => 32,  53 => 30,  47 => 27,  44 => 26,  42 => 25,  40 => 24,  30 => 16,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("{#
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @since         2.0.0
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */
#}

    /**
     * Index method
     *
     * @return \\Cake\\Http\\Response|void
     */
    public function index()
    {
{% set belongsTo = Bake.aliasExtractor(modelObj, 'BelongsTo') %}
{% if belongsTo %}
        \$this->paginate = [
            'contain' => [{{ Bake.stringifyList(belongsTo, {'indent': false})|raw }}]
        ];
{% endif %}
        \${{ pluralName }} = \$this->paginate(\$this->{{ currentModelName }});

        \$this->set(compact('{{ pluralName }}'));
    }
", "/Applications/MAMP/htdocs/Dropbox/mapcii_frontend/vendor/cakephp/bake/src/Template/Bake/Element/Controller/index.twig", "/Applications/MAMP/htdocs/Dropbox/mapcii_frontend/vendor/cakephp/bake/src/Template/Bake/Element/Controller/index.twig");
    }
}
