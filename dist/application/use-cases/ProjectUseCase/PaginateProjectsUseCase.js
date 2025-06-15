export class PaginateProjectsUseCase {
    projectRepository;
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async execute(page, perPage) {
        const projects = await this.projectRepository.paginate(page, perPage);
        return projects.map((project) => project.getPublicProfile());
    }
}
