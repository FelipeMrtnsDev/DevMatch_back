export class InMemoryAppointmentRepository {
    appointments = [];
    async create(appointment) {
        this.appointments.push(appointment);
    }
    async list() {
        return this.appointments;
    }
    async update(appointment) {
        const index = this.appointments.findIndex(a => a.id === appointment.id);
        if (index === -1) {
            throw new Error("Agendamento não encontrado");
        }
        this.appointments[index] = appointment;
    }
    async delete(id) {
        this.appointments = this.appointments.filter(a => a.id !== id);
    }
    async findById(id) {
        return await this.appointments.find(a => a.id === id);
    }
    async findByDoctor(doctorId) {
        return await this.appointments.filter(a => a.doctorId === doctorId);
    }
}
