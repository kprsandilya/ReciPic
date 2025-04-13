document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("addToCart");
  const textarea = document.getElementById("ingredientList");
 
 
  if (!button || !textarea) {
    console.error("Button or input field not found.");
    return;
  }
 
 
  button.addEventListener("click", async () => {
    let ingredients = [];
     const manualIngredients = textarea.value
      .split("\n")
      .map(line => line.trim())
      .filter(line => line);
     try {
      const response = await fetch(chrome.runtime.getURL("data.json"));
      const jsonData = await response.json();
       const jsonIngredients = jsonData["unowned ingredients"] || [];
       ingredients = [...manualIngredients, ...jsonIngredients];
    } catch (err) {
      console.warn("⚠️ No JSON file or unable to parse it.", err);
      ingredients = manualIngredients;
    }
     if (ingredients.length === 0) {
      console.log("Please enter at least one ingredient.");
      return;
    }
     const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await handleNextIngredient(tab.id, ingredients, 0);
  });
  });
 
 
 async function handleNextIngredient(tabId, ingredients, index) {
  if (index >= ingredients.length) {
    console.log("✅ All ingredients processed!");
    return;
  }
 
 
  const searchTerm = ingredients[index];
  const searchUrl = `https://www.walmart.com/search?q=${encodeURIComponent(searchTerm)}`;
  console.log(`🔍 Searching for: ${searchTerm}`);
 
 
  chrome.tabs.update(tabId, { url: searchUrl });
 
 
  const waitForPageLoad = () =>
    new Promise(resolve => {
      const listener = (updatedTabId, info) => {
        if (updatedTabId === tabId && info.status === "complete") {
          chrome.tabs.onUpdated.removeListener(listener);
          resolve();
        }
      };
      chrome.tabs.onUpdated.addListener(listener);
    });
 
 
  await waitForPageLoad();
 
 
  await chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      const links = Array.from(document.querySelectorAll('a[href*="/ip/"]'))
        .map(a => a.href)
        .filter((href, i, self) => self.indexOf(href) === i);
 
 
      if (links.length > 0) {
        console.log("➡️ Redirecting to:", links[0]);
        window.location.href = links[0];
      } else {
        console.warn("No product found!");
      }
    }
  });
 
 
  await waitForPageLoad();
 
 
  await chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      return new Promise(resolve => {
        const observer = new MutationObserver(() => {
          const btn = document.querySelector('[data-automation-id="atc"]');
          if (btn) {
            console.log("🛒 Clicking Add to Cart");
            btn.click();
            observer.disconnect();
            resolve("clicked");
          }
        });
 
 
        observer.observe(document.body, { childList: true, subtree: true });
 
 
        setTimeout(() => {
          observer.disconnect();
          console.warn("⏱️ Gave up waiting for Add to Cart");
          resolve("timeout");
        }, 10000);
      });
    }
  });
 
 
   setTimeout(() => {
    handleNextIngredient(tabId, ingredients, index + 1);
  }, 3000);
 }
 
 
 