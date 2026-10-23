(function () {
  "use strict";

  var NAVBAR_ATTRIBUTE = "data-ds-navbar";
  var TOGGLE_SELECTOR = ".ds-navbar__toggle";
  var STATE_ATTRIBUTE = "data-state";
  var STATE_OPEN = "open";
  var STATE_CLOSED = "closed";
  var INITIALIZED_MARKER = "data-ds-initialized";

  var REVEAL_ATTRIBUTE = "data-ds-reveal";
  var REVEAL_STATE_ATTRIBUTE = "data-reveal-state";
  var TILT_ATTRIBUTE = "data-ds-tilt";
  var MAX_TILT_DEG = 6;

  function prefersReducedMotion() {
    if (typeof matchMedia !== "function") return false;
    try {
      return matchMedia("(prefers-reduced-motion: reduce)").matches === true;
    } catch (mediaError) {
      return false;
    }
  }

  function cssEscape(value) {
    if (typeof CSS !== "undefined" && CSS && typeof CSS.escape === "function") {
      return CSS.escape(value);
    }
    return String(value).replace(/[^a-zA-Z0-9_-]/g, function (ch) {
      return "\\" + ch;
    });
  }

  function resolveParts(navbar) {
    var toggle = navbar.querySelector(TOGGLE_SELECTOR);
    if (!toggle) return null;

    var menuId = toggle.getAttribute("aria-controls");
    if (!menuId) return null;

    var menu = navbar.querySelector("#" + cssEscape(menuId));
    if (!menu && navbar.ownerDocument) {
      menu = navbar.ownerDocument.getElementById(menuId);
    }
    if (!menu) return null;

    return { toggle: toggle, menu: menu };
  }

  function setState(navbar, toggle, open) {
    navbar.setAttribute(STATE_ATTRIBUTE, open ? STATE_OPEN : STATE_CLOSED);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function isOpen(navbar) {
    return navbar.getAttribute(STATE_ATTRIBUTE) === STATE_OPEN;
  }

  function initNavbar(navbar) {
    var parts = resolveParts(navbar);
    if (!parts) return;
    var toggle = parts.toggle;
    var menu = parts.menu;

    setState(navbar, toggle, false);

    toggle.addEventListener("click", function () {
      setState(navbar, toggle, !isOpen(navbar));
    });

    var onKeydown = function (event) {
      if (event.key === "Escape" && isOpen(navbar)) {
        setState(navbar, toggle, false);
        toggle.focus();
      }
    };
    toggle.addEventListener("keydown", onKeydown);
    menu.addEventListener("keydown", onKeydown);
  }

  function revealShow(el) {
    el.setAttribute(REVEAL_STATE_ATTRIBUTE, "visible");
  }

  function initReveal(el) {
    if (typeof IntersectionObserver !== "function" || prefersReducedMotion()) {
      revealShow(el);
      return;
    }
    el.setAttribute(REVEAL_STATE_ATTRIBUTE, "hidden");
    var observer = new IntersectionObserver(function (entries, obs) {
      for (var i = 0; i < entries.length; i += 1) {
        if (entries[i].isIntersecting) {
          revealShow(entries[i].target);
          obs.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.12 });
    observer.observe(el);
  }

  function resetTilt(el) {
    el.style.setProperty("--ds-tilt-x", "0deg");
    el.style.setProperty("--ds-tilt-y", "0deg");
  }

  function initTilt(el) {
    if (prefersReducedMotion()) return;
    el.addEventListener("pointermove", function (event) {
      var rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      var px = (event.clientX - rect.left) / rect.width - 0.5;
      var py = (event.clientY - rect.top) / rect.height - 0.5;
      var rotateX = (-py * (MAX_TILT_DEG * 2)).toFixed(2);
      var rotateY = (px * (MAX_TILT_DEG * 2)).toFixed(2);
      el.style.setProperty("--ds-tilt-x", rotateX + "deg");
      el.style.setProperty("--ds-tilt-y", rotateY + "deg");
    });
    el.addEventListener("pointerleave", function () { resetTilt(el); });
    el.addEventListener("pointercancel", function () { resetTilt(el); });
    resetTilt(el);
  }

  // Registre des comportements, indexés par attribut data-*.
  var behaviors = [
    { attribute: NAVBAR_ATTRIBUTE, init: initNavbar },
    { attribute: REVEAL_ATTRIBUTE, init: initReveal },
    { attribute: TILT_ATTRIBUTE, init: initTilt },
  ];

  function isInitialized(el, attribute) {
    var marker = el.getAttribute(INITIALIZED_MARKER);
    if (!marker) return false;
    return marker.split(/\s+/).indexOf(attribute) !== -1;
  }

  function markInitialized(el, attribute) {
    var marker = el.getAttribute(INITIALIZED_MARKER);
    el.setAttribute(INITIALIZED_MARKER, marker ? marker + " " + attribute : attribute);
  }

  function enhance(root) {
    if (!root || typeof root.querySelectorAll !== "function") return;
    for (var i = 0; i < behaviors.length; i += 1) {
      var behavior = behaviors[i];
      var elements;
      try {
        elements = root.querySelectorAll("[" + cssEscape(behavior.attribute) + "]");
      } catch (selectorError) {
        // Un sélecteur invalide ne doit pas interrompre les autres comportements.
        continue;
      }
      for (var j = 0; j < elements.length; j += 1) {
        var el = elements[j];
        if (isInitialized(el, behavior.attribute)) continue;
        try {
          behavior.init(el);
          markInitialized(el, behavior.attribute);
        } catch (initError) {
          // Robustesse (Ref. 8.6) : une erreur sur un élément n'interrompt pas
          // l'initialisation des autres éléments ni des autres comportements.
        }
      }
    }
  }

  // Auto-init gardé : uniquement en présence d'un vrai document et hors opt-out.
  function autoInitDisabled() {
    return typeof globalThis !== "undefined" && globalThis.__DS_NO_AUTO_INIT__ === true;
  }

  function registerAutoInit() {
    if (autoInitDisabled()) return;
    if (typeof document === "undefined" || typeof document.addEventListener !== "function") {
      return;
    }
    var run = function () {
      enhance(document);
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", run, { once: true });
    } else {
      run();
    }
  }

  // API minimale exposée pour une ré-amélioration manuelle (ex. contenu injecté).
  if (typeof window !== "undefined") {
    window.__DS_BEHAVIORS__ = { enhance: enhance };
  }

  registerAutoInit();
})();
