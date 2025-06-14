import { IUserRepository } from "src/domain/repositories/IUserRepository";
import { User } from "src/domain/entities/User";

export interface UpdateUserDTO {
  id: string;
  fullName?: string;
  picture?: string;
}

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: UpdateUserDTO): Promise<ReturnType<User["getPublicProfile"]>> {
    const user = await this.userRepository.findById(data.id);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    if (data.fullName) {
      user.updateFullName(data.fullName);
    }

    if (data.picture) {
      user.updatePicture(data.picture);
    }

    const updatedUser = await this.userRepository.update(user);

    return updatedUser.getPublicProfile();
  }
}
