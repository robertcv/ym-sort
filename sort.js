browser.browserAction.onClicked.addListener((tab) => {
    browser.tabs.executeScript(tab.id, {
      file: "content.js"
    });
  });


  function listenForClicks() {
    document.addEventListener("click", (e) => {
        function sortByMostPlayed(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "sortByMostPlayed"
            });
        }
        if (e.target.classList.contains("mostPlayed")) {
            browser.tabs.query({ active: true, currentWindow: true })
                .then(sortByMostPlayed);
        }
    });
}

browser.tabs.executeScript({ file: "content.js" })
    .then(listenForClicks);