'use client'

import useSWR from "swr"


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function GithubProfile() {
    const myGitHubRepoProfile = "https://api.github.com/repos/Bilal202202001/nextjs-project";
    const { data, error, isloading } = useSWR(myGitHubRepoProfile, fetcher)

    // fetcher(myGitHubRepoProfile).then(data => console.log(data));

    if (error) return "An Error Occured"
    if (isloading) return "Loading.....!"

    return <div>
        <h1>
            {data && data.name}
        </h1>
        <h3>
            Subscriber Count :
            {data && data.subscribers_count}
        </h3>
        <h3>
            Stargazers Count :
            {data && data.stargazers_count}
        </h3>
        <h3>
            Fort Count :
            {data && data.fork_count}
        </h3>
        
    </div>
}