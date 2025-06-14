import { Router } from "express";
import { PrismaAppointmentRepository } from "../../infraestructure/repositories/PrismaAppointmentRepository.js";
import { AppointmentController } from "../controllers/AppointmentController.js";
import { CreateAppointmentUseCase } from "../../application/use-cases/Appointment-usecase/CreateAppointmentUseCase.js";
import { ListAppointmentUseCase } from "../../application/use-cases/Appointment-usecase/ListAppointmentUseCase.js";
import { UpdateAppointmentUseCase } from "../../application/use-cases/Appointment-usecase/UpdateAppointmentUseCase.js";
import { DeleteAppointmentUseCase } from "../../application/use-cases/Appointment-usecase/DeleteAppointmentUseCase.js";
const router = Router();
const appointmentRepository = new PrismaAppointmentRepository();
const createAppointmentUserCase = new CreateAppointmentUseCase(appointmentRepository);
const listAppointmentUseCase = new ListAppointmentUseCase(appointmentRepository);
const updateAppointmentUseCase = new UpdateAppointmentUseCase(appointmentRepository);
const deleteAppointmentUseCase = new DeleteAppointmentUseCase(appointmentRepository);
const appointmentController = new AppointmentController(createAppointmentUserCase, deleteAppointmentUseCase, listAppointmentUseCase, updateAppointmentUseCase);
router.get("/list", async (req, res) => {
    await appointmentController.list(req, res);
});
router.put("/update/:id", async (req, res) => {
    await appointmentController.update(req, res);
});
router.post("/create", async (req, res) => {
    await appointmentController.create(req, res);
});
router.delete("/delete/:id", async (req, res) => {
    await appointmentController.delete(req, res);
});
export { router };
