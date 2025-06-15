export class ListOneUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id) {
        const user = await this.userRepository.listOne(id);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }
        return user.getPublicProfile();
    }
}
