document.getElementById("getTokenBtn").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { method: "getToken" },
      function (response) {
        if (response && response.token) {
          navigator.clipboard
            .writeText(response.token)
            .then(() => {
              console.log("Token copied to clipboard!");
            })
            .catch((err) => {
              console.error("Failed to copy token: ", err);
            });
        } else {
          console.log("No token found");
        }
      }
    );
  });
});
