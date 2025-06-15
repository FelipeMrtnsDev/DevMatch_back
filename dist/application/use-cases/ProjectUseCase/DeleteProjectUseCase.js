export class DeleteProjectUseCase {
    projectRepository;
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async execute(id) {
        const project = await this.projectRepository.findById(id);
        if (!project) {
            throw new Error("Projeto não encontrado.");
        }
        await this.projectRepository.delete(id);
    }
}
