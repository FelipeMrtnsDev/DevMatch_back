import { PrismaClient } from "@prisma/client";
import { User, UserType } from "src/domain/entities/User.js";
import { IUserRepository } from "src/domain/repositories/IUserRepository.js";

const prisma = new PrismaClient();

export class PrismaUserRepository implements IUserRepository {
  async create(user: User): Promise<void> {
    // O 'any' foi removido. Se o erro voltar, siga os passos para limpar o cache.
    await prisma.user.create({
      data: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        passwordHash: user.getPasswordHash,
        userType: user.userType,
      },
    });
  }

  async update(user: User): Promise<User> {
    const updatedData = await prisma.user.update({
      where: { id: user.id },
      data: {
        fullName: user.fullName,
        email: user.email,
        passwordHash: user.getPasswordHash,
        userType: user.userType,
      },
    });
    
    return new User(updatedData);
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
  
  async findByType(userType: UserType): Promise<User[]> {
    const data = await prisma.user.findMany({
      where: { userType },
    });
    return data.map((d) => new User(d));
  }

  async count(): Promise<number> {
    return await prisma.user.count();
  }

  async list(): Promise<User[]> {
    const data = await prisma.user.findMany();
    return data.map((d) => new User(d));
  }

  async paginate(page: number, perPage: number): Promise<User[]> {
    const skip = (page - 1) * perPage;
    const data = await prisma.user.findMany({
      skip: skip,
      take: perPage,
    });
    return data.map((d) => new User(d));
  }

  async listOne(id: string): Promise<User> {
    const data = await this.findById(id);
    if (!data) {
      throw new Error("Usuário não encontrado");
    }
    return data;
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }
}
