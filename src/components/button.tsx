import { ComponentPropsWithRef, forwardRef, Ref } from "react"

type ButtonProps = ComponentPropsWithRef<"button">
export const Button = forwardRef(function Button(
	props: ButtonProps,
	ref: Ref<HTMLButtonElement>
) {
	return (
		<button ref={ref} className={buttonStyle} {...props}>
			{props.children}
		</button>
	)
})

const buttonStyle = `
text-white 
bg-black 
p-4 
rounded-lg 
w-full 
block 
disabled:opacity-50 
disabled:cursor-not-allowed
`
