import React from 'react'
import CardPopularProducts from './CardPopularProducts'
import CardSalesSummary from './CardSalesSummary'
import CardPurchaseSummary from './CardPurchaseSummary'
import CardExpenseSummary from './CardExpenseSummary'
import StatCard from './StatCard'
import { ArrowBottomRightIcon, ArrowTopRightIcon, BoxModelIcon, LightningBoltIcon, Pencil2Icon } from '@radix-ui/react-icons'

const Dashboard = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:md:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows'>
      <CardPopularProducts />
      <CardSalesSummary />
      <CardPurchaseSummary />
      <CardExpenseSummary />
      <StatCard
        title="Customer & Expenses"
        primaryIcon={<BoxModelIcon className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={[
          {
            title: "Customer Growth",
            amount: "175.00",
            changePercentage: 131,
            IconComponent: ArrowTopRightIcon,
          },
          {
            title: "Expenses",
            amount: "10.00",
            changePercentage: -56,
            IconComponent: ArrowBottomRightIcon,
          },
        ]}
      />
      <StatCard
        title="Dues & Pending Orders"
        primaryIcon={<Pencil2Icon className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={[
          {
            title: "Dues",
            amount: "250.00",
            changePercentage: 131,
            IconComponent: ArrowTopRightIcon,
          },
          {
            title: "Pending Orders",
            amount: "147",
            changePercentage: -56,
            IconComponent: ArrowBottomRightIcon,
          },
        ]}
      />
      <StatCard
        title="Sales & Discount"
        primaryIcon={<LightningBoltIcon className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={[
          {
            title: "Sales",
            amount: "1000.00",
            changePercentage: 20,
            IconComponent: ArrowTopRightIcon,
          },
          {
            title: "Discount",
            amount: "200.00",
            changePercentage: -10,
            IconComponent: ArrowBottomRightIcon,
          },
        ]}
      />
    </div>
  )
}

export default Dashboard