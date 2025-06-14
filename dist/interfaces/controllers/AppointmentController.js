export class AppointmentController {
    createAppointmentUseCase;
    deleteAppointmentUseCase;
    listAppointmentUseCase;
    updateAppointmentUseCase;
    constructor(createAppointmentUseCase, deleteAppointmentUseCase, listAppointmentUseCase, updateAppointmentUseCase) {
        this.createAppointmentUseCase = createAppointmentUseCase;
        this.deleteAppointmentUseCase = deleteAppointmentUseCase;
        this.listAppointmentUseCase = listAppointmentUseCase;
        this.updateAppointmentUseCase = updateAppointmentUseCase;
    }
    async create(req, res) {
        const { doctorId, hour, date, service } = req.body;
        try {
            await this.createAppointmentUseCase.execute({ doctorId, hour, date, service });
            return res.status(201).json({ message: "Usuario criado com sucesso!" });
        }
        catch (error) {
            const err = error;
            return res.status(400).json({ message: err.message });
        }
    }
    async delete(req, res) {
        const id = req.params.id;
        try {
            await this.deleteAppointmentUseCase.execute(id);
            return res.status(200).json({ message: "Delete feito com sucesso!" });
        }
        catch (error) {
            const err = error;
            return res.status(400).json({ message: err.message });
        }
    }
    async list(req, res) {
        try {
            const appointments = await this.listAppointmentUseCase.execute();
            const appointmentsData = appointments.map(appointment => ({
                id: appointment.id,
                doctorId: appointment.doctorId,
                service: appointment.service,
                date: appointment.date,
                hour: appointment.hour
            }));
            return res.status(200).json(appointmentsData);
        }
        catch (error) {
            const err = error;
            return res.status(400).json({ message: err.message });
        }
    }
    async update(req, res) {
        const { doctorId, hour, date, service } = req.body;
        const id = req.params.id;
        try {
            await this.updateAppointmentUseCase.execute({ doctorId, hour, date, service, id });
            return res.status(200).json({ message: "Update feito com sucesso!" });
        }
        catch (error) {
            const err = error;
            return res.status(400).json({ message: err.message });
        }
    }
}
