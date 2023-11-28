import { useCallback, useContext } from "react";
import { SQLResultSet } from "expo-sqlite";
import { DBContext } from "../DBContextProvider";
import { ISQLiteWhere } from "../../../types/db";

export default function useDBQuery(dbName: string) {
  const database = useContext(DBContext);

  /**
   * Gets all entries of database with given name with specifica of where.
   * If where is not defined, this return all items of database with given name.
   */
  const query = useCallback(async (
    where?: ISQLiteWhere
  ): Promise<SQLResultSet> => {
    return new Promise((resolve, reject) => {
      if (!database) return;
      const sql = where ? `SELECT * FROM ${dbName} WHERE ${where.field}${where.conditional}?` : `SELECT * FROM ${dbName}`
      database
        .executeQuery(sql, where ? [where.value] : [])
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }, []);

  return query;
}
