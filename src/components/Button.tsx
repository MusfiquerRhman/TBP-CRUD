import React from "react"

// Define the props for the Button component
interface ButtonProps {
    label: string,
    onClick: () => void
    isDisabled?: boolean
    variant?: string
    className?: string
}

// Define the variant styles for the input field
const variants = {
    default: 'border-transparent',
    warning: 'border-red-500',
    action: 'border-emerald-400'
}

const Button = ({label, onClick, isDisabled, variant, className}: ButtonProps) => {
    // Get the variant style for the input field
    const getVariant = (variant: string) => { 
        if(variant === 'warning')
            return variants.warning
        else if(variant === 'action')
            return variants.action
        else
            return variants.default
    }
    
    // Get the variant class for the input field
    const variantClass = getVariant(variant ? variant : '')

    return (
        <button type="submit"
            onClick={onClick}
            disabled={isDisabled}
            className={
                `mb-2 rounded-md shadow-md p-1 lg:p-2 w-full border-2 mt-4 disabled:bg-stone-100 bg-white
                focus:outline-none focus:border-emerald-400 hover:border-emerald-400 outline-none 
                ${variantClass} ${className}`
            }
        >
            <span className="text-lg text-bold">{isDisabled ? "Please Wait" : label}</span>
        </button>
    )
}

// Using memo to prevent unnecessary rerender
export default React.memo(Button)