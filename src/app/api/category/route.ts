import prisma from "@/database";
import { NextRequest, NextResponse } from "next/server";




export async function GET(request: NextRequest){
    try {
        const {searchParams} = new URL(request.url);//searchParams is used to extract or manipulate query parameters from a URL.For example, in the URL https://example.com/posts?categoryID=5, the query parameter is categoryID=5. Using searchParams.get('categoryID') allows you to fetch the value of categoryID, which in this case would be 5.

        
        const extractCategoryID = searchParams.get('categoryID');

        const getBlogPostListBasedOnCurrentcategoryId = await prisma.post.findMany({
                where:{
                    category: extractCategoryID || ''
                }
        })
        if(getBlogPostListBasedOnCurrentcategoryId){
            return NextResponse.json({
                success: true,
                data: getBlogPostListBasedOnCurrentcategoryId
            })
        }else{
            return NextResponse.json({
                success: false,
                messagge: 'Failed to fetch data! Please try again'
            })
        }

    } catch (error) {
        console.log(error);

        return NextResponse.json({
            success : false,
            message : "Something went wrong ! Please try again"
        })
    }
}