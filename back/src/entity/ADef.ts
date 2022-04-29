import { type } from "os"
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"

@Entity({ name: 'a_def' })
export class ADef {

    @PrimaryColumn({ length: 36 })
    dbId: string

    @PrimaryColumn({ length: 36, name: 'db_id' })
    id: string

    @Column({ name: 'def_name', length: 128 })
    defName: string

    @Column({ length: 128, name: 'def_type' })
    defType: string

    @Column("int")
    ver: number

    @Column("int")
    asn: number

    @Column("json")
    attr: {}

    @Column({ type: 'json' })
    occ: {}

    @Column({})
    groupId: string

    @Column("json")
    assign: {}

}
