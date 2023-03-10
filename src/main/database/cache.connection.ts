import redis from "ioredis";
import { cacheEnv } from "../../app/envs/cache.env";

export class CacheConnection {
  private static _connection: redis;

  public static async connect() {
    if (!this._connection) {
      this._connection = new redis({
        host: cacheEnv.host,
        port: cacheEnv.port,
        username: cacheEnv.username,
        password: cacheEnv.password,
      });
    }

    console.log("Redis conectado!");
  }

  public static get connection() {
    if (!this._connection) {
      throw new Error("Redis não conectado!");
    }
    return this._connection;
  }
}
