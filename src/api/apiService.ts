import { API_ROUTES } from "./apiRoutes";
import { Product, InventoryTransaction } from "../context/ProductContext";
import { Order, OrderItem } from "../context/OrdersContext";

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.message || response.statusText || "Something went wrong";
    throw new Error(errorMessage);
  }
  return response.json();
};

// Products API
export const ProductsAPI = {
  // Get all products
  getAll: async (): Promise<Product[]> => {
    const response = await fetch(API_ROUTES.products.getAll);
    return handleResponse(response);
  },

  // Get product by ID
  getById: async (id: number): Promise<Product> => {
    const response = await fetch(API_ROUTES.products.getById(id));
    return handleResponse(response);
  },

  // Create new product
  create: async (product: Omit<Product, "id">): Promise<Product> => {
    const response = await fetch(API_ROUTES.products.create, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return handleResponse(response);
  },

  // Update product
  update: async (product: Product): Promise<Product> => {
    const response = await fetch(API_ROUTES.products.update(product.id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return handleResponse(response);
  },

  // Delete product
  delete: async (id: number): Promise<void> => {
    const response = await fetch(API_ROUTES.products.delete(id), {
      method: "DELETE",
    });
    return handleResponse(response);
  },

  // Get low stock products
  getLowStock: async (): Promise<Product[]> => {
    const response = await fetch(API_ROUTES.products.lowStock);
    return handleResponse(response);
  },
};

// Inventory API
export const InventoryAPI = {
  // Get all inventory transactions
  getAll: async (): Promise<InventoryTransaction[]> => {
    const response = await fetch(API_ROUTES.inventory.getAll);
    return handleResponse(response);
  },

  // Add inventory transaction
  addTransaction: async (transaction: Omit<InventoryTransaction, "id" | "date">): Promise<InventoryTransaction> => {
    const response = await fetch(API_ROUTES.inventory.addTransaction, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });
    return handleResponse(response);
  },

  // Get transactions by product
  getByProduct: async (productId: number): Promise<InventoryTransaction[]> => {
    const response = await fetch(API_ROUTES.inventory.getByProduct(productId));
    return handleResponse(response);
  },
};

// Orders API
export const OrdersAPI = {
  // Get all orders
  getAll: async (): Promise<Order[]> => {
    const response = await fetch(API_ROUTES.orders.getAll);
    return handleResponse(response);
  },

  // Get order by ID
  getById: async (id: string): Promise<Order> => {
    const response = await fetch(API_ROUTES.orders.getById(id));
    return handleResponse(response);
  },

  // Create new order
  create: async (order: Omit<Order, "id" | "elapsedTime">): Promise<Order> => {
    const response = await fetch(API_ROUTES.orders.create, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    return handleResponse(response);
  },

  // Update order status
  updateStatus: async (id: string, status: Order["status"]): Promise<Order> => {
    const response = await fetch(API_ROUTES.orders.updateStatus(id), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    return handleResponse(response);
  },

  // Get kitchen orders
  getKitchenOrders: async (): Promise<Order[]> => {
    const response = await fetch(API_ROUTES.orders.kitchen);
    return handleResponse(response);
  },

  // Toggle item prepared status
  toggleItemPrepared: async (orderId: string, itemIndex: number): Promise<Order> => {
    const response = await fetch(API_ROUTES.orders.toggleItemPrepared(orderId, itemIndex), {
      method: "PATCH",
    });
    return handleResponse(response);
  },
};

// Plans API
export const PlansAPI = {
  // Get all plans
  getAll: async () => {
    const response = await fetch(API_ROUTES.plans.getAll);
    return handleResponse(response);
  },

  // Get plan by ID
  getById: async (id: number | string) => {
    const response = await fetch(API_ROUTES.plans.getById(id));
    return handleResponse(response);
  },
};

// Establishments API
export const EstablishmentsAPI = {
  // Get all establishments
  getAll: async () => {
    const response = await fetch(API_ROUTES.establishments.getAll);
    return handleResponse(response);
  },

  // Get establishment by ID
  getById: async (id: string | number) => {
    const response = await fetch(API_ROUTES.establishments.getById(id));
    return handleResponse(response);
  },

  // Create new establishment
  create: async (establishmentData: any) => {
    const response = await fetch(API_ROUTES.establishments.create, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(establishmentData),
    });
    return handleResponse(response);
  },

  // Update establishment
  update: async (establishment: any) => {
    const response = await fetch(API_ROUTES.establishments.update(establishment.id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(establishment),
    });
    return handleResponse(response);
  },

  // Toggle establishment status
  toggleStatus: async (id: string | number) => {
    const response = await fetch(API_ROUTES.establishments.toggleStatus(id), {
      method: "PATCH",
    });
    return handleResponse(response);
  },

  // Get current plan
  getCurrentPlan: async (id: string | number) => {
    const response = await fetch(API_ROUTES.establishments.getCurrentPlan(id));
    return handleResponse(response);
  },

  // Update plan
  updatePlan: async (id: string | number, planId: number) => {
    const response = await fetch(API_ROUTES.establishments.updatePlan(id), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId }),
    });
    return handleResponse(response);
  },

  // Get payment history
  getPaymentHistory: async (id: string | number) => {
    const response = await fetch(API_ROUTES.establishments.getPaymentHistory(id));
    return handleResponse(response);
  },
};

// Reports API
export const ReportsAPI = {
  // Get sales data by period (day, week, month)
  getSales: async (period: string) => {
    const response = await fetch(API_ROUTES.reports.getSales(period));
    return handleResponse(response);
  },

  // Get revenue data by period
  getRevenue: async (period: string) => {
    const response = await fetch(API_ROUTES.reports.getRevenue(period));
    return handleResponse(response);
  },

  // Get top products by period
  getTopProducts: async (period: string) => {
    const response = await fetch(API_ROUTES.reports.getTopProducts(period));
    return handleResponse(response);
  },

  // Get order statistics by period
  getOrderStats: async (period: string) => {
    const response = await fetch(API_ROUTES.reports.getOrderStats(period));
    return handleResponse(response);
  },

  // Get daily activity data
  getDailyActivity: async () => {
    const response = await fetch(API_ROUTES.reports.getDailyActivity);
    return handleResponse(response);
  },
};
