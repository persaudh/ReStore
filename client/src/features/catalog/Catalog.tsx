import { useState, useEffect } from "react";
import { product } from "../../app/models/Product"
import ProductList from "./ProductList";

export default function Catalog(){
    const [products, setProducts] = useState<product[]>([]);

    useEffect(() => {
    fetch('http://localhost:5000/api/products')
    .then(response => response.json())
    .then(data => setProducts(data))
    }, [])

    function removeLastProduct(){
    setProducts([...products])
    }
        return(
            <>
            <ProductList products={products}/>
            </>  
        )
}