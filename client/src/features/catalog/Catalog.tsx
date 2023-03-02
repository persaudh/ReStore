import { useState, useEffect } from "react";
import LoadingComponents from "../../app/layout/LoadingComponents";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { featchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";

export default function Catalog(){
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status} = useAppSelector(state => state.catalog);
    const dispacth = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!productsLoaded) dispacth(featchProductsAsync());
    }, [productsLoaded, dispacth])

    if(status.includes('pending')) return <LoadingComponents message="Loading Products..."/>
    
        return(
            <>
            <ProductList products={products}/>
            </>  
        )
}