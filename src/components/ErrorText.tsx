import React from 'react'

const ErrorText = ({text}: {text: string}) => {
    return (
        <p className='bg-red-100 text-red-800 py-1 px-3 border-2 border-red-800 rounded overflow-hidden'>{text}</p>
    )
}

// Using memo to prevent unnecessary rerender
export default React.memo(ErrorText)