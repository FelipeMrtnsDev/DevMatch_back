import express from "express";
import { router as userRoutes } from "./interfaces/routes/userRoutes.js";
import { router as AppointmentRoutes } from "./interfaces/routes/AppointmentRoutes.js";
const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(AppointmentRoutes);
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000 🚀");
});
