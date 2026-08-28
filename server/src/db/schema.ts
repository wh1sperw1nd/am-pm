import { pgTable, serial, text, integer, primaryKey } from 'drizzle-orm/pg-core';

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
