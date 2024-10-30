'use client'

import { DashboardMetrics, ExpenseByCategorySummary, fetchDashboardMetrics } from '@/state/apiService';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

type ExpenseSummaryProp = {
    [category: string]: number;
}

const colors = ["#00C49F", "#0088FE", "#FFBB28"];

const CardExpenseSummary = () => {
    const [data, setData] = useState<DashboardMetrics | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const expenseSummary = data?.expenseSummary[0] || null;
    const expenseByCategorySummary = data?.expensesByCategory || [];

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


    const expenseSums = expenseByCategorySummary.reduce((acc: ExpenseSummaryProp, item: ExpenseByCategorySummary) => {
        const category = item.category + " Expenses";
        const amount = parseInt(item.amount, 10);
        if (!acc[category])
            acc[category] = 0;
        acc[category] += amount;
        return acc;
    },
        {}
    );

    const expenseCategories = Object.entries(expenseSums).map(([name, value]) => ({
        name,
        value,
    })
    );

    const totalExpenses = expenseCategories.reduce((acc, category: { value: number }) =>
        acc + category.value,
        0
    );
    const formattedTotalExpenses = totalExpenses.toFixed(2);

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
        <div className='row-span-3 bg-white dark:bg-slate-700 shadow-md rounded-2xl flex flex-col justify-between'>
            {/* HEADER */}
            <div>
                <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
                    Expense Summary
                </h2>
                <hr />
            </div>
            {/* BODY */}
            <div className="xl:flex justify-between pr-7">
                {/* CHART */}
                <div className="relative basis-3/5">
                    <ResponsiveContainer width="100%" height={140}>
                        <PieChart>
                            <Pie
                                data={expenseCategories}
                                innerRadius={50}
                                outerRadius={60}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                            >
                                {expenseCategories.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={colors[index % colors.length]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center basis-2/5">
                        <span className="font-bold text-xl">
                            ${formattedTotalExpenses}
                        </span>
                    </div>
                </div>

                {/* LABELS */}
                <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
                    {expenseCategories.map((entry, index) => (
                        <li
                            key={`legend-${index}`}
                            className="flex items-center text-xs"
                        >
                            <span
                                className="mr-2 w-3 h-3 rounded-full"
                                style={{ backgroundColor: colors[index % colors.length] }}
                            ></span>
                            {entry.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* FOOTER */}
            <div>
                <hr />
                {expenseSummary && (
                    <div className="mt-3 flex justify-between items-center px-7 mb-4">
                        <div className="pt-2">
                            <p className="text-sm">
                                Average:{" "}
                                <span className="font-semibold">
                                    ${expenseSummary?.totalExpenses?.toFixed(2) || '0.00'}
                                </span>
                            </p>
                        </div>
                        <span className="flex items-center mt-2">
                            <ArrowTopRightIcon className="mr-2 text-green-500" />
                            30%
                        </span>
                    </div>
                )}
            </div>


        </div>
    )
}

export default CardExpenseSummary