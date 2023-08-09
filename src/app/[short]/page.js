import {notFound,redirect} from 'next/navigation'
import { getShortUrlRecord, saveLinkVisits} from "../lib/db"
import getDomain from '../lib/getDomain'

async function triggerVisit(linkID){
    const options = {
        method: "POST",
        handle: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({linkId:linkID})
    }
    const domain = getDomain()
    const endpoint = `${domain}/api/visits/`
    return await fetch(endpoint,options)
}



export default async function ShortPage({params}){
    const {short} = params
    const [record] = await getShortUrlRecord(short)
    const {url,id} = record
    if(!record){
        notFound()
    }
    
    if(!short){
        notFound()
    }

    
    if(!url){
        notFound()
    }
    if(id){
        await triggerVisit(id)
    }
    // return <>
    //         {JSON.stringify(record)}
    // </>
    return <h2>{url}</h2>
    // redirect(url,"push")
}