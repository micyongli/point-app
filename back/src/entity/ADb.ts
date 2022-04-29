/*
 * @Author: micyongli@163.com 
 * @Date: 2022-04-29 15:58:21 
 * @Last Modified by:   micyongli@163.com 
 * @Last Modified time: 2022-04-29 15:58:21 
 */

import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Index } from "typeorm"

@Entity({ name: 'a_db' })
@Index(["dbId", "asn","groupRoot"], { unique: true })
export class ADb {

    @PrimaryColumn({ length: 36, name: 'db_id' })
    dbId: string

    @PrimaryColumn({ length: 128, name: 'db_name' })
    dbName: string

    @Column("int")
    asn: number

    @Column("json")
    attr: {}

    @Column({ name: 'group_root' })
    groupRoot: string;

}
