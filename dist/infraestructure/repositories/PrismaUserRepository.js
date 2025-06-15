import { PrismaClient } from "../../generated/prisma";
import { User } from "src/domain/entities/User";
const prisma = new PrismaClient();
export class PrismaUserRepository {
    async create(user) {
        await prisma.user.create({
            data: {
                name: user.name,
                username: user.username,
                email: user.email,
                password: user.password,
                id: user.id,
                picture: user.picture || null,
            },
        });
    }
    async update(user) {
        const data = await prisma.user.update({
            where: { id: user.id },
            data: {
                name: user.name,
                username: user.username,
                email: user.email,
                password: user.password,
                picture: user.picture,
            },
        });
        return new User(data);
    }
    async findByEmail(email) {
        const data = await prisma.user.findUnique({
            where: { email },
        });
        return data ? new User(data) : null;
    }
    async findById(id) {
        const data = await prisma.user.findUnique({
            where: { id },
        });
        return data ? new User(data) : null;
    }
    async list() {
        const data = await prisma.user.findMany();
        return data.map((d) => new User(d));
    }
    async listOne(id) {
        const data = await prisma.user.findUnique({
            where: { id },
        });
        if (!data) {
            throw new Error("Usuário não encontrado");
        }
        return new User(data);
    }
    async delete(id) {
        await prisma.user.delete({
            where: { id },
        });
    }
}
