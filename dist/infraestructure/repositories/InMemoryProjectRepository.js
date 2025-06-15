export class InMemoryProjectRepository {
    projects = [];
    async create(project) {
        this.projects.push(project);
    }
    async findById(id) {
        return this.projects.find((project) => project.id === id) || null;
    }
    async findByCreatorId(creatorId) {
        return this.projects.filter((project) => project.creatorId === creatorId);
    }
    async findByTitle(title) {
        return this.projects.find((project) => project.title.toLowerCase() === title.toLowerCase()) || null;
    }
    async findCompleted() {
        return this.projects.filter((project) => project.isCompleted());
    }
    async findIncomplete() {
        return this.projects.filter((project) => !project.isCompleted());
    }
    async count() {
        return this.projects.length;
    }
    async countByCreatorId(creatorId) {
        return this.projects.filter((project) => project.creatorId === creatorId).length;
    }
    async list() {
        return this.projects;
    }
    async listOne(id) {
        const project = this.projects.find((obj) => obj.id === id);
        if (!project)
            throw new Error("Projeto não encontrado");
        return project;
    }
    async delete(id) {
        const index = this.projects.findIndex((p) => p.id === id);
        if (index === -1)
            throw new Error("Projeto não encontrado");
        this.projects.splice(index, 1);
    }
    async update(project) {
        const index = this.projects.findIndex((p) => p.id === project.id);
        if (index === -1)
            throw new Error("Projeto não encontrado");
        this.projects[index] = project;
        return project;
    }
    async paginate(page, perPage) {
        const start = (page - 1) * perPage;
        return this.projects.slice(start, start + perPage);
    }
    async paginateByCreatorId(creatorId, page, perPage) {
        const creatorProjects = this.projects.filter((project) => project.creatorId === creatorId);
        const start = (page - 1) * perPage;
        return creatorProjects.slice(start, start + perPage);
    }
    // Métodos auxiliares para facilitar testes e desenvolvimento
    async clear() {
        this.projects = [];
    }
    async seed(projects) {
        this.projects = [...projects];
    }
    async findByTitleContaining(searchTerm) {
        return this.projects.filter((project) => project.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    async findByDescriptionContaining(searchTerm) {
        return this.projects.filter((project) => project.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    async findWithRepository() {
        return this.projects.filter((project) => project.hasRepository());
    }
    async findWithLiveDemo() {
        return this.projects.filter((project) => project.hasLiveDemo());
    }
    async findByDateRange(startDate, endDate) {
        return this.projects.filter((project) => project.createdAt >= startDate && project.createdAt <= endDate);
    }
    async findCompletedByCreatorId(creatorId) {
        return this.projects.filter((project) => project.creatorId === creatorId && project.isCompleted());
    }
    async findIncompleteByCreatorId(creatorId) {
        return this.projects.filter((project) => project.creatorId === creatorId && !project.isCompleted());
    }
}
