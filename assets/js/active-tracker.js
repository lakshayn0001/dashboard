/**
 * ActiveTracker: Universal Persistent Selection & Highlighting Engine
 * Makes any clicked option or card "alive" / highlighted and remembers it across sessions.
 * Persists in localStorage under "antigravity_universal_highlights".
 */

(function () {
  "use strict";

  const STORAGE_KEY = "antigravity_universal_highlights";

  // Inject active highlight styles
  function injectStyles() {
    if (typeof document === "undefined" || !document.getElementById || !document.createElement || !document.head) return;
    if (document.getElementById("activetracker-styles")) return;
    const style = document.createElement("style");
    style.id = "activetracker-styles";
    style.innerHTML = `
      .is-active-selected {
        border-color: #059669 !important;
        background: linear-gradient(135deg, rgba(236, 253, 245, 0.95) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(236, 253, 245, 0.8) 100%) !important;
        box-shadow: 0 8px 24px -4px rgba(5, 150, 105, 0.18), 0 2px 6px -1px rgba(5, 150, 105, 0.1) !important;
        transition: all 0.25s ease-in-out !important;
      }
      .active-tracker-badge {
        transition: all 0.2s ease;
      }
      .active-tracker-badge:hover {
        background-color: #dc2626 !important;
        border-color: #b91c1c !important;
      }
      .active-tracker-badge:hover svg {
        display: none !important;
      }
      .active-tracker-badge:hover::after {
        content: "✕ Unselect";
      }
    `;
    document.head.appendChild(style);
  }

  function getStore() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (e) {
      console.warn("ActiveTracker: failed to read localStorage", e);
      return {};
    }
  }

  function saveStore(store) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      window.dispatchEvent(new CustomEvent("activetracker:change", { detail: store }));
    } catch (e) {
      console.warn("ActiveTracker: failed to save localStorage", e);
    }
  }

  function getPageName() {
    const p = window.location.pathname.split("/").pop() || "index.html";
    return p.split("?")[0].split("#")[0] || "index.html";
  }

  function getCardKey(card) {
    if (!card) return null;
    if (card.getAttribute("data-track-key")) return card.getAttribute("data-track-key");
    if (card.getAttribute("id")) return card.getAttribute("id");

    // Try finding heading text inside card
    const heading = card.querySelector("h2, h3, h4, .font-bold, strong");
    if (heading && heading.innerText.trim()) {
      return getPageName() + ":" + heading.innerText.trim().slice(0, 50);
    }

    // Try finding external link
    const link = card.querySelector("a[href]");
    if (link && link.getAttribute("href") && !link.getAttribute("href").startsWith("#")) {
      return getPageName() + ":" + link.getAttribute("href");
    }

    return null;
  }

  const ActiveTracker = {
    isSelected(key) {
      if (!key) return false;
      const store = getStore();
      return Boolean(store[key]);
    },

    getItem(key) {
      if (!key) return null;
      const store = getStore();
      return store[key] || null;
    },

    mark(key, element, meta = {}) {
      if (!key) return;
      const store = getStore();
      store[key] = {
        key,
        page: meta.page || getPageName(),
        title: meta.title || key,
        timestamp: Date.now(),
        ...meta
      };
      saveStore(store);
      if (element) {
        this.applyHighlight(element, true);
      } else {
        this.rehydrate();
      }
    },

    unmark(key, element) {
      if (!key) return;
      const store = getStore();
      delete store[key];
      saveStore(store);
      if (element) {
        this.applyHighlight(element, false);
      } else {
        this.rehydrate();
      }
    },

    toggle(key, element, meta = {}) {
      if (this.isSelected(key)) {
        this.unmark(key, element);
        return false;
      } else {
        this.mark(key, element, meta);
        return true;
      }
    },

    clearAll(pageScope = null) {
      const store = getStore();
      if (!pageScope) {
        saveStore({});
      } else {
        const nextStore = {};
        Object.keys(store).forEach(k => {
          if (store[k].page !== pageScope) {
            nextStore[k] = store[k];
          }
        });
        saveStore(nextStore);
      }
      this.rehydrate();
    },

    countForPage(pageName = null) {
      const p = pageName || getPageName();
      const store = getStore();
      let count = 0;
      Object.keys(store).forEach(k => {
        if (store[k].page === p) count++;
      });
      return count;
    },

    applyHighlight(card, active) {
      if (!card) return;

      const activeClasses = [
        "ring-2",
        "ring-emerald-500",
        "border-emerald-500",
        "is-active-selected",
        "shadow-md"
      ];

      if (active) {
        card.classList.add(...activeClasses);
        card.setAttribute("data-is-selected", "true");

        // Add badge if not present
        let badge = card.querySelector(".active-tracker-badge");
        if (!badge) {
          badge = document.createElement("span");
          badge.className = "active-tracker-badge px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-700 text-white border border-emerald-800 shadow-xs inline-flex items-center gap-1 animate-fadeIn flex-shrink-0 cursor-pointer";
          badge.title = "Click to unselect";
          badge.innerHTML = "<svg class=\"w-2.5 h-2.5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2.5\" d=\"M5 13l4 4L19 7\"/></svg> Selected";
          
          badge.addEventListener("click", (e) => {
            e.stopPropagation();
            const key = getCardKey(card);
            if (key) ActiveTracker.unmark(key, card);
          });

          const badgeContainer = card.querySelector(".active-badge-slot") || card.querySelector(".flex.items-start") || card.querySelector(".flex.items-center");
          if (badgeContainer) {
            badgeContainer.appendChild(badge);
          } else {
            card.insertAdjacentElement("afterbegin", badge);
          }
        }
        badge.style.display = "inline-flex";

        // Update any Open link inside the card
        const openLink = card.querySelector("a[target=\"_blank\"]");
        if (openLink && !openLink.getAttribute("data-original-text")) {
          openLink.setAttribute("data-original-text", openLink.innerHTML);
          openLink.innerHTML = "<span>Opened ✓ ↗</span>";
          openLink.classList.add("ring-1", "ring-emerald-400", "font-bold");
        }
      } else {
        card.classList.remove(...activeClasses);
        card.removeAttribute("data-is-selected");

        const badge = card.querySelector(".active-tracker-badge");
        if (badge) badge.remove();

        const openLink = card.querySelector("a[target=\"_blank\"]");
        if (openLink && openLink.getAttribute("data-original-text")) {
          openLink.innerHTML = openLink.getAttribute("data-original-text");
          openLink.removeAttribute("data-original-text");
          openLink.classList.remove("ring-1", "ring-emerald-400", "font-bold");
        }
      }
    },

    rehydrate() {
      const selectors = [
        "[data-track-key]",
        "[data-selectable-card=\"true\"]",
        ".uni-card",
        ".day-card",
        ".portal-card"
      ];
      const cards = document.querySelectorAll(selectors.join(", "));
      cards.forEach(card => {
        const key = getCardKey(card);
        if (!key) return;
        const active = this.isSelected(key);
        this.applyHighlight(card, active);
      });
    },

    init() {
      injectStyles();

      if (typeof document !== "undefined" && document.addEventListener) document.addEventListener("click", (e) => {
        // 1. Explicit toggle button
        const toggleBtn = e.target.closest("[data-track-toggle]");
        if (toggleBtn) {
          e.preventDefault();
          e.stopPropagation();
          const card = toggleBtn.closest("[data-track-key], [data-selectable-card=\"true\"], .uni-card, .day-card") || toggleBtn;
          const key = toggleBtn.getAttribute("data-track-toggle") || getCardKey(card);
          if (key) {
            ActiveTracker.toggle(key, card, { title: key });
          }
          return;
        }

        // 2. Click on Open / external link
        const link = e.target.closest("a[target=\"_blank\"]");
        if (link) {
          const card = link.closest("[data-track-key], [data-selectable-card=\"true\"], .uni-card, .day-card, .glass-droplet");
          if (card) {
            const key = getCardKey(card);
            if (key) {
              ActiveTracker.mark(key, card, { title: key, url: link.href });
            }
          }
          return;
        }

        // 3. Click directly on a selectable card (outside of inputs/links/buttons)
        const selectableCard = e.target.closest("[data-selectable-card=\"true\"], .uni-card");
        if (selectableCard && !e.target.closest("a, button, input, select, textarea")) {
          const key = getCardKey(selectableCard);
          if (key) {
            ActiveTracker.toggle(key, selectableCard, { title: key });
          }
        }
      }, true);

      if (typeof document !== "undefined" && document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => this.rehydrate());
      } else {
        this.rehydrate();
      }
    }
  };

  window.ActiveTracker = ActiveTracker;
  ActiveTracker.init();

})();
