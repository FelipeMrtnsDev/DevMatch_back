import { Router } from "express";
import { UserController } from "src/interfaces/controllers/UserController";
import { PrismaUserRepository } from "src/infraestructure/repositories/PrismaUserRepository.js";
import { ensureAuthenticated } from "src/middlewares/ensureAuthenticated.js";

import { CreateUserUseCase } from "src/application/use-cases/userUseCase/CreateUserUseCase.js";
import { ListUsersUseCase } from "src/application/use-cases/userUseCase/ListUserUseCase";
import { AuthenticateUserUseCase } from "src/application/use-cases/userUseCase/AuthenticateUserUseCase.js";
import { DeleteUserUseCase } from "src/application/use-cases/userUseCase/DeleteUserUseCase.js";
import { ListOneUserUseCase } from "src/application/use-cases/userUseCase/ListOneUserUseCase.js";
import { UpdateUserUseCase } from "src/application/use-cases/userUseCase/UpdateUserUseCase.js";
import { CountUsersUseCase } from "src/application/use-cases/userUseCase/CountUsersUseCase.js";
import { PaginateUsersUseCase } from "src/application/use-cases/userUseCase/PaginateUsersUseCase.js";
import { FindUserByIdUseCase } from "src/application/use-cases/userUseCase/FindUserByIdUseCase.js";
import { FindUsersByTypeUseCase } from "src/application/use-cases/userUseCase/FindUsersByTypeUseCase.js";
import { FindUserByEmailUseCase } from "src/application/use-cases/userUseCase/FindUserByEmailUseCase.js";

const router = Router();

const userRepository = new PrismaUserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);
const listUsersUseCase = new ListUsersUseCase(userRepository);
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const listOneUserUseCase = new ListOneUserUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const countUserUseCase = new CountUsersUseCase(userRepository);
const paginateUserUseCase = new PaginateUsersUseCase(userRepository);
const findByIdUserUseCase = new FindUserByIdUseCase(userRepository);
const findByTypeUserUseCase = new FindUsersByTypeUseCase(userRepository);
const findUserByEmailUseCase = new FindUserByEmailUseCase(userRepository);


const userController = new UserController(
  createUserUseCase,
  listUsersUseCase,
  authenticateUserUseCase,
  deleteUserUseCase,
  listOneUserUseCase,
  updateUserUseCase,
  countUserUseCase,
  paginateUserUseCase,
  findByIdUserUseCase,
  findByTypeUserUseCase,
  findUserByEmailUseCase
);


router.post("/login", async (req, res) => {
  await userController.authenticate(req, res);
});


router.post("/user", async (req, res) => {
  await userController.create(req, res);
});

router.get("/users", ensureAuthenticated, async (req, res) => {
  await userController.list(req, res);
});

router.get("/user/:id", ensureAuthenticated, async (req, res) => {
  await userController.listOne(req, res);
});

router.put("/user", ensureAuthenticated, async (req, res) => {
  await userController.update(req, res);
});

router.delete("/user/:id", ensureAuthenticated, async (req, res) => {
  await userController.delete(req, res);
});

router.get("/users/count", ensureAuthenticated, async (req, res) => {
    await userController.count(req, res);
});

router.get("/users/paginate", ensureAuthenticated, async (req, res) => {
    await userController.paginate(req, res);
});

router.get("/user/find/id/:id", ensureAuthenticated, async (req, res) => {
    await userController.findById(req, res);
});

router.get("/users/type/:type", ensureAuthenticated, async (req, res) => {
    await userController.findByType(req, res);
});

router.get("/user/email/:email", ensureAuthenticated, async (req, res) => {
    await userController.findByEmail(req, res);
});


export { router };
