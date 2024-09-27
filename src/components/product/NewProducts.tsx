import React, {useEffect, useState} from 'react'
import ProductCard, {ProductProps} from "@/components/product/ProductCard";
import api from "@/lib/api";
import SkeletonCard from "@/components/product/SkeletonCard";

const NewProducts = () => {
    const [ isLoading, setLoading ] = useState(true);
    const [ products, setProducts ] = useState<ProductProps[]>([]);

    useEffect(() => {
        api.get('/product?size=12&sort=createdAt,DESC')
            .then((response) => {
                setProducts(response.data.result.content);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <div className="container pt-16">
                <h2 className="font-medium text-2xl mb-4">New Products</h2>

                <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-x-20 xl:gap-y-10">
                    {
                        isLoading ? [...Array(12)].map((_, index) => (
                            <SkeletonCard key={index}/>
                          )) :
                        products.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default NewProducts
