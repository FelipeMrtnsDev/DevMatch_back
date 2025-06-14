import { PrismaClient } from '../../generated/prisma';
import { IReadmeRepository } from "src/domain/repositories/IReadmeRepository";
import { Readme } from "src/domain/entities/Readme";

const prisma = new PrismaClient();

export class PrismaReadmeRepository implements IReadmeRepository {
  async create(readme: Readme): Promise<void> {
    await prisma.readme.create({
      data: {
        id: readme.id,
        userId: readme.userId,
        title: readme.title,
        stats: readme.stats,
        description: readme.description,
        template: readme.template,
        tag: readme.tag,
      },
    });
  }

  async list(): Promise<Readme[]> {
    return await prisma.readme.findMany();
  }

  async listOne(id: string): Promise<Readme> {
    const readme = await prisma.readme.findUnique({ where: { id } });
    if (!readme) throw new Error("Readme não encontrado");
    return readme;
  }

  async findById(id: string): Promise<Readme | null> {
    return await prisma.readme.findUnique({ where: { id } });
  }

  async update(readme: Readme): Promise<Readme> {
    const exists = await prisma.readme.findUnique({ where: { id: readme.id } });
    if (!exists) throw new Error("Readme não encontrado");

    return await prisma.readme.update({
      where: { id: readme.id },
      data: {
        title: readme.title,
        stats: readme.stats,
        description: readme.description,
        template: readme.template,
        tag: readme.tag,
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: string): Promise<void> {
    const exists = await prisma.readme.findUnique({ where: { id } });
    if (!exists) throw new Error("Readme não encontrado");

    await prisma.readme.delete({ where: { id } });
  }

  async findByUserId(userId: string): Promise<Readme[] | null> {
    const readmes = await prisma.readme.findMany({ where: { userId } });
    return readmes.length > 0 ? readmes : null;
  }
}
