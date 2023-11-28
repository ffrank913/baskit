import React, { ReactNode, createContext } from "react";
import SQLiteDatabase from "../../db/database";

export const DBContext = createContext<SQLiteDatabase | null>(null);

export function DBContextProvider({
  db,
  children,
}: {
  db: SQLiteDatabase | null;
  children: ReactNode;
}) {
  if (!db) return <>{children}</>;
  return <DBContext.Provider value={db}>{children}</DBContext.Provider>;
}
