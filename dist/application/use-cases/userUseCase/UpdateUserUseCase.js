export class UpdateUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
        const user = await this.userRepository.findById(data.id);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }
        if (data.fullName) {
            user.updateFullName(data.fullName);
        }
        if (data.picture) {
            user.updatePicture(data.picture);
        }
        const updatedUser = await this.userRepository.update(user);
        return updatedUser.getPublicProfile();
    }
}
