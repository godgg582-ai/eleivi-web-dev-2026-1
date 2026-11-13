const selectedDishes = {
    soup: null,
    main: null,
    drink: null
};

function updateOrderSummary() {
    const emptyOrderBlock = document.getElementById("empty-order-msg");
    const orderDetailsBlock = document.getElementById("order-details");
    const totalPriceBlock = document.getElementById("total-price-block");
    const totalPriceValue = document.getElementById("total-price-value");

    const soupDisplay = document.getElementById("order-soup-value");
    const mainDisplay = document.getElementById("order-main-value");
    const drinkDisplay = document.getElementById("order-drink-value");

    const soupInput = document.getElementById("hidden-soup");
    const mainInput = document.getElementById("hidden-main");
    const drinkInput = document.getElementById("hidden-drink");

    const hasSelection = Boolean(
        selectedDishes.soup || selectedDishes.main || selectedDishes.drink
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
        if (soupInput) {
            soupInput.value = "";
        }
        if (mainInput) {
            mainInput.value = "";
        }
        if (drinkInput) {
            drinkInput.value = "";
        }
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

    if (selectedDishes.soup) {
        soupDisplay.textContent =
            `${selectedDishes.soup.name} ${selectedDishes.soup.price} ₽`;
        soupInput.value = selectedDishes.soup.keyword;
        total += selectedDishes.soup.price;
    } else {
        soupDisplay.textContent = "Блюдо не выбрано";
        soupInput.value = "";
    }

    if (selectedDishes.main) {
        mainDisplay.textContent =
            `${selectedDishes.main.name} ${selectedDishes.main.price} ₽`;
        mainInput.value = selectedDishes.main.keyword;
        total += selectedDishes.main.price;
    } else {
        mainDisplay.textContent = "Блюдо не выбрано";
        mainInput.value = "";
    }

    if (selectedDishes.drink) {
        drinkDisplay.textContent =
            `${selectedDishes.drink.name} ${selectedDishes.drink.price} ₽`;
        drinkInput.value = selectedDishes.drink.keyword;
        total += selectedDishes.drink.price;
    } else {
        drinkDisplay.textContent = "Напиток не выбран";
        drinkInput.value = "";
    }

    if (totalPriceValue) {
        totalPriceValue.textContent = `${total} ₽`;
    }
}

function selectDish(dish) {
    selectedDishes[dish.category] = dish;

    const categoryContainer = document.querySelector(
        `#${dish.category}-dishes-grid`
    );
    if (categoryContainer) {
        const cards = categoryContainer.querySelectorAll(".dish-card");
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

function resetOrder() {
    selectedDishes.soup = null;
    selectedDishes.main = null;
    selectedDishes.drink = null;

    document.querySelectorAll(".dish-card.selected").forEach((c) => {
        c.classList.remove("selected");
    });

    updateOrderSummary();
}

function renderDishes() {
    const categories = ["soup", "main", "drink"];

    categories.forEach((cat) => {
        const grid = document.getElementById(`${cat}-dishes-grid`);
        if (!grid) {
            return;
        }

        grid.innerHTML = "";
        const catDishes = dishes.filter((d) => d.category === cat);
        catDishes.sort((a, b) => a.name.localeCompare(b.name, "ru"));

        catDishes.forEach((dish) => {
            const card = createDishCard(dish);
            grid.append(card);
        });
    });

    const resetBtn = document.querySelector(".btn-reset");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            setTimeout(resetOrder, 0);
        });
    }

    updateOrderSummary();
}

document.addEventListener("DOMContentLoaded", renderDishes);
