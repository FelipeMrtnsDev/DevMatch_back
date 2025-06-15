import jwt from "jsonwebtoken";
export class UserController {
    createUserUseCase;
    listUsersUseCase;
    authenticateUserUseCase;
    deleteUserUseCase;
    listOneUserUseCase;
    updateUserUseCase;
    countUserUseCase;
    paginateUserUseCase;
    findByIdUserUseCase;
    findByTypeUserUseCase;
    findUserByEmailUseCase;
    constructor(createUserUseCase, listUsersUseCase, authenticateUserUseCase, deleteUserUseCase, listOneUserUseCase, updateUserUseCase, countUserUseCase, paginateUserUseCase, findByIdUserUseCase, findByTypeUserUseCase, findUserByEmailUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.listUsersUseCase = listUsersUseCase;
        this.authenticateUserUseCase = authenticateUserUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
        this.listOneUserUseCase = listOneUserUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.countUserUseCase = countUserUseCase;
        this.paginateUserUseCase = paginateUserUseCase;
        this.findByIdUserUseCase = findByIdUserUseCase;
        this.findByTypeUserUseCase = findByTypeUserUseCase;
        this.findUserByEmailUseCase = findUserByEmailUseCase;
    }
    async findByEmail(req, res) {
        const email = req.query.email;
        if (!email) {
            return res.status(400).json({ message: "Email é obrigatório" });
        }
        try {
            const user = await this.findUserByEmailUseCase.execute(email);
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            return res.status(200).json(user);
        }
        catch (error) {
            const err = error;
            return res.status(500).json({ message: err.message });
        }
    }
    async findById(req, res) {
        const id = req.params.id;
        try {
            const user = await this.findByIdUserUseCase.execute(id);
            return res.status(200).json(user);
        }
        catch (error) {
            const err = error;
            return res.status(404).json({ message: err.message });
        }
    }
    async findByType(req, res) {
        const userType = req.params.type;
        try {
            const users = await this.findByTypeUserUseCase.execute(userType);
            return res.status(200).json(users);
        }
        catch (error) {
            const err = error;
            return res.status(400).json({ message: err.message });
        }
    }
    async create(req, res) {
        const { fullName, email, password, userType } = req.body;
        try {
            await this.createUserUseCase.execute({
                email,
                fullName,
                password,
                userType
            });
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
    async count(req, res) {
        try {
            const totalUsers = await this.countUserUseCase.execute();
            return res.status(200).json({ totalUsers });
        }
        catch (error) {
            const err = error;
            return res.status(400).json({ message: err.message });
        }
    }
    async listOne(req, res) {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token não fornecido" });
        }
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await this.listOneUserUseCase.execute(decoded.id);
            return res.status(200).json(user);
        }
        catch (error) {
            const err = error;
            return res.status(401).json({ message: "Token inválido: " + err.message });
        }
    }
    async paginate(req, res) {
        const page = Math.max(1, Number(req.query.page) || 1);
        const perPage = Math.max(1, Number(req.query.perPage) || 10);
        try {
            const users = await this.paginateUserUseCase.execute(page, perPage);
            return res.status(200).json(users);
        }
        catch (error) {
            const err = error;
            return res.status(400).json({ message: err.message });
        }
    }
    async delete(req, res) {
        const id = req.params.id;
        try {
            const users = await this.deleteUserUseCase.execute(id);
            return res.status(204).json(users);
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
                password
            });
            return res.status(200).send({ token });
        }
        catch (error) {
            const err = error;
            return res.status(400).json({ message: err.message });
        }
    }
    async update(req, res) {
        const { fullName, picture, id } = req.body;
        try {
            await this.updateUserUseCase.execute({
                id,
                fullName,
                picture
            });
            return res.status(201).send();
        }
        catch (error) {
            const err = error;
            return res.status(400).json({ message: err.message });
        }
    }
}
