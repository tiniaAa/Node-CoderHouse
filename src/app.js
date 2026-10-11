import ServiceManager from "./managers/ServiceManager.js";
import express from "express";
 
export const app = express();

const serviceManager = new ServiceManager();

app.use(express.json(), express.urlencoded({extended: true }));

app.get("/",async (reques,response)=>{
    response.status(200).json({
        status:"success",
        message:"API del sistema de Turnos y Reservas"
    })
})

app.get("/api/services",async (request, response, next)=>{
    try{
        const services = serviceManager.getServices();
        response.status(200).json(services);
    }
    catch(error){
        console.log(error);
    }
})
app.get("/api/services/:id",async (request,response, next)=>{
    try{
        const id = request.params.id;
        const serviceById = serviceManager.getServicesById(id);

        response.status(200).json({
            serviceById
        })
    }
    catch(error){
        console.log(error);
    }
})

app.post(("/api/services"),async(reques,response,next)=>{
    try{
        const {name,description,duration,price,category,available} =reques.body;
        const serviceData={
            name:name,
            description:description,
            duration:duration,
            price:price,
            category:category,
            available:available}
        const servcieAdded = serviceManager.addService(serviceData);
        response.status(201).json({message:"Servicio agregado", servcieAdded});

    }
    catch(error){console.log(error);}
})