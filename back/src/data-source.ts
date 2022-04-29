/*
 * @Author: micyongli@163.com 
 * @Date: 2022-04-29 16:01:42 
 * @Last Modified by:   micyongli@163.com 
 * @Last Modified time: 2022-04-29 16:01:42 
 */
import "reflect-metadata"
import { DataSource } from "typeorm"
import { AConnect } from "./entity/AConnect"
import { ADb } from "./entity/ADb"
import { ADef } from "./entity/ADef"
import { AGroup } from "./entity/AGroup"
import { AModel } from "./entity/AModel"
import { ASymbol } from "./entity/ASymbol"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3316,
    username: "root",
    password: "1",
    database: "point_app",
    synchronize: true,
    logging: false,
    entities: [ADef, AModel, AGroup, ADb, ASymbol, AConnect],
    migrations: [],
    subscribers: [],
    multipleStatements: true,
    trace: true,
    supportBigNumbers: true,
});
export const entityManager = () => AppDataSource.createEntityManager();
