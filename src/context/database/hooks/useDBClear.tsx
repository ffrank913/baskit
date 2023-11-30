import { useCallback, useContext } from "react";
import { SQLResultSet } from "expo-sqlite";
import { DBContext } from "../DBContextProvider";

export default function useDBClear(dbName: string) {
  const database = useContext(DBContext);

  const clear = useCallback(async (): Promise<SQLResultSet> => {
    return new Promise((resolve, reject) => {
      if (!database) return;
      const sql = `TRUNCATE TABLE ${dbName}`;
      database
        .executeQuery(sql, [])
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }, []);

  return clear;
}
