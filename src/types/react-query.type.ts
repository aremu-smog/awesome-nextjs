import "@tanstack/react-query"

interface QueryMeta extends Record<string, unknown> {
	pagination: {
		page: number
		hasMore: boolean
		perPage: number
	}
}

declare module "@tanstack/react-query" {
	interface Register {
		queryMeta: QueryMeta
	}
}
