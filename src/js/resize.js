/**
 * reserved for internal use
 *
 * bind for the resize bar
 *
 */
export default function resize(bar, sizer){
    function resize(e){
        let offset = bar.header.root.offsetHeight + sizer.offsetHeight;
        let height = window.innerHeight - e.clientY - offset;

        if(height < 10){
            height = 10;
        }

        bar.body.style.height = height;
    }


    function stopResize(){
        document.removeEventListener('mouseup', stopResize);
        document.removeEventListener('mousemove', resize);

        if(localStorage){
            localStorage.setItem('phpsonde_bodyheight', bar.body.style.height);
        }
    }

    sizer.addEventListener('mousedown', function(e){

        e.preventDefault();
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize)

    });

}
