import { type } from "os"
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
