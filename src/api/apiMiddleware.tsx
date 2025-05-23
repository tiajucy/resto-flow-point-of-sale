
import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { API_ROUTES } from "./apiRoutes";
import { ProductsHandler, InventoryHandler, OrdersHandler, EstablishmentsHandler, PlansHandler, ReportsHandler, initializeApiData } from "./apiHandlers";
import { useProducts } from "../context/ProductContext";
import { useOrders } from "../context/OrdersContext";

interface ApiMiddlewareContextType {
  isApiReady: boolean;
}

const ApiMiddlewareContext = createContext<ApiMiddlewareContextType>({
  isApiReady: false,
});

export const useApiMiddleware = () => useContext(ApiMiddlewareContext);

export const ApiMiddlewareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { products, inventoryTransactions } = useProducts();
  const { orders } = useOrders();
  const [isApiReady, setIsApiReady] = useState(false);

  // Initialize the API with state from contexts
  useEffect(() => {
    initializeApiData(products, inventoryTransactions, orders);
    setIsApiReady(true);
  }, [products, inventoryTransactions, orders]);

  // Mock API by intercepting fetch requests
  useEffect(() => {
    const originalFetch = window.fetch;
    
    window.fetch = async function(input: RequestInfo | URL, init?: RequestInit) {
      const url = typeof input === 'string' ? input : input.toString();
      
      // Check if this is an API request we should handle
      if (!url.startsWith(API_ROUTES.API_BASE_URL)) {
        return originalFetch(input, init);
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      try {
        // Parse API request
        const method = init?.method || 'GET';
        const body = init?.body ? JSON.parse(init.body.toString()) : undefined;
        
        // Determine API endpoint and handler
        let response: any;
        
        // Products endpoints
        if (url.match(/^\/api\/products\/\d+$/)) {
          const id = parseInt(url.split('/').pop() || '0');
          
          if (method === 'GET') {
            response = ProductsHandler.getById(id);
          } else if (method === 'PUT') {
            response = ProductsHandler.update(body);
          } else if (method === 'DELETE') {
            response = ProductsHandler.delete(id);
          }
        } else if (url === API_ROUTES.products.getAll) {
          response = ProductsHandler.getAll();
        } else if (url === API_ROUTES.products.create && method === 'POST') {
          response = ProductsHandler.create(body);
        } else if (url === API_ROUTES.products.lowStock) {
          response = ProductsHandler.getLowStock();
        }
        
        // Inventory endpoints
        else if (url === API_ROUTES.inventory.getAll) {
          response = InventoryHandler.getAll();
        } else if (url === API_ROUTES.inventory.addTransaction && method === 'POST') {
          response = InventoryHandler.addTransaction(body);
        } else if (url.match(/^\/api\/inventory\/product\/\d+$/)) {
          const productId = parseInt(url.split('/').pop() || '0');
          response = InventoryHandler.getByProduct(productId);
        }
        
        // Orders endpoints
        else if (url.match(/^\/api\/orders\/[\w-]+\/status$/) && method === 'PATCH') {
          const orderId = url.split('/')[3];
          response = OrdersHandler.updateStatus(orderId, body.status);
        } else if (url.match(/^\/api\/orders\/[\w-]+\/items\/\d+\/toggle-prepared$/) && method === 'PATCH') {
          const parts = url.split('/');
          const orderId = parts[3];
          const itemIndex = parseInt(parts[5]);
          response = OrdersHandler.toggleItemPrepared(orderId, itemIndex);
        } else if (url.match(/^\/api\/orders\/[\w-]+$/)) {
          const orderId = url.split('/').pop() || '';
          response = OrdersHandler.getById(orderId);
        } else if (url === API_ROUTES.orders.getAll) {
          response = OrdersHandler.getAll();
        } else if (url === API_ROUTES.orders.create && method === 'POST') {
          response = OrdersHandler.create(body);
        } else if (url === API_ROUTES.orders.kitchen) {
          response = OrdersHandler.getKitchenOrders();
        }
        
        // Plans endpoints
        else if (url === API_ROUTES.plans.getAll) {
          response = PlansHandler.getAll();
        } else if (url.match(/^\/api\/plans\/\d+$/)) {
          const planId = parseInt(url.split('/').pop() || '0');
          response = PlansHandler.getById(planId);
        }
        
        // Establishments endpoints
        else if (url.match(/^\/api\/establishments\/[\w-]+\/payments$/)) {
          const establishmentId = url.split('/')[3];
          response = EstablishmentsHandler.getPaymentHistory(establishmentId);
        } else if (url.match(/^\/api\/establishments\/[\w-]+\/current-plan$/)) {
          const establishmentId = url.split('/')[3];
          response = EstablishmentsHandler.getCurrentPlan(establishmentId);
        } else if (url.match(/^\/api\/establishments\/[\w-]+\/update-plan$/) && method === 'PATCH') {
          const establishmentId = url.split('/')[3];
          response = EstablishmentsHandler.updatePlan(establishmentId, body.planId);
        } else if (url.match(/^\/api\/establishments\/[\w-]+\/toggle-status$/) && method === 'PATCH') {
          const establishmentId = url.split('/')[3];
          response = EstablishmentsHandler.toggleStatus(establishmentId);
        } else if (url.match(/^\/api\/establishments\/[\w-]+$/)) {
          const establishmentId = url.split('/')[3];
          if (method === 'GET') {
            response = EstablishmentsHandler.getById(establishmentId);
          } else if (method === 'PUT') {
            response = EstablishmentsHandler.update(body);
          }
        } else if (url === API_ROUTES.establishments.getAll) {
          response = EstablishmentsHandler.getAll();
        } else if (url === API_ROUTES.establishments.create && method === 'POST') {
          response = EstablishmentsHandler.create(body);
        }
        
        // Reports endpoints
        else if (url.match(/^\/api\/reports\/sales\/\w+$/)) {
          const period = url.split('/').pop() || 'day';
          response = ReportsHandler.getSales(period);
        } else if (url.match(/^\/api\/reports\/revenue\/\w+$/)) {
          const period = url.split('/').pop() || 'day';
          response = ReportsHandler.getRevenue(period);
        } else if (url.match(/^\/api\/reports\/top-products\/\w+$/)) {
          const period = url.split('/').pop() || 'day';
          response = ReportsHandler.getTopProducts(period);
        } else if (url.match(/^\/api\/reports\/order-stats\/\w+$/)) {
          const period = url.split('/').pop() || 'day';
          response = ReportsHandler.getOrderStats(period);
        } else if (url === API_ROUTES.reports.getDailyActivity) {
          response = ReportsHandler.getDailyActivity();
        }
        
        // If no handler matched
        if (response === undefined) {
          return new Response(JSON.stringify({ error: 'Not found' }), { 
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // Return success response
        return new Response(JSON.stringify(response), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error: any) {
        // Return error response
        return new Response(JSON.stringify({ 
          error: error.message || 'Internal server error'
        }), {
          status: error.statusCode || 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    };
    
    // Clean up
    return () => {
      window.fetch = originalFetch;
    };
  }, [isApiReady]);
  
  return (
    <ApiMiddlewareContext.Provider value={{ isApiReady }}>
      {children}
    </ApiMiddlewareContext.Provider>
  );
};
