'use client'

import { Blog } from "@/utils/types";


export default function CateegoryList({list} : {list : Blog[]}){
    console.log(list ,'list');

    return <div>Category List</div>
}