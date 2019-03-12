/* globals findInAllFrames:false */
// Outbound reddit links have triggers onMouseDown, onMouseLeave and onTouchStart
// that change the value of the href attribute to a tracking link and back to normal.
// All external links have these events and start with http:// or https://
let reddit_outbound_link = "a[href^='http']"

// Remove excessive event listeners from link a
function cleanLink(a) {
  // block event listeners on the link
  a.addEventListener("click", function (e) { e.stopImmediatePropagation(); }, true);
  a.addEventListener("mousedown", function (e) { e.stopImmediatePropagation(); }, true);
}

//TODO race condition; fix waiting on https://crbug.com/478183
chrome.runtime.sendMessage({checkEnabled: true},
  function (enabled) {
    if (!enabled) {
      return;
    }

    // since the page is rendered all at once, no need to set up a
    // mutationObserver or setInterval
    findInAllFrames(reddit_outbound_link).forEach((link) => {
      cleanLink(link);
    });

  }
);
