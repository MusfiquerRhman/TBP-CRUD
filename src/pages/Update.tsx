import { lazy, Suspense } from "react";
import { ProductsSkeleton } from "../components";
import NavigationComponent from "../components/NavigationComponent";

const LazyAllProductsComponents = lazy(() => import('../components/ShowAllProducts'));

const Update = () => {
    return (
        <NavigationComponent title='Update Products'>
            <div className='mx-4 my-10 flex flex-col gap-8 items-center'>
                <div className='w-full max-w-7xl flex flex-row flex-wrap items-center gap-4 justify-center'>
                    <Suspense
                        fallback={
                            [...Array(8)].map((_, index) => (
                                <ProductsSkeleton key={index}/>
                            ))
                        }
                    >
                        <LazyAllProductsComponents isUpdate={true}/> 
                    </Suspense>
                </div>
            </ div>
        </NavigationComponent>
    )
}

export default Update