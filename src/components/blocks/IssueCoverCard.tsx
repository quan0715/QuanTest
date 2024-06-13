'use client'
import { IssueTag, TagChip } from "@/components/blocks/TagChip";
import React from "react";
import { GithubUserModelProps, issueDataModelProps, IssueLabelModelProps, IssueModel } from "@/models/IssueModel";
import NextImage from 'next/image'
import Link from "next/link";
import { GithubAvatar } from "@/components/blocks/GithubAvatar"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function CoverImage({ imageURL = null }: { imageURL: string | null }) {
    // return next image component if imageURL is not undefined
    // else return color block
    return (
        <div className={"hidden md:block"} style={{ position: 'relative', width: '100%', aspectRatio: "1.69" }}>
            {
                <NextImage
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center', borderRadius: '8px' }}
                    src={imageURL !== null ? imageURL : '/default_cover.JPG'}
                    alt={"cover image"}
                />
            }
        </div>
    )
}

function LabelsWrapper({ labels }: { labels: IssueLabelModelProps[] }) {
    return (
        <div className={"w-full flex flex-wrap gap-2 py-4 justify-start"}>
            {
                labels.map((label) => {
                    return <TagChip key={label.id} labelData={label} />
                })
            }
        </div>
    )
}

export function IssueCoverCard({ issue }: { issue: issueDataModelProps }) {
    const issueModel = new IssueModel(issue)
    // console.log(issueModel.data.assignee)
    return (
        <Card className={"overflow-hidden"}>
            <Link href={`/post?id=${issueModel.data.number}`}>
                <CardHeader >
                    <GithubAvatar author={issueModel.data.user} />
                </CardHeader>
                <CardContent className={"flex flex-col w-full flex-grow justify-start items-start gap-y-2"}>
                    <section>
                        <div className={"text-lg font-semibold"}>{issueModel.title}</div>
                        <div className={"text-lg font-light"}>{issueModel.subtitle}</div>
                    </section>
                    {
                        (issueModel.data.labels ?? []).length > 0 &&
                        <LabelsWrapper labels={issueModel.data.labels ?? []} />
                    }
                </CardContent>
            </Link>
        </Card>

    )
}

export function BlogPostHeader({ issueData }: { issueData: issueDataModelProps }) {
    const issueModel = new IssueModel(issueData)

    return (
        <div className={"w-full flex flex-col items-center"}>
            {/* <CoverImage imageURL={issueModel.cover_image} /> */}
            <div className={"w-full flex flex-col py-5"}>
                <GithubAvatar author={issueModel.data.user} />
                <section className="mt-10">
                    <div className={"text-5xl font-bold"}>{issueModel.title}</div>
                    <div className={"text-2xl font-light"}>{issueModel.subtitle}</div>
                </section>
                {
                    (issueModel.data.labels ?? []).length > 0 &&
                    <LabelsWrapper labels={issueModel.data.labels ?? []} />
                }
            </div>
        </div>
    )
}