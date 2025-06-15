export class MarkProjectAsCompletedUseCase {
    projectRepository;
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async execute(id, completionDate) {
        const project = await this.projectRepository.findById(id);
        if (!project) {
            throw new Error("Projeto não encontrado.");
        }
        project.markAsCompleted(completionDate);
        const updatedProject = await this.projectRepository.update(project);
        return updatedProject.getPublicProfile();
    }
}
