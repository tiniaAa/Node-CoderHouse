
import crypto from "crypto"
class ServiceManager{
    constructor(){
        this.service = [];

    }

    getServices(){
        return this.service;
    }
    
    getServicesById(id){
        return this.service.find(service=> service.id == id);

    }

    addService(serviceData){
        
        if(!serviceData.name ||!serviceData.description || !serviceData.duration || !serviceData.price || !serviceData.category || serviceData.available == undefined){
            throw new Error ("Campos incompletos")
        }
        
        const newService={
            id: crypto.randomUUID(),
            name: serviceData.name,
            description:serviceData.description,
            duration:serviceData.duration,
            price:serviceData.price,
            category:serviceData.category,
            available: serviceData.available
        };
        this.service.push(newService);
        return newService;
    }

    updateService(id,data){
        const service = this.getServicesById(id);

        if(!service){
            return null;
        }
        service.name= data.name ?? service.name;
        service.description = data.description ?? service.description;
        service.price = data.price ?? service.price;
        service.availtable = data.availtable ?? service.availtable
        return service;
    }

    deleteService(name){
        const indice = this.service.findIndex(service=> service.name=== name);
        if(indice!=-1){
            return this.service.splice(indice,1)[0];
        }
        else{return null} 
    }
}
export default ServiceManager;

