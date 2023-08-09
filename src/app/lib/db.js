import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from 'drizzle-orm/neon-http'
import { LinksTable, VisitsTable } from "./schema";
import { desc, eq, sql as sqld } from "drizzle-orm";
import randomShortStrings from "./randomShortStrings";
import * as schema from './schema'

neonConfig.fetchConnectionCache = true;
const sql = neon(process.env.DATABASE_URL)
const db = drizzle(sql, { schema })

// console.log(sql`SELECT NOW()`);

export async function helloWorld() {
    const start = new Date()
    const [dbResponse] = await sql`SELECT NOW();`
    const dbNow = dbResponse && dbResponse.now ? dbResponse.now : ""
    const end = new Date()
    return { dbNow: dbNow, Latency: Math.abs(end - start) }
}




async function configureDB() {
    const dbResponse = await sql`CREATE TABLE IF NOT EXISTS "links" (
        "id" serial PRIMARY KEY NOT NULL,
        "url" text NOT NULL,
        "short" varchar,
        "createdAt" timestamp DEFAULT now()
    )`

    console.log("DB response : ", dbResponse);
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS "url_idx" ON "links" ((LOWER(url)));`
    await sql`CREATE TABLE IF NOT EXISTS "visits" (
            "id" serial PRIMARY KEY NOT NULL,
            "link_id" integer NOT NULL,
            "createdAt" timestamp DEFAULT now()
        );`
    await sql`
        DO $$ BEGIN
         ALTER TABLE "visits" ADD CONSTRAINT "visits_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE no action ON UPDATE no action;
        EXCEPTION
         WHEN duplicate_object THEN null;
        END $$;`
}

configureDB().catch(err => console.log("Error while config : ", err))

export async function addLink(url) {
    const shortUrl = randomShortStrings()
    const newLink = { url: url, short: shortUrl }
    let response
    let responseStatus = 400
    try {
        response = await db.insert(LinksTable).values(newLink).returning()
        responseStatus = 201

    } catch ({ name, message }) {
        if (`${message}`.includes("duplicate key value violates unique constraint")) {
            response = [{ message: `${url} has already been Added, Please Try Again...!` }]
        } else {

            response = [{ message: `${url} is not Valid, Please Try Again...!` }]
        }
    }
    return { responseData: response, responseStatus: responseStatus }
}

export async function getLink(limit, offset) {
    const lookuoLimit = limit ? limit : 10
    const loopupOffset = offset ? offset : 0

    return await db.select().from(LinksTable).limit(lookuoLimit).offset(loopupOffset).orderBy(desc(LinksTable.createdAt))
    // {
    //     id: LinksTable.id,
    //     url: LinksTable.url
    // }
}

export async function getShortUrlRecord(shortUrl) {
    return await db.select().from(LinksTable).where(eq(LinksTable.short, shortUrl))
}


export async function saveLinkVisits(linkIDValue) {
    return await db.insert(VisitsTable).values({ linkID: linkIDValue })
}


export async function getLinkAndVisits(limit, offset) {
    const lookuoLimit = limit ? limit : 10
    const loopupOffset = offset ? offset : 0

    return await db.query.LinksTable.findMany({
        limit: lookuoLimit,
        offset: loopupOffset,
        columns: {
            url: true,
            short: true

        },
        with: {
            visits: {
               columns : {
                createdAt : true
               }
            }
        },
        extras: {
            count: sqld`count(${VisitsTable.id})`.as('count')
        },
        orderBy: [desc(LinksTable.createdAt)]
    })
    // return await db.select().from(LinksTable).limit(lookuoLimit).offset(loopupOffset).orderBy(desc(LinksTable.createdAt))
}