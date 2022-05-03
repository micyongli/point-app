import { fastify } from 'fastify'
import { register } from "./route/register";

const server = fastify({ logger: { level: 'debug' }, pluginTimeout: -1 })

async function start() {
    await server.register(register)
    await server.listen(3000);
}

start().then();