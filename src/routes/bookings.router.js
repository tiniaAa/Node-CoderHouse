import { Router } from "express";
import {
    createBooking,
    getBookingById,
    addServiceToBooking,
    getBookings
} from "../controllers/bookings.controller.js";

const bookingsRouter = Router();

bookingsRouter.get("/", getBookings);
bookingsRouter.get("/:bid", getBookingById);
bookingsRouter.post("/", createBooking);
bookingsRouter.post("/:bid/services/:sid", addServiceToBooking);

export default bookingsRouter;
