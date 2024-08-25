import { AllPostsApiResponse, Post } from "@/pages/api/posts"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useGetPosts = () => {
	const getAllPostsFn = async ({
		pageParam,
	}: {
		pageParam: number
	}): Promise<AllPostsApiResponse> => {
		return fetch(`/api/posts?page=${pageParam}`)
			.then(res => {
				if (res.status !== 200) {
					throw new Error("Somethin went wrong")
				} else {
					return res.json()
				}
			})
			.then(data => data)
	}

	const { isPending, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: ["fetch-posts"],
			queryFn: getAllPostsFn,
			getNextPageParam: lastPage => {
				const lastPagePagination = lastPage.meta.pagination
				if (lastPagePagination.hasMore) {
					return lastPagePagination.page + 1
				} else {
					return null
				}
			},
			initialPageParam: 1,
		})

	const allPostPages = data?.pages ?? []

	let allPosts: Post[] = []
	allPostPages.forEach(group => {
		group.data.forEach(post => {
			allPosts.push(post)
		})
	})

	return {
		isFetchingPosts: isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
		allPostPages,
		allPosts,
	}
}
