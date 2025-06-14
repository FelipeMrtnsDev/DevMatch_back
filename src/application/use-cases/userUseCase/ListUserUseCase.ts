import { User } from "src/domain/entities/User";
import { IUserRepository } from "src/domain/repositories/IUserRepository";

export class ListUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<ReturnType<User["getPublicProfile"]>[]> {
    const users = await this.userRepository.list();

    return users.map((user) => user.getPublicProfile());
  }
}
