import { pgTable, serial, text, integer, primaryKey, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const glasses = pgTable('glasses', {
	id: serial('id').primaryKey(),
	slug: text('slug').notNull().unique(),
	name: text('name').notNull(),
});

export const strengths = pgTable('strengths', {
	id: serial('id').primaryKey(),
	slug: text('slug').notNull().unique(),
	name: text('name').notNull(),
	hint: text('hint'),
});

export const cocktailTypes = pgTable('cocktail_types', {
	id: serial('id').primaryKey(),
	slug: text('slug').notNull().unique(),
	name: text('name').notNull(),
});

export const glassTypeCompatibility = pgTable('glass_type_compatibility', {
	glassId: integer('glass_id').notNull().references(() => glasses.id, { onDelete: 'cascade' }),
	typeId: integer('type_id').notNull().references(() => cocktailTypes.id, { onDelete: 'cascade' }),
}, (table) => [
	primaryKey({ columns: [table.glassId, table.typeId] }),
]);

export const typeStrengthCompatibility = pgTable('type_strength_compatibility', {
	typeId: integer('type_id').notNull().references(() => cocktailTypes.id, { onDelete: 'cascade' }),
	strengthId: integer('strength_id').notNull().references(() => strengths.id, { onDelete: 'cascade' }),
}, (table) => [
	primaryKey({ columns: [table.typeId, table.strengthId] }),
]);

export const baseDrinks = pgTable('base_drinks', {
	id: serial('id').primaryKey(),
	slug: text('slug').notNull().unique(),
	name: text('name').notNull(),
	strengthId: integer('strength_id').references(() => strengths.id),
});

export const methods = pgTable('methods', {
	id: serial('id').primaryKey(),
	slug: text('slug').notNull().unique(),
	name: text('name').notNull(),
});

export const decorations = pgTable('decorations', {
	id: serial('id').primaryKey(),
	slug: text('slug').notNull().unique(),
	name: text('name').notNull(),
});

export const tags = pgTable('tags', {
	id: serial('id').primaryKey(),
	slug: text('slug').notNull().unique(),
	name: text('name').notNull(),
});

export const ingredients = pgTable('ingredients', {
	id: serial('id').primaryKey(),
	slug: text('slug').notNull().unique(),
	name: text('name').notNull(),
	kind: text('kind').notNull().default('ingredient'),
	defaultUnit: text('default_unit').notNull().default('g'),
}, (table) => [
	check('ingredients_kind_check', sql`${table.kind} IN ('ingredient', 'garnish')`),
	check('ingredients_default_unit_check', sql`${table.defaultUnit} IN ('g', 'kg', 'ml', 'l', 'cl', 'oz', 'tbsp', 'tsp', 'dash', 'pc')`),
]);
