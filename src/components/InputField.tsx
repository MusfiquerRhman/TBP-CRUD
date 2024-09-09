import React, { MutableRefObject } from 'react';

// Define the props for the InputField component
interface InputFieldProps {
    label: string,
    type: string,
    variant?: string,
    reference: MutableRefObject<HTMLInputElement | null>
    value?: string | number | readonly string[] | undefined
}

// Define the variant styles for the input field
const variants = {
    default: 'border-transparent',
    error: 'border-red-500',
}

const InputField = ({label, type, variant, reference, value} : InputFieldProps) => {
    // Get the variant style for the input field
    const getVariant = (variant: string) => { 
        if(variant === 'error')
            return variants.error
        else
        return variants.default
    }

    // Get the variant class for the input field
    const variantClass = getVariant(variant ? variant : '')

    return (
        <>
            <label htmlFor={label} className='my-2'>
                {label}
            </label>
            <input id={label} 
                type={type} 
                ref={reference} 
                placeholder={label}
                value={value}
                className={`mb-2 rounded-md shadow-md overflow-hidden p-3 w-full max-w-md border-2 
                    focus:outline-none focus:border-emerald-400 hover:border-emerald-400 ${variantClass}`}
            />
        </>
    )
}

// Using memo to prevent unnecessary rerender
export default React.memo(InputField)