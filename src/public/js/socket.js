// Inicializar conexión con el servidor Socket.io
const socket = io();

// Referencias del DOM
const serviceForm = document.getElementById("serviceForm");
const servicesList = document.getElementById("services-list");

// Acción concreta: Crear un servicio mediante Socket.io desde el cliente
if (serviceForm) {
    serviceForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const serviceData = {
            name: document.getElementById("name").value.trim(),
            description: document.getElementById("description").value.trim(),
            duration: document.getElementById("duration").value.trim(),
            price: Number(document.getElementById("price").value),
            category: document.getElementById("category").value.trim(),
            available: document.getElementById("available").checked
        };

        // Emitir evento con los datos del nuevo servicio al backend
        socket.emit("new-service", serviceData);

        // Limpiar el formulario
        serviceForm.reset();
        document.getElementById("available").checked = true;
    });
}

// Escuchar evento del servidor: lista de servicios actualizada en tiempo real sin recargar página
socket.on("services-updated", (services) => {
    if (!servicesList) return;

    if (!services || services.length === 0) {
        servicesList.innerHTML = '<p class="no-data">No hay servicios registrados en la base de datos.</p>';
        return;
    }

    servicesList.innerHTML = "";

    services.forEach((service) => {
        const card = document.createElement("div");
        card.className = "service-card";
        card.setAttribute("data-id", service.id || service._id);

        const badgeClass = service.available ? "badge-success" : "badge-danger";
        const badgeText = service.available ? "Disponible" : "No disponible";

        card.innerHTML = `
            <div class="service-header">
                <h3>${service.name}</h3>
                <span class="badge ${badgeClass}">${badgeText}</span>
            </div>
            <p class="service-desc">${service.description}</p>
            <div class="service-details">
                <p><strong>Duración:</strong> ${service.duration}</p>
                <p><strong>Precio:</strong> $${service.price}</p>
                <p><strong>Categoría:</strong> ${service.category}</p>
            </div>
        `;

        servicesList.appendChild(card);
    });
});

// Escuchar posibles errores de validación emitidos por el servidor
socket.on("service-error", (errorMessage) => {
    alert("Error al procesar el servicio: " + errorMessage);
});
