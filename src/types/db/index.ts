export type ISQLiteUpdate = {
  column: string;
  value: any;
}

export type ISQLiteWhere = {
  field: string;
  conditional: string;
  value: any;
}
