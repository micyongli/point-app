import { type } from "os"
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Index } from "typeorm"

@Entity({ name: 'a_model' })
@Index(["dbId","groupId","modelType","modelId","ver","asn"])
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
