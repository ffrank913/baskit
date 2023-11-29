import { useCallback, useContext } from "react";
import { SQLResultSet } from "expo-sqlite";
import { ISQLiteUpdate, ISQLiteWhere } from "../../../types/db";
import { DBContext } from "../DBContextProvider";

export default function useDBUpdate(name: string) {
  const database = useContext(DBContext);

  const update = useCallback(async (
    newVal: ISQLiteUpdate,
    where: ISQLiteWhere
  ): Promise<SQLResultSet> => {
    return new Promise((resolve, reject) => {
      if (!database) return;
      const sql = `UPDATE ${name} SET ${newVal.column}=? WHERE ${where.field}${where.conditional}?;`;
      database
        .executeQuery(sql, [newVal.value, where.value])
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }, []);

  return update;
}
