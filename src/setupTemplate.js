document.addEventListener('DOMContentLoaded', function(){
    if(window.HatcherSonde){
        var rawData = '[[DATA]]';

        var bar = new window.HatcherSonde.Bar();
        var data = JSON.parse(rawData);
        bar.addReport('Request', data);
        bar.open();

        bar.listenForXhrReports();

    } else {
        console.error('Unable to find the HatcherSonde library. Make sure you included the javascript library');
    }
});
