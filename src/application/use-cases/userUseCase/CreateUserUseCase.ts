import { User } from "src/domain/entities/User";
import { IUserRepository } from "src/domain/repositories/IUserRepository";
import bcrypt from "bcrypt";
import crypto from "crypto";

export interface CreateUserDTO {
  fullName: string;
  email: string;
  password: string;
  userType: "DEV" | "RH";
}

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO): Promise<ReturnType<User["getPublicProfile"]>> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error("Email já está em uso.");
    }

    if (data.password.length < 6) {
      throw new Error("A senha deve ter no mínimo 6 caracteres.");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = new User({
      id: crypto.randomUUID(),
      fullName: data.fullName,
      email: data.email,
      passwordHash: passwordHash,
      userType: data.userType,
      createdAt: new Date(),
    });

    await this.userRepository.create(user);

    return user.getPublicProfile();
  }
}
