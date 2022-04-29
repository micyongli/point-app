import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"

@Entity({ name: 'a_group' })
export class AGroup {

    @PrimaryColumn({ length: 36, name: 'db_id' })
    dbId: string

    @PrimaryColumn({ length: 36 })
    id: string

    @Column({ name: 'model_name', length: 128 })
    groupName: string

    @Column({ length: 128, name: 'parent', nullable: true })
    parent: string

    @Column("int")
    ver: number

    @Column("int")
    asn: number

    @Column("json")
    attr: {}

}