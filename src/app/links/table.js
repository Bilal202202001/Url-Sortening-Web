'use client'
import useSWR from "swr"
import LinksCreateForm from "./createForm";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function LinkHTMLTable() {
    const endpoint = "/api/links";
    const { data, error, isloading, mutate } = useSWR(endpoint, fetcher)

    // fetcher(myGitHubRepoProfile).then(data => console.log(data));

    if (error) return "An Error Occured"
    if (isloading) return "Loading.....!"
    const didSubmit=(newItem)=>{
        mutate()
    }
        return <>
        <LinksCreateForm didSubmit = {didSubmit}/>
        <div>
        <table class="table-auto border-separate border rounded-2xl border-slate-400 p-3">
        <caption class="caption-top">
    Shortened Links
  </caption>
            <thead>
                <tr className="">
                <th className="p-4 border-b-2 border-slate-300">SHORT</th>
                <th className="p-4 border-b-2 border-slate-300" style={{paddingLeft:'100px'}}>URL</th>
                </tr>
                
            </thead>
            <tbody>
            
        {data && data.map((link,idx)=>{
                return <tr key={`link-item-${link.id}-${idx}`}>

                        <td className="p-4"><Link href='#'>{link.short}</Link></td>
                        <td  className="p-4"style={{paddingLeft:'60px'}}>{link.url}</td>
                        </tr>
            })}

                </tbody>
            </table>
            
        </div>
        </>
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