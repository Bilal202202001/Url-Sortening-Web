'use client'
import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function LinkHTMLTable() {
    const endpoint = "/api/links";
    const { data, error, isloading } = useSWR(endpoint, fetcher,{refreshInterval: 1000})

    // fetcher(myGitHubRepoProfile).then(data => console.log(data));

    if (error) return "An Error Occured"
    if (isloading) return "Loading.....!"

    return <div>
    <h1>FETCHED DATA FROM NEOM DB</h1>
    <table>
        <thead>
            <tr>
            <td>ID</td>
            <td style={{paddingLeft:'100px'}}>URL</td>
            </tr>
            
        </thead>
        <tbody>
    {data && data.map((link,idx)=>{
        return <tr key={`link-item-${link.id}-${idx}`}>

                <td>{link.id}</td>
                <td style={{paddingLeft:'60px'}}>{link.url}</td>

                </tr>
    })}

        </tbody>
    </table>
</div>
}





// import { getLink } from "../lib/db";
// export default async function LinkHTMLTable() {

//     const LinksResponse = await getLink()

//     return <div>
//         <h1>FETCHED DATA FROM NEOM DB</h1>
//         <table>
//             <thead>
//                 <tr>
//                 <td>ID</td>
//                 <td style={{paddingLeft:'100px'}}>URL</td>
//                 </tr>
                
//             </thead>
//             <tbody>
//         {LinksResponse && LinksResponse.map((link,idx)=>{
//             return <tr key={`link-item-${link.id}-${idx}`}>

//                     <td>{link.id}</td>
//                     <td style={{paddingLeft:'60px'}}>{link.url}</td>

//                     </tr>
//         })}

//             </tbody>
//         </table>
//     </div>
// }