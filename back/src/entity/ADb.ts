import { type } from "os"
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Index } from "typeorm"

@Entity({ name: 'a_db' })
@Index(["dbId", "asn","groupRoot"], { unique: true })
export class ADb {

    @PrimaryColumn({ length: 36, name: 'db_id' })
    dbId: string

    @PrimaryColumn({ length: 128, name: 'db_name' })
    dbName: string

    @Column("int")
    asn: number

    @Column("json")
    attr: {}

    @Column({ name: 'group_root' })
    groupRoot: string;

}
