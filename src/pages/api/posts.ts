// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import allPosts from "@/data/posts.json"

export type Post = {
	title: string
	id: number
	userId: number
	body: string
}

export type AllPostsApiResponse = {
	status: boolean
	data: Post[]
	meta: {
		pagination: {
			page: number
			hasMore: boolean
			perPage: number
		}
	}
}

const perPage = 10
const noOfItems = allPosts.length
const noOfPages = Math.ceil(noOfItems / perPage)

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<AllPostsApiResponse>
) {
	const { page = 0 } = req.query ?? {}

	const pageInteger = parseInt(page as string)
	const start = (pageInteger - 1) * perPage
	const end = start + perPage
	const posts = allPosts.slice(start, end)
	const hasMore = pageInteger < noOfPages

	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(
				res.status(200).json({
					status: true,
					data: posts,
					meta: {
						pagination: {
							page: pageInteger,
							hasMore,
							perPage,
						},
					},
				})
			)
		}, 1500)
	})
}
