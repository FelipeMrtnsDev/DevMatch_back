export class InMemoryUserRepository {
    users = [];
    async create(user) {
        this.users.push(user);
    }
    async findByEmail(email) {
        return this.users.find(user => user.email === email) || null;
    }
    async list() {
        return this.users;
    }
}
