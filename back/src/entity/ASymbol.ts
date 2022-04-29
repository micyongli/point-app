import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity({ name: 'a_symbol' })
export class ASymbol {

    @PrimaryColumn({ type: 'int' })
    id: number

    @Column({ type: 'longblob' })
    symbol: string

    @Column({ name: 'symbol_type', length: 128 })
    symbolType: string

    @Column("json")
    attr: {}

}
