"use client";

import { BlogProps as RepoProps, getRepo } from "@/actions/repo"
import { createContext, useEffect, useState } from "react"

interface ProviderProps {
    children: React.ReactNode,
    repo: RepoProps | null
}

type RepoContextProps = {
    repo: RepoProps | null
    setRepoContext: React.Dispatch<React.SetStateAction<RepoContextProps>>
}

const defaultRepoContext: RepoContextProps = {
    repo: null,
    setRepoContext: () => { }
}

export const RepoContext = createContext<RepoContextProps>(defaultRepoContext);

export function RepoProvider({ children, repo }: ProviderProps) {

    const [repoContext, setRepoContext] = useState<RepoContextProps>({
        ...defaultRepoContext,
        repo: repo
    })

    useEffect(() => {
        getRepo().then((res) => {
            setRepoContext({
                repo: res,
                setRepoContext: setRepoContext
            })
        }).catch((e) => {
            console.log('repo not found')
        })
    }, []);

    return (
        <RepoContext.Provider value={repoContext}>
            {children}
        </RepoContext.Provider>
    )
}

export function GetRepoProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [repo, setRepo] = useState<RepoProps | null>(null);

    useEffect(() => {
        getRepo()
            .then((value) => setRepo(value))
            .catch((e) => console.log('repo not found'));
    }, []);

    return <RepoProvider repo={repo}>
        {children}
    </RepoProvider>
}