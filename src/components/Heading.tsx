import React from 'react'

const Heading = ({text} : {text: string}) => {
    return (
        <h1 className='text-4xl text-bold mb-4'>{text}</h1>
    )
}

export default React.memo(Heading)