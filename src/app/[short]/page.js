import {notFound} from 'next/navigation'
import { getShortUrlRecord } from "../lib/db"

export default async function ShortPage({params}){
    const {short} = params
    const [record] = await getShortUrlRecord(short)
    if(!record){
        notFound()
    }
    return <>
    
            {JSON.stringify(record)}
    </>
}