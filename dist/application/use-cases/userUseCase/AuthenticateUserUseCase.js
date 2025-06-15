import jwt from "jsonwebtoken";
export class AuthenticateUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            throw new Error("Usuário ou senha inválidos.");
        }
        const isPasswordCorrect = await user.isPasswordValid(data.password);
        if (!isPasswordCorrect) {
            throw new Error("Usuário ou senha inválidos.");
        }
        const token = jwt.sign({ userId: user.id, userType: user.userType }, process.env.JWT_SECRET || "your_jwt_secret", { expiresIn: "1d" });
        return {
            token,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                userType: user.userType,
                picture: user.picture,
            },
        };
    }
}
