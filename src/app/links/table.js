import { getLink } from "../lib/db";

export default async function LinkHTMLTable() {

    const LinksResponse = await getLink()

    return <div>
        <h1>FETCHED DATA FROM NEOM DB</h1>
        {LinksResponse && JSON.stringify(LinksResponse)}
    </div>
}