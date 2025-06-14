import { Readme } from "src/domain/entities/Readme";
import { IReadmeRepository } from "src/domain/repositories/IReadmeRepository";

export class InMemoryReadmeRepository implements IReadmeRepository {
  private readmes: Readme[] = []

  async create(readme: Readme): Promise<void> {
    this.readmes.push(readme)
  }

  async list(): Promise<Readme[]> {
    return this.readmes;
  }

  async listOne(id: string): Promise<Readme> {
    const readme = this.readmes.find((obj: Readme) => obj.id === id);
    if(!readme) throw new Error("Readme não encontrado");
    return readme
  }

  async findById(id: string): Promise<Readme | null> {
      return this.readmes.find((readme) => readme.id === id) || null;
    }
  
    async update(readme: Readme): Promise<Readme> {
      const index = this.readmes.findIndex(r => r.id === readme.id);
      if (index === -1) throw new Error("Usuário não encontrado");
  
      this.readmes[index] = readme;
      return readme;
    }
  
    async delete(id: string): Promise<void> {
      const index = this.readmes.findIndex(r => r.id === id);
      if (index === -1) throw new Error("Usuário não encontrado");
  
      this.readmes.splice(index, 1);
    }

    async findByUserId(userId: string): Promise<Readme[] | null> {
      const result = this.readmes.filter(readme => readme.userId === userId);
      return result.length > 0 ? result : null;
    }
}