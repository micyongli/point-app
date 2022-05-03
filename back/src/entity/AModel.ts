/*
 * @Author: micyongli@163.com 
 * @Date: 2022-04-29 15:58:00 
 * @Last Modified by: micyongli@163.com
 * @Last Modified time: 2022-04-29 15:58:35
 */

import { Entity, Column, PrimaryColumn, Index } from "typeorm"

@Entity({ name: 'a_model' })
@Index(["dbId", "groupId", "modelType", "modelId", "ver", "asn"])
export class AModel {

    @PrimaryColumn({ length: 36, name: 'db_id' })
    dbId: string

    @PrimaryColumn({ length: 36, name: 'group_id' })
    groupId: string

    @PrimaryColumn({ length: 36 })
    modelId: string

    @Column({ name: 'model_name', length: 128 })
    modelName: string

    @Column({ length: 64, name: 'mode_type' })
    modelType: string

    @Column("int")
    ver: number

    @Column("int")
    asn: number

    @Column("json")
    attr: {}

    @Column("json")
    occ: {}

}
