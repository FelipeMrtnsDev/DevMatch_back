import { IUserRepository } from "src/domain/repositories/IUserRepository";
import { User } from "src/domain/entities/User";

export class FindUserByEmailUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string): Promise<ReturnType<User["getPublicProfile"]> | null> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return null;
    }

    return user.getPublicProfile();
  }
}
