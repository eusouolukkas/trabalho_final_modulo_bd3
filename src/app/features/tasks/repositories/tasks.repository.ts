import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { TasksModel } from "../../../models/tasks.model";
import { TasksEntity } from "../../../shared/entities/tasks.entity";
import { UserRepository } from "../../user/repositories/user.repository";

interface UpdateTasksDTO {
  title?: string;
  description?: string;
}

export class TasksRepository {
  private _repository =
    DatabaseConnection.connection.getRepository(TasksEntity);

  public async list() {
    return await this._repository.find({
      relations: {
        user: true,
      },
    });
  }

  public async getById(id: string) {
    return await this._repository.findOneBy({
      id,
    });
  }

  public async create(tasks: TasksModel) {
    const userRepository = new UserRepository();
    const user = await userRepository.get(tasks.user.id);

    if (!user) {
      throw new Error("Usuário não existe!");
    }

    const tasksEntity = this._repository.create({
      id: tasks.id,
      title: tasks.title,
      description: tasks.description,
      user: user ?? undefined,
    });

    return await this._repository.save(tasksEntity);
  }

  public async update(tasksEntity: TasksEntity, data: UpdateTasksDTO) {
    if (data.title) {
      tasksEntity.title = data.title;
    }

    if (data.description) {
      tasksEntity.description = data.description;
    }

    return await this._repository.save(tasksEntity);
  }

  public async delete(id: string) {
    return await this._repository.delete({
      id,
    });
  }
}
