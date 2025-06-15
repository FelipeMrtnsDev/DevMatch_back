import jwt from "jsonwebtoken";
export class ProjectController {
    createProjectUseCase;
    listProjectsUseCase;
    deleteProjectUseCase;
    listOneProjectUseCase;
    updateProjectUseCase;
    countProjectsUseCase;
    paginateProjectsUseCase;
    findProjectByIdUseCase;
    findProjectsByCreatorIdUseCase;
    markProjectAsCompletedUseCase;
    markProjectAsIncompleteUseCase;
    constructor(createProjectUseCase, listProjectsUseCase, deleteProjectUseCase, listOneProjectUseCase, updateProjectUseCase, countProjectsUseCase, paginateProjectsUseCase, findProjectByIdUseCase, findProjectsByCreatorIdUseCase, markProjectAsCompletedUseCase, markProjectAsIncompleteUseCase) {
        this.createProjectUseCase = createProjectUseCase;
        this.listProjectsUseCase = listProjectsUseCase;
        this.deleteProjectUseCase = deleteProjectUseCase;
        this.listOneProjectUseCase = listOneProjectUseCase;
        this.updateProjectUseCase = updateProjectUseCase;
        this.countProjectsUseCase = countProjectsUseCase;
        this.paginateProjectsUseCase = paginateProjectsUseCase;
        this.findProjectByIdUseCase = findProjectByIdUseCase;
        this.findProjectsByCreatorIdUseCase = findProjectsByCreatorIdUseCase;
        this.markProjectAsCompletedUseCase = markProjectAsCompletedUseCase;
        this.markProjectAsIncompleteUseCase = markProjectAsIncompleteUseCase;
    }
    async create(req, res) {
        const { title, description, repoUrl, liveUrl, completionDate } = req.body;
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token não fornecido" });
        }
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const project = await this.createProjectUseCase.execute({
                creatorId: decoded.id,
                title,
                description,
                repoUrl,
                liveUrl,
                completionDate: completionDate ? new Date(completionDate) : undefined,
            });
            return res.status(201).json(project);
        }
        catch (error) {
            const err = error;
            return res.status(400).json({ message: err.message });
        }
    }
    async list(req, res) {
        try {
            const projects = await this.listProjectsUseCase.execute();
            return res.status(200).json(projects);
        }
        catch (error) {
            const err = error;
            return res.status(400).json({ message: err.message });
        }
    }
    async listOne(req, res) {
        const id = req.params.id;
        try {
            const project = await this.listOneProjectUseCase.execute(id);
            return res.status(200).json(project);
        }
        catch (error) {
            const err = error;
            return res.status(404).json({ message: err.message });
        }
    }
    async findById(req, res) {
        const id = req.params.id;
        try {
            const project = await this.findProjectByIdUseCase.execute(id);
            if (!project) {
                return res.status(404).json({ message: "Projeto não encontrado" });
            }
            return res.status(200).json(project.getPublicProfile());
        }
        catch (error) {
            const err = error;
            return res.status(500).json({ message: err.message });
        }
    }
    async findByCreatorId(req, res) {
        const creatorId = req.params.creatorId;
        try {
            const projects = await this.findProjectsByCreatorIdUseCase.execute(creatorId);
            const publicProjects = projects.map((project) => project.getPublicProfile());
            return res.status(200).json(publicProjects);
        }
        catch (error) {
            const err = error;
            return res.status(400).json({ message: err.message });
        }
    }
    async findMyProjects(req, res) {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token não fornecido" });
        }
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const projects = await this.findProjectsByCreatorIdUseCase.execute(decoded.id);
            const publicProjects = projects.map((project) => project.getPublicProfile());
            return res.status(200).json(publicProjects);
        }
        catch (error) {
            const err = error;
            return res.status(401).json({ message: "Token inválido: " + err.message });
        }
    }
    async count(req, res) {
        try {
            const totalProjects = await this.countProjectsUseCase.execute();
            return res.status(200).json({ totalProjects });
        }
        catch (error) {
            const err = error;
            return res.status(400).json({ message: err.message });
        }
    }
    async paginate(req, res) {
        const page = Math.max(1, Number(req.query.page) || 1);
        const perPage = Math.max(1, Number(req.query.perPage) || 10);
        try {
            const projects = await this.paginateProjectsUseCase.execute(page, perPage);
            return res.status(200).json(projects);
        }
        catch (error) {
            const err = error;
            return res.status(400).json({ message: err.message });
        }
    }
    async update(req, res) {
        const { id, title, description, repoUrl, liveUrl, completionDate } = req.body;
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token não fornecido" });
        }
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Verificar se o projeto existe e se o usuário é o criador
            const existingProject = await this.findProjectByIdUseCase.execute(id);
            if (!existingProject) {
                return res.status(404).json({ message: "Projeto não encontrado" });
            }
            if (existingProject.creatorId !== decoded.id) {
                return res.status(403).json({ message: "Você não tem permissão para editar este projeto" });
            }
            const updatedProject = await this.updateProjectUseCase.execute({
                id,
                title,
                description,
                repoUrl,
                liveUrl,
                completionDate: completionDate ? new Date(completionDate) : undefined,
            });
            return res.status(200).json(updatedProject);
        }
        catch (error) {
            const err = error;
            return res.status(400).json({ message: err.message });
        }
    }
    async delete(req, res) {
        const id = req.params.id;
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token não fornecido" });
        }
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Verificar se o projeto existe e se o usuário é o criador
            const existingProject = await this.findProjectByIdUseCase.execute(id);
            if (!existingProject) {
                return res.status(404).json({ message: "Projeto não encontrado" });
            }
            if (existingProject.creatorId !== decoded.id) {
                return res.status(403).json({ message: "Você não tem permissão para deletar este projeto" });
            }
            await this.deleteProjectUseCase.execute(id);
            return res.status(204).send();
        }
        catch (error) {
            const err = error;
            return res.status(400).json({ message: err.message });
        }
    }
    async markAsCompleted(req, res) {
        const id = req.params.id;
        const { completionDate } = req.body;
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token não fornecido" });
        }
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Verificar se o projeto existe e se o usuário é o criador
            const existingProject = await this.findProjectByIdUseCase.execute(id);
            if (!existingProject) {
                return res.status(404).json({ message: "Projeto não encontrado" });
            }
            if (existingProject.creatorId !== decoded.id) {
                return res.status(403).json({ message: "Você não tem permissão para modificar este projeto" });
            }
            const updatedProject = await this.markProjectAsCompletedUseCase.execute(id, completionDate ? new Date(completionDate) : undefined);
            return res.status(200).json(updatedProject);
        }
        catch (error) {
            const err = error;
            return res.status(400).json({ message: err.message });
        }
    }
    async markAsIncomplete(req, res) {
        const id = req.params.id;
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token não fornecido" });
        }
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Verificar se o projeto existe e se o usuário é o criador
            const existingProject = await this.findProjectByIdUseCase.execute(id);
            if (!existingProject) {
                return res.status(404).json({ message: "Projeto não encontrado" });
            }
            if (existingProject.creatorId !== decoded.id) {
                return res.status(403).json({ message: "Você não tem permissão para modificar este projeto" });
            }
            const updatedProject = await this.markProjectAsIncompleteUseCase.execute(id);
            return res.status(200).json(updatedProject);
        }
        catch (error) {
            const err = error;
            return res.status(400).json({ message: err.message });
        }
    }
}
