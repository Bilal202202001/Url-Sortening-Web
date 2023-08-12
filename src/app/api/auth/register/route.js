import isValidURL from "@/app/lib/isValidURL";
import { NextResponse } from "next/server";
import { addLink, registerUser } from "@/app/lib/db";
import { getLink,getLinkAndVisits } from "@/app/lib/db";
import { setSessionUser } from "@/app/lib/session";

// export async function GET(request){
//     const link = await getLink(100,0);
//     return NextResponse.json(link,{status:200})
// }

// export async function GET(request){
//     await setSessionUser(1)
//     const link = await getLinkAndVisits(100,0);
//     return NextResponse.json(link,{status:200})
// }


export async function POST(request){

    const data = await request.json()
    console.log("Register : ",data);

    const {userName,email,password,cnfrmPassword} = data

    if(password != cnfrmPassword){
        return NextResponse.json({"Message" : `Passwords Must Match` },{status : 400})
    }

    // if(!username || !password){
    //     return NextResponse.json({"Message" : `Must Enter Username and Password` },{status : 400})
    // }

    const toSaveData = {
        userName : data.userName,
        password : data.password
    }
    if(email){
        toSaveData["email"] = data.email
    }
    console.log("To save : ",toSaveData);
    const dbResponse = await registerUser(toSaveData)
    const {responseData, responseStatus} = dbResponse
    return NextResponse.json(responseData,{status : responseStatus})

    // const url = data && data.url ? data.url : null
    // const validURL = false
    // if(!validURL){
    //     return NextResponse.json({"error" : `${url} is Invalid URL` },{status : 400})
    // } 
    // const dbResponse = await addLink(url)
}

