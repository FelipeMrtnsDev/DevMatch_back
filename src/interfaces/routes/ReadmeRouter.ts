import { Router } from "express";
import { CreateReadmeUseCase } from "src/application/use-cases/Readme-usecase/CreateReadmeUseCase";
import { DeleteReadmeUseCase } from "src/application/use-cases/Readme-usecase/DeleteReadmeUseCase";
import { ListOneReadmeByUserUseCase } from "src/application/use-cases/Readme-usecase/ListOneReadmeByUserUseCase";
import { ListReadmeByUserUseCase } from "src/application/use-cases/Readme-usecase/ListReadmeByUserUseCase";
import { ListReadmeUseCase } from "src/application/use-cases/Readme-usecase/ListReadmeUseCase";
import { ReadmeController } from "../controllers/ReadmeController";
import { UpdateReadmeUseCase } from "src/application/use-cases/Readme-usecase/UpdateReadmeUseCase";
import { ensureAuthenticated } from "src/middlewares/ensureAuthenticated";
import { PrismaReadmeRepository } from "src/infraestructure/repositories/PrismaReadmeRepository";

const router = Router()

const readmeRepository = new PrismaReadmeRepository()
const createReadmeUseCase = new CreateReadmeUseCase(readmeRepository)
const listReadmeUseCase = new ListReadmeUseCase(readmeRepository)
const deleteReadmeUseCase = new DeleteReadmeUseCase(readmeRepository)
const listOneReadmeByUserUseCase = new ListOneReadmeByUserUseCase(readmeRepository)
const listReadmeByUserUseCase = new ListReadmeByUserUseCase(readmeRepository)
const updateReadmeUseCase = new UpdateReadmeUseCase(readmeRepository)
const readmeController = new ReadmeController(
  createReadmeUseCase,
  deleteReadmeUseCase,
  listOneReadmeByUserUseCase,
  listReadmeByUserUseCase,
  listReadmeUseCase,
  updateReadmeUseCase
);

router.get("/readmes", ensureAuthenticated, async (req, res) => {
  await readmeController.list(req, res);
});

router.get("/readme/:id", ensureAuthenticated, async (req, res) => {
  await readmeController.listOne(req, res);
});

router.get("/readme", ensureAuthenticated, async (req, res) => {
  await readmeController.listByUser(req, res);
});

router.delete("/readme/:id", ensureAuthenticated, async (req, res) => {
  await readmeController.delete(req, res);
});

router.post("/readme", ensureAuthenticated, async (req, res) => {
  await readmeController.create(req, res);
});

router.put("/readme/:id", ensureAuthenticated, async (req, res) => {
  await readmeController.update(req, res);
});


export { router };