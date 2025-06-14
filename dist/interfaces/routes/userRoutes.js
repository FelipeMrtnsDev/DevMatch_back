import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { CreateUserUseCase } from "../../application/use-cases/User-usecase/CreateUserUseCase.js";
import { ListUserUseCase } from "../../application/use-cases/User-usecase/ListUserUseCase.js";
import { InMemoryUserRepository } from "../../infraestructure/repositories/InMemoryUserRepository.js";
import { AuthenticateUserUseCase } from "../../application/use-cases/User-usecase/AuthenticateUserUseCase.js";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated.js";
const router = Router();
const userRepository = new InMemoryUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const listUserUseCase = new ListUserUseCase(userRepository);
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
const userController = new UserController(createUserUseCase, listUserUseCase, authenticateUserUseCase);
router.get("/users", ensureAuthenticated, async (req, res) => {
    await userController.list(req, res); //ok
});
router.post("/users", async (req, res) => {
    await userController.create(req, res); //ok
});
router.post("/auth", async (req, res) => {
    await userController.authenticate(req, res); //ok
});
export { router };
