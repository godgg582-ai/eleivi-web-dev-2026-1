function initFeedbackForm() {
    const form = document.getElementById("feedback-form");
    const statusMsg = document.getElementById("feedback-status");

    if (!form || !statusMsg) {
        return;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }

        form.classList.remove("was-validated");
        form.reset();
        statusMsg.classList.remove("d-none");

        setTimeout(() => {
            statusMsg.classList.add("d-none");
        }, 5000);
    });
}

document.addEventListener("DOMContentLoaded", initFeedbackForm);
