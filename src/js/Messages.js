import makeElement from './makeElement'

export default class Messages{

    constructor(bar){

        var self = this;

        this.bar = bar;

        this.root = makeElement('div', '', 'phpsonde-panel phpsonde-messages-panel');
        this.itemList = makeElement('ul');

        this.root.appendChild(this.itemList);

        bar.on('showReport', function (index) {
            self.showReport(bar.reports[index])
        });

    }

    showReport(report){
        while (this.itemList.lastChild) {
            this.itemList.removeChild(this.itemList.lastChild);
        }


        var messages = report.data.messages;


        if (!messages) {
            // TODO: calculate duration from items
            return;
        }

        let bubbleCount = makeElement('span', messages.length, 'phpsonde-bubble');
        this.bar.header.addPanelTab('messages ' + bubbleCount.outerHTML, this.root);

        for (let i = 0; i<messages.length; i++) {
            let message = messages[i];

            let li = makeElement('li', '&rsaquo; ' +  message.text, 'bar');
            this.itemList.appendChild(li);
        }

    }

}
