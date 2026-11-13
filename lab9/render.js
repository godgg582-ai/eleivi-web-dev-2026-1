const selectedDishes = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

const activeFilters = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

function saveOrderToStorage() {
    const data = {};
    Object.keys(selectedDishes).forEach((cat) => {
        data[cat] = selectedDishes[cat] ? selectedDishes[cat].keyword : null;
    });
    localStorage.setItem("lunch_order", JSON.stringify(data));
}

function loadOrderFromStorage() {
    try {
        const raw = localStorage.getItem("lunch_order");
        if (!raw) {
            return;
        }
        const data = JSON.parse(raw);
        Object.keys(selectedDishes).forEach((cat) => {
            if (data[cat]) {
                const found = dishes.find((d) => d.keyword === data[cat]);
                if (found) {
                    selectedDishes[cat] = found;
                }
            }
        });
    } catch (e) {
        console.error("Error reading localStorage:", e);
    }
}

function validateOrderCombo() {
    const hasSoup = Boolean(selectedDishes.soup);
    const hasMain = Boolean(selectedDishes.main);
    const hasSalad = Boolean(selectedDishes.salad);
    const hasDrink = Boolean(selectedDishes.drink);

    const isCombo1 = hasSoup && hasMain && hasSalad && hasDrink;
    const isCombo2 = hasSoup && hasMain && !hasSalad && hasDrink;
    const isCombo3 = hasSoup && !hasMain && hasSalad && hasDrink;
    const isCombo4 = !hasSoup && hasMain && hasSalad && hasDrink;
    const isCombo5 = !hasSoup && hasMain && !hasSalad && hasDrink;

    return isCombo1 || isCombo2 || isCombo3 || isCombo4 || isCombo5;
}

function updateStickyPanel() {
    const stickyPanel = document.getElementById("sticky-panel");
    const stickyPrice = document.getElementById("sticky-price-value");
    const checkoutBtn = document.getElementById("sticky-checkout-btn");

    if (!stickyPanel || !stickyPrice || !checkoutBtn) {
        return;
    }

    const hasSelection = Boolean(
        selectedDishes.soup ||
        selectedDishes.main ||
        selectedDishes.salad ||
        selectedDishes.drink ||
        selectedDishes.dessert
    );

    if (!hasSelection) {
        stickyPanel.classList.add("hidden");
        return;
    }

    stickyPanel.classList.remove("hidden");

    let total = 0;
    Object.keys(selectedDishes).forEach((cat) => {
        if (selectedDishes[cat]) {
            total += selectedDishes[cat].price;
        }
    });

    stickyPrice.textContent = `${total} ₽`;

    if (validateOrderCombo()) {
        checkoutBtn.classList.remove("disabled");
        checkoutBtn.removeAttribute("aria-disabled");
    } else {
        checkoutBtn.classList.add("disabled");
        checkoutBtn.setAttribute("aria-disabled", "true");
    }
}

function selectDish(dish) {
    selectedDishes[dish.category] = dish;
    saveOrderToStorage();

    const grid = document.getElementById(`${dish.category}-dishes-grid`);
    if (grid) {
        const cards = grid.querySelectorAll(".dish-card");
        cards.forEach((c) => {
            if (c.getAttribute("data-dish") === dish.keyword) {
                c.classList.add("selected");
            } else {
                c.classList.remove("selected");
            }
        });
    }

    updateStickyPanel();
}

function createDishCard(dish) {
    const card = document.createElement("div");
    card.className = "dish-card";
    card.setAttribute("data-dish", dish.keyword);
    card.setAttribute("data-kind", dish.kind);

    if (
        selectedDishes[dish.category] &&
        selectedDishes[dish.category].keyword === dish.keyword
    ) {
        card.classList.add("selected");
    }

    const img = document.createElement("img");
    img.src = dish.image;
    img.alt = dish.name;
    img.className = "dish-img";

    const price = document.createElement("p");
    price.className = "dish-price";
    price.textContent = `${dish.price} ₽`;

    const name = document.createElement("p");
    name.className = "dish-name";
    name.textContent = dish.name;

    const count = document.createElement("p");
    count.className = "dish-count";
    count.textContent = dish.count;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "dish-btn";
    btn.textContent = "Добавить";

    btn.addEventListener("click", () => {
        selectDish(dish);
    });

    card.append(img, price, name, count, btn);
    return card;
}

function renderCategoryDishes(cat) {
    const grid = document.getElementById(`${cat}-dishes-grid`);
    if (!grid) {
        return;
    }

    grid.innerHTML = "";
    let catDishes = dishes.filter((d) => d.category === cat);
    const filterKind = activeFilters[cat];

    if (filterKind) {
        catDishes = catDishes.filter((d) => d.kind === filterKind);
    }

    catDishes.sort((a, b) => a.name.localeCompare(b.name, "ru"));

    catDishes.forEach((dish) => {
        const card = createDishCard(dish);
        grid.append(card);
    });
}

function setupFilters(cat) {
    const container = document.getElementById(`${cat}-filters`);
    if (!container) {
        return;
    }

    const buttons = container.querySelectorAll(".filter-btn");
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const kind = btn.getAttribute("data-kind");

            if (btn.classList.contains("active")) {
                btn.classList.remove("active");
                activeFilters[cat] = null;
            } else {
                buttons.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");
                activeFilters[cat] = kind;
            }

            renderCategoryDishes(cat);
        });
    });
}

async function initMenu() {
    await loadDishes();
    loadOrderFromStorage();

    const categories = ["soup", "main", "salad", "drink", "dessert"];

    categories.forEach((cat) => {
        renderCategoryDishes(cat);
        setupFilters(cat);
    });

    updateStickyPanel();
}

document.addEventListener("DOMContentLoaded", initMenu);
