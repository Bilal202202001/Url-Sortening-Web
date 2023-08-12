import { relations } from 'drizzle-orm'
import {uniqueIndex,timestamp, text, pgTable,serial, varchar, integer} from 'drizzle-orm/pg-core'

export const LinksTable = pgTable("links",{
    id : serial('id').primaryKey().notNull(),
    url : text('url').notNull(),
    short: varchar("short"),
    userID: integer("user_id").references(()=>UsersTable.id), 
    createdAt: timestamp('createdAt').defaultNow()
})

export const VisitsTable = pgTable("visits",{
    id : serial('id').primaryKey().notNull(),
    linkID: integer("link_id").notNull().references(()=>LinksTable.id), 
    createdAt: timestamp('createdAt').defaultNow()

})

export const UsersTable = pgTable("users",{
    id : serial('id').primaryKey().notNull(),
    userName: varchar("userName").notNull(),
    password: varchar("password").notNull(),
    email: varchar("email").notNull(),
    createdAt: timestamp('createdAt').defaultNow()
},(users)=>{
    return {
        userNameIndex : uniqueIndex("usernameindex_idx").on(users.userName)
    }
})

export const LinksTableRelations = relations(LinksTable, ({many,one})=>({
    visits : many(VisitsTable),
    user : one(UsersTable,{
        fields: [LinksTable.userID],
        references: [UsersTable.id] 
    })
}))
export const VisitsTableRelations = relations(VisitsTable, ({many,one})=>({
    link : one(LinksTable,{
        fields: [VisitsTable.linkID],
        references: [LinksTable.id] 
    })
}))
export const UserTableRelations = relations(UsersTable, ({many,one})=>({
    links : many(LinksTable)
}))
