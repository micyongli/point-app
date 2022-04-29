import { type } from "os"
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"

@Entity({ name: 'a_model' })
export class AModel {

    @PrimaryColumn({ length: 36, name: 'db_id' })
    dbId: string

    @PrimaryColumn({ length: 36 })
    id: string

    @PrimaryColumn({ length: 36, name: 'group_id' })
    groupId: string

    @Column({ name: 'model_name', length: 128 })
    modelName: string

    @Column({ length: 128, name: 'mode_type' })
    modelType: string

    @Column("int")
    ver: number

    @Column("int")
    asn: number

    @Column("json")
    attr: {}

    @Column({ type: 'json' })
    occ: {}

}
