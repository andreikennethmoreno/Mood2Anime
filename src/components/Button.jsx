export default function Button({onClick, className, text, textColor, disabled}) {
    return (
        <>
            <button onClick={onClick} disabled={disabled}  type="button" className={`btn ${className} btn-primary`}>
            <p className={`${textColor} uppercase lg:text-base md:text-md text-sm font-bold`}>
                {text}
            </p>
            </button>
        </>
    )
}