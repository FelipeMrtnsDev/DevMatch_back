export class InMemoryUserRepository {
    users = [];
    async create(user) {
        this.users.push(user);
    }
    async findByEmail(email) {
        return this.users.find(user => user.email === email) || null;
    }
    async findByType(userType) {
        return this.users.filter(user => user.userType === userType);
    }
    async count() {
        return this.users.length;
    }
    async list() {
        return this.users;
    }
    async paginate(page, perPage) {
        const start = (page - 1) * perPage;
        return this.users.slice(start, start + perPage);
    }
    async listOne(id) {
        const user = this.users.find((obj) => obj.id === id);
        if (!user)
            throw new Error("Usuário não encontrado");
        return user;
    }
    async findById(id) {
        return this.users.find(user => user.id === id) || null;
    }
    async update(user) {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index === -1)
            throw new Error("Usuário não encontrado");
        this.users[index] = user;
        return user;
    }
    async delete(id) {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1)
            throw new Error("Usuário não encontrado");
        this.users.splice(index, 1);
    }
}
