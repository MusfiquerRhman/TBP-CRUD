import React, { Dispatch, SetStateAction } from 'react';
import Button from './Button';

// Define the props for the ConfirmationPopup component
interface DialogProps {
    label: string;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
    formAction: () => void
}

// Define the ConfirmationPopup component to confirm the action before deleting
const ConfirmationPopup = ({label, setIsDialogOpen, formAction}: DialogProps) => {
    return (
        <div className='fixed inset-0 h-screen w-screen backdrop-blur-md p-2' onClick={() => setIsDialogOpen(false)}>
            <p className='text-center text-slate-500 mt-12 text-lg'>Click Anywhere to close</p>
            <dialog
                className='fixed inset-0 bg-white p-4 shadow-md rounded-md flex flex-col w-full sm:max-w-sm justify-center items-center'
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className='text-xl'>{label}</h1>
                <Button label="Confirm" 
                    onClick={() => formAction()} 
                    variant='warning' 
                />
                <Button label="Cancel" 
                    onClick={() => setIsDialogOpen(false)} 
                    variant='action' 
                    className='md:hidden'
                />
            </dialog>
        </div>
    )
}

// Using memo to prevent unnecessary rerender
export default React.memo(ConfirmationPopup)