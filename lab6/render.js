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

function showNotification(message) {
    const existing = document.getElementById("order-notification-modal");
    if (existing) {
        existing.remove();
    }

    const overlay = document.createElement("div");
    overlay.id = "order-notification-modal";
    overlay.className = "modal-overlay";

    const modal = document.createElement("div");
    modal.className = "modal-content";

    const text = document.createElement("p");
    text.className = "modal-text";
    text.textContent = message;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "modal-btn";
    btn.textContent = "Окей";

    btn.addEventListener("click", () => {
        overlay.remove();
    });

    modal.append(text, btn);
    overlay.append(modal);
    document.body.append(overlay);
}

function validateOrderCombo() {
    const hasSoup = Boolean(selectedDishes.soup);
    const hasMain = Boolean(selectedDishes.main);
    const hasSalad = Boolean(selectedDishes.salad);
    const hasDrink = Boolean(selectedDishes.drink);
    const hasDessert = Boolean(selectedDishes.dessert);

    const count = [
        hasSoup,
        hasMain,
        hasSalad,
        hasDrink,
        hasDessert
    ].filter(Boolean).length;

    if (count === 0) {
        return "Ничего не выбрано. Выберите блюда для заказа";
    }

    const isCombo1 = hasSoup && hasMain && hasSalad && hasDrink;
    const isCombo2 = hasSoup && hasMain && !hasSalad && hasDrink;
    const isCombo3 = hasSoup && !hasMain && hasSalad && hasDrink;
    const isCombo4 = !hasSoup && hasMain && hasSalad && hasDrink;
    const isCombo5 = !hasSoup && hasMain && !hasSalad && hasDrink;

    if (isCombo1 || isCombo2 || isCombo3 || isCombo4 || isCombo5) {
        return null;
    }

    if (!hasSoup && !hasMain && !hasSalad && (hasDrink || hasDessert)) {
        return "Выберите главное блюдо";
    }

    if (hasSoup && !hasMain && !hasSalad) {
        return "Выберите главное блюдо/салат/стартер";
    }

    if (hasSalad && !hasSoup && !hasMain) {
        return "Выберите суп или главное блюдо";
    }

    if (!hasDrink) {
        return "Выберите напиток";
    }

    return "Выберите главное блюдо";
}

function updateOrderSummary() {
    const emptyOrderBlock = document.getElementById("empty-order-msg");
    const orderDetailsBlock = document.getElementById("order-details");
    const totalPriceBlock = document.getElementById("total-price-block");
    const totalPriceValue = document.getElementById("total-price-value");

    const displays = {
        soup: document.getElementById("order-soup-value"),
        main: document.getElementById("order-main-value"),
        salad: document.getElementById("order-salad-value"),
        drink: document.getElementById("order-drink-value"),
        dessert: document.getElementById("order-dessert-value")
    };

    const inputs = {
        soup: document.getElementById("hidden-soup"),
        main: document.getElementById("hidden-main"),
        salad: document.getElementById("hidden-salad"),
        drink: document.getElementById("hidden-drink"),
        dessert: document.getElementById("hidden-dessert")
    };

    const hasSelection = Boolean(
        selectedDishes.soup ||
        selectedDishes.main ||
        selectedDishes.salad ||
        selectedDishes.drink ||
        selectedDishes.dessert
    );

    if (!hasSelection) {
        if (emptyOrderBlock) {
            emptyOrderBlock.classList.remove("hidden");
        }
        if (orderDetailsBlock) {
            orderDetailsBlock.classList.add("hidden");
        }
        if (totalPriceBlock) {
            totalPriceBlock.classList.add("hidden");
        }
        Object.keys(inputs).forEach((cat) => {
            if (inputs[cat]) {
                inputs[cat].value = "";
            }
        });
        return;
    }

    if (emptyOrderBlock) {
        emptyOrderBlock.classList.add("hidden");
    }
    if (orderDetailsBlock) {
        orderDetailsBlock.classList.remove("hidden");
    }
    if (totalPriceBlock) {
        totalPriceBlock.classList.remove("hidden");
    }

    let total = 0;

    Object.keys(displays).forEach((cat) => {
        const dish = selectedDishes[cat];
        const disp = displays[cat];
        const input = inputs[cat];

        if (dish) {
            if (disp) {
                disp.textContent = `${dish.name} ${dish.price} ₽`;
            }
            if (input) {
                input.value = dish.keyword;
            }
            total += dish.price;
        } else {
            if (disp) {
                disp.textContent =
                    cat === "drink" ? "Напиток не выбран" : "Блюдо не выбрано";
            }
            if (input) {
                input.value = "";
            }
        }
    });

    if (totalPriceValue) {
        totalPriceValue.textContent = `${total} ₽`;
    }
}

function selectDish(dish) {
    selectedDishes[dish.category] = dish;

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

    updateOrderSummary();
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

function resetOrder() {
    Object.keys(selectedDishes).forEach((cat) => {
        selectedDishes[cat] = null;
    });

    document.querySelectorAll(".dish-card.selected").forEach((c) => {
        c.classList.remove("selected");
    });

    updateOrderSummary();
}

function initFormValidation() {
    const form = document.querySelector(".order-form");
    if (!form) {
        return;
    }

    form.addEventListener("submit", (e) => {
        const error = validateOrderCombo();
        if (error) {
            e.preventDefault();
            showNotification(error);
        }
    });
}

function initMenu() {
    const categories = ["soup", "main", "salad", "drink", "dessert"];

    categories.forEach((cat) => {
        renderCategoryDishes(cat);
        setupFilters(cat);
    });

    const resetBtn = document.querySelector(".btn-reset");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            setTimeout(resetOrder, 0);
        });
    }

    initFormValidation();
    updateOrderSummary();
}

document.addEventListener("DOMContentLoaded", initMenu);
