import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponents from "../../app/layout/LoadingComponents";
import { product } from "../../app/models/Product"
import ProductList from "./ProductList";

export default function Catalog(){
    const [products, setProducts] = useState<product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Catalog.list().then(products => setProducts(products))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }, [])

    if(loading) return <LoadingComponents message="Loading Products..."/>
    
    function removeLastProduct(){
    setProducts([...products])
    }
        return(
            <>
            <ProductList products={products}/>
            </>  
        )
}