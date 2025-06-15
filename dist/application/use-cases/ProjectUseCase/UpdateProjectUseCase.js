export class UpdateProjectUseCase {
    projectRepository;
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async execute(data) {
        const project = await this.projectRepository.findById(data.id);
        if (!project) {
            throw new Error("Projeto não encontrado.");
        }
        if (data.title !== undefined) {
            if (!data.title.trim()) {
                throw new Error("O título não pode estar vazio.");
            }
            if (data.title.length < 3) {
                throw new Error("O título deve ter no mínimo 3 caracteres.");
            }
            project.updateTitle(data.title);
        }
        if (data.description !== undefined) {
            if (!data.description.trim()) {
                throw new Error("A descrição não pode estar vazia.");
            }
            if (data.description.length < 10) {
                throw new Error("A descrição deve ter no mínimo 10 caracteres.");
            }
            project.updateDescription(data.description);
        }
        if (data.repoUrl !== undefined) {
            project.updateRepoUrl(data.repoUrl);
        }
        if (data.liveUrl !== undefined) {
            project.updateLiveUrl(data.liveUrl);
        }
        if (data.completionDate !== undefined) {
            project.updateCompletionDate(data.completionDate);
        }
        const updatedProject = await this.projectRepository.update(project);
        return updatedProject.getPublicProfile();
    }
}
