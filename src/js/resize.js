/**
 * reserved for internal use
 *
 * bind for the resize bar
 *
 */
export default function resize(bar, sizer)
{
    function resize(e)
    {
        let offset = bar.header.root.offsetHeight + sizer.offsetHeight;
        let height = window.innerHeight - e.clientY - offset;
        bar.setHeight(height);
    }


    function stopResize()
    {
        document.body.classList.remove('phpsonde-resizing');
        document.removeEventListener('mouseup', stopResize);
        document.removeEventListener('mousemove', resize);
    }

    sizer.addEventListener('mousedown', function (e) {

        e.preventDefault();
        document.body.classList.add('phpsonde-resizing');
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize)

    });

}
