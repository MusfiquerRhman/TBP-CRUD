import React from 'react'

const Heading = ({text, className} : {text: string, className?: string}) => {
    return (
        <h1 className={`text-4xl text-bold mb-4 ${className}`}>{text}</h1>
    )
}

export default React.memo(Heading)