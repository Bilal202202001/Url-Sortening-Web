async function getData() {
    const endpoint = "http://localhost:3000/api/posts";
    const res = await fetch(endpoint);

    if (!res.ok) {
        throw new Error("Failed to Fetch Data from Endpoint");
    }
    return res.json();
}


export default async function BlogPageDetails(params) {

    const data = await getData()
    const items = data && data.items ? [...data.items] : []

    console.log(params);
    return <main>
        <div>
            <h1>
                Hello World From First Slug
            </h1>
            <h3>
                {items && items.map((item, idx) => {
                    return <li key={`post-${idx}`}>
                        {item.title}
                    </li>
                })}
            </h3>
        </div>
    </main>;

}