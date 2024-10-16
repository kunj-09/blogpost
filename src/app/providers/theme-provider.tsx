'use client'

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import * as React from "react";

export default function NextThemeProvider({children} : {children : ReactNode}){
    return <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">{children}</ThemeProvider>
}