import { IUserRepository } from "src/domain/repositories/IUserRepository";
import { User, UserType } from "src/domain/entities/User";

export class FindUsersByTypeUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userType: UserType): Promise<User[] | null> {
    return this.userRepository.findByType(userType);
  }
}
