// Service Worker - Valle Uco Colectivos

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(clients.claim());
});

self.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'SCHEDULE_ALARM') {
    const title = e.data.title;
    const body = e.data.body;
    const delay = e.data.delay;
    const tag = e.data.tag;

    setTimeout(function() {
      self.registration.showNotification(title, {
        body: body,
        icon: 'https://raw.githubusercontent.com/googlesamples/web-push/master/icon.png',
        tag: tag,
        requireInteraction: true,
        vibrate: [300, 100, 300, 100, 300]
      });
    }, delay);
  }
});

self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(clientList) {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('./');
    })
  );
});
