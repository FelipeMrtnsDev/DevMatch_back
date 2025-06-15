export class ListOneProjectUseCase {
    projectRepository;
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async execute(id) {
        const project = await this.projectRepository.listOne(id);
        if (!project) {
            throw new Error("Projeto não encontrado.");
        }
        return project.getPublicProfile();
    }
}
