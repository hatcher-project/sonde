let xhrHandlers = null;

export default function onXhrCompletes(handler)
{
    if (null === xhrHandlers) {
        xhrHandlers = [];
        let defaultXhr = XMLHttpRequest.prototype.open;

        XMLHttpRequest.prototype.open = function () {
            let self = this;
            this.addEventListener("readystatechange", function () {
                if (self.readyState == XMLHttpRequest.DONE) {
                    for (var i = 0; i < xhrHandlers.length; i++) {
                        xhrHandlers[i](self);
                    }
                }
            }, false);
            defaultXhr.apply(this, arguments);
        }
    }

    xhrHandlers.push(handler);
}
