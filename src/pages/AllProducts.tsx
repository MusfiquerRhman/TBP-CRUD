import { lazy, Suspense, useRef, useState } from 'react';
import { createProductsAPI } from '../api/api';
import { Button, Heading, ProductForm, ProductsSkeleton } from '../components';

const LazyAllProductsComponents = lazy(() => import('../components/ShowAllProducts'));

// Define the HTML input element ref prop
type InputRefProp = HTMLInputElement | null;

// Define the error state interface
interface ErrorState {
    name: string;
    title: string;
    description: string;
}

const AllProducts = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Define the error state
    const [errorState, setErrorState] = useState<ErrorState>({ 
        name: 'default', 
        title: 'default', 
        description: "default" 
    });

    // using useRef to prevent unnecessary rerender
    const titleRef = useRef<InputRefProp>(null);
    const nameRef = useRef<InputRefProp>(null);
    const descriptionRef = useRef<InputRefProp>(null);

    // Validate the input fields
    const validInputs = () => {
        let titleIsValid = false;
        let nameIsValid = false;
        let descriptionIsValid = false;

        // Check if title is valid
        if(titleRef.current && titleRef.current.value !== "") {
            titleIsValid = true;
            setErrorState(prevState => ({ ...prevState, title: "default" })); 
        } else {
            setErrorState(prevState => ({ ...prevState, title: "error" })); 
        }

        // Check if name is valid
        if(nameRef.current && nameRef.current.value !== "") {
            nameIsValid = true;
            setErrorState(prevState => ({ ...prevState, name: "default" })); 
        } else {
            setErrorState(prevState => ({ ...prevState, name: "error" })); 
        }

        // Check if description is valid
        if(descriptionRef.current && descriptionRef.current.value !== "") {
            descriptionIsValid = true;
            setErrorState(prevState => ({ ...prevState, description: "default" })); 
        } else {
            setErrorState(prevState => ({ ...prevState, description: "error" })); 
        }

        return titleIsValid && nameIsValid && descriptionIsValid
    }

    // Handle click product update
    const handleClickProductUpdate = () => {
        const title = titleRef.current;
        const name = nameRef.current;
        const description = descriptionRef.current;

        // Check if the input fields are valid
        if(validInputs()) {
            // Create a new product
            createProductsAPI(name!.value, title!.value, description!.value).then(res => {
                console.log(res);
                if(res.status === 200) {
                    setIsDialogOpen(false);
                    window.location.reload();
                }
            });
            setIsDialogOpen(false);
        }
    }

    return (
        <>
            <div className='mx-4 my-10 flex flex-col gap-8 items-center'>
                <div className='flex justify-center items-center w-full max-w-7xl gap-8 flex-col sm:flex-row sm:justify-between'>
                    <Heading text="All Products" className='flex-1'/>
                    <Button label="Add Product" onClick={() => setIsDialogOpen(true)} variant="action" className='flex-1 max-w-80'/>
                </div>
                <div className='w-full max-w-7xl flex flex-row flex-wrap items-center gap-4 justify-center'>
                    <Suspense
                        fallback={
                            [...Array(8)].map((_, index) => (
                                <ProductsSkeleton key={index}/>
                            ))
                        }
                    >
                        <LazyAllProductsComponents />
                    </Suspense>
                </div>
            </div>

            {isDialogOpen && (
                <ProductForm type="Add"
                    setIsDialogOpen={setIsDialogOpen}
                    titleRef={titleRef}
                    nameRef={nameRef}
                    descriptionRef={descriptionRef}
                    formAction={handleClickProductUpdate}
                    errorState={errorState}
                />
            )}
        </>
    )
}

export default AllProducts