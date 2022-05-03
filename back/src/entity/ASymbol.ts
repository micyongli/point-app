import { Entity, Column, PrimaryColumn, Index } from "typeorm"

@Entity({ name: 'a_symbol' })
@Index(['symbolType','symbolId'])
export class ASymbol {

    @PrimaryColumn({ type: 'int' })
    symbolId: number

    @Column({ type: 'longblob', name: 'symbol_content' })
    symbolContent: string

    @Column({ name: 'symbol_type', length: 64 })
    symbolType: string


}
