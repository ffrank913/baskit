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

export const SCHEMA_INGREDIENTS = `
  create table if not exists ingredients(
      id text primary key,
      recipeId text not null,
      checked boolean,
      markedAsDeleted boolean
  );
`;