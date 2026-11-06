/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "pwa-maskable-512x512.png",
    "revision": "6594cb524bc311d9bb92cc35850ba6a5"
  }, {
    "url": "pwa-512x512.png",
    "revision": "44963e8f39ae54d522a2b8738dc2cf38"
  }, {
    "url": "pwa-192x192.png",
    "revision": "71d4ca0831c27f2b8a9a13303d416540"
  }, {
    "url": "index.html",
    "revision": "7f6147d41011250dc3bb97f4d8ffe119"
  }, {
    "url": "icon.svg",
    "revision": "e563294f1690ce87881c910944e04c58"
  }, {
    "url": "icon.png",
    "revision": "44963e8f39ae54d522a2b8738dc2cf38"
  }, {
    "url": "icon-maskable.svg",
    "revision": "1364c777373746a3258fd392a4e5e5a5"
  }, {
    "url": "favicon-32x32.png",
    "revision": "cc074f01a90f49ebf5e6f7b15ef4b5dc"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "f36dde51ea3f36e85a63e77f3554aed9"
  }, {
    "url": "assets/workbox-window.prod.es5-BBnX5xw4.js",
    "revision": null
  }, {
    "url": "assets/index-C01JvicL.js",
    "revision": null
  }, {
    "url": "assets/index-BbCKrUwY.css",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "f36dde51ea3f36e85a63e77f3554aed9"
  }, {
    "url": "favicon-32x32.png",
    "revision": "cc074f01a90f49ebf5e6f7b15ef4b5dc"
  }, {
    "url": "icon.svg",
    "revision": "e563294f1690ce87881c910944e04c58"
  }, {
    "url": "pwa-192x192.png",
    "revision": "71d4ca0831c27f2b8a9a13303d416540"
  }, {
    "url": "pwa-512x512.png",
    "revision": "44963e8f39ae54d522a2b8738dc2cf38"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "6594cb524bc311d9bb92cc35850ba6a5"
  }, {
    "url": "manifest.webmanifest",
    "revision": "7a754cffd2a1858a77fce6f9b04ad372"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
