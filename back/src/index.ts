import { AppDataSource, entityManager } from "./data-source";
import { opendir, open, readFile } from 'fs/promises';
import { ASymbol } from "./entity/ASymbol";
import path = require("path");
import { readFileSync } from "fs";
import { ST } from './ArisReport/map/symbo_type_map';

const fastify = require('fastify')({ logger: true });
// Declare a route
fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start();

const getKeyByVal = (m, v) => {
    for (let x in m) {
        if (v === m[x]) {
            return x;
        }
    }
    return '';
};

AppDataSource.initialize().then(async () => {

    const asymbol = entityManager().getRepository(ASymbol);
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
        console.log(`初始化符号完毕。[ using: ${Date.now() - timeStart} ms]`);
    }


}).catch(error => console.log(error))
