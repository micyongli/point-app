import {FastifyInstance, FastifyServerOptions,FastifyPluginCallback} from "fastify";
import {entityManager, initDataSource, initSymbols} from "../DataSource";

export async function register(fast: FastifyInstance, opt: FastifyServerOptions) {
    await fast.decorate('entityManager', entityManager())
    await fast.register(initDataSource)
    await initSymbols(fast)
}