import { User } from "../../../domain/entities/User.js";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
export class CreateUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ name, email, password }) {
        const userAlredyExist = await this.userRepository.findByEmail(email);
        if (userAlredyExist) {
            throw new Error("Email já esta em uso.");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            id: randomUUID(),
            name,
            email,
            password: hashedPassword,
        });
        await this.userRepository.create(user);
    }
}
