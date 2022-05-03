/*
 * @Author: micyongli@163.com 
 * @Date: 2022-04-29 15:57:53 
 * @Last Modified by: micyongli@163.com
 * @Last Modified time: 2022-04-29 15:58:29
 */

import { Entity, Column, PrimaryColumn, Index } from "typeorm"

@Entity({ name: 'a_def' })
@Index(["dbId", "defId", "ver", "asn"], { unique: true })
export class ADef {

    @PrimaryColumn({ length: 36, name: 'db_id' })
    dbId: string
    @PrimaryColumn({ length: 36, name: 'def_id' })
    defId: string

    @Column({ name: 'def_name', length: 128 })
    defName: string

    @Column({ length: 64, name: 'def_type' })
    defType: string

    @Column("int")
    ver: number

    @Column("int")
    asn: number

    @Column("json")
    attr: {}

    @Column({ type: 'json' })
    occ: {}

    @Column()
    groupId: string

    @Column("json")
    assign: {}

}
