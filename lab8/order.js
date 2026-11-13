const selectedDishes = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

const API_KEY_DEFAULT = "123e4567-e89b-12d3-a456-426655440000";
const ORDERS_API_URL =
    "https://edu.std-900.ist.mospolytech.ru/labs/api/orders";

function showNotification(message, isSuccess = false) {
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
        if (isSuccess) {
            window.location.href = "lunch.html";
        }
    });

    modal.append(text, btn);
    overlay.append(modal);
    document.body.append(overlay);
}

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

function updateOrderDetailsView() {
    const displays = {
        soup: document.getElementById("summary-soup-val"),
        main: document.getElementById("summary-main-val"),
        salad: document.getElementById("summary-salad-val"),
        drink: document.getElementById("summary-drink-val"),
        dessert: document.getElementById("summary-dessert-val")
    };

    const emptyText = {
        soup: "Не выбран",
        main: "Не выбрано",
        salad: "Не выбран",
        drink: "Не выбран",
        dessert: "Не выбран"
    };

    let total = 0;

    Object.keys(displays).forEach((cat) => {
        const dish = selectedDishes[cat];
        const disp = displays[cat];
        if (disp) {
            if (dish) {
                disp.textContent = `${dish.name} (${dish.price} ₽)`;
                total += dish.price;
            } else {
                disp.textContent = emptyText[cat];
            }
        }
    });

    const totalVal = document.getElementById("summary-total-val");
    if (totalVal) {
        totalVal.textContent = `${total} ₽`;
    }
}

function updateCompositionView() {
    const grid = document.getElementById("order-dishes-grid");
    const emptyMsg = document.getElementById("empty-composition-msg");

    if (!grid || !emptyMsg) {
        return;
    }

    const activeList = Object.values(selectedDishes).filter(Boolean);

    if (activeList.length === 0) {
        emptyMsg.classList.remove("hidden");
        grid.classList.add("hidden");
    } else {
        emptyMsg.classList.add("hidden");
        grid.classList.remove("hidden");
    }
}

function createSelectedDishCard(dish) {
    const card = document.createElement("div");
    card.className = "dish-card";
    card.setAttribute("data-dish", dish.keyword);

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
    btn.className = "dish-btn dish-btn-delete";
    btn.textContent = "Удалить";

    btn.addEventListener("click", () => {
        selectedDishes[dish.category] = null;
        saveOrderToStorage();
        card.remove();
        updateCompositionView();
        updateOrderDetailsView();
    });

    card.append(img, price, name, count, btn);
    return card;
}

function renderCompositionCards() {
    const grid = document.getElementById("order-dishes-grid");
    if (!grid) {
        return;
    }

    grid.innerHTML = "";
    Object.keys(selectedDishes).forEach((cat) => {
        const dish = selectedDishes[cat];
        if (dish) {
            const card = createSelectedDishCard(dish);
            grid.append(card);
        }
    });

    updateCompositionView();
    updateOrderDetailsView();
}

async function handleOrderSubmit(e) {
    e.preventDefault();

    const validationError = validateOrderCombo();
    if (validationError) {
        showNotification(validationError);
        return;
    }

    const form = e.target;
    const formData = new FormData(form);

    const payload = {
        full_name: formData.get("full_name"),
        email: formData.get("email"),
        subscribe: formData.get("subscribe") ? 1 : 0,
        phone: formData.get("phone"),
        delivery_address: formData.get("delivery_address"),
        delivery_type: formData.get("delivery_type"),
        delivery_time: formData.get("delivery_time") || null,
        comment: formData.get("comment") || "",
        soup_id: selectedDishes.soup ? selectedDishes.soup.id : null,
        main_course_id: selectedDishes.main ? selectedDishes.main.id : null,
        salad_id: selectedDishes.salad ? selectedDishes.salad.id : null,
        drink_id: selectedDishes.drink ? selectedDishes.drink.id : null,
        dessert_id: selectedDishes.dessert ? selectedDishes.dessert.id : null
    };

    const apiKey = localStorage.getItem("api_key") || API_KEY_DEFAULT;
    const url = `${ORDERS_API_URL}?api_key=${encodeURIComponent(apiKey)}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }

        localStorage.removeItem("lunch_order");
        showNotification("Заказ успешно оформлен!", true);
    } catch (err) {
        console.warn("API order failed, saving locally:", err);
        // Fallback for offline / 502 server error
        const localOrders = JSON.parse(
            localStorage.getItem("user_orders") || "[]"
        );
        payload.id = Date.now();
        payload.created_at = new Date().toISOString();
        localOrders.unshift(payload);
        localStorage.setItem("user_orders", JSON.stringify(localOrders));

        localStorage.removeItem("lunch_order");
        showNotification(
            "Заказ успешно принят! (Сохранён локально)",
            true
        );
    }
}

async function initOrderPage() {
    await loadDishes();
    loadOrderFromStorage();
    renderCompositionCards();

    const form = document.getElementById("checkout-form");
    if (form) {
        form.addEventListener("submit", handleOrderSubmit);
    }
}

document.addEventListener("DOMContentLoaded", initOrderPage);
