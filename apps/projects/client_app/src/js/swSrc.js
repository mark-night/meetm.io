import { setCacheNameDetails, skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

skipWaiting();
clientsClaim();

const prefix = 'proj',
  suffix = 'v1';
setCacheNameDetails({
  prefix,
  suffix,
  precache: 'precache',
});
const getCacheName = name => `${prefix}-${name}-${suffix}`;

/**
 * Pre-Caching
 */
precacheAndRoute(self.__WB_MANIFEST);

/**
 * Warm up some runtime caches so they are pre-cached only on first visit
 * https://developers.google.com/web/tools/workbox/guides/advanced-recipes
 */
const cacheForMeta = getCacheName('meta'); // projects meta data, site icons...
const cacheForCORS = getCacheName('cors'); // resources from other origins
self.addEventListener('install', e => {
  e.waitUntil(
    Promise.all([
      caches.open(cacheForMeta).then(cache =>
        cache.addAll([
          // Adding cache on `install` event in fact same as preaching, which
          // internally uses CacheOnly strategy. API calls should never be
          // cached here if need to be cached.
          // '/api/proj/',
          '/static/favicon.ico',
          '/static/android-chrome-192x192.png',
          '/static/android-chrome-512x512.png',
          '/static/apple-touch-icon.png',
        ])
      ),
      caches
        .open(cacheForCORS)
        .then(cache =>
          cache.addAll([
            'https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&family=Source+Code+Pro&display=swap',
            'https://fonts.gstatic.com/s/oxygen/v10/2sDfZG1Wl4LcnbuKjk0mRUe0Aw.woff2',
            'https://fonts.gstatic.com/s/oxygen/v10/2sDcZG1Wl4LcnbuCJW8zaGW5Kb8VZA.woff2',
            'https://fonts.gstatic.com/s/oxygen/v10/2sDcZG1Wl4LcnbuCNWgzaGW5Kb8VZA.woff2',
          ])
        ),
    ])
  );
});

/**
 * Runtime Caching
 */
registerRoute(
  ({ url }) =>
    url.origin === self.location.origin &&
    (url.pathname.startsWith('/api/') ||
      /\/static\/[^/]+\.(png|xml|ico|svg)$/.test(url.pathname)),
  // ! Different browsers implement differently for cache handling, for example,
  // ! with NetworkFirst, Safari reads response header's 'Cache-Control', which
  // ! should be set to 'no-cache' or other equivalent values, otherwise,
  // ! a previous browser cache will be served instead of fetching from network.
  new NetworkFirst({ cachename: cacheForMeta, networkTimeoutSeconds: 2 })
);

registerRoute(
  ({ url }) =>
    ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'].includes(
      url.origin
    ),
  new StaleWhileRevalidate({ cacheName: cacheForCORS })
);

registerRoute(
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.startsWith('/media/'),
  new CacheFirst({
    cacheName: getCacheName('media'),
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 90,
        purgeOnQuotaError: true,
      }),
    ],
  })
);
