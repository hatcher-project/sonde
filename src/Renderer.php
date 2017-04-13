<?php
/**
 * @license see LICENSE
 */

namespace Hatcher\Sonde;


class Renderer
{

    /**
     * Get the hatcher sonde javascript library as a string
     * @return string
     */
    public static function getInlineJavascriptLibrary(){
        return file_get_contents(__DIR__ . '/../dist/index.js');
    }

    /**
     * Get the hatcher sonde css library as a string
     * @return string
     */
    public static function getInlineCssLibrary(){
        return file_get_contents(__DIR__ . '/../dist/index.css');
    }

    /**
     * Get sonde setup javascript as a string
     *
     * The given javascript will require the sonde javascript library
     * that you can get with @see Renderer::getInlineJavascriptLibrary()
     *
     * @param BaseSonde $sonde
     * @return mixed
     */
    public static function getInlineJavascriptSetup(BaseSonde $sonde){
        $template = file_get_contents(__DIR__ . '/setupTemplate.js');
        return str_replace('[[DATA]]', addslashes(json_encode($sonde->collectData())), $template);
    }

    /**
     * Render the setup script in the given html
     *
     * The rendered setup needs the javascript library to work correctly
     *
     * @param $html
     * @param BaseSonde $sonde
     * @return string
     */
    public static function renderSetupInHtml($html, BaseSonde $sonde){
        $setup = self::getInlineJavascriptSetup($sonde);
        $setup = "<script>$setup</script>";
        $html = self::injectHtml($html, $setup, '</body>');
        return $html;
    }


    /**
     * Render the css, the library and the setup script in the given html
     *
     * The rendered setup needs the javascript library to work correctly
     *
     * @param $html
     * @param BaseSonde $sonde
     * @return string
     */
    public static function renderAllInHtml($html, BaseSonde $sonde){
        $js = self::getInlineJavascriptLibrary();
        $css = self::getInlineCssLibrary();
        $setup = self::getInlineJavascriptSetup($sonde);

        $jsFull = "<script>$js $setup</script>";
        $cssFull = "<style>$css</style>";

        $html = self::injectHtml($html, $jsFull, '</body>');
        $html = self::injectHtml($html, $cssFull, '</head>');
        return $html;
    }


    private static function injectHtml($html, $code, $before)
    {
        $pos = strripos($html, $before);
        if ($pos === false) {
            return $html.$code;
        }
        return substr($html, 0, $pos).$code.substr($html, $pos);
    }
}
