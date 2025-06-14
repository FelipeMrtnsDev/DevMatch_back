import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/use-cases/userUseCase/CreateUserUseCase";
import { ListUsersUseCase } from "../../application/use-cases/userUseCase/ListUserUseCase";
import { AuthenticateUserUseCase } from "../../application/use-cases/userUseCase/AuthenticateUserUseCase";
import { DeleteUserUseCase } from "src/application/use-cases/userUseCase/DeleteUserUseCase";
import { ListOneUserUseCase } from "src/application/use-cases/userUseCase/ListOneUserUseCase";
import jwt from "jsonwebtoken"
import { UpdateUserUseCase } from "src/application/use-cases/userUseCase/UpdateUserUseCase";

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
    const { fullName, email, password, userType } = req.body;

    try {
      await this.createUserUseCase.execute({
        email,
        fullName,
        password,
        userType
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
      const users = await this.deleteUserUseCase.execute(id);
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
        password
      });
      return res.status(200).send({ token });
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ message: err.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { fullName, picture , id } = req.body;

    try {
      await this.updateUserUseCase.execute({
        id,
        fullName,
        picture
      });
      return res.status(201).send();
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ message: err.message });
    }
  }
}
