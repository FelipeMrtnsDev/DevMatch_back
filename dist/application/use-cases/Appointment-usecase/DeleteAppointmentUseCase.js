export class DeleteAppointmentUseCase {
    AppointmentRepository;
    constructor(AppointmentRepository) {
        this.AppointmentRepository = AppointmentRepository;
    }
    async execute(id) {
        if (!id) {
            throw new Error("Passe o id");
        }
        const currentAppointment = await this.AppointmentRepository.findById(id);
        if (!currentAppointment) {
            throw new Error("Consulta não encontrada");
        }
        return await this.AppointmentRepository.delete(id);
    }
}
