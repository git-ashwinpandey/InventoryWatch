import axios from "axios";

export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummarId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expensesByCategory: ExpenseByCategorySummary[];
}

export interface User {
  userId: string;
  name: string;
  email: string;
}


export const fetchDashboardMetrics = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch dashboard metrics:", error);
  }
}


export const searchProducts = async (searchString: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
      {
        params: { searchString },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to search products:", error);
    return [];
  }
};

export const addProduct = async (product: NewProduct) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
      product
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add product:", error);
    return null;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch dashboard metrics:", error);
  }
}

export const fetchExpense = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/expenses`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch dashboard metrics:", error);
  }
}