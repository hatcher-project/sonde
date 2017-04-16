document.addEventListener('DOMContentLoaded', function () {
    if (window.HatcherSonde) {
        var bar = new window.HatcherSonde.Bar();

        [[PLUGINS]]


        var rawData = '[[DATA]]';
        var data = JSON.parse(rawData);
        bar.addReport('Request', data);

        bar.listenForXhrReports();
    } else {
        console.error('Unable to find the HatcherSonde library. Make sure you included the javascript library');
    }
});
