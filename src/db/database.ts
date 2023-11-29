import * as SQLite from "expo-sqlite";
import { SQLResultSet, SQLError } from "expo-sqlite";

export { SQLResultSet, SQLError };

export default class Database {
  private name: string;
  private version: string;
  private DB: SQLite.SQLiteDatabase;
  private storedRequests: {query: string, values?: any[], resolve: (value: SQLite.SQLResultSet | PromiseLike<SQLite.SQLResultSet>) => void, reject: (reason?: any) => void}[] = [];

  constructor(name: string, version: string) {
    this.name = name;
    this.version = version;
  }

  public async InitDB(): Promise<SQLite.SQLiteDatabase> {
    return new Promise<SQLite.SQLiteDatabase>((resolve) => {
      this.DB = SQLite.openDatabase(
        this.name + this.version,
        this.version,
        "",
        1,
        resolve
      );
    });
  }

  public OnReady(): void {
    this.storedRequests.map(({query, values, resolve, reject}) => {
      this.executeQuery(query, values).then(resolve).catch(reject);
    })
  }

  async createTables(queries: string[]): Promise<SQLite.SQLResultSet[]> {
    return Promise.all(
      queries.map(async (query) => {
        return new Promise<SQLite.SQLResultSet>((resolve, reject) => {
          this.executeQuery(query, [])
            .then((response) => resolve(response))
            .catch((err) => reject(err));
        });
      })
    );
  }

  async executeQuery(
    query: string,
    values?: any[]
  ): Promise<SQLite.SQLResultSet> {
    return new Promise((resolve, reject) => {
      if (!this.DB) {
        console.log("Database not initialized yet. Storing request...");
        this.storedRequests.push({query, values, resolve, reject});
        return;
      };
      this.DB.transaction((tx) => {
        tx.executeSql(
          query,
          values || [],
          (tx, result) => {
            resolve(result);
          },
          (tx, err) => {
            reject(err);
            return true;
          }
        );
      });
    });
  }
}
