import getDomain from "@/app/lib/getDomain";
import BlogCard from "./card";

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
    
    const data = await getData()
    // console.log(data);
    const items = data && data.item ? [...data.item] : []

    return <main>
        <div>
            <h1>
                Hello World From Dynamic Page
            </h1>
            <h3>
                {/* <h3>Object</h3> */}
                {/* {data && JSON.stringify(data)} */}
                <h3>POSTS</h3>
                {items && items.map((item, idx) => {
                    {/* return <li key={`post-${idx}`}>
                        {item.title}
                    </li>
                     */}
                    return <BlogCard title={item.title} key={`post-${idx}`} /> 
                })}
            </h3>
        </div>
    </main>;

}