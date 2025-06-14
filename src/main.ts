import express from "express";
import { router as userRoutes } from "./interfaces/routes/userRoutes.js";
import { router as readmeRoutes } from "./interfaces/routes/ReadmeRouter.js";

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(readmeRoutes)

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});
