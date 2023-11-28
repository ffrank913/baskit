import { useCallback, useContext, useEffect, useState } from "react";
import { SQLResultSet } from "expo-sqlite";
import { DBContext } from "../DBContextProvider";
import { IBaskitRecipe } from "../../../types";
import { ISQLiteWhere } from "../../../types/db";

export default function useDBRemove(dbName: string) {
  const database = useContext(DBContext);

  const remove = useCallback(async (where: ISQLiteWhere): Promise<SQLResultSet> => {
    return new Promise((resolve, reject) => {
      if (!database) return;
      const sql = `DELETE FROM ${dbName} WHERE ${where.field}${where.conditional}?;`;
      database
        .executeQuery(sql, [where.value])
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }, []);

  return remove;
}
