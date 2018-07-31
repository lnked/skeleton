self.addEventListener('notificationclick', function(event) {
    //https://github.com/firebase/quickstart-js/issues/102
    var notification = event.notification;
    var action = event.action;

    console.log(notification);

    if (action === 'confirm') {
        console.log('Confirm was chosen');
        notification.close();
    } else {
        console.log(action);
    }
});

importScripts('https://www.gstatic.com/firebasejs/4.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.10.1/firebase-messaging.js');

var config = {
    messagingSenderId: "227082787592" //227082787592,1060200135932
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
let firebasePayload = {};
messaging.setBackgroundMessageHandler(function(payload) {
    const options = {
        body: payload.data.status
    };
    firebasePayload = payload;
    return self.registration.showNotification('MESSAGE_TITLE', options);
});

self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
});


self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ....', event);
});

self.addEventListener('notificationclose', function(event) {
    console.log('notificationclose');
});

self.addEventListener('push', function(event) {

    var data = {
        title: 'AliExpress',
        body: 'Something new happened!',
        icon: 'https://m.aliexpress.com/img/android-chrome-192x192.png',
        click_action: 'https://m.aliexpress.com'
    };
    var options = {};
    if (event.data) {
        options = JSON.parse(event.data.text());
        data = options.notification;
    }
    event.waitUntil(
        self.registration.showNotification(data.title, data)
    );
});
