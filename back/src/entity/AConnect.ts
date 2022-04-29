/*
 * @Author: micyongli@163.com 
 * @Date: 2022-04-29 15:58:41 
 * @Last Modified by:   micyongli@163.com 
 * @Last Modified time: 2022-04-29 15:58:41 
 */

import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"

@Entity({ name: 'a_connect' })
export class AConnect {

    @PrimaryColumn({ length: 36, name: 'db_id' })
    dbId: string

    @Column({ length: 36 })
    sourceId: string

    @Column({ length: 36 })
    targetId: string

    @Column("int")
    asn: number

    @Column("json")
    attr: {}

    @Column("json")
    occ: {}

}
