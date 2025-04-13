/*
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("addToCart");
  const textarea = document.getElementById("ingredientList");

  if (!button || !textarea) {
    console.error("Button or input field not found.");
    return;
  }

  button.addEventListener("click", async () => {
    const ingredients = textarea.value
      .split("\n")
      .map(line => line.trim())
      .filter(line => line);

    if (ingredients.length === 0) {
      console.log("Please enter at least one ingredient.");
      return;
    }

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    await handleNextIngredient(tab.id, ingredients, 0);
  });
});

function handleNextIngredient(tabId, ingredients, index) {
  if (index >= ingredients.length) {
    console.log("All ingredients processed!");
    return;
  }

  const searchUrl = `https://www.walmart.com/search?q=${encodeURIComponent(ingredients[index])}`;
  console.log(`🔍 Searching for: ${ingredients[index]}`);

  chrome.tabs.update(tabId, { url: searchUrl });

  const handleSearch = function updatedListener(tabIdUpdated, info) {
    if (tabIdUpdated === tabId && info.status === "complete") {
      chrome.tabs.onUpdated.removeListener(handleSearch);

      chrome.scripting.executeScript({
        target: { tabId },
        func: () => {
          const links = Array.from(document.querySelectorAll('a[href*="/ip/"]'))
            .map(a => a.href)
            .filter((href, i, self) => self.indexOf(href) === i);

          if (links.length > 0) {
            console.log("Redirecting to:", links[0]);
            window.location.href = links[0];
          } else {
            console.warn("No product found!");
          }
        }
      });

      // Now listen for product page
      const handleProduct = function productListener(tabIdProd, infoProd) {
        if (tabIdProd === tabId && infoProd.status === "complete") {
          chrome.tabs.onUpdated.removeListener(handleProduct);

          chrome.scripting.executeScript({
            target: { tabId },
            func: () => {
              const observer = new MutationObserver(() => {
                const btn = document.querySelector('[data-automation-id="atc"]');
                if (btn) {
                  console.log("Clicked Add to Cart");
                  btn.click();
                  observer.disconnect();
                }
              });

              observer.observe(document.body, { childList: true, subtree: true });

              setTimeout(() => {
                observer.disconnect();
                console.warn("Gave up waiting for Add to Cart");
              }, 10000);
            }
          });

          // Wait ~5s after product page load before doing the next one
          setTimeout(() => {
            handleNextIngredient(tabId, ingredients, index + 1);
          }, 500);
        }
      };

      chrome.tabs.onUpdated.addListener(handleProduct);
    }
  };

  chrome.tabs.onUpdated.addListener(handleSearch);
}
*/

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("addToCart");
  const textarea = document.getElementById("ingredientList");

  if (!button || !textarea) {
    console.error("Button or input field not found.");
    return;
  }

  button.addEventListener("click", async () => {
    const ingredients = textarea.value
      .split("\n")
      .map(line => line.trim())
      .filter(line => line);

    if (ingredients.length === 0) {
      console.log("Please enter at least one ingredient.");
      return;
    }

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    await handleNextIngredient(tab.id, ingredients, 0);
  });
});

function handleNextIngredient(tabId, ingredients, index) {
  if (index >= ingredients.length) {
    console.log("✅ All ingredients processed!");
    return;
  }

  const searchTerm = ingredients[index];
  const searchUrl = `https://www.walmart.com/search?q=${encodeURIComponent(searchTerm)}`;
  console.log(`🔍 Searching for: ${searchTerm}`);

  chrome.tabs.update(tabId, { url: searchUrl });

  const handleSearch = function updatedListener(tabIdUpdated, info) {
    if (tabIdUpdated === tabId && info.status === "complete") {
      chrome.tabs.onUpdated.removeListener(handleSearch);

      chrome.scripting.executeScript({
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

      // Wait for the product page to load
      const handleProduct = function productListener(tabIdProd, infoProd) {
        if (tabIdProd === tabId && infoProd.status === "complete") {
          chrome.tabs.onUpdated.removeListener(handleProduct);

          chrome.scripting.executeScript({
            target: { tabId },
            func: () => {
              return new Promise((resolve) => {
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
          }).then(() => {
            // After adding to cart, move to next ingredient
            handleNextIngredient(tabId, ingredients, index + 1);
          });
        }
      };

      chrome.tabs.onUpdated.addListener(handleProduct);
    }
  };

  chrome.tabs.onUpdated.addListener(handleSearch);
}

