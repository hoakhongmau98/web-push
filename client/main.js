const publicVapidKey = 'BHvl8Euzaf4kLMeY94dQrmXUmMOdwAD--R99av3kamiTd1QbihjoCmKcfMNPA7TpRwZ9FUDFHMYTQLPmLKnENdI';

// const triggerPush = document.querySelector('.trigger-push');
 
document.addEventListener('DOMContentLoaded', function onLoad() {
  var serviceWorkerRegistration;

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  async function notifyMe() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
  
    // Let's check whether notification permissions have already been granted
    // else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      // var notification = new Notification("Hi there!");
    // }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("Hi there!");
        }
      });
    }
    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
    if (navigator.serviceWorker) {
        var register = await navigator.serviceWorker.register('sw.js').then(async function (registration) {
            serviceWorkerRegistration = registration;
            const subscription = await serviceWorkerRegistration.pushManager.subscribe({
              userVisibleOnly: true,
              // applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
              applicationServerKey: publicVapidKey,
            });
            console.log(subscription.endpoint);
            // console.log(subscription.getKey());
            console.log(subscription.toJSON());
        });
    }
    
  }
  notifyMe();

  const titleElement = "title";
  const messageElement = "none";
  const buttonElement = document.querySelector('.btn');

  titleElement.value = 'Example Notification';
  // messageElement.value = 'This is some notification text.';
  buttonElement.addEventListener('click', function onClick() {
    // show notice when clicked
      webNotification.showNotification(titleElement.value, {
          serviceWorkerRegistration: serviceWorkerRegistration,
          body: messageElement,
          autoClose: 5000 //auto close the notification after 4 seconds (you can manually close it via hide function)
      }
    );
  });
});
