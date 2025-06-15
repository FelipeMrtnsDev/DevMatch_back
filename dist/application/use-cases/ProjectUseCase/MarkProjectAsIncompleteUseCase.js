export class MarkProjectAsIncompleteUseCase {
    projectRepository;
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async execute(id) {
        const project = await this.projectRepository.findById(id);
        if (!project) {
            throw new Error("Projeto não encontrado.");
        }
        project.markAsIncomplete();
        const updatedProject = await this.projectRepository.update(project);
        return updatedProject.getPublicProfile();
    }
}
