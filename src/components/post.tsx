type PostProps = {
	title: string
	body: string
}
export const Post = (props: PostProps) => {
	const { title, body } = props
	return (
		<div className=' w-full  p-4 border border-gray-400 rounded-xl mb-4'>
			<h2 className='text-xl font-medium mb-2'>{title}</h2>
			<p>{body}</p>
		</div>
	)
}
