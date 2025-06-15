import { User } from "src/domain/entities/User";
import bcrypt from "bcrypt";
import crypto from "crypto";
export class CreateUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
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
