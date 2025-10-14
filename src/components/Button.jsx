
export default function Button({ text, disabled }) {
    return (
        <button disabled={disabled} className="btn  sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl bg-pink-500 w-full border-none">{text}</button>
    )
}
