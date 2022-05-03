
import {Entity, Column, PrimaryColumn} from "typeorm"
import {AAttr, AOcc} from "./ADb";

@Entity({name: 'a_connect'})
export class AConnect {

    @PrimaryColumn({length: 36, name: 'db_id'})
    dbId: string

    @PrimaryColumn("int")
    asn: number

    @Column({length: 36, name: 'source_id'})
    sourceId: string

    @Column({length: 36, name: 'target_id'})
    targetId: string


    @Column("json")
    attr: AAttr[]

    @Column("json")
    occ: AOcc[]

}
