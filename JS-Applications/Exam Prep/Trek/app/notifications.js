
export function successNotification(message){


    let notificationRef = document.querySelector('#infoBox');
    notificationRef.innerHTML = `<div id="successBox" class="alert alert-success" role="alert">${message}</div>`


    // setTimeout(() => {
    //     notificationContainer.remove();
    // }, 4000);

}

export function loadingNotification(){

}

export function errorNotification(message){

}