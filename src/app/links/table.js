import { getLink } from "../lib/db";

export default async function LinkHTMLTable() {

    const LinksResponse = await getLink()

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
        {LinksResponse && LinksResponse.map((link,idx)=>{
            return <tr key={`link-item-${link.id}-${idx}`}>

                    <td>{link.id}</td>
                    <td style={{paddingLeft:'60px'}}>{link.url}</td>

                    </tr>
        })}

            </tbody>
        </table>
    </div>
}