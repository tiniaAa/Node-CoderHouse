import servicesService from "../services/services.service.js";

export const getServices = async (req, res) => {
    try {
        const response = await servicesService.getServices(req.query);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
};

export const getServiceById = async (req, res) => {
    try {
        const { sid } = req.params;
        const service = await servicesService.getServiceById(sid);

        if (!service) {
            return res.status(404).json({ status: "error", error: `Servicio con id ${sid} no encontrado` });
        }

        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
};

export const createService = async (req, res) => {
    try {
        const serviceAdded = await servicesService.createService(req.body);
        res.status(201).json({ message: "Servicio creado exitosamente", service: serviceAdded });
    } catch (error) {
        const statusCode = error.statusCode || 400;
        res.status(statusCode).json({ status: "error", error: error.message });
    }
};

export const updateService = async (req, res) => {
    try {
        const { sid } = req.params;
        const updatedService = await servicesService.updateService(sid, req.body);

        if (!updatedService) {
            return res.status(404).json({ status: "error", error: `Servicio con id ${sid} no encontrado para actualizar` });
        }

        res.status(200).json({ message: "Servicio actualizado exitosamente", service: updatedService });
    } catch (error) {
        const statusCode = error.statusCode || 400;
        res.status(statusCode).json({ status: "error", error: error.message });
    }
};

export const deleteService = async (req, res) => {
    try {
        const { sid } = req.params;
        const deletedService = await servicesService.deleteService(sid);

        if (!deletedService) {
            return res.status(404).json({ status: "error", error: `Servicio con id ${sid} no encontrado para eliminar` });
        }

        res.status(200).json({ message: "Servicio eliminado exitosamente", service: deletedService });
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
};
