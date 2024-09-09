import axios from "axios";
import { useEffect, useState } from "react";
import { getAllProductsAPI } from "../api/api";
import Button from "./Button";

export interface Products {
    id: number;
    name: string;
    title: string;
    description: string;
}

const ShowAllProducts = () => {
    const [products, setProducts] = useState<Products[]>();

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

    return (
        <>
            {products && products.map((product: Products) => (
                <div key={product.id} className='min-w-72 flex-1 max-w-80 text-center px-4 py-10 shadow-md min-h-72 flex justify-center flex-col rounded-md bg-white'>
                    <h1 className='text-2xl'>{product.title}</h1>
                    <h2 className='text-slate-600'>{product.name}</h2>
                    <p className='text-wrap'>{product.description}</p>
                    <div className='flex flex-row gap-2'>
                        <Button label="Update" onClick={() => { }} variant='action' />
                        <Button label="Delete" onClick={() => { }} variant="warning" />
                    </div>
                </div>
            ))}
        </>
    )
}

export default ShowAllProducts