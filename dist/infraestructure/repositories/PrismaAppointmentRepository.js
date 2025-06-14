import { PrismaClient } from "@prisma/client";
import { Appointment } from "../../domain/entities/Appointments.js";
const prisma = new PrismaClient();
export class PrismaAppointmentRepository {
    async create(appointment) {
        await prisma.appointment.create({
            data: {
                id: appointment.id,
                doctorId: appointment.doctorId,
                service: appointment.service,
                date: appointment.date,
                hour: appointment.hour,
            },
        });
    }
    async list() {
        return await prisma.appointment.findMany();
    }
    async update(appointment) {
        await prisma.appointment.update({
            where: { id: appointment.id },
            data: {
                doctorId: appointment.doctorId,
                service: appointment.service,
                date: appointment.date,
                hour: appointment.hour,
            },
        });
    }
    async delete(id) {
        await prisma.appointment.delete({
            where: { id },
        });
    }
    async findById(id) {
        const data = await prisma.appointment.findUnique({ where: { id } });
        return data ? new Appointment(data) : undefined;
    }
    async findByDoctor(doctorId) {
        const data = await prisma.appointment.findMany({
            where: { doctorId }
        });
        return data.map((d) => new Appointment({
            id: d.id,
            doctorId: d.doctorId,
            service: d.service,
            date: d.date,
            hour: d.hour
        }));
    }
}
