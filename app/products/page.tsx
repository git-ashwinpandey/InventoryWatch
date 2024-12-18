"use client";

import { Product, searchProducts, addProduct } from '@/state/apiService';
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Header from "@/app/(components)/Header/page";
import Rating from "@/app/(components)/Ratings/ratings";
import CreateProductModal from './CreateProductModal';
import Image from "next/image";
import { useRouter } from 'next/navigation';

type ProductFormData = {
    name: string;
    price: number;
    stockQuantity: number;
    rating: number;
};

const Products = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProduct] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await searchProducts(searchTerm);
                setProduct(products);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchTerm]);

    const handleCreateProduct = async (productData: ProductFormData) => {
        await addProduct(productData);
    };

    if (loading) {
        return <div className="py-4">Loading...</div>;
    }

    if (error || !products) {
        return (
            <div className="text-center text-red-500 py-4">
                Failed to fetch products
            </div>
        );
    }

    return (
        <div className="mx-auto pb-5 w-full">
            {/* SEARCH BAR */}
            <div className="mb-6">
                <div className="flex items-center border-2 border-gray-200 rounded">
                    <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
                    <input
                        className="w-full py-2 px-4 rounded bg-white"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* HEADER BAR */}
            <div className="flex justify-between items-center mb-6">
                <Header name="Products" />
                <button
                    className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Create
                    Product
                </button>
            </div>

            {/* BODY PRODUCTS LIST */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10 justify-between">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    products?.map((product) => (
                        <div
                            key={product.productId}
                            className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
                        >
                            <div className="flex flex-col items-center">
                                <Image
                                    src={`https://picsum.photos/200/300?random=${Math.floor(Math.random() * 3) + 1}`}
                                    alt={product.name}
                                    width={150}
                                    height={150}
                                    className="mb-3 rounded-2xl w-36 h-36"
                                />
                                <h3 className="text-lg text-gray-900 font-semibold">
                                    {product.name}
                                </h3>
                                <p className="text-gray-800">${product.price.toFixed(2)}</p>
                                <div className="text-sm text-gray-600 mt-1">
                                    Stock: {product.stockQuantity}
                                </div>
                                {product.rating && (
                                    <div className="flex items-center mt-2">
                                        <Rating rating={product.rating} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* MODAL */}
            <CreateProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateProduct}
            />
        </div>
    );
};

export default Products;