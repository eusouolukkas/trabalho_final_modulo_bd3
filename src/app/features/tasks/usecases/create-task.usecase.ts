import { TasksModel } from "../../../models/tasks.model";
import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../../user/repositories/user.repository";

interface CreateTaskDTO {
  title: string;
  description: string;
}

export class CreateTaskUseCase {
  constructor(
    private repository: UserRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute(data: CreateTaskDTO) {
    const task = new TasksModel(data.title, data.description, user);

    const result = await this.repository.create(task);

    return result.toJson();
  }
}
