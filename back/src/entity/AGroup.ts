/*
 * @Author: micyongli@163.com 
 * @Date: 2022-04-29 15:57:49 
 * @Last Modified by:   micyongli@163.com 
 * @Last Modified time: 2022-04-29 15:57:49 
 */
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Index } from "typeorm"

@Entity({ name: 'a_group' })
@Index(["dbId","groupId","ver","asn"])
export class AGroup {

    @PrimaryColumn({ length: 36, name: 'db_id' })
    dbId: string

    @PrimaryColumn({ length: 36 })
    groupId: string

    @Column({ length: 128, name: 'parent', nullable: true })
    parent: string

    @Column({ name: 'model_name', length: 128 })
    groupName: string

    @Column("int")
    ver: number

    @Column("int")
    asn: number

    @Column("json")
    attr: {}

}
