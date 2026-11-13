let userOrders = [];
let activeModal = null;

const API_KEY_DEFAULT = "123e4567-e89b-12d3-a456-426655440000";
const ORDERS_API_BASE =
    "https://amd.dedyn.io:15243/labs/api/orders";

function showNotification(message) {
    const existing = document.getElementById("action-notification-modal");
    if (existing) {
        existing.remove();
    }

    const overlay = document.createElement("div");
    overlay.id = "action-notification-modal";
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

function closeModal() {
    if (activeModal) {
        activeModal.remove();
        activeModal = null;
    }
}

function formatDate(isoString) {
    try {
        const d = new Date(isoString);
        if (Number.isNaN(d.getTime())) {
            return isoString || "—";
        }
        return d.toLocaleString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    } catch {
        return isoString || "—";
    }
}

function getOrderDishes(order) {
    const ids = [
        order.soup_id,
        order.main_course_id,
        order.salad_id,
        order.drink_id,
        order.dessert_id
    ].filter(Boolean);

    const matched = [];
    ids.forEach((id) => {
        const found = dishes.find(
            (d) => d.id === id || d.keyword === String(id)
        );
        if (found) {
            matched.push(found);
        }
    });
    return matched;
}

function calculateOrderTotal(order) {
    const matched = getOrderDishes(order);
    return matched.reduce((acc, d) => acc + d.price, 0);
}

function getDeliveryTimeText(order) {
    if (order.delivery_type === "by_time" && order.delivery_time) {
        return order.delivery_time;
    }
    return "Как можно скорее (с 7:00 до 23:00)";
}

function getApiKey() {
    return localStorage.getItem("api_key") || API_KEY_DEFAULT;
}

function saveLocalOrders(orders) {
    localStorage.setItem("user_orders", JSON.stringify(orders));
}

function triggerTableRefresh() {
    window.dispatchEvent(new CustomEvent("orders-changed"));
}

async function handleDeleteOrder(order) {
    const apiKey = getApiKey();
    const url = `${ORDERS_API_BASE}/${order.id}?api_key=${apiKey}`;

    try {
        const res = await fetch(url, { method: "DELETE" });
        if (!res.ok) {
            const errJson = await res.json().catch(() => null);
            const msg = (errJson && errJson.error) ||
                `Ошибка сервера: ${res.status}`;
            throw new Error(msg);
        }

        userOrders = userOrders.filter((o) => o.id !== order.id);
        saveLocalOrders(userOrders);
        triggerTableRefresh();
        showNotification("Заказ успешно удалён!");
    } catch (e) {
        showNotification(`Ошибка при удалении заказа: ${e.message}`);
    }
}

async function handleSaveOrder(updatedOrder) {
    const apiKey = getApiKey();
    const url = `${ORDERS_API_BASE}/${updatedOrder.id}?api_key=${apiKey}`;

    try {
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedOrder)
        });
        if (!res.ok) {
            const errJson = await res.json().catch(() => null);
            const msg = (errJson && errJson.error) ||
                `Ошибка сервера: ${res.status}`;
            throw new Error(msg);
        }

        const saved = await res.json().catch(() => updatedOrder);
        userOrders = userOrders.map((o) => {
            return o.id === updatedOrder.id ? saved : o;
        });
        saveLocalOrders(userOrders);
        triggerTableRefresh();
        showNotification("Заказ успешно изменён!");
    } catch (e) {
        showNotification(`Ошибка при изменении заказа: ${e.message}`);
    }
}

