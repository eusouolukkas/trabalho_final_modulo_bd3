import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { TasksModel } from "../../../models/tasks.model";
import { TasksEntity } from "../../../shared/entities/tasks.entity";

interface UpdateTasksDTO {
  id: string;
  title?: string;
  description?: string;
}

export class TasksRepository {
  private _repository =
    DatabaseConnection.connection.getRepository(TasksEntity);

  public async list() {
    const result = await this._repository.find({
      relations: {
        user: true,
      },
    });

    const tasks = result.map((item) => {
      return this.mapEntityToModel(item);
    });

    return tasks;
  }

  public async getById(id: string) {
    const result = await this._repository.findOneBy({
      id,
    });

    if (!result) {
      return null;
    }

    return this.mapEntityToModel(result);
  }

  public async create(tasks: TasksModel) {
    //const userRepository = new UserRepository();
    const taskEntity = this._repository.create({
      id: tasks.id,
      title: tasks.title,
      description: tasks.description,
    });

    const result = await this._repository.save(taskEntity);

    return this.mapEntityToModel(result);
  }

  public async update(task: UpdateTasksDTO) {
    const result = await this._repository.update(
      {
        id: task.id,
      },
      {
        title: task.title,
        description: task.description,
      }
    );

    return result.affected ?? 0;
  }

  public async delete(id: string) {
    return await this._repository.delete({
      id,
    });
  }

  private mapEntityToModel(item: TasksEntity) {
    const task = TasksModel.create(item.id, item.title, item.description);

    return task;
  }
}
