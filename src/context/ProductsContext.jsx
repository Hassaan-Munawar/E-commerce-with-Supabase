import { createContext, useEffect, useState } from 'react';

export const ProductsContext = createContext();

export default function ProductsProvider({ children }) {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const response = await fetch("https://dummyjson.com/products")
                if (!response.ok) {
                    throw new Error("Failed to fetch products")
                }
                const data = await response.json()
                setProducts(data.products)
            } catch (error) {
                setError(error.message)
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, []);



    return (
        <ProductsContext.Provider value={{ products, loading, setLoading, error }}>
            {children}
        </ProductsContext.Provider>
    );
};