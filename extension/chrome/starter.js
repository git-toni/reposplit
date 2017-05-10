var toggled = false

chrome.browserAction.onClicked.addListener(function(activeTab) {
  if(!toggled){
    chrome.tabs.executeScript(activeTab.id, {
      "file":"myscript.js"
    });
    chrome.tabs.executeScript(activeTab.id, {
      "file":"bundle.js"
    });
  }
  else if(!!toggled){
    chrome.tabs.reload(activeTab.id)
  }
  toggled = !toggled
});
