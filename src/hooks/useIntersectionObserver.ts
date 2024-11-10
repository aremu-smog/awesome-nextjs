import { useEffect } from "react"

type UseIntersectionObserverParams = {
	ref: Element | null
	options: {
		root?: Element
		threshold: number[]
		rootMargin: string
	}
	onIntersect: () => void
}

export const useIntersectionObserver = (
	params: UseIntersectionObserverParams
) => {
	const { ref, options, onIntersect } = params
	const { root = null, rootMargin, threshold } = options

	useEffect(() => {
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
		if (ref !== null) {
			observer.observe(ref)
		}

		return () => {
			if (ref !== null) {
				observer.unobserve(ref)
			}
		}
	}, [ref, root, rootMargin, threshold, onIntersect])
}
