import ServiceManager from "./managers/ServiceManager.js";

const servicios = new ServiceManager();
const ver = servicios.createService("Clinico","MedicoClinico",3000,true)
console.log(ver);