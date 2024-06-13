import type { Metadata } from "next"
import { Noto_Sans_TC } from "next/font/google"
import React, { useEffect, useState } from "react"
import "@/app/globals.css"
import { RootProviders } from "@/Providers/RootProvider"
import { NavBar } from "@/components/blocks/client/NavBar"
import { Toaster } from "@/components/ui/sonner"
const notoSansTC = Noto_Sans_TC({ subsets: ["latin"] })
import { GetUserProvider, UserProvider } from "@/Providers/UserProvider"
import { GithubUserModelProps } from "@/models/IssueModel";
import { getGithubUser } from "@/actions/githubOauth";
import { GetRepoProvider } from "@/Providers/RepoProvider"
export const metadata: Metadata = {
    title: "Github Blog System Lab",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${notoSansTC.className} antialiased`}>
                <RootProviders>
                    <main>
                        <div className={"w-screen flex flex-col justify-center items-center"}>
                            <GetRepoProvider>
                                <NavBar />
                                <div className={"flex flex-col w-[90%] min-w-2xl max-w-5xl"}>
                                    <Toaster />
                                    {children}
                                </div>
                            </GetRepoProvider>
                        </div>
                    </main>
                </RootProviders>
            </body>
        </html>
    );
}
