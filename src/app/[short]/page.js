import {notFound,redirect} from 'next/navigation'
import { getShortUrlRecord } from "../lib/db"

export default async function ShortPage({params}){
    const {short} = params
    const [record] = await getShortUrlRecord(short)
    const {url} = record
    if(!record){
        notFound()
    }
    
    if(!short){
        notFound()
    }

    
    if(!url){
        notFound()
    }
    // return <>
    //         {JSON.stringify(record)}
    // </>
    redirect(url,"push")
}