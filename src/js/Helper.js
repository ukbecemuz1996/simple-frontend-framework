// help show alert in application
// it search for Alert component and show alerts inside
export function showAlert(status, message) {
    const el = document.getElementById("global-alert");

    const types = {
        200: "success",
        404: "danger",
        500: "danger",
    };

    if (el) {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = `
        <div class="alert alert-${
            types[status] ? types[status] : "info"
        } alert-dismissible" role="alert">
            <div>${message}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;

        el.append(wrapper);
    }
}
