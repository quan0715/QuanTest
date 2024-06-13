"use client";

import { githubSignOut } from '@/actions/githubOauth';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

type Props = {}

export default function SignOutPage({ }: Props) {
    const router = useRouter();

    useEffect(() => {
        githubSignOut().then(() => router.push("/"));
    }, [router]);

    return (
        <div>Signing out...</div>
    )
}