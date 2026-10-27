
"use strict";

// ==============================
// Menú de navegación para móviles
// ==============================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú" : "Abrir menú"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      menuToggle.textContent = "☰";
    });
  });

  // Cierra el menú si se vuelve a una pantalla grande.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 650) {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      menuToggle.textContent = "☰";
    }
  });
}

// ==============================
// Filtros de tipos de bicicletas
// ==============================

const filterButtons = document.querySelectorAll(".filter-btn");
const bikeCards = document.querySelectorAll(".bike-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    // Actualiza el botón seleccionado.
    filterButtons.forEach((item) => {
      const isActive = item === button;

      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    // Muestra solamente las tarjetas correspondientes.
    bikeCards.forEach((card) => {
      const matches =
        selectedFilter === "todas" ||
        card.dataset.category === selectedFilter;

      card.hidden = !matches;
    });
  });
});

// ==============================
// Calculadora de autonomía
// ==============================

const rangeForm = document.getElementById("range-form");
const batteryInput = document.getElementById("battery");
const consumptionInput = document.getElementById("consumption");
const rangeValue = document.getElementById("range-value");
const rangeDetail = document.getElementById("range-detail");

function calculateRange() {
  const battery = Number(batteryInput.value);
  const consumption = Number(consumptionInput.value);

  const validBattery =
    Number.isFinite(battery) &&
    battery >= 50 &&
    battery <= 2000;

  const validConsumption =
    Number.isFinite(consumption) &&
    consumption >= 1 &&
    consumption <= 100;

  if (!validBattery || !validConsumption) {
    rangeValue.textContent = "Revisá los datos";
    rangeDetail.textContent =
      "Ingresá una batería de 50 a 2000 Wh y un consumo de 1 a 100 Wh/km.";
    return;
  }

  const estimatedRange = battery / consumption;

  rangeValue.textContent =
    `${new Intl.NumberFormat("es-UY", {
      maximumFractionDigits: 1
    }).format(estimatedRange)} km`;

  rangeDetail.textContent =
    `Estimación teórica con ${battery} Wh de batería y ` +
    `${consumption} Wh/km de consumo. La autonomía real puede ser menor.`;
}

if (
  rangeForm &&
  batteryInput &&
  consumptionInput &&
  rangeValue &&
  rangeDetail
) {
  rangeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    calculateRange();
  });

  calculateRange();
}

// ==============================
// Año automático del pie de página
// ==============================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
