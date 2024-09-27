document.addEventListener("DOMContentLoaded", function () {
  const bearerCheckbox = document.getElementById("bearerToggle");
  const toast = document.getElementById("toast");

  chrome.storage.local.get("enabled", function (result) {
    if (result.enabled != null) {
      bearerCheckbox.checked = result.enabled;
    }
  });

  document.getElementById("getTokenBtn").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { method: "getToken" },
        function (response) {
          if (response?.token) {
            let token = response.token;
            let prependBearer = false;

            chrome.storage.local.get("enabled", function (result) {
              if (result.enabled === true) {
                prependBearer = true;
              }

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
            });
          } else {
            console.log("No token found");
          }
        }
      );
    });
  });

  bearerCheckbox.addEventListener("click", function () {
    chrome.storage.local.set({ enabled: bearerCheckbox.checked }, function () {
      console.log("Bearer checkbox state updated:", bearerCheckbox.checked);
    });
  });
});
