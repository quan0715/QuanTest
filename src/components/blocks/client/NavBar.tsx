'use client';
import { ThemeSwitcher } from "@/components/blocks/client/ThemeToggleUI";
import { OAuthButton } from "@/components/blocks/client/OauthButton";
import React, { useContext } from "react";
import Link from "next/link";
import { AvatarDropdown } from "@/components/blocks/client/AvatarDropdown";
import { RepoContext } from "@/Providers/RepoProvider"
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faInstagram, faLinkedin, faThreads, faYoutube, IconDefinition } from '@fortawesome/free-brands-svg-icons';


function LogoButton({ blogName, avatarUrl }: { blogName: string, avatarUrl: string }) {
    // redirect to home page
    const homePage = '/'
    return (
        <section className="h-full">
            <Link href={'/'}>
                <div className="flex items-center h-full">
                    <img
                        className="size-8 me-4 rounded-full"
                        src={avatarUrl}
                        alt="avatar"
                    />
                    <p>{blogName}</p>
                </div>
            </Link>
        </section>
    );
}

interface BrandsDict {
    [key: string]: IconDefinition;
}

const brandsDict: BrandsDict = {
    github: faGithub,
    facebook: faFacebook,
    linkedin: faLinkedin,
    instagram: faInstagram,
    threads: faThreads,
    youtube: faYoutube,
};

interface SocialMedia {
    name: string
    url: string
    icon: IconDefinition
}

export function NavBar() {

    const repoContext = useContext(RepoContext);
    const pathname = usePathname();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const isRoot = pathname === "/";

    const medias = repoContext.repo !== null
        ? Object.entries(repoContext.repo!.blogConfig.socialMedia)
            .filter(([key, value]) => (value ?? "") !== "")
            .map(([key, value]): SocialMedia => ({ name: key, url: value, icon: brandsDict[key] }))
        : [];

    return (
        <div className={"flex flex-col items-center bg-fixed bg-center w-screen"} style={{ backgroundImage: `url(${baseUrl}/cover.jpg)` }}>
            <div className="flex flex-row justify-center w-full backdrop-blur-md">
                <div className="w-[90%] min-w-2xl max-w-5xl flex flex-row justify-between py-4">
                    <div className="text-white h-full">
                        <LogoButton
                            blogName={repoContext.repo?.blogConfig.blogName ?? ""}
                            avatarUrl={repoContext.repo?.githubUser.avatarUrl ?? ""}
                        />
                    </div>
                    <div className={"flex flex-row justify-end space-x-2"}>
                        <ThemeSwitcher />
                        {
                            // userContext.user === null
                            //     ? <OAuthButton/>
                            //     : <AvatarDropdown />
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-[90%] min-w-2xl max-w-5xl">
                {
                    isRoot &&
                    <div className="flex flex-col items-start my-20 gap-5">
                        <div className="bg-white rounded-md text-black py-1 px-2 font-bold">
                            {repoContext.repo?.blogConfig.blogName ?? ""}
                        </div>
                        <h1 className="text-6xl font-bold text-white">
                            {repoContext.repo?.blogConfig.blogHeadline ?? ""}
                        </h1>
                        <h2 className="text-2xl font-semibold text-white">
                            {repoContext.repo?.blogConfig.blogDescription ?? ""}
                        </h2>
                        <div className="flex flex-row gap-3">
                            {
                                medias.map((media) => (
                                    <Link href={media.url} key={media.name} className="flex flex-row items-center rounded-md py-1 px-2 bg-gray-600 bg-opacity-40 gap-2 text-white">
                                        <FontAwesomeIcon icon={media.icon} />
                                        <p>{media.name}</p>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

