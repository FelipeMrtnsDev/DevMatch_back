export class ListProjectsUseCase {
    projectRepository;
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async execute() {
        const projects = await this.projectRepository.list();
        return projects.map((project) => project.getPublicProfile());
    }
}
