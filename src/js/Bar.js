import Header from './Header'
import EventDispatcher from '../../node_modules/@azasypkin/event-dispatcher/bin/event-dispatcher.es2016';
import Timeline from './Timeline'
import Messages from './Messages'
import onXhrCompletes from './onXhrCompletes'
import makeElement from './makeElement'
import resize from './resize'

class Bar {

    constructor(){

        this.root = document.createElement('div');
        this.root.classList.add('phpsonde');

        // Sizer
        this.sizer = makeElement('div', null, 'phpsonde-sizer');
        this.root.appendChild(this.sizer);

        // Header
        this.header = new Header(this);
        this.root.appendChild(this.header.root);

        // Body
        this.body = document.createElement('div');
        this.body.classList.add('phpsonde-body');
        this.root.appendChild(this.body);

        // Timeline
        this.timeline = new Timeline(this);
        this.body.appendChild(this.timeline.root);

        // Messages
        this.messages = new Messages(this);
        this.body.appendChild(this.messages.root);

        // Add to dom
        document.body.appendChild(this.root);

        // Default values
        this.reports = [];
        this.profileTypes = {
            'default': {
                color: '#AAA'
            },

            'database': {
                color: '#ECB400'
            },

            'view': {
                color: '#6DC520'
            }
        };

        // Bind sizebar
        resize(this, this.sizer);

        // Initialize state
        if(localStorage){
            let bodyheight = localStorage.getItem('phpsonde_bodyheight');
            if(null !== bodyheight){
                this.setHeight(bodyheight, false);
            }

            let opened =  localStorage.getItem('phpsonde_baropened');
            if(opened === 'true' || opened === true){
                this.open();
            }
        }

        let self = this;

        // If window is too small, we change the size
        window.addEventListener('resize', function(){
            if(self.root.offsetHeight > window.innerHeight - 50){
                self.setHeight(window.innerHeight, false);
            }
        });

    }

    setHeight(height, store){

        store = store === undefined ? true : store === true;

        height = parseInt(height, 10) || 300;

        if(height < 0){
            height = 10;
        } else if (height > window.innerHeight - 50) {
            height = window.innerHeight - 50;
        }

        this.body.style.height = height + 'px';

        if(store && localStorage){
            localStorage.setItem('phpsonde_bodyheight', height);
        }
    }

    open(){
        this.root.classList.add('phpsonde-open');
        if(localStorage){
            localStorage.setItem('phpsonde_baropened', true);
        }
    }

    close(){
        this.root.classList.remove('phpsonde-open');
        if(localStorage){
            localStorage.setItem('phpsonde_baropened', false);
        }
    }

    toggle(){
        this.root.classList.toggle('phpsonde-open');
        if(localStorage){
            localStorage.setItem('phpsonde_baropened', this.root.classList.contains('phpsonde-open'));
        }
    }

    addProfileType(name, data){
        this.profileTypes[name.toLocaleLowerCase()] = data;
    }


    addReport(label, data){

        let report = {
            label,
            data
        };

        this.reports.push(report);

        this.emit('reportAdded', report);

        if (this.reports.length === 1) {
            this.showReport(0);
        }

    }

    showReport(index){
        this.emit('showReport', index);
    }

    listenForXhrReports(){
        var self = this;
        onXhrCompletes(function (xhr) {

            let headerName = 'phpsondereport';

            let report = xhr.getResponseHeader(headerName);

            if (report) {
                let i = 1;
                let chunk;
                while (chunk = xhr.getResponseHeader(headerName + '-' + i)) {
                    report += chunk;
                    i++;
                }

                try {
                    report = atob(report);
                    report = JSON.parse(report);
                } catch (e) {
                    console.error('Sonde was unable to decode data fro ajax request, please see the error below'
                        + ' and report it on https://github.com/hatcher-project/sonde/issues'
                        + ' with as much details as possible, including your browser version');
                    console.error(e);
                }

                if (report.reportBundle) {
                    for (let i = 0; i < report.reportBundle.length; i++) {
                        self.addReport('xhr', report.reportBundle[i]);
                    }
                } else {
                    self.addReport('XHR', report);
                }
            }


        });
    }

}

EventDispatcher.mixin(Bar.prototype);


export default Bar;
