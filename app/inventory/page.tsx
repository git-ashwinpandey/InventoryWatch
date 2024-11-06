'use client'

import { Product, searchProducts } from '@/state/apiService';
import React, { useEffect, useState } from 'react'
import Header from '@/app/(components)/Header/page';
import { DataTableDemo } from '@/app/inventory/datatable';

const Inventory = () => {
    const [data, setData] = useState<Product[]>([]);
    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await searchProducts(search);
                setData(products);
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
        <div className="flex flex-col">
            <Header name="Inventory" />
            <DataTableDemo data={data}/>
        </div>
    )
}

export default Inventory