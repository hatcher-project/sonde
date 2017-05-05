import formatDuration from './formatDuration'
import makeElement from './makeElement'

function isParentOf(parent, child)
{
    return child.start > parent.start && child.start < parent.stop;
}

export default class Timeline{

    constructor(bar){

        var self = this;

        this.bar = bar;

        this.root = makeElement('div', null, 'phpsonde-panel phpsonde-timeline-panel');

        this.header = makeElement('header', 'Show ');
        this.root.appendChild(this.header);

        this.typeSelector = document.createElement('select');
        this.header.appendChild(this.typeSelector);

        this.typeSelector.addEventListener('change', function () {
            self.filterType(this.value);
        });

        this.itemList = document.createElement('ul');
        this.root.appendChild(this.itemList);

        bar.on('showReport', function (index) {
            self.showReport(bar.reports[index])
        });

    }

    showReport(report){
        while (this.itemList.lastChild) {
            this.itemList.removeChild(this.itemList.lastChild);
        }

        var duration = report.data.duration;

        if (!duration) {
            // TODO: calculate duration from items
            throw "No valid duration for profile"
        }

        this.bar.header.addPanelTab(formatDuration(duration), this.root);

        let typeList = {};


        let parentStack = [];

        for (let i = 0; i<report.data.profiles.length; i++) {
            let profile = report.data.profiles[i];

            // Find profile type config
            let profileTypeRealName = profile.type.toLowerCase(); // Case insensitive
            let profileTypeName = this.bar.profileTypes.hasOwnProperty(profileTypeRealName) ? profileTypeRealName : 'default';
            let profileType =  this.bar.profileTypes[profileTypeName];

            // Add it to the list of filter
            if (!typeList.hasOwnProperty(profileTypeRealName)) {
                typeList[profileTypeRealName] = profileType.label || profileTypeRealName;
            }

            // Create elements
            let li = document.createElement('li');
            li.setAttribute('data-phpsonde-type', profileTypeRealName);

            let wrapper = document.createElement('div');
            li.appendChild(wrapper);
            wrapper.classList.add('phpsonde-summary');

            // leading color
            let bullet = makeElement('div', null, 'phpsonde-color-helper');
            wrapper.appendChild(bullet);
            bullet.style['background'] = profileType.color;

            // Label
            let labelContent = profileType.label || profile.type;
            if (profileType.synopsis && typeof profileType.synopsis === 'function') {
                let synopsisValue = profileType.synopsis(profile);
                if (synopsisValue) {
                    labelContent += ` <span class="phpsonde-synopsis">${synopsisValue}</span>`;
                }
            }

            // Indentation in label
            while (parentStack.length > 0) {
                if (isParentOf(parentStack[parentStack.length - 1], profile)) {
                    break;
                } else {
                    parentStack.pop();
                }
            }

            if (parentStack.length > 0) {
                for (let j = 0; j < parentStack.length; j++) {
                    labelContent = '<div class="phpsonde-indent"></div>' + labelContent;
                }
            }
            parentStack.push(profile);

            // Add label
            wrapper.appendChild(
                makeElement('div', labelContent, 'phpsonde-label')
            );

            // Duration
            let localDuration = document.createElement('div');
            localDuration.classList.add('phpsonde-duration');
            localDuration.innerHTML = formatDuration(profile.stop - profile.start);
            wrapper.appendChild(localDuration);

            // Timebar
            let timeBar = document.createElement('div');
            // Timebar wrapper
            let timeBarWrapper = document.createElement('div');
            timeBarWrapper.classList.add('phpsonde-timebar');
            timeBarWrapper.appendChild(timeBar);
            wrapper.appendChild(timeBarWrapper);

            // Timebar position
            let startPct = 100 * profile.start / duration;
            let durationPct = 100 * (profile.stop - profile.start) / duration;
            timeBar.style['margin-left'] = startPct + '%';

            if (durationPct > 0) {
                timeBar.style['width'] = durationPct + '%';
            } else {
                timeBar.style['width'] = '1px';
            }

            // Timebar color
            if (profileType.color) {
                timeBar.style['background-color'] = profileType.color;
            }


            // Unfoldable area
            let unfoldable = document.createElement('div');
            unfoldable.classList.add('phpsonde-details');
            li.appendChild(unfoldable);

            // Data Details
            if (profile.data && Object.keys(profile.data).length > 0) {
                let dataDetail = makeElement('div', null, 'phpsonde-data-details');
                dataDetail.appendChild(makeElement('h6', 'Details'));
                unfoldable.appendChild(dataDetail);

                let table = makeElement('table');
                dataDetail.appendChild(table);
                for (let i in profile.data) {
                    let row = makeElement('tr');
                    table.appendChild(row);

                    row.appendChild(makeElement('td', i));
                    row.appendChild(makeElement('td', profile.data[i]));
                }
            }

            // Stack trace
            let stackTrace = document.createElement('div');
            stackTrace.classList.add('phpsonde-stacktrace');
            let stackTracePre = document.createElement('pre');
            stackTracePre.innerHTML = profile.trace;
            stackTrace.appendChild(makeElement('h6', 'Stack Trace'));
            stackTrace.appendChild(stackTracePre);
            unfoldable.appendChild(stackTrace);




            // Unfold on click
            wrapper.addEventListener('click', function () {
                unfoldable.classList.toggle('phpsonde-open');
            });


            this.itemList.appendChild(li);
        }

        while (this.typeSelector.options.length) {
            this.typeSelector.options.remove(0);
        }

        let option = new Option('All', -1);
        this.typeSelector.options[0] = option;

        for (var i in typeList) {
            let option = new Option(typeList[i], i);
            this.typeSelector.options[this.typeSelector.options.length] = option;
        }

    }

    /**
     * Show only items of given type. This in case insensitive.
     * @param name
     */
    filterType(name){

        if (name == -1) {
            for (let i = 0; i < this.itemList.children.length; i++) {
                this.itemList.children[i].classList.remove('phpsonde-hidden');
            }
        } else {
            for (let i = 0; i < this.itemList.children.length; i++) {
                let element = this.itemList.children[i];
                if (element.getAttribute('data-phpsonde-type').toLocaleLowerCase() === name) {
                    this.itemList.children[i].classList.remove('phpsonde-hidden');
                } else {
                    this.itemList.children[i].classList.add('phpsonde-hidden');
                }
            }
        }

    }

}
