export class FindProjectByIdUseCase {
    projectRepository;
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async execute(id) {
        return this.projectRepository.findById(id);
    }
}
