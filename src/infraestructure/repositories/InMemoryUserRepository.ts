import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { User, UserType } from "../../domain/entities/User.js";

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = []

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
      return this.users.find(user => user.email === email) || null;
  }

  async findByType(userType: UserType): Promise<User[]> {
    return this.users.filter(user => user.userType === userType);
  }

  async count(): Promise<number> {
    return this.users.length;
  }

  async list(): Promise<User[]> {
    return this.users;
  }

  async paginate(page: number, perPage: number): Promise<User[]> {
    const start = (page - 1) * perPage;
    return this.users.slice(start, start + perPage);
  }

  async listOne(id: string): Promise<User> {
    const user = this.users.find((obj: User) => obj.id === id);
    if (!user) throw new Error("Usuário não encontrado");
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async update(user: User): Promise<User> {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index === -1) throw new Error("Usuário não encontrado");

    this.users[index] = user;
    return user;
  }

  async delete(id: string): Promise<void> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new Error("Usuário não encontrado");

    this.users.splice(index, 1);
  }
}