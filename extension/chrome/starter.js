chrome.browserAction.onClicked.addListener(function(activeTab) {
  chrome.tabs.executeScript(activeTab.id, {
    "file":"myscript.js"
  });
  chrome.tabs.executeScript(activeTab.id, {
    "file":"bundle.js"
  });
});
