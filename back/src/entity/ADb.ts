
import { Entity, Column, PrimaryColumn } from "typeorm"
import { AGroup, AModelRevision } from "./AType"

@Entity({ name: 'a_db' })
export class ADb {

    @PrimaryColumn({ length: 36, name: 'db_id' })
    dbId: string

    @PrimaryColumn("int")
    asn: number

    @PrimaryColumn({ length: 128, name: 'db_name' })
    dbName: string

    @Column({ name: 'submit_desc', length: 128 })
    submitDesc: string

    @Column({ name: 'create_by', length: 128 })
    createBy: string

    @Column({ type: 'bigint', name: 'create_time' })
    createTime: number

    @Column({ length: 36, name: 'root_group' })
    rootGroup: string

    @Column({ type: 'json', name: 'root_children' })
    rootChildren: AGroup[]

    @Column({ type: "json", name: 'model_revision' })
    modelRevision: AModelRevision[]

}
