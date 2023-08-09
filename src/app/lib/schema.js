import { relations } from 'drizzle-orm'
import {uniqueIndex,timestamp, text, pgTable,serial, varchar, integer} from 'drizzle-orm/pg-core'

export const LinksTable = pgTable("links",{
    id : serial('id').primaryKey().notNull(),
    url : text('url').notNull(),
    short: varchar("short"),
    createdAt: timestamp('createdAt').defaultNow()
}, (links)=>{
    return{
        urlIndex: uniqueIndex("url_idx").on(links.url)
    }
})


export const LinksTableRelations = relations(LinksTable, ({many,one})=>({
    visits : many(VisitsTable)
}))


export const VisitsTable = pgTable("visits",{
    id : serial('id').primaryKey().notNull(),
    linkID: integer("link_id").notNull().references(()=>LinksTable.id), 
    createdAt: timestamp('createdAt').defaultNow()

})

export const VisitsTableRelations = relations(VisitsTable, ({many,one})=>({
    link : one(LinksTable,{
        fields: [VisitsTable.linkID],
        references: [LinksTable.id] 
    })
}))