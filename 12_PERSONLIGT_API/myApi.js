// Dine genbrugelige API-funktioner kommer her.


//Demands an HTML element with id="toast"
function showToast(txt, timeout=2000, type="notify"){
    var toast = select('#toast')
    toast.html(txt)
    toast.addClass(type)
    toast.addClass('toastShow')
    setTimeout(()=>{
        toast.removeClass(type)
        toast.removeClass('toastShow')
    }, timeout)
}

