import React, { Dispatch, MutableRefObject, SetStateAction } from 'react';
import Button from './Button';
import ErrorText from './ErrorText';
import Heading from './Heading';
import InputField from './InputField';

type InputRefProp = HTMLInputElement | null;

interface ErrorState {
    name: string;
    title: string;
    description: string;
}

interface DialogProps {
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
    titleRef: MutableRefObject<InputRefProp>;
    nameRef: MutableRefObject<InputRefProp>;
    descriptionRef: MutableRefObject<InputRefProp>;
    values?: {
        title: string,
        name: string,
        description: string
    };
    type: string,
    formAction: () => void
    errorState: ErrorState
}

const ProductForm = (
    {setIsDialogOpen, titleRef, nameRef, descriptionRef, values, type, formAction, errorState}: DialogProps
) => {
    return (
        <div className='fixed inset-0 h-screen w-screen backdrop-blur-md p-2' onClick={() => setIsDialogOpen(false)}>
            <p className='text-center text-slate-500 mt-12 text-lg'>Click Anywhere to close</p>
            <dialog
                className='fixed inset-0 bg-white p-4 shadow-md rounded-md flex flex-col w-full sm:max-w-sm justify-center items-center'
                onClick={(e) => e.stopPropagation()}
            >
                <Heading text={`${type} product`} />
                <InputField 
                    variant={errorState.title} 
                    label="Title" 
                    type="text" 
                    reference={titleRef} 
                    value={values?.title}
                />
                {errorState.title === 'error' && 
                    <ErrorText text='Enter Title'/>
                }
                <InputField 
                    variant={errorState.name} 
                    label="Name" 
                    type="text" 
                    reference={nameRef} 
                    value={values?.name}
                />
                {errorState.name === 'error' && 
                    <ErrorText text='Enter Name'/>
                }
                <InputField 
                    variant={errorState.description} 
                    label="Description" 
                    type="text" 
                    reference={descriptionRef} 
                    value={values?.description}
                />
                {errorState.description === 'error' && 
                    <ErrorText text='Enter Description'/>
                }
                <Button label={`${type} product`} 
                    onClick={() => formAction()} 
                    variant='action' 
                />
                <Button label="Cancel" 
                    onClick={() => setIsDialogOpen(false)} 
                    variant='warning' 
                    className='md:hidden'
                />
            </dialog>
        </div>
    )
}

export default React.memo(ProductForm)