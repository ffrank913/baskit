export const SCHEMA_RECIPES = `
  create table if not exists recipes(
      id text primary key,
      title text not null,
      image text,
      ingredients text not null,
      description text,
      instructions text
  );
`;

export const SCHEMA_ITEMS = `
  create table if not exists items(
      id text primary key,
      name text not null,
      unit string,
      count number,
      recipeId text not null,
      checked boolean,
      markedAsDeleted boolean
  );
`;