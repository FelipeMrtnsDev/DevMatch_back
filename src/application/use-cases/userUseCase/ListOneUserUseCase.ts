import { IUserRepository } from "src/domain/repositories/IUserRepository";
import { User } from "src/domain/entities/User";

export class ListOneUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<ReturnType<User["getPublicProfile"]>> {
    const user = await this.userRepository.listOne(id);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    return user.getPublicProfile();
  }
}