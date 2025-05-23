
// Base URL for API
export const API_BASE_URL = "/api";

// API endpoints
export const API_ROUTES = {
  // Base URL
  API_BASE_URL, // Add this line to expose the base URL in the object
  
  // Products
  products: {
    getAll: `${API_BASE_URL}/products`,
    getById: (id: number) => `${API_BASE_URL}/products/${id}`,
    create: `${API_BASE_URL}/products`,
    update: (id: number) => `${API_BASE_URL}/products/${id}`,
    delete: (id: number) => `${API_BASE_URL}/products/${id}`,
    lowStock: `${API_BASE_URL}/products/low-stock`,
  },
  
  // Inventory
  inventory: {
    getAll: `${API_BASE_URL}/inventory`,
    addTransaction: `${API_BASE_URL}/inventory/transaction`,
    getByProduct: (productId: number) => `${API_BASE_URL}/inventory/product/${productId}`,
  },
  
  // Orders
  orders: {
    getAll: `${API_BASE_URL}/orders`,
    getById: (id: string) => `${API_BASE_URL}/orders/${id}`,
    create: `${API_BASE_URL}/orders`,
    updateStatus: (id: string) => `${API_BASE_URL}/orders/${id}/status`,
    kitchen: `${API_BASE_URL}/orders/kitchen`,
    toggleItemPrepared: (orderId: string, itemIndex: number) => 
      `${API_BASE_URL}/orders/${orderId}/items/${itemIndex}/toggle-prepared`,
  }
};
