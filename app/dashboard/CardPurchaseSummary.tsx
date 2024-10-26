'use client'

import { DashboardMetrics, fetchDashboardMetrics } from '@/state/apiService';
import React, { useEffect, useState } from 'react'
import numeral from "numeral";
import { ArrowBottomRightIcon, ArrowTopRightIcon } from '@radix-ui/react-icons';
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type Props = {}

const CardPurchaseSummary = (props: Props) => {
    const [data, setData] = useState<DashboardMetrics | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const purchaseData = data?.purchaseSummary || [];

    const lastDataPoint = purchaseData[purchaseData.length - 1] || null;

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
        <div className='flex flex-col bg-white dark:bg-slate-700 justify-between shad row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 shadow-md rounded-2xl'>
            {/* HEADER */}
            <div>
                <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
                    Purchase Summary
                </h2>
                <hr />
            </div>

            {/* BODY */}
            <div>
                <div className='mb-4 mt-7 px-7'>
                    <p className='text-xs text-gray-400'>
                        Purchased
                    </p>

                    <div className='flex items-center'>
                        <p className='text-2xl font-bold'>
                            {lastDataPoint ? numeral(lastDataPoint.totalPurchased).format("$0.00a") : '0'}
                        </p>
                        {lastDataPoint && (
                            <p
                                className={`text-sm ${lastDataPoint.changePercentage! >= 0
                                    ? "text-green-500"
                                    : "text-red-500"
                                    } flex ml-3`}
                            >
                                {lastDataPoint.changePercentage! >= 0 ? (
                                    <ArrowTopRightIcon className="w-5 h-5 mr-1" />
                                ) : (
                                    <ArrowBottomRightIcon className="w-5 h-5 mr-1" />
                                )}
                                {Math.abs(lastDataPoint.changePercentage!)}%
                            </p>
                        )}
                    </div>
                </div>

                {/* CHART */}
                <ResponsiveContainer width="100%" height={200} className="p-2">
                    <AreaChart
                        data={purchaseData}
                        margin={{ top: 0, right: 0, left: -50, bottom: 45 }}
                    >
                        <XAxis dataKey="date" tick={false} axisLine={false} />
                        <YAxis tickLine={false} tick={false} axisLine={false} />
                        <Tooltip
                            formatter={(value: number) => [
                                `$${value.toLocaleString("en")}`,
                            ]}
                            labelFormatter={(label) => {
                                const date = new Date(label);
                                return date.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                });
                            }}
                        />
                        <Area
                            type="linear"
                            dataKey="totalPurchased"
                            stroke="#8884d8"
                            fill="#8884d8"
                            dot={true}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default CardPurchaseSummary