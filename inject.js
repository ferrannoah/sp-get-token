chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getToken") {
        const token = localStorage.getItem('sp_access_token');
        sendResponse({token: token});
    }
});