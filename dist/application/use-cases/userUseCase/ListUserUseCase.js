export class ListUsersUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute() {
        const users = await this.userRepository.list();
        return users.map((user) => user.getPublicProfile());
    }
}
