const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".site-header__toggle");
const navigation = document.querySelector(".site-header__nav");
const saveButton = document.querySelector("[data-save-button]");
const saveLabel = document.querySelector("[data-save-label]");
const saveStatus = document.querySelector("[data-save-status]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const themeIcon = document.querySelector("[data-theme-icon]");
const themeColor = document.querySelector('meta[name="theme-color"]');

document.body.classList.add("has-js");

if (themeToggle && themeLabel && themeIcon) {
  const setTheme = (theme, persist = false) => {
    const isDay = theme === "day";
    const nextTheme = isDay ? "day" : "night";

    document.documentElement.dataset.theme = nextTheme;
    themeToggle.setAttribute("aria-pressed", String(isDay));
    themeToggle.setAttribute(
      "aria-label",
      isDay ? "Canvia al mode de nit" : "Canvia al mode de dia",
    );
    themeLabel.textContent = isDay ? "Dia" : "Nit";
    themeIcon.classList.toggle("fa-sun", isDay);
    themeIcon.classList.toggle("fa-moon", !isDay);

    if (themeColor) {
      themeColor.content = isDay ? "#f6f1e6" : "#11110f";
    }

    if (persist) {
      try {
        localStorage.setItem("cinema-de-butxaca-theme", nextTheme);
      } catch (error) {
        console.warn("No s’ha pogut desar el tema al navegador.", error);
      }
    }
  };

  try {
    const savedTheme = localStorage.getItem("cinema-de-butxaca-theme");

    if (savedTheme === "day" || savedTheme === "night") {
      setTheme(savedTheme);
    }
  } catch (error) {
    console.warn("No s’ha pogut llegir el tema desat al navegador.", error);
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme ?? "night";

    setTheme(currentTheme === "night" ? "day" : "night", true);
  });
}

if (header && menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute(
      "aria-label",
      isExpanded ? "Obre el menú" : "Tanca el menú",
    );
    header.classList.toggle("site-header--menu-open", !isExpanded);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Obre el menú");
      header.classList.remove("site-header--menu-open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuToggle.getAttribute("aria-expanded") === "true"
    ) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Obre el menú");
      header.classList.remove("site-header--menu-open");
      menuToggle.focus();
    }
  });
}

if (saveButton && saveLabel && saveStatus) {
  saveButton.addEventListener("click", () => {
    const isSaved = saveButton.getAttribute("aria-pressed") === "true";
    const nextIsSaved = !isSaved;
    const label = nextIsSaved ? "Desa a la llista" : "Afegeix a la llista";

    saveButton.setAttribute("aria-pressed", String(nextIsSaved));
    saveLabel.textContent = nextIsSaved ? "Desada" : label;
    saveStatus.textContent = nextIsSaved
      ? "Arrival s’ha afegit a la teva llista."
      : "Arrival s’ha tret de la teva llista.";
  });
}
