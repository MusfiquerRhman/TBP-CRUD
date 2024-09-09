import { lazy, Suspense } from 'react';
import { ProductsSkeleton } from '../components';

import NavigationComponent from '../components/NavigationComponent';

// Lazy load the ShowAllProducts component to improve performance
const LazyAllProductsComponents = lazy(() => import('../components/ShowAllProducts'));

const AllProducts = () => {

    return (
        <NavigationComponent title='All Products'>
            <Suspense
                fallback={
                    [...Array(8)].map((_, index) => (
                        <ProductsSkeleton key={index}/>
                    ))
                }
            >
                <LazyAllProductsComponents />
            </Suspense>
        </NavigationComponent>
    )
}

export default AllProducts