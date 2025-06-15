export class FindProjectsByCreatorIdUseCase {
    projectRepository;
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async execute(creatorId) {
        return this.projectRepository.findByCreatorId(creatorId);
    }
}
