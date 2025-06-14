import { IUserRepository } from "src/domain/repositories/IUserRepository";

export class CountUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<number> {
    return this.userRepository.count();
  }
}
