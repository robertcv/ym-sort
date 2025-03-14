(function() {
    function convertToFloat(numberString) {
        const lowerCased = numberString.toLowerCase();
        let multiplier = 1;
        
        if (lowerCased.endsWith('k')) {
            multiplier = 1e3; // thousand
        } else if (lowerCased.endsWith('m')) {
            multiplier = 1e6; // million
        } else if (lowerCased.endsWith('b')) {
            multiplier = 1e9; // billion
        }
    
        // Remove the last character if it is k, m, or b
        const numericPart = lowerCased.replace(/k|m|b/i, '');
    
        // Parse the numeric part and multiply by the correct factor
        const floatNumber = parseFloat(numericPart) * multiplier;
        return floatNumber;
    }
    
    function extractPlays(row) {
        const innerText = row.getElementsByClassName("secondary-flex-columns")[0].children[1].innerText
        const numberString = innerText.split(' ')[0];
        return convertToFloat(numberString)
    }
    
    function sortPlaylist() {
        const tableDiv = document.querySelector('#contents.ytmusic-playlist-shelf-renderer');
        
        const elementsArray = Array.from(tableDiv.children);
        elementsArray.sort((a, b) => {
            const numA = extractPlays(a);
            const numB = extractPlays(b);
            if (numA < numB) {
                return 1;
                } else if (numA > numB) {
                return -1;
                } else {
                return 0;
                }
        });
    
        // Clear the original container
        tableDiv.innerHTML = '';
        // Append the sorted elements back to the container
        elementsArray.forEach(element => {
            tableDiv.appendChild(element);
        });
    }

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "sortByMostPlayed") {
            sortPlaylist();
        }
    });

})();