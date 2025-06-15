export class FindUserByEmailUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            return null;
        }
        return user.getPublicProfile();
    }
}
