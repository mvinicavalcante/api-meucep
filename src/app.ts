import express, { Request, Response } from "express";
import { Knex } from "knex";
import knexConfig from "./knexfile";
import knexFactory from "knex";
import UserRepository from "./repositories/UserRepository";

const app = express();
const port = 3000;

const knex: Knex = knexFactory(knexConfig.development);
const userRepository = new UserRepository(knex);

app.use(express.json());

app.post("/users", async (req: Request, res: Response) => {
  try {
    const user = await userRepository.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

app.get("/users/:id", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const user = await userRepository.getUserById(userId);

    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express com PostgreSQL rodando na porta ${port}`);
});
