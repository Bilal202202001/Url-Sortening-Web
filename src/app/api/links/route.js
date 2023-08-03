import isValidURL from "@/app/lib/isValidURL";
import { NextResponse } from "next/server";

export async function POST(request){

    // const contentType = await request.headers.get("content-type")
    // console.log(contentType);

    // if(contentType !== "application/json")
    // {
    //     return NextResponse.json({"error" : "Invalid Request"},{status : 400})
    // }

    const data = await request.json()
    const url = data && data.url ? data.url : null
    const validURL = await isValidURL(url, ["jref.io"])
    if(!validURL){
        return NextResponse.json({"error" : `${url} is Invalid URL` },{status : 400})
    } 
    return NextResponse.json(data,{status : 201})
}

