import { NextRequest, NextResponse } from "next/server";


export async function PUT(request : NextRequest){
    try {
        
    } catch (e) {
        console.log(e)

        return NextResponse.json({
            success : false,
            message : 'Something went wrong! Please try again'
        })
    }
}