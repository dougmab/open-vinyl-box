import React from 'react'
import ProductCard, {ProductProps} from "@/components/ProductCard";

// TODO fetch products from API
const productsData: ProductProps[] = [
    {
        id: 1,
        name: "Product 1",
        price: 100,
        discount: 15,
        image: "https://via.placeholder.com/1000",
        categories: ["category 1", "category 2"],
        rating: 4.3,
    },
    {
        id: 2,
        name: "Product 2",
        price: 200,
        image: "https://via.placeholder.com/300",
        categories: ["category 1", "category 2"],
        rating: 3.7,
    },
    {
        id: 3,
        name: "Product 3",
        price: 300,
        image: "https://via.placeholder.com/300",
        categories: ["category 1", "category 2"],
        rating: 5.0,

    },
    {
        id: 4,
        name: "Product 4",
        price: 400,
        image: "https://via.placeholder.com/300",
        categories: ["category 1", "category 2"],
        discount: 20,
        rating: 2.7,

    },
    {
        id: 5,
        name: "Product 5",
        price: 500,
        image: "https://via.placeholder.com/300",
        categories: ["category 1", "category 2"],
        rating: 1.9,

    },
    {
        id: 6,
        name: "Product 6",
        price: 600,
        image: "https://via.placeholder.com/300",
        categories: ["category 1", "category 2"],
        rating: 4.3,

    },
]

const NewProducts = () => {
    return (
        <div>
            <div className="container pt-16">
                <h2 className="font-medium text-2xl mb-4">New Products</h2>

                <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-x-20 xl:gap-y-10">
                    {
                        productsData.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default NewProducts
