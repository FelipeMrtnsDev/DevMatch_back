export class ListAppointmentUseCase {
    AppointmentRepository;
    constructor(AppointmentRepository) {
        this.AppointmentRepository = AppointmentRepository;
    }
    async execute() {
        return await this.AppointmentRepository.list();
    }
}
