
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
