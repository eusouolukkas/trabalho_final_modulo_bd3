import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../../user/repositories/user.repository";

export class ListTasksUseCase {
  constructor(
    private repository: UserRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute() {
    const cachedList = await this.cacheRepository.get("tasks");

    if (cachedList) {
      return {
        cache: true,
        data: cachedList,
      };
    }

    const result = await this.repository.list();
    const resultJson = result.map((item) => item.toJson());

    await this.cacheRepository.set("tasks", resultJson);

    return resultJson;
  }
}
