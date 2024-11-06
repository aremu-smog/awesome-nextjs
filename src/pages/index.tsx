import { Inter } from "next/font/google"
import { Fragment, useRef } from "react"
import Head from "next/head"
import { Button, Post } from "@/components"
import { useGetPosts, useIntersectionObserver } from "@/hooks"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
	const {
		isFetchingNextPage,
		fetchNextPage,
		isFetchingPosts,
		hasNextPage,
		allPosts,
	} = useGetPosts()

	const buttonWrapperRef = useRef(null)
	useIntersectionObserver({
		onIntersect: () => {
			if (!isFetchingPosts && !isFetchingNextPage) {
				fetchNextPage()
			}
		},
		ref: buttonWrapperRef.current,
		options: {
			rootMargin: "10px",
			threshold: [1],
		},
	})
	return (
		<Fragment>
			<Head>
				<title>Infinite Scroll in NextJS</title>
			</Head>
			<main className={` ${inter.className} max-w-[760px] mx-auto px-4`}>
				<h1 className='text-center font-bold text-3xl py-6 '>
					Infinite Scroll in NextJS
				</h1>
				{isFetchingPosts && <p className='text-center'>Loading Posts...</p>}
				{allPosts.map(post => {
					const { id, title, body } = post
					return <Post key={id} title={title} body={body} />
				})}

				<div className='text-center mt-4 mb-8' ref={buttonWrapperRef}>
					{hasNextPage && (
						<Button
							disabled={isFetchingNextPage}
							onClick={() => {
								fetchNextPage()
							}}>
							{isFetchingNextPage ? "Fetching..." : "Fetch More Posts"}
						</Button>
					)}
				</div>
			</main>
		</Fragment>
	)
}
