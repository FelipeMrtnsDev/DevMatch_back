export class CountProjectsUseCase {
    projectRepository;
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async execute() {
        return this.projectRepository.count();
    }
}
