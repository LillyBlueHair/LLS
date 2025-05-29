// ==UserScript==
// @name BC Marking
// @namespace https://www.bondageprojects.com/
// @version 1.0.0
// @description Lilly's Script Collection
// @author LillyBlueHair
// @downloadURL https://lillybluehair.github.io/LLS/loader.user.js
// @updateURL https://lillybluehair.github.io/LLS/loader.user.js
// @match https://*.bondageprojects.elementfx.com/R*/*
// @match https://*.bondage-europe.com/R*/*
// @match https://*.bondageprojects.com/R*/*
// @grant none
// @run-at document-end
// ==/UserScript==

(function () {
    "use strict";
    const src = `https://lillybluehair.github.io/LLS/bundle.jsv=${Date.now()}`;
    if (typeof LLS_loaded === "undefined") {
        console.log("loading LLS");
        const script = document.createElement("script");
        script.src = src;
        script.type = "text/javascript";
        script.crossOrigin = "anonymous";
        script.id = "Markings";
        document.head.appendChild(script);
    }
})();
