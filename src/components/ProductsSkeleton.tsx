import React from "react"

const ProductsSkeleton = () => {
    return (
        <div className='min-w-72 flex-1 max-w-80 text-center px-4 py-10 shadow-md min-h-72 flex justify-center flex-col rounded-md bg-white animate-pulse'>
            <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4' />
            <div className='h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mb-4' />
            <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mb-4' />
            <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mb-4' />
            <div className='flex flex-row gap-2 mt-6'>
                <div className='h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4'/>
                <div className='h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4' />
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default React.memo(ProductsSkeleton)