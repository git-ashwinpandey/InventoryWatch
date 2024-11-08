'use client'
import { DashboardMetrics, fetchDashboardMetrics } from '@/state/apiService'
import { BackpackIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react'
import Ratings from '../(components)/Ratings/ratings';
import Image from "next/image";

const CardPopularProducts = () => {
    const [data, setData] = useState<DashboardMetrics | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dashboardData = await fetchDashboardMetrics();
                setData(dashboardData);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='row-span-3 xl:row-span-6 bg-white dark:bg-slate-700 shadow-md rounded-2xl pb-16'>
            <h3 className='text-lg font-semibold px-7 pt-5 pb-2'>
                Popular Products
            </h3>
            <hr />
            <div className='overflow-auto h-full'>
                {data?.popularProducts.map((product) => (
                    <div
                        key={product.productId}
                        className='flex items-center justify-between gap-3 px-5 py-7 border-b dark:border-slate-700'
                    >
                        <div className='flex items-center gap-3'>
                            <Image
                                src={`https://picsum.photos/200/300?random=${Math.floor(Math.random() * 3) + 1}`}
                                alt={product.name}
                                width={35}
                                height={35}
                                className="mb-3 rounded-2xl w-15 h-13"
                            />
                            <div className='flex flex-col justify-between gap-1'>
                                <div className='font-bold text-gray-700 dark:text-white'>{product.name}</div>
                                <div className='flex text-sm items-center'>
                                    <span className='font-bold text-blue-500 text-xs'>
                                        {product.price}
                                    </span>
                                    <span className='mx-2'>|</span>
                                    <Ratings rating={product.rating || 0} />
                                </div>
                            </div>
                        </div>

                        <div className='text-xs flex items-center'>
                            <button className='p-2 rounded-full bg-blue-100 text-blue-600 mr-2'>
                                <BackpackIcon className='w-4 h-4' />
                            </button>
                            {Math.round(product.stockQuantity / 10000)}k Sold
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardPopularProducts