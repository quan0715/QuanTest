"use client";

import { getIssueById } from "@/actions/githubIssue";
import { BlogPostHeader } from "@/components/blocks/IssueCoverCard";
import { issueDataModelProps, IssueModel } from "@/models/IssueModel";
import React, { Suspense, useEffect, useState } from "react";
import { MarkdownDisplay } from "@/components/blocks/MarkdownDisplay"
import { useSearchParams } from "next/navigation";

export default function PostPage() {

    return (
        <Suspense>
            <_PostPage/>
        </Suspense>
    );
}

function _PostPage() {
    const params = useSearchParams();

    const [issue, setIssue] = useState<issueDataModelProps | undefined>(undefined);
    // const [comments, setComments] = useState<CommentDataModelProps[]>([]);
    const [issueModel, setIssueModel] = useState<IssueModel | undefined>(undefined);
    // const [sortedComment, setSortedComment] = useState<CommentDataModelProps[]>([]);

    useEffect(() => {
        const issueNumber = (params.get("id"));
        if (issueNumber === null) return;

        getIssueById({ issueId: parseInt(issueNumber) }).then((e) => setIssue(e));
        // getAllIssueComments({ issueId: parseInt(issueNumber) }).then((comments) => setComments(comments));
    }, [params]);

    useEffect(() => {
        if (issue === undefined) return;
        setIssueModel(new IssueModel(issue));
    }, [issue]);

    // useEffect(() => {
    //     setSortedComment(comments.sort((a, b) => {
    //         return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    //     }));
    // }, [comments]);

    return (
        <div>
            {
                issueModel !== undefined && issue !== undefined ?
                    <>
                        <BlogPostHeader issueData={issue}></BlogPostHeader>
                        <MarkdownDisplay source={issueModel.metadata.body} />
                        {/* <div className={"w-full space-y-4 py-4"}>
                            <div className={"text-lg font-semibold"}>留言區</div>
                            <div className={"text-sm"}> {comments.length > 0 ? "" : "此貼文還沒有留言，趕快登入後留言吧！！！"} </div>
                            <NewCommentForm issueId={issue.number} />
                            {
                                sortedComment.map((data) => {
                                    return (
                                        <CommentDisplayCard key={data.id} commentData={data} />
                                    )
                                })
                            }
                        </div> */}
                    </> : <></>
            }
        </div>
    )
}