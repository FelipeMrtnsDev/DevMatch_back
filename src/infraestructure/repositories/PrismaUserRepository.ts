import { PrismaClient } from "../../generated/prisma";
import { User } from "src/domain/entities/User";
import { IUserRepository } from "src/domain/repositories/IUserRepository";

const prisma = new PrismaClient();

export class PrismaUserRepository implements IUserRepository {
  async create(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        id: user.id,
        picture: user.picture || null,
      },
    });
  }

  async update(user: User): Promise<User> {
    const data = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        picture: user.picture,
      },
    });

    return new User(data);
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await prisma.user.findUnique({
      where: { email },
    });

    return data ? new User(data) : null;
  }

  async findById(id: string): Promise<User | null> {
    const data = await prisma.user.findUnique({
      where: { id },
    });

    return data ? new User(data) : null;
  }

  async list(): Promise<User[]> {
    const data = await prisma.user.findMany();
    return data.map((d) => new User(d));
  }

  async listOne(id: string): Promise<User> {
    const data = await prisma.user.findUnique({
      where: { id },
    });

    if (!data) {
      throw new Error("Usuário não encontrado");
    }

    return new User(data);
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }
}
