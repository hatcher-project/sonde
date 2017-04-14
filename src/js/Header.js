import formatDuration from './formatDuration'
import makeElement from './makeElement'

export default class Header{

    constructor(bar){
        var self = this;

        this.bar = bar;
        this.root = document.createElement('header');

        var logo = document.createElement('div');
        this.root.appendChild(logo);
        logo.innerHTML = 'logo';

        this.reportSelect = document.createElement('select');
        var selectWraper = document.createElement('div');
        selectWraper.classList.add('phpsonde-request-select');
        selectWraper.appendChild(this.reportSelect);
        this.root.appendChild(selectWraper);



        this.reportSelect.addEventListener('change', function () {
            bar.showReport(this.value);
            // Report refresh is handled by bar.on('showReport', ...) see below
        });

        this.itemList = document.createElement('ul');
        this.root.appendChild(this.itemList);


        logo.addEventListener('click', function () {
            self.bar.toggle();
        });

        bar.on('reportAdded', function (report) {
            let option = new Option(report.label, bar.reports.length - 1);
            self.reportSelect.options[self.reportSelect.options.length] = option;
        });

        bar.on('showReport', function (index) {
            self.showReport(bar.reports[index])
        });
    }

    showReport(report){
        while (this.itemList.lastChild) {
            this.itemList.removeChild(this.itemList.lastChild);
        }
    }


    addPanelTab(label, panel){
        let tab = makeElement('li', label, 'phpsonde-panel-tab');
        this.itemList.appendChild(tab);

        var self = this;

        if (this.itemList.children.length === 1) {
            tab.classList.add('phpsonde-open');
            panel.classList.add('phpsonde-open');
        }

        tab.addEventListener('click', function () {
            var opened = self.bar.root.querySelectorAll('.phpsonde-panel-tab.phpsonde-open, .phpsonde-panel.phpsonde-open');

            for (let i = 0; i < opened.length; i++) {
                opened[i].classList.remove('phpsonde-open');
            }

            tab.classList.add('phpsonde-open');
            panel.classList.add('phpsonde-open');


            self.bar.open();
        });
    }


}
