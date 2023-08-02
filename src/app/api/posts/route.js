import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({item : [{id: "1", title: "Hello Inside Posts Route" }]});
}
