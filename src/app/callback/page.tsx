"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect } from 'react'
import Cookies from 'js-cookie';

export default function CallbackPage() {

    return (
        <Suspense>
            <_CallbackPage />
        </Suspense>
    );
}

function _CallbackPage() {
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        console.log(params);
        const code = params.get("code");
        const postBody = {
            client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: code
        };
        const uri = 'https://github.com/login/oauth/access_token'
        fetch(uri, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        }).then(response => response.json().then(json => {
            const accessToken = json['access_token'];
            const refreshToken = json['refresh_token'];

            console.log('access token', accessToken);
            console.log('refresh token', refreshToken);
            // store access token in session
            console.log('set token to cookies', accessToken);
            Cookies.set('access_token', accessToken);
            Cookies.set('refresh_token', refreshToken);

            router.push("/");
        }));
    }, [router, params]);

    return (
        <div>Signing in...</div>
    )
}