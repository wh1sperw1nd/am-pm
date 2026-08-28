import Fastify from 'fastify';
import { db } from './db';
import { glasses } from './db/schema';

const fastify = Fastify({ logger: true });

fastify.get('/glasses', async () => {
	return db.select().from(glasses);
});

fastify.listen({ port: 3000 }, (err) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
});
