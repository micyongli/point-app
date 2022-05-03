import { Entity, Column, PrimaryColumn, Index } from "typeorm"
import { AAttr, ACxnOcc, AOcc } from "./AType"

@Entity({ name: 'a_model' })
export class AModel {

    @PrimaryColumn({ length: 36, name: 'db_id' })
    dbId: string

    @PrimaryColumn("int")
    asn: number

    @PrimaryColumn({ length: 36, name: 'group_id' })
    groupId: string

    @PrimaryColumn({ length: 36, name: 'model_id' })
    modelId: string

    @Column({ name: 'model_name', length: 128 })
    modelName: string

    @Column({ length: 64, name: 'mode_type' })
    modelType: string

    @Column("int")
    revision: number

    @Column("json")
    attr: AAttr[]

    @Column({ type: "json", name: 'obj_occ' })
    objOcc: AOcc[]

    @Column({ type: 'json', name: 'cxn_occ' })
    cxnOcc: ACxnOcc[]

}