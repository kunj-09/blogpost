import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database";


export async function GET(request : NextRequest){
    try {
        const getAllBlogPost = await prisma.post.findMany();
        if(getAllBlogPost && getAllBlogPost.length){
            return NextResponse.json({
                success : true,
                data : getAllBlogPost,
            })
        }
        else{
            return NextResponse.json({
                success : false,
                message : 'Failed to Fetch Blog Post! Please try again'
            })
        }
    } catch (e) {
        console.log(e)

        return NextResponse.json({
            success : false,
            message : 'Something went wrong! Please try again'
        })
    }
}