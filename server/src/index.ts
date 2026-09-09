import Fastify from 'fastify';
import cors from '@fastify/cors';
import { desc, eq } from 'drizzle-orm';
import { db } from './db';
import {
	baseDrinks,
	cocktailTypes,
	decorations,
	glasses,
	glassTypeCompatibility,
	ingredients,
	methods,
	recipes,
	strengths, tags,
	typeStrengthCompatibility,
	cups,
	coffeeTypes,
	coffeeMethods,
	cupTypeCompatibility
} from './db/schema';

const slugify = (name: string) =>
	name
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '_')
		.replace(/^_+|_+$/g, '');

const fastify = Fastify({ logger: true });

await fastify.register(cors, {
	origin: 'http://localhost:5173',
	methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
});

fastify.get('/glasses', async () => {
	return db.select().from(glasses);
});

fastify.get('/cocktail-types', async () => {
	return db.select().from(cocktailTypes);
});

fastify.get('/strength', async () => {
	return db.select().from(strengths);
});

fastify.get('/base-drinks', async () => {
	return db.select().from(baseDrinks);
});

fastify.get('/methods', async () => {
	return db.select().from(methods);
});

fastify.get('/decorations', async () => {
	return db.select().from(decorations);
});

fastify.get('/tags', async () => {
	return db.select().from(tags);
});

fastify.get('/ingredients', async () => {
	return db.select().from(ingredients);
});

fastify.post<{ Body: { name: string; kind?: 'ingredient' | 'garnish'; defaultUnit?: string; defaultAmount?: string } }>(
	'/ingredients',
	async (request, reply) => {
		const { name, kind, defaultUnit, defaultAmount } = request.body;

		if (!name?.trim()) {
			await reply.code(400);
			return { message: 'name is required' };
		}

		const slug = slugify(name);

		try {
			const [created] = await db
				.insert(ingredients)
				.values({ slug, name: name.trim(), kind, defaultUnit, defaultAmount })
				.returning();

			await reply.code(201);
			return created;
		} catch (error) {
			// Two near-simultaneous requests for the same new name can both miss the
			// client's local catalog cache and race to insert the same slug; treat a
			// unique-constraint hit as "already exists" and hand back that row instead of erroring.
			if (error instanceof Error && error.message.includes('ingredients_slug_unique')) {
				const [existing] = await db.select().from(ingredients).where(eq(ingredients.slug, slug));
				if (existing) return existing;
			}
			throw error;
		}
	},
);

fastify.patch<{ Params: { id: string }; Body: { name?: string; kind?: 'ingredient' | 'garnish'; defaultUnit?: string; defaultAmount?: string } }>(
	'/ingredients/:id',
	async (request, reply) => {
		const id = Number(request.params.id);
		const { name, kind, defaultUnit, defaultAmount } = request.body;

		if (name !== undefined && !name.trim()) {
			await reply.code(400);
			return { message: 'name cannot be empty' };
		}

		const [updated] = await db
			.update(ingredients)
			.set({
				...(name !== undefined && { name: name.trim(), slug: slugify(name) }),
				...(kind !== undefined && { kind }),
				...(defaultUnit !== undefined && { defaultUnit }),
				...(defaultAmount !== undefined && { defaultAmount }),
			})
			.where(eq(ingredients.id, id))
			.returning();

		if (!updated) {
			await reply.code(404);
			return { message: 'ingredient not found' };
		}

		return updated;
	},
);

fastify.get('/glass-type-compatibility', async () => {
	const rows = await db
		.select({
			glassSlug: glasses.slug,
			typeSlug: cocktailTypes.slug,
		})
		.from(glassTypeCompatibility)
		.innerJoin(glasses, eq(glassTypeCompatibility.glassId, glasses.id))
		.innerJoin(cocktailTypes, eq(glassTypeCompatibility.typeId, cocktailTypes.id));

	const map: Record<string, string[]> = {};
	for (const row of rows) {
		(map[row.glassSlug] ??= []).push(row.typeSlug);
	}
	return map;
});

fastify.get('/type-strength-compatibility', async () => {
	const rows = await db
		.select({
			typeSlug: cocktailTypes.slug,
			strengthSlug: strengths.slug,
		})
		.from(typeStrengthCompatibility)
		.innerJoin(cocktailTypes, eq(typeStrengthCompatibility.typeId, cocktailTypes.id))
		.innerJoin(strengths, eq(typeStrengthCompatibility.strengthId, strengths.id));

	const map: Record<string, string[]> = {};
	for (const row of rows) {
		(map[row.typeSlug] ??= []).push(row.strengthSlug);
	}
	return map;
});

fastify.get('/strength-base-compatibility', async () => {
	const rows = await db
		.select({
			strengthSlug: strengths.slug,
			baseSlug: baseDrinks.slug,
		})
		.from(baseDrinks)
		.innerJoin(strengths, eq(baseDrinks.strengthId, strengths.id));

	const map: Record<string, string[]> = {};
	for (const row of rows) {
		(map[row.strengthSlug] ??= []).push(row.baseSlug);
	}
	return map;
});

fastify.get('/recipes', async () => {
	return db.select().from(recipes).orderBy(desc(recipes.createdAt));
});

fastify.post<{ Body: { description?: { name?: string } } & Record<string, unknown> }>(
	'/recipes',
	async (request, reply) => {
		const payload = request.body;
		const name = payload.description?.name?.trim();

		if (!name) {
			await reply.code(400);
			return { message: 'description.name is required' };
		}

		const [created] = await db
			.insert(recipes)
			.values({ name, payload })
			.returning();

		await reply.code(201);
		return created;
	},
);

fastify.listen({ port: 3000 }, (err) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
});


fastify.get('/cups', async () => {
	return db.select().from(cups);
});

fastify.get('/coffee-types', async () => {
	return db.select().from(coffeeTypes);
});

fastify.get('/coffee-methods', async () => {
	return db.select().from(coffeeMethods);
});

fastify.get('/cup-type-compatibility', async () => {
	const rows = await db
		.select({
			cupSlug: cups.slug,
			typeSlug: coffeeTypes.slug,
		})
		.from(cupTypeCompatibility)
		.innerJoin(cups, eq(cupTypeCompatibility.cupId, cups.id))
		.innerJoin(coffeeTypes, eq(cupTypeCompatibility.typeId, coffeeTypes.id));

	const map: Record<string, string[]> = {};
	for (const row of rows) {
		(map[row.cupSlug] ??= []).push(row.typeSlug);
	}
	return map;
});
