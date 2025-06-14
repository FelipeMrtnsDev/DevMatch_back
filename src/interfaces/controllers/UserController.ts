import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/use-cases/User-usecase/CreateUserUseCase.js";
import { ListUsersUseCase } from "../../application/use-cases/User-usecase/ListUsersUseCase.js";
import { AuthenticateUserUseCase } from "../../application/use-cases/User-usecase/AuthenticateUserUseCase.js";
import { DeleteUserUseCase } from "src/application/use-cases/User-usecase/DeleteUserUseCase.js";
import { ListOneUserUseCase } from "src/application/use-cases/User-usecase/ListOneUserUseCase.js";
import jwt from "jsonwebtoken"
import { UpdateUserUseCase } from "src/application/use-cases/User-usecase/UpdateUserUseCase.js";

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private listUsersUseCase: ListUsersUseCase,
    private authenticateUserUseCase: AuthenticateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private listOneUserUseCase: ListOneUserUseCase,
    private updateUserUseCase: UpdateUserUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, picture, username } = req.body;

    try {
      await this.createUserUseCase.execute({
        name,
        email,
        password,
        picture,
        username,
      });
      return res.status(201).send();
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ message: err.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.listUsersUseCase.execute();
      return res.status(200).json(users);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ message: err.message });
    }
  }

  async listOne(req: Request, res: Response): Promise<Response> {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

      const user = await this.listOneUserUseCase.execute(decoded.id);
      return res.status(200).json(user);
    } catch (error) {
      const err = error as Error;
      return res.status(401).json({ message: "Token inválido: " + err.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    try {
      const users = await this.deleteUserUseCase.execute({ id });
      return res.status(204).json(users);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ message: err.message });
    }
  }

  async authenticate(req: Request, res: Response): Promise<Response> {
    const { email, password, name } = req.body;

    try {
      const token = await this.authenticateUserUseCase.execute({
        email,
        password,
        name,
      });
      return res.status(200).send({ token });
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ message: err.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { name, email, password, picture, username, id } = req.body;

    try {
      await this.updateUserUseCase.execute({
        id,
        name,
        email,
        password,
        picture,
        username,
      });
      return res.status(201).send();
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ message: err.message });
    }
  }
}
