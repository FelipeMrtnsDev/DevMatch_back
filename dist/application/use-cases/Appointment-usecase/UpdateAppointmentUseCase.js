import { Appointment } from "../../../domain/entities/Appointments.js";
export class UpdateAppointmentUseCase {
    AppointmentRepository;
    constructor(AppointmentRepository) {
        this.AppointmentRepository = AppointmentRepository;
    }
    async execute({ doctorId, service, date, hour, id }) {
        if (!doctorId || !service || !date || !hour || !id) {
            throw new Error("Todos os parametros requiridos!");
        }
        if (!id) {
            throw new Error("Id não encontrado");
        }
        const currentAppointment = await this.AppointmentRepository.list();
        const conflict = currentAppointment.filter(a => a.hour === hour && a.date === date && a.doctorId === doctorId);
        if (conflict.length > 0) {
            throw new Error("Já existe essa consulta marcada nesse horário com esse Doutor");
        }
        const existingAppointment = currentAppointment.find(a => a.id === id);
        if (!existingAppointment) {
            throw new Error("Consulta não encontrada");
        }
        const appointment = new Appointment({
            doctorId,
            service,
            date,
            hour,
            id
        });
        return await this.AppointmentRepository.update(appointment);
    }
}
