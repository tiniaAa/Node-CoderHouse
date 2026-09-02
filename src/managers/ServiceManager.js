import crypto from "crypto"
class ServiceManager{
    

    constructor(){
        this.service = [];

    }

    getServices(){
        return this.service;
    }
    
    getServicesById(id){
        return this.service.find(service=> service.id === id);

    }

    createService(name,description,price,availtable){
        const newService={
            id: crypto.randomUUID(),
            name: name,
            description:description,
            price,price,
            availtable:availtable
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


const servicios = new ServiceManager();
const ver = servicios.createService("Clinico","MedicoClinico",3000,true)
//const ver = servicios.getServices();
console.log(ver);