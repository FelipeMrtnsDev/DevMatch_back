import { IUserRepository } from "src/domain/repositories/IUserRepository";
import { User } from "src/domain/entities/User";

export class PaginateUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(page: number, perPage: number): Promise<ReturnType<User["getPublicProfile"]>[]> {
    const users = await this.userRepository.paginate(page, perPage);

    return users.map((user) => user.getPublicProfile());
  }
}
