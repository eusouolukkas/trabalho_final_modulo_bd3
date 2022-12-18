/* import { Request, Response } from "express";
import { TasksModel } from "../../../models/tasks.model";
import { UserModel } from "../../../models/user.model";
import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../../user/repositories/user.repository";
import { TasksRepository } from "../repositories/tasks.repository";
import { CreateTaskUseCase } from "../usecases/create-task.usecase";
import { ListTasksUseCase } from "../usecases/list-tasks.usecase";
import { UpdateTaskUseCase } from "../usecases/update-task.usecase";

export class TasksController {
  public async listTask(req: Request, res: Response) {
    try {
      const usecase = new ListTasksUseCase(
        new UserRepository(),
        new CacheRepository()
      );

      const result = await usecase.execute();

      return res.status(200).send({
        ok: true,
        message: "Listando todas as tarefas!",
        data: result,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: "Instabilidade no servidor!",
        error: error.toString(),
      });
    }
  }

  public async updateTask(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const { title, description } = req.body;

      const usecase = new UpdateTaskUseCase(
        new TasksRepository(),
        new CacheRepository()
      );
      const result = await usecase.execute(taskId);

      if (!result) {
        return res.status(404).send({
          ok: false,
          message: "Tarefa não encontrada!",
        });
      }

      const resultUpdate = repository.update(result, {
        title,
        description,
      });

      return res.status(200).send({
        ok: true,
        message: "Tarefa atualizada com sucesso",
        data: resultUpdate,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: "Instabilidade no servidor!",
        error: error.toString(),
      });
    }
  }

  /* public async createTask(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, description } = req.body;

      const usecase = new CreateTaskUseCase(
        new TasksRepository(),
        new CacheRepository()
      );

      const result = await usecase.execute({
        title,
        description
      });

      return res.status(201).send({
        ok: true,
        message: "Tarefa criada com sucesso",
        data: result,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: "Instabilidade no servidor!",
        error: error.toString(),
      });
    }
  } 

  public async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const repository = new TasksRepository();
      const result = await repository.delete(id);

      return res.status(200).send({
        ok: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: "Instabilidade no servidor!",
        error: error.toString(),
      });
    }
  }
}
 */
