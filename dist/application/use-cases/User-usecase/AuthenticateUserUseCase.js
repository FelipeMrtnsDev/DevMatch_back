import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export class AuthenticateUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ email, password, name, }) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            throw new Error("Senha incorreta.");
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        return token;
    }
}
