import { IUserRepository } from "src/domain/repositories/IUserRepository";
import { User } from "src/domain/entities/User";

export class FindUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}