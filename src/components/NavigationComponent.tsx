import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Heading from './Heading';

const NavigationComponent = ({ children, title }: { children: Readonly<React.ReactNode>, title: string}) => {
    const navigate = useNavigate();
    return (
        <div className='mx-4 my-10 flex flex-col gap-8 items-center'>
                <div className='flex justify-center items-center w-full max-w-7xl gap-4 flex-col lg:flex-row sm:justify-between'>
                    <Heading text={title} className='flex-1'/>
                    <Button label="Add Product" onClick={() => navigate('/create')} variant="action" className='flex-1 max-w-80'/>
                    <Button label="Update" onClick={() => navigate('/update')} variant="action" className='flex-1 max-w-80'/>
                    <Button label="Delete" onClick={() => navigate('/delete')} variant="warning" className='flex-1 max-w-80'/>
                </div>
                <div className='w-full max-w-7xl flex flex-row flex-wrap items-center gap-4 justify-center'>
                    {children}
            </div>
        </div>
    )
}

export default NavigationComponent