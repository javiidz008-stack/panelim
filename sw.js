// Panel — Service Worker (Workbox ilə offline dəstəyi)
// Bu fayl panel_with_chat.html ilə EYNİ qovluqda olmalı və sayt http(s)
// (və ya localhost) üzərindən açılmalıdır — file:// ilə açılanda
// Service Worker qeydiyyata düşməyəcək (brauzer məhdudiyyəti).

importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.1.0/workbox-sw.js');

const CACHE_VERSION = 'panel-v1';

if (workbox) {
  workbox.core.setCacheNameDetails({ prefix: 'panel', suffix: CACHE_VERSION });

  // Əsas HTML səhifəsi — şəbəkə yoxdursa keşdən (Network First: yeni versiyanı
  // önə çəkir, offline olanda keşə düşür).
  workbox.routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    new workbox.strategies.NetworkFirst({
      cacheName: 'panel-pages',
      plugins: [ new workbox.expiration.ExpirationPlugin({ maxEntries: 5 }) ]
    })
  );

  // CDN-dən gələn kitabxanalar (sweetalert2, jspdf, mathjs, tesseract.js,
  // technicalindicators) — bir dəfə yüklənəndən sonra uzun müddət keşdə saxlanılır.
  workbox.routing.registerRoute(
    ({ url }) => ['cdnjs.cloudflare.com','cdn.jsdelivr.net','storage.googleapis.com'].includes(url.hostname),
    new workbox.strategies.CacheFirst({
      cacheName: 'panel-cdn-libs',
      plugins: [
        new workbox.expiration.ExpirationPlugin({ maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 30 }),
        new workbox.cacheableResponse.CacheableResponsePlugin({ statuses: [0, 200] })
      ]
    })
  );

  // Statik fayllar (manifest, ikonlar)
  workbox.routing.registerRoute(
    ({ request }) => ['style','image','font'].includes(request.destination),
    new workbox.strategies.StaleWhileRevalidate({ cacheName: 'panel-static' })
  );

  self.addEventListener('install', () => self.skipWaiting());
  self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
} else {
  console.warn('Workbox yüklənmədi — service worker keşləmə olmadan işləyir.');
}
