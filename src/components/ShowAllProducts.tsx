import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProductsAPI, getAllProductsAPI, updateProductsAPI } from "../api/api";
import Button from "./Button";
import ConfirmationPopup from "./ConfirmationPopup";
import ProductForm from "./ProductForm";

import type { ErrorStateProducts, InputRefProp, Products } from "../types/types";

const ShowAllProducts = ({ isUpdate, isDelete } : {isUpdate?: boolean, isDelete?: boolean}) => {
    const navigate = useNavigate();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [products, setProducts] = useState<Products[]>();
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [deleteProductInfo, setDeleteProductInfo] = useState<Products>();
    
    const [value, setValue] = useState({
        id: -1,
        title: "",
        name: "",
        description: ""
    });

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

    useEffect(() => {
        // Create a cancel token source
        const source = axios.CancelToken.source();
        
        // Fetch all products
        getAllProductsAPI().then((res) => {
            setProducts(res.data.categories);
        }).catch((err) => {
            console.log(err);
        })

        // Cancel the request when the component is unmounted
        return () => {
            source.cancel();
        }
    }, []);

    
    // Validate the input fields
    const validInputs = () => {
        let titleIsValid = false;
        let nameIsValid = false;
        let descriptionIsValid = false;

        // Check if title is valid
        if (titleRef.current && titleRef.current.value !== "") {
            titleIsValid = true;
            setErrorState(prevState => ({ ...prevState, title: "default" }));
        } else {
            setErrorState(prevState => ({ ...prevState, title: "error" }));
        }

        // Check if name is valid
        if (nameRef.current && nameRef.current.value !== "") {
            nameIsValid = true;
            setErrorState(prevState => ({ ...prevState, name: "default" }));
        } else {
            setErrorState(prevState => ({ ...prevState, name: "error" }));
        }

        // Check if description is valid
        if (descriptionRef.current && descriptionRef.current.value !== "") {
            descriptionIsValid = true;
            setErrorState(prevState => ({ ...prevState, description: "default" }));
        } else {
            setErrorState(prevState => ({ ...prevState, description: "error" }));
        }

        return titleIsValid && nameIsValid && descriptionIsValid
    }

    // Handle click product update
    // useCallback is used to prevent unnecessary rerender
    const updateProduct = useCallback(() => {
        const title = titleRef.current!.value;
        const name = nameRef.current!.value;
        const description = descriptionRef.current!.value;
        
        // Check if the input fields are valid
        if(validInputs()) {
            updateProductsAPI(value.id ,name, title, description).then(res => {
                if(res.status === 200) {
                    setIsDialogOpen(false);
                    navigate('/')
                }
            });
            setIsDialogOpen(false);
        }
    }, [navigate, value.id]);

    // Handle click product update 
    // useCallback is used to prevent unnecessary rerender
    const handleClickProductUpdate = useCallback((product: Products) => {
        setValue({
            id: product.id,
            name: product.name,
            title: product.title,
            description: product.description
        })

        setIsDialogOpen(true);
    }, []);

    // Handle click delete product
    // useCallback is used to prevent unnecessary rerender
    const handleClickDeleteProduct = useCallback((product: Products) => {
        setIsDeleteConfirmationOpen(true);
        setDeleteProductInfo(product);
    }, []);

    // Handle delete product
    // useCallback is used to prevent unnecessary rerender
    const deleteProduct = useCallback(() => {
        deleteProductsAPI(deleteProductInfo!.id).then(res => {
            if(res.status === 200) {
                setIsDialogOpen(false);
                navigate('/')
            }
        });
    }, [deleteProductInfo, navigate]);

    return (
        <>
            {products && products.map((product: Products) => (
                <div key={product.id} className='min-w-72 flex-1 max-w-80 text-center px-4 py-10 shadow-md min-h-72 flex justify-center flex-col rounded-md bg-white'>
                    <h1 className='text-2xl'>{product.title}</h1>
                    <h2 className='text-slate-600'>{product.name}</h2>
                    <p className='text-wrap'>{product.description}</p>
                    <div className='flex flex-row gap-2'>
                        {isUpdate && <Button label="Update" onClick={() => handleClickProductUpdate(product)} variant='action' />}
                        {isDelete && <Button label="Delete" onClick={() => handleClickDeleteProduct(product)} variant="warning" />}
                    </div>
                </div>
            ))}

            {isDialogOpen && (
                <ProductForm type="Update"
                    setIsDialogOpen={setIsDialogOpen}
                    titleRef={titleRef}
                    nameRef={nameRef}
                    descriptionRef={descriptionRef}
                    formAction={updateProduct}
                    errorState={errorState}
                    values={value}
                />
            )}

            {isDeleteConfirmationOpen && (
                <ConfirmationPopup 
                    label="Are you sure you want to delete this product?"
                    setIsDialogOpen={setIsDeleteConfirmationOpen}
                    formAction={deleteProduct}
                />
            )}
        </>
    )
}

export default React.memo(ShowAllProducts)