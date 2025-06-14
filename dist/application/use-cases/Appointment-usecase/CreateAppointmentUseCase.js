import { randomUUID } from "node:crypto";
import { Appointment } from "../../../domain/entities/Appointments.js";
export class CreateAppointmentUseCase {
    AppointmentRepository;
    constructor(AppointmentRepository) {
        this.AppointmentRepository = AppointmentRepository;
    }
    async execute({ doctorId, service, date, hour }) {
        const currentAppointment = await this.AppointmentRepository.list();
        if (!doctorId || !service || !date || !hour) {
            throw new Error("Todos os campos são obrigatórios");
        }
        const appointmentDate = new Date(`${date}T${hour}`);
        if (appointmentDate < new Date()) {
            throw new Error("Não é possível marcar uma consulta no passado.");
        }
        const conflict = currentAppointment.find(a => a.date === date && a.hour === hour && a.doctorId === doctorId);
        if (conflict) {
            throw new Error("Já existe uma consulta nesse horário com esse médico");
        }
        const appointment = new Appointment({
            doctorId,
            service,
            date,
            hour,
            id: randomUUID()
        });
        return await this.AppointmentRepository.create(appointment);
    }
}
