import { lazy, Suspense, useRef, useState } from 'react';
import { Button, Heading, InputField } from '../components';

const LazyProductsComponents = lazy(() => import('../components/AllProducts'));

type InputRefProp = HTMLInputElement | null;


const AllProducts = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const titleRef = useRef<InputRefProp>(null);
    const nameRef = useRef<InputRefProp>(null);
    const descriptionRef = useRef<InputRefProp>(null);

    return (
        <>
            {isDialogOpen && (
                <dialog
                    className='fixed inset-0 bg-white p-4 shadow-md rounded-md flex flex-col w-full md:max-w-md justify-center items-center'
                >
                    <Heading text="Add Product" />
                    <InputField label="Title" type="text" reference={titleRef} />
                    <InputField label="Name" type="text" reference={nameRef} />
                    <InputField label="Description" type="text" reference={descriptionRef} />
                    <div className='flex w-full flex-row gap-2'>
                        <Button label="Add" onClick={() => { }} variant='action' />
                        <Button label="Close" onClick={() => setIsDialogOpen(false)} variant="warning" />
                    </div>
                </dialog>
            )}
            <div className='mx-4 my-10 flex flex-col gap-8 items-center'>
                <div className='flex justify-center items-center w-full max-w-7xl gap-8 flex-col sm:flex-row sm:justify-between'>
                    <Heading text="All Products" />
                    <Button label="Add Product" onClick={() => setIsDialogOpen(true)} variant="action" />
                </div>
                <div className='w-full max-w-7xl flex flex-row flex-wrap items-center gap-4 justify-center'>
                    <Suspense
                        fallback={
                            <h1 className='flex text-4xl justify-center items-center w-full h-80'>Loading...</h1>
                        }
                    >
                        <LazyProductsComponents />
                    </Suspense>
                </div>
            </div>
        </>
    )
}

export default AllProducts