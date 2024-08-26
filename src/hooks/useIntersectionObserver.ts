import { useEffect } from "react"

type UseIntersectionObserverParams = {
	ref: {
		current: Element | null
	}
	options: {
		root?: Element
		threshold: number | number[]
		rootMargin: string
	}
	onIntersect: () => void
}

export const useIntersectionObserver = (
	params: UseIntersectionObserverParams
) => {
	const { ref, options, onIntersect } = params
	const { root = null, rootMargin, threshold } = options

	let callback: IntersectionObserverCallback = entries => {
		for (const entry of entries) {
			if (Array.isArray(threshold)) {
				for (const _threshold of threshold) {
					if (entry.intersectionRatio === _threshold) {
						onIntersect()
					}
				}
			} else {
				if (entry.intersectionRatio === threshold) {
					onIntersect()
				}
			}
		}
	}
	let observer = new IntersectionObserver(callback, {
		root,
		rootMargin,
		threshold,
	})

	useEffect(() => {
		if (ref.current !== null) {
			observer.observe(ref.current)
		}
	}, [ref])
}
