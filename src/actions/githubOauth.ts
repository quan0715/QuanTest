'use client';

import { Octokit } from '@octokit/core'
import { GithubUserModelProps } from "@/models/IssueModel";
import Cookies from 'js-cookie';
import { env } from 'process';

export async function getTokenFromCookie() {
    const token = Cookies.get("access_token");

    if (token === undefined || token === '') {
        return undefined
    }

    // check token expired
    const octokit = new Octokit({ auth: token })
    try {
        const res = await octokit.request('GET /user', {
            headers: {
                'X-Github-Api-Version': '2022-11-28'
            }
        })
        if (res.status !== 200) {
            console.log('token expired')
            return ''
        }
    }
    catch (e) {
        console.log('token expired')
        return ''
    }
    return token
}

export async function getGithubUser(): Promise<GithubUserModelProps | null> {
    var token = await getTokenFromCookie();
    if (token === undefined || token?.length === 0) {
        token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
        if (token === undefined || token?.length === 0) {
            throw new Error('token not found')
        }
    }
    const octokit = new Octokit({ auth: token })
    const response = await octokit.request('GET /user', {
        headers: {
            'X-Github-Api-Version': '2022-11-28'
        }
    })
    const data = response.data
    return {
        'login': data['login'],
        'avatar_url': data['avatar_url'],
    } as GithubUserModelProps
}

export async function githubSignOut() {
    // clear login token
    console.log('clear token')
    Cookies.set("access_token", "", { expires: 0 });
}
