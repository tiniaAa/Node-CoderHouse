import ServiceManager from "../managers/ServiceManager.js";

const serviceManager = new ServiceManager("./src/data/services.json");

export const getServices = async (req, res) => {
    try {
        const { category, available } = req.query;
        const services = await serviceManager.getServices({ category, available });
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getServiceById = async (req, res) => {
    try {
        const { sid } = req.params;
        const service = await serviceManager.getServiceById(sid);

        if (!service) {
            return res.status(404).json({ error: `Servicio con id ${sid} no encontrado` });
        }

        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createService = async (req, res) => {
    try {
        const serviceAdded = await serviceManager.addService(req.body);
        res.status(201).json({ message: "Servicio creado exitosamente", service: serviceAdded });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateService = async (req, res) => {
    try {
        const { sid } = req.params;
        const updatedService = await serviceManager.updateService(sid, req.body);

        if (!updatedService) {
            return res.status(404).json({ error: `Servicio con id ${sid} no encontrado para actualizar` });
        }

        res.status(200).json({ message: "Servicio actualizado exitosamente", service: updatedService });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteService = async (req, res) => {
    try {
        const { sid } = req.params;
        const deletedService = await serviceManager.deleteService(sid);

        if (!deletedService) {
            return res.status(404).json({ error: `Servicio con id ${sid} no encontrado para eliminar` });
        }

        res.status(200).json({ message: "Servicio eliminado exitosamente", service: deletedService });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
