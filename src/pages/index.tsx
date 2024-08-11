import { Inter } from "next/font/google"
import { Fragment } from "react"
import Head from "next/head"
import { AllPostsApiResponse, Post } from "./api/posts"
import { useQuery } from "@tanstack/react-query"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
	const getAllPostsFn = async (): Promise<AllPostsApiResponse> => {
		return fetch("/api/posts")
			.then(res => {
				if (res.status !== 200) {
					throw new Error("Somethin went wrong")
				} else {
					return res.json()
				}
			})
			.then(data => data)
	}

	const { isPending, data } = useQuery<AllPostsApiResponse>({
		queryKey: ["fetch-posts"],
		queryFn: getAllPostsFn,
	})

	const allPosts = data?.data ?? []
	return (
		<Fragment>
			<Head>
				<title>Infinite Scroll in NextJS</title>
			</Head>
			<main className={` ${inter.className}`}>
				<h1 className='text-center font-bold text-3xl py-6 '>
					Infinite Scroll in NextJS
				</h1>

				{isPending ?? <p>Loading Posts...</p>}
				<div className='px-4'>
					{allPosts.map(post => {
						const { id, title, body } = post as Post
						return (
							<div
								key={id}
								className='max-w-[760px] w-full mx-auto p-4 border border-gray-400 rounded-xl mb-4'>
								<h2 className='text-xl font-medium mb-2'>{title}</h2>
								<p>{body}</p>
							</div>
						)
					})}
				</div>
			</main>
		</Fragment>
	)
}
