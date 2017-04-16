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
    public static function getInlineJavascriptLibrary()
    {
        return file_get_contents(__DIR__ . '/../dist/index.js');
    }

    /**
     * Get the hatcher sonde css library as a string
     * @return string
     */
    public static function getInlineCssLibrary()
    {
        return file_get_contents(__DIR__ . '/../dist/index.css');
    }

    /**
     * Get sonde setup javascript as a string
     *
     * The given javascript will require the sonde javascript library
     * that you can get with @see Renderer::getInlineJavascriptLibrary()
     *
     * @param Sonde $sonde
     * @return mixed
     */
    public static function getInlineJavascriptSetup(Sonde $sonde)
    {
        $template = file_get_contents(__DIR__ . '/setupTemplate.js');
        $template = str_replace('[[DATA]]', addslashes(json_encode($sonde->collectData())), $template);

        $pluginContent = '';
        foreach ($sonde->getJsPluginFiles() as $file) {
            $pluginContent .= file_get_contents($file) . ';';
        }
        $template = str_replace('[[PLUGINS]]', $pluginContent, $template);

        return $template;
    }

    /**
     * Render the setup script in the given html
     *
     * The rendered setup needs the javascript library to work correctly
     *
     * @param $html
     * @param Sonde $sonde
     * @return string
     */
    public static function renderSetupInHtml($html, Sonde $sonde)
    {
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
     * @param Sonde $sonde
     * @return string
     */
    public static function renderAllInHtml($html, Sonde $sonde)
    {
        $js = self::getInlineJavascriptLibrary();
        $css = self::getInlineCssLibrary();
        $setup = self::getInlineJavascriptSetup($sonde);

        $jsFull = "<script>$js $setup</script>";
        $cssFull = "<style>$css</style>";

        $html = self::injectHtml($html, $jsFull, '</body>');
        $html = self::injectHtml($html, $cssFull, '</head>');
        return $html;
    }

    /**
     * Adds an external css file to the given html with a <link> tag
     * @param $path
     * @param $html
     * @return string
     */
    public static function addExternalCss($path, $html)
    {
        return self::injectHtml($html, '<link rel="stylesheet" type="text/css" href="' . $path . '">', '</head>');
    }

    /**
     * Adds an external js file to the given html with a <script src='...'> tag
     * @param $path
     * @param $html
     * @return string
     */
    public static function addExternalJs($path, $html)
    {
        return self::injectHtml($html, '<script type="text/javascript" src="' . $path . '"></script>', '</body>');
    }

    /**
     * Get headers to be added to the http response
     * @param Sonde $sonde
     * @param int $maxHeaderLength
     * @return array
     */
    public static function renderAsResponseHeaders(Sonde $sonde, $maxHeaderLength = 4090)
    {
        $headers = [];
        $headerName = 'phpsondereport';

        $chunks = [];
        $data = json_encode($sonde->collectData());
        $data = base64_encode($data);
        while (strlen($data) > $maxHeaderLength) {
            $chunks[] = substr($data, 0, $maxHeaderLength);
            $data = substr($data, $maxHeaderLength);
        }
        $chunks[] = $data;

        $headers[$headerName] = $chunks[0];

        if (count($chunks) > 1) {
            for ($i = 1; $i < count($chunks); $i++) {
                $headers[$headerName . '-' . $i] = $chunks[$i];
            }
        }

        return $headers;
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
