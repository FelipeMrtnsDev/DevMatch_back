import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/use-cases/userUseCase/CreateUserUseCase";
import { ListUsersUseCase } from "../../application/use-cases/userUseCase/ListUserUseCase";
import { AuthenticateUserUseCase } from "../../application/use-cases/userUseCase/AuthenticateUserUseCase";
import { DeleteUserUseCase } from "src/application/use-cases/userUseCase/DeleteUserUseCase";
import { ListOneUserUseCase } from "src/application/use-cases/userUseCase/ListOneUserUseCase";
import jwt from "jsonwebtoken"
import { UpdateUserUseCase } from "src/application/use-cases/userUseCase/UpdateUserUseCase";
import { CountUsersUseCase } from "src/application/use-cases/userUseCase/CountUsersUseCase";
import { PaginateUsersUseCase } from "src/application/use-cases/userUseCase/PaginateUsersUseCase";
import { FindUserByIdUseCase } from "src/application/use-cases/userUseCase/FindUserByIdUseCase";
import { FindUsersByTypeUseCase } from "src/application/use-cases/userUseCase/FindUsersByTypeUseCase";
import { FindUserByEmailUseCase } from "src/application/use-cases/userUseCase/FindUserByEmailUseCase";
import { UserType } from "src/domain/entities/User";

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private listUsersUseCase: ListUsersUseCase,
    private authenticateUserUseCase: AuthenticateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private listOneUserUseCase: ListOneUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private countUserUseCase: CountUsersUseCase,
    private paginateUserUseCase: PaginateUsersUseCase,
    private findByIdUserUseCase: FindUserByIdUseCase,
    private findByTypeUserUseCase: FindUsersByTypeUseCase,
    private findUserByEmailUseCase: FindUserByEmailUseCase
  ) {}

  async findByEmail(req: Request, res: Response): Promise<Response> {
    const email = req.query.email as string;

    if (!email) {
      return res.status(400).json({ message: "Email é obrigatório" });
    }

    try {
      const user = await this.findUserByEmailUseCase.execute(email);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.status(200).json(user);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ message: err.message });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    try {
      const user = await this.findByIdUserUseCase.execute(id);
      return res.status(200).json(user);
    } catch (error) {
      const err = error as Error;
      return res.status(404).json({ message: err.message });
    }
  }

  async findByType(req: Request, res: Response): Promise<Response> {
    const userType = req.params.type as UserType;

    try {
      const users = await this.findByTypeUserUseCase.execute(userType);
      return res.status(200).json(users);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ message: err.message });
    }
  }

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

  async count(req: Request, res: Response): Promise<Response> {
    try {
      const totalUsers = await this.countUserUseCase.execute();
      return res.status(200).json({ totalUsers });
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

  async paginate(req: Request, res: Response): Promise<Response> {
    const page = Math.max(1, Number(req.query.page) || 1);
    const perPage = Math.max(1, Number(req.query.perPage) || 10);

    try {
      const users = await this.paginateUserUseCase.execute(page, perPage);
      return res.status(200).json(users);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ message: err.message });
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
