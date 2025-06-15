export class FindUsersByTypeUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(userType) {
        return this.userRepository.findByType(userType);
    }
}
