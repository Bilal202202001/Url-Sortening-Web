import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from 'drizzle-orm/neon-http'
import { LinksTable, VisitsTable,UsersTable } from "./schema";
import { desc, eq, sql as sqld } from "drizzle-orm";
import randomShortStrings from "./randomShortStrings";
import * as schema from './schema'
import { getSessionUser } from "./session";
import { hashPassword } from "./passwordUtils";

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
    await sql`CREATE TABLE IF NOT EXISTS "links" (
        "id" serial PRIMARY KEY NOT NULL,
        "url" text NOT NULL,
        "short" varchar,
        "user_id" integer,
        "createdAt" timestamp DEFAULT now()
    );`
    // const dbResponse = 
    // console.log("DB response : ", dbResponse);

    await sql`CREATE TABLE IF NOT EXISTS "users" (
        "id" serial PRIMARY KEY NOT NULL,
        "userName" varchar NOT NULL,
        "createdAt" timestamp DEFAULT now()
    );`

    await sql`CREATE TABLE IF NOT EXISTS "visits" (
        "id" serial PRIMARY KEY NOT NULL,
        "link_id" integer NOT NULL,
        "createdAt" timestamp DEFAULT now()
    );`

    await sql`DO $$ BEGIN
 ALTER TABLE "links" ADD CONSTRAINT "links_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;`
    await sql`DO $$ BEGIN
    ALTER TABLE "visits" ADD CONSTRAINT "visits_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE no action ON UPDATE no action;
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;`

//    await sql `ALTER TABLE "users" ADD COLUMN "password" varchar NOT NULL;`

//    await sql `ALTER TABLE "users" ADD COLUMN "email" varchar NOT NULL;`
   
   await sql `CREATE UNIQUE INDEX IF NOT EXISTS "usernameindex_idx" ON "users" ("userName");`

}

configureDB().catch(err => console.log("Error while config : ", err))


// Links Portion
export async function addLink(url) {
    const shortUrl = randomShortStrings()
    const newLink = { url: url, short: shortUrl }
    const user = await getSessionUser()
    if(user){
        newLink["userID"] = user
    }
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



// Users Portion

export async function registerUser(newUserData) {
    const {userName,password,email} = newUserData
    console.log("In DB : ",password);
    const toInsertData = {
        userName: userName,
        password: hashPassword(password)
    }
    if(email){
        toInsertData["email"] = email
    }
    console.log("To Inser : ",toInsertData);
    
    let response = [{message: "Failed to register. Please try Again"}]
    let responseStatus = 400
    try {
        response = await db.insert(UsersTable).values(toInsertData).returning()
        responseStatus = 201

    } catch ({ name, message }) {
        if (`${message}`.includes("User Name is Taken, Please Try Some Other...!")) {
            response = [{ message: `${url} has already been Added, Please Try Again...!` }]
        } else {

            response = [{ message: `Please Try Some Other...!` }]
        }
    }
    return { responseData: response, responseStatus: responseStatus }
}

export async function getUserByUsername(username) {
    return await db.select().from(UsersTable).where(eq(UsersTable.userName,username))
}

export async function getUserByUserID(userID) {
    return await db.select({
        userName : UsersTable.userName
    }).from(UsersTable).where(eq(UsersTable.id,userID))
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
    const sessionID = await getSessionUser()

    return await db.query.LinksTable.findMany({
        limit: lookuoLimit,
        offset: loopupOffset,
        columns: {
            url: true,
            short: true,
            userID: true

        },
        where: eq(LinksTable.userID, sessionID),
        with: {
            visits: {
                columns: {
                    createdAt: true
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