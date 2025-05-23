
// Base URL for API
export const API_BASE_URL = "/api";

// API endpoints
export const API_ROUTES = {
  // Base URL
  API_BASE_URL,
  
  // Products
  products: {
    getAll: `${API_BASE_URL}/products`,
    getById: (id: number | string) => `${API_BASE_URL}/products/${id}`,
    create: `${API_BASE_URL}/products`,
    update: (id: number | string) => `${API_BASE_URL}/products/${id}`,
    delete: (id: number | string) => `${API_BASE_URL}/products/${id}`,
    lowStock: `${API_BASE_URL}/products/low-stock`,
  },
  
  // Inventory
  inventory: {
    getAll: `${API_BASE_URL}/inventory`,
    addTransaction: `${API_BASE_URL}/inventory/transaction`,
    getByProduct: (productId: number | string) => `${API_BASE_URL}/inventory/product/${productId}`,
  },
  
  // Orders
  orders: {
    getAll: `${API_BASE_URL}/orders`,
    getById: (id: string | number) => `${API_BASE_URL}/orders/${id}`,
    create: `${API_BASE_URL}/orders`,
    updateStatus: (id: string | number) => `${API_BASE_URL}/orders/${id}/status`,
    kitchen: `${API_BASE_URL}/orders/kitchen`,
    toggleItemPrepared: (orderId: string | number, itemIndex: string | number) => 
      `${API_BASE_URL}/orders/${orderId}/items/${itemIndex}/toggle-prepared`,
  },

  // Establishments
  establishments: {
    getAll: `${API_BASE_URL}/establishments`,
    getById: (id: string | number) => `${API_BASE_URL}/establishments/${id}`,
    create: `${API_BASE_URL}/establishments`,
    update: (id: string | number) => `${API_BASE_URL}/establishments/${id}`,
    toggleStatus: (id: string | number) => `${API_BASE_URL}/establishments/${id}/toggle-status`,
    getPaymentHistory: (id: string | number) => `${API_BASE_URL}/establishments/${id}/payments`,
    getCurrentPlan: (id: string | number) => `${API_BASE_URL}/establishments/${id}/current-plan`,
    updatePlan: (id: string | number) => `${API_BASE_URL}/establishments/${id}/update-plan`,
  },
  
  // Plans
  plans: {
    getAll: `${API_BASE_URL}/plans`,
    getById: (id: string | number) => `${API_BASE_URL}/plans/${id}`,
  }
};
