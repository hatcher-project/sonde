export default function makeElement(tag, content, classList, attr)
{

    let e = document.createElement(tag);

    if (content) {
        e.innerHTML = content;
    }

    if (classList) {
        let classes = classList.split(' ');

        for (let i = 0; i<classes.length; i++) {
            e.classList.add(classes[i]);
        }
    }

    if (attr) {
        for (let i in attr) {
            e.setAttribute(i, attr[i]);
        }
    }

    return e;

}
