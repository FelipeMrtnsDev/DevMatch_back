export class PaginateUsersUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(page, perPage) {
        const users = await this.userRepository.paginate(page, perPage);
        return users.map((user) => user.getPublicProfile());
    }
}
