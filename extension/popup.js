document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("addToCart");
    const textarea = document.getElementById("ingredientList");
  
    if (!button || !textarea) {
      console.error("Button or input field not found.");
      return;
    }
  
    button.addEventListener("click", () => {
      const searchTerm = textarea.value.trim();
      if (!searchTerm) {
        console.log("Please enter a search term.");
        return;
      }

      const search = `https://www.walmart.com/search?q=${encodeURIComponent(searchTerm)}`;
      
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        chrome.tabs.update(tab.id, { url: search });
      });
      /*
      console.log("Searching for:", searchTerm);
  
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: searchOnPage,
          args: [searchTerm],
        
        });
        */
    });
    function searchOnPage(searchTerm) {
      const bodyText = document.body.innerText;
      const index = bodyText.toLowerCase().indexOf(searchTerm.toLowerCase());
  
      if (index !== -1) {
        alert(`Found "${searchTerm}" on this page!`);
      } else {
        alert(`"${searchTerm}" not found on this page.`);
      }
    }
  });
  