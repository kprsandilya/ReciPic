function tryAddFirstProductToCart() {
    const url = window.location.href;
  
    // On search page
    if (url.includes("/search")) {
      const links = Array.from(document.querySelectorAll('a[href*="/ip/"]'))
        .map(a => a.href)
        .filter((href, index, self) => self.indexOf(href) === index);
  
      if (links.length > 0) {
        console.log("➡️ Redirecting to product:", links[0]);
        window.location.href = links[0];
      }
      return;
    }
  
    // On product page
    if (url.includes("/ip/")) {
      console.log("🔍 Waiting for Add to Cart button...");
      const observer = new MutationObserver(() => {
        const btn = document.querySelector('[data-automation-id="atc"]');
        if (btn) {
          console.log("🛒 Clicking Add to Cart");
          btn.click();
          observer.disconnect();
        }
      });
  
      observer.observe(document.body, { childList: true, subtree: true });
  
      setTimeout(() => {
        observer.disconnect();
        console.warn("Timeout: Add to Cart button not found.");
      }, 10000);
    }
  }
  
  document.addEventListener("DOMContentLoaded", tryAddFirstProductToCart);
  