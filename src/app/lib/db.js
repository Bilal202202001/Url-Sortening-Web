import { neon, neonConfig } from "@neondatabase/serverless";
import {drizzle} from 'drizzle-orm/neon-http'
import { LinksTable } from "./schema";
import { desc } from "drizzle-orm";
 
neonConfig.fetchConnectionCache = true;
const sql = neon(process.env.DATABASE_URL)
const db = drizzle(sql)

// console.log(sql`SELECT NOW()`);

export async function helloWorld(){
    const start = new Date()
    const [dbResponse] = await sql`SELECT NOW();`
    const dbNow = dbResponse && dbResponse.now ? dbResponse.now : ""
    const end =  new Date()
    return {dbNow: dbNow, Latency: Math.abs(end-start)}
}




async function configureDB(){
    const dbResponse = await sql `CREATE TABLE IF NOT EXISTS "links"( 
        "id" serial PRIMARY KEY NOT NULL,
        "url" text NOT NULL,
        "created_at" timestamp DEFAULT now()
      )`
   console.log("DB response : " , dbResponse);
}

configureDB().catch(err=>console.log("Error while config : ", err))

export async function addLink(url){
   const newLink = {url : url}
   return await db.insert(LinksTable).values(newLink).returning()

}

export async function getLink(limit,offset){
    const lookuoLimit = limit ? limit : 10
    const loopupOffset = offset ? offset : 0

    return await db.select().from(LinksTable).limit(lookuoLimit).offset(loopupOffset).orderBy(desc(LinksTable.createdAt))
    // {
    //     id: LinksTable.id,
    //     url: LinksTable.url
    // }
 }