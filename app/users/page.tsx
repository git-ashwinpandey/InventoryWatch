'use client'

import { fetchUsers, User } from '@/state/apiService';
import React, { useEffect, useState } from 'react'
import Header from '@/app/(components)/Header/page';
import { DataTableDemo } from '@/app/users/datatable';

const Users = () => {
    const [data, setData] = useState<User[]>([]);
    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await fetchUsers();
                setData(users);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    
    console.log(data);
    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col">
            <Header name="Users" />
            <DataTableDemo data={data}/>
        </div>
    )
}

export default Users