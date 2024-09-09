import { useCallback, useRef, useState } from 'react';
import { createProductsAPI } from '../api/api';
import { ProductForm } from '../components';

import { useNavigate } from 'react-router-dom';
import type { ErrorStateProducts, InputRefProp } from '../types/types';

const Create = () => {
    const navigate = useNavigate();
    // Define the error state
    const [errorState, setErrorState] = useState<ErrorStateProducts>({ 
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
    const handleClickProductCreate = useCallback(() => {
        const title = titleRef.current;
        const name = nameRef.current;
        const description = descriptionRef.current;

        // Check if the input fields are valid
        if(validInputs()) {
            // Create a new product
            createProductsAPI(name!.value, title!.value, description!.value).then(res => {
                if(res.status === 200) {
                    navigate('/');
                }
            });
        }
    }, [navigate])

    return (
        <>
            <ProductForm type="Add"
                titleRef={titleRef}
                nameRef={nameRef}
                descriptionRef={descriptionRef}
                formAction={handleClickProductCreate}
                errorState={errorState}
            />
        </>
    )
}

export default Create