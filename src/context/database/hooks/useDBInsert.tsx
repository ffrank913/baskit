import { useCallback, useContext, useEffect, useState } from "react";
import { SQLResultSet } from "expo-sqlite";
import { DBContext } from "../DBContextProvider";

export default function useDBInsert(dbName: string) {
  const database = useContext(DBContext);

  const insert = useCallback(async (
    fields: string[],
    variables: any[]
  ): Promise<SQLResultSet> => {
    return new Promise((resolve, reject) => {
      if (!database) {
        console.error("database not found. aborting...");
        return;
      };
      const sql = `
                INSERT INTO ${dbName} (${fields.join(",")}) 
                values (${fields.map(() => "?").join(",")});
            `;
      database
        .executeQuery(sql, variables)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }, []);

  return insert;
}
