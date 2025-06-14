export class UserController {
    createUserUseCase;
    listUsersUseCase;
    authenticateUserUseCase;
    constructor(createUserUseCase, listUsersUseCase, authenticateUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.listUsersUseCase = listUsersUseCase;
        this.authenticateUserUseCase = authenticateUserUseCase;
    }
    async create(req, res) {
        const { name, email, password } = req.body;
        try {
            await this.createUserUseCase.execute({ name, email, password });
            return res.status(201).send();
        }
        catch (error) {
            const err = error;
            return res.status(400).json({ message: err.message });
        }
    }
    async list(req, res) {
        try {
            const users = await this.listUsersUseCase.execute();
            return res.status(200).json(users);
        }
        catch (error) {
            const err = error;
            return res.status(400).json({ message: err.message });
        }
    }
    async authenticate(req, res) {
        const { email, password, name } = req.body;
        try {
            const token = await this.authenticateUserUseCase.execute({
                email,
                password,
                name,
            });
            return res.status(200).send({ token });
        }
        catch (error) {
            const err = error;
            return res.status(400).json({ message: err.message });
        }
    }
}
