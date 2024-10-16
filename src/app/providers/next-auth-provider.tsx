'use client'  // This component will be used on Client side isliye esa likna padta ha otherwise Nextjs me byDefault woh component sever ke side use karta hai Samjo 

import { ReactNode } from "react"
import {SessionProvider } from "next-auth/react";

export default function NextAuthProvider({children} : {children : ReactNode}){
    return <SessionProvider>{children}</SessionProvider>;
}