function openViewModal(order) {
    closeModal();

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const modal = document.createElement("div");
    modal.className = "modal-content order-modal";

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "modal-close-x";
    closeBtn.textContent = "×";
    closeBtn.addEventListener("click", closeModal);

    const title = document.createElement("h3");
    title.className = "modal-title";
    title.textContent = "Просмотр заказа";

    const matchedDishes = getOrderDishes(order);
    const dishNames = matchedDishes.map((d) => `${d.name} (${d.price} ₽)`);
    const total = calculateOrderTotal(order);

    const body = document.createElement("div");
    body.className = "modal-body-details";

    const fields = [
        ["Дата оформления", formatDate(order.created_at)],
        ["Имя клиента", order.full_name || "—"],
        ["Адрес доставки", order.delivery_address || "—"],
        ["Тип доставки", getDeliveryTimeText(order)],
        ["Телефон", order.phone || "—"],
        ["Email", order.email || "—"],
        ["Состав заказа", dishNames.join(", ") || "—"],
        ["Стоимость", `${total} ₽`],
        ["Комментарий", order.comment || "—"]
    ];

    fields.forEach(([k, v]) => {
        const row = document.createElement("p");
        row.className = "detail-row";
        const label = document.createElement("strong");
        label.textContent = `${k}: `;
        row.append(label, document.createTextNode(v));
        body.append(row);
    });

    const footer = document.createElement("div");
    footer.className = "modal-footer";

    const okBtn = document.createElement("button");
    okBtn.type = "button";
    okBtn.className = "modal-btn";
    okBtn.textContent = "Ок";
    okBtn.addEventListener("click", closeModal);

    footer.append(okBtn);
    modal.append(closeBtn, title, body, footer);
    overlay.append(modal);
    document.body.append(overlay);
    activeModal = overlay;
}

function openDeleteModal(order, onConfirm) {
    closeModal();

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const modal = document.createElement("div");
    modal.className = "modal-content confirm-modal";

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "modal-close-x";
    closeBtn.textContent = "×";
    closeBtn.addEventListener("click", closeModal);

    const title = document.createElement("h3");
    title.className = "modal-title";
    title.textContent = "Удаление заказа";

    const text = document.createElement("p");
    text.className = "modal-text";
    text.textContent = "Вы уверены, что хотите удалить данный заказ?";

    const footer = document.createElement("div");
    footer.className = "modal-footer-dual";

    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.className = "modal-btn btn-secondary";
    cancelBtn.textContent = "Отмена";
    cancelBtn.addEventListener("click", closeModal);

    const confirmBtn = document.createElement("button");
    confirmBtn.type = "button";
    confirmBtn.className = "modal-btn btn-danger";
    confirmBtn.textContent = "Да";

    confirmBtn.addEventListener("click", async () => {
        closeModal();
        await onConfirm(order);
    });

    footer.append(cancelBtn, confirmBtn);
    modal.append(closeBtn, title, text, footer);
    overlay.append(modal);
    document.body.append(overlay);
    activeModal = overlay;
}

function openEditModal(order, onSave) {
    closeModal();

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const modal = document.createElement("div");
    modal.className = "modal-content order-edit-modal";

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "modal-close-x";
    closeBtn.textContent = "×";
    closeBtn.addEventListener("click", closeModal);

    const title = document.createElement("h3");
    title.className = "modal-title";
    title.textContent = "Редактирование заказа";

    const form = document.createElement("form");
    form.className = "edit-order-form";

    form.innerHTML = `
        <div class="form-group">
            <label class="form-label">Имя</label>
            <input type="text" name="full_name" class="form-control"
                value="${order.full_name || ""}" required>
        </div>
        <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" name="email" class="form-control"
                value="${order.email || ""}" required>
        </div>
        <div class="form-group">
            <label class="form-label">Телефон</label>
            <input type="tel" name="phone" class="form-control"
                value="${order.phone || ""}" required>
        </div>
        <div class="form-group">
            <label class="form-label">Адрес доставки</label>
            <input type="text" name="delivery_address" class="form-control"
                value="${order.delivery_address || ""}" required>
        </div>
        <fieldset class="form-fieldset">
            <legend class="form-legend">Время доставки</legend>
            <div class="radio-option">
                <label class="radio-label">
                    <input type="radio" name="delivery_type" value="now"
                        ${order.delivery_type !== "by_time" ? "checked" : ""}>
                    Как можно скорее
                </label>
            </div>
            <div class="radio-option">
                <label class="radio-label">
                    <input type="radio" name="delivery_type" value="by_time"
                        ${order.delivery_type === "by_time" ? "checked" : ""}>
                    К указанному времени
                </label>
            </div>
        </fieldset>
        <div class="form-group">
            <label class="form-label">Укажите время доставки</label>
            <input type="time" name="delivery_time" class="form-control"
                value="${order.delivery_time || ""}"
                min="07:00" max="23:00" step="300">
        </div>
        <div class="form-group">
            <label class="form-label">Комментарий</label>
            <textarea name="comment" class="form-control form-textarea"
                rows="3">${order.comment || ""}</textarea>
        </div>
        <div class="modal-footer-dual">
            <button type="button" class="modal-btn btn-secondary btn-cancel">
                Отмена
            </button>
            <button type="submit" class="modal-btn btn-submit">
                Сохранить
            </button>
        </div>
    `;

    form.querySelector(".btn-cancel").addEventListener("click", closeModal);

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const updated = {
            ...order,
            full_name: fd.get("full_name"),
            email: fd.get("email"),
            phone: fd.get("phone"),
            delivery_address: fd.get("delivery_address"),
            delivery_type: fd.get("delivery_type"),
            delivery_time: fd.get("delivery_time") || null,
            comment: fd.get("comment") || ""
        };
        closeModal();
        await onSave(updated);
    });

    modal.append(closeBtn, title, form);
    overlay.append(modal);
    document.body.append(overlay);
    activeModal = overlay;
}

function renderOrdersTable() {
    const tbody = document.getElementById("orders-table-body");
    const emptyMsg = document.getElementById("empty-orders-msg");
    const tableContainer = document.getElementById("orders-table-container");

    if (!tbody || !emptyMsg || !tableContainer) {
        return;
    }

    if (userOrders.length === 0) {
        emptyMsg.classList.remove("hidden");
        tableContainer.classList.add("hidden");
        return;
    }

    emptyMsg.classList.add("hidden");
    tableContainer.classList.remove("hidden");
    tbody.innerHTML = "";

    userOrders.forEach((order, index) => {
        const tr = document.createElement("tr");

        const matched = getOrderDishes(order);
        const dishNames = matched.map((d) => d.name).join(", ");
        const total = calculateOrderTotal(order);

        const tdNum = document.createElement("td");
        tdNum.className = "table-cell";
        tdNum.textContent = String(index + 1);

        const tdDate = document.createElement("td");
        tdDate.className = "table-cell";
        tdDate.textContent = formatDate(order.created_at);

        const tdDishes = document.createElement("td");
        tdDishes.className = "table-cell";
        tdDishes.textContent = dishNames || "—";

        const tdPrice = document.createElement("td");
        tdPrice.className = "table-cell";
        tdPrice.textContent = `${total} ₽`;

        const tdTime = document.createElement("td");
        tdTime.className = "table-cell";
        tdTime.textContent = getDeliveryTimeText(order);

        const tdActions = document.createElement("td");
        tdActions.className = "table-cell actions-cell";

        const viewBtn = document.createElement("button");
        viewBtn.type = "button";
        viewBtn.className = "action-btn btn-view";
        viewBtn.title = "Подробнее";
        viewBtn.textContent = "Подробнее";
        viewBtn.addEventListener("click", () => openViewModal(order));

        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.className = "action-btn btn-edit";
        editBtn.title = "Редактирование";
        editBtn.textContent = "Редактировать";
        editBtn.addEventListener("click", () => {
            openEditModal(order, handleSaveOrder);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "action-btn btn-delete";
        deleteBtn.title = "Удаление";
        deleteBtn.textContent = "Удалить";
        deleteBtn.addEventListener("click", () => {
            openDeleteModal(order, handleDeleteOrder);
        });

        tdActions.append(viewBtn, editBtn, deleteBtn);
        tr.append(tdNum, tdDate, tdDishes, tdPrice, tdTime, tdActions);
        tbody.append(tr);
    });
}

async function fetchOrders() {
    const apiKey = getApiKey();
    const url = `${ORDERS_API_BASE}?api_key=${encodeURIComponent(apiKey)}`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        userOrders = Array.isArray(data) ? data : [];
    } catch (err) {
        console.warn("Failed to fetch orders from API, checking local:", err);
        const local = JSON.parse(
            localStorage.getItem("user_orders") || "[]"
        );
        userOrders = Array.isArray(local) ? local : [];
    }

    userOrders.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
    });

    renderOrdersTable();
}

async function initOrdersPage() {
    window.addEventListener("orders-changed", renderOrdersTable);
    await loadDishes();
    await fetchOrders();
}

document.addEventListener("DOMContentLoaded", initOrdersPage);
