
chrome.runtime.onMessage.addListener( function(request) {
    if (request.todo == "showPageAction") {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.pageAction.show(tabs[0].id);
        });
    }
});


chrome.pageAction.onClicked.addListener( function() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    },  function (tabs)  {
        chrome.tabs.sendMessage(tabs[0].id, {
            todo: "toggle"
        });
    })
});