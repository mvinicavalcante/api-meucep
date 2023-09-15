import { Knex } from "knex";

interface User {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export default class UserRepository {
  constructor(private readonly knex: Knex) {}

  async createUser(user: Partial<User>): Promise<User> {
    const [createdUser] = await this.knex("users").insert(user).returning("*");
    return createdUser;
  }

  async getUserById(id: number): Promise<User | null> {
    return this.knex("users").where({ id }).first();
  }
}
