import getDomain from "@/app/lib/getDomain";
import BlogCard from "./card";
import { helloWorld } from "../lib/db";



async function getData() {

    const domain = getDomain()    
    const endpoint = `${domain}/api/posts`;

    const res = await fetch(endpoint,{next: {revalidate: 10}});
    // const res = await fetch(endpoint,{next: {cache : 'no-store'}});
    


    if (!res.ok) {
        throw new Error("Failed to Fetch Data from Endpoint");
    }

    if(res.headers.get("content-type")!== "application/json")
    {
        return {item: []}
    }

    return res.json();
}


export default async function BlogPageDetails() {
    
    const dbHello = await helloWorld()
    console.log("DB HELLO : ",dbHello);

    const data = await getData()
    // console.log(data);
    const items = data && data.item ? [...data.item] : []

    return <main>
        <div>
            <h1>
                Hello World From Dynamic Page
            </h1>
            <p>DB Response : {JSON.stringify(dbHello)}</p>
            <div>
                {/* <h3>Object</h3> */}
                {/* {data && JSON.stringify(data)} */}
                <h4>POSTS</h4>
                {items && items.map((item, idx) => {
                    {/* return <li key={`post-${idx}`}>
                        {item.title}
                    </li>
                     */}
                    return <BlogCard title={item.title} key={`post-${idx}`} /> 
                })}
            </div>
        </div>
    </main>;

}

export const runtime = 'edge'
export const preferredRegion = 'iad1'