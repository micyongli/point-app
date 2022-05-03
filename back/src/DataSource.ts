import { FastifyInstance } from "fastify"
import { readFileSync } from "fs"
import { opendir } from "fs/promises"
import "reflect-metadata"
import { DataSource } from "typeorm"
import { ST } from "./ArisReport/map/symbo_type_map"
import { ADb } from "./entity/ADb"
import { ADef } from "./entity/ADef"
import { AModel } from "./entity/AModel"
import { ASymbol } from "./entity/ASymbol"

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3316,
    username: "root",
    password: "1",
    database: "point-app",
    synchronize: true,
    logging: false,
    entities: [ADef, AModel, ADb, ASymbol],
    migrations: [],
    subscribers: [],
});

export const entityManager = () => AppDataSource.createEntityManager();

function getKeyByVal(m, v) {
    for (let x in m) {
        if (v === m[x]) {
            return x;
        }
    }
    return '';
}

export async function initDataSource(fastify: FastifyInstance) {
    fastify.log.debug('init data source begin');
    await AppDataSource.initialize();
    if (!fastify.hasDecorator('entityManager')) {
        fastify.log.debug('decorator entityManager set');
        await fastify.decorate('entityManager', entityManager());
    }
    fastify.log.debug('init data srouce end.');
    await initSymbols(fastify);
}

export async function initSymbols(fastify: FastifyInstance) {
    const asymbol = fastify.entityManager.getRepository(ASymbol);
    if (await asymbol.count() === 0) {
        const timeStart = Date.now();
        const datDir = './src/init/AMF/';
        const curDir = await opendir(datDir);
        for await (const f of curDir) {
            if (f.isFile() && f.name.endsWith('.amf')) {
                const id = parseInt(f.name.split('.')[0], 10);
                const symbol = new ASymbol();
                symbol.symbolId = id;
                symbol.symbolType = getKeyByVal(ST, id);
                symbol.symbolContent = readFileSync(datDir + f.name).toString();
                await asymbol.insert(symbol);
            }
        }
        fastify.log.debug(`init symbols completed. time: ${Date.now() - timeStart} ms`);
    } else {
        fastify.log.debug(`init symbols completed.`);
    }
}

