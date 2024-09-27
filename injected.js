document.getElementById("getTokenBtn").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { method: "getToken" },
      function (response) {
        if (response?.token) {
          let token = response.token;
          const prependBearer = document.getElementById("bearerToggle").checked;
          if (prependBearer) {
            token = `Bearer ${token}`;
          }
          navigator.clipboard
            .writeText(token)
            .then(() => {
              toast.className = "show";
              setTimeout(() => {
                toast.className = toast.className.replace("show", "");
              }, 3000);
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
