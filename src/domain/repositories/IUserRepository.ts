import { User } from "../entities/User.js";

export interface IUserRepository {
  create(user: User): Promise<void>
  findByEmail(email: string): Promise<User | null>
  findByType(userType: User): Promise<User[]>
  findById(id: string): Promise<User | null>
  existsByEmail(email: string): Promise<boolean>
  count(): Promise<number>
  list(): Promise<User[]>
  listOne(id: string): Promise<User>
  delete(id: string): Promise<void>
  update(user: User): Promise<User>
  paginate(page: number, perPage: number): Promise<User[]>
}