
import { createContext, useState, useContext, ReactNode } from "react";
import { useProducts } from "./ProductContext";

// Define the order item interface
export interface OrderItem {
  name: string;
  quantity: number;
  notes: string;
  price?: number;
  prepared: boolean; // Add prepared field to track item preparation status
  productId?: number; // Add productId to track inventory
}

// Define the order interface
export interface Order {
  id: string;
  customer: string;
  items: OrderItem[];
  status: "Aguardando" | "Em preparo" | "Pronto" | "Entregue";
  time: string;
  elapsedTime: string;
  priority: "Normal" | "Urgente";
  total: number;
  paid?: boolean; // Track if order has been paid
  paymentMethod?: "Dinheiro" | "Cartão" | "PIX" | null;
}

// Context interface
interface OrdersContextType {
  orders: Order[];
  kitchenOrders: Order[];
  pendingPaymentOrders: Order[]; // Add orders awaiting payment
  addOrder: (order: Omit<Order, "id" | "elapsedTime" | "priority">) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  toggleItemPrepared: (orderId: string, itemIndex: number) => void;
  markOrderAsPaid: (orderId: string, paymentMethod: Order["paymentMethod"]) => void; // Add payment function
  updateInventoryOnSale: (items: OrderItem[]) => void; // Add inventory update function
}

// Create context with default values
const OrdersContext = createContext<OrdersContextType>({
  orders: [],
  kitchenOrders: [],
  pendingPaymentOrders: [],
  addOrder: () => {},
  updateOrderStatus: () => {},
  toggleItemPrepared: () => {},
  markOrderAsPaid: () => {},
  updateInventoryOnSale: () => {}
});

// Provider component
export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const { updateInventoryOnSale: updateProductInventory } = useProducts();
  
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "#001",
      customer: "Mesa 5",
      items: [
        { name: "Hambúrguer Artesanal", quantity: 2, notes: "Sem cebola", price: 25.90, prepared: false },
        { name: "Batata Frita", quantity: 1, notes: "", price: 12.00, prepared: false }
      ],
      status: "Em preparo",
      time: "14:30",
      elapsedTime: "5 min",
      priority: "Normal",
      total: 63.80
    },
    {
      id: "#002",
      customer: "Mesa 3", 
      items: [
        { name: "Pizza Calabresa", quantity: 3, notes: "Borda recheada", price: 38.00, prepared: false }
      ],
      status: "Aguardando",
      time: "14:35",
      elapsedTime: "2 min",
      priority: "Urgente",
      total: 114.00
    },
    {
      id: "#003",
      customer: "Balcão",
      items: [
        { name: "Hambúrguer Simples", quantity: 1, notes: "", price: 18.90, prepared: false },
        { name: "Refrigerante", quantity: 1, notes: "Gelado", price: 5.00, prepared: true }
      ],
      status: "Em preparo",
      time: "14:40",
      elapsedTime: "1 min",
      priority: "Normal",
      total: 23.90
    }
  ]);

  // Filter orders that should appear in the kitchen
  const kitchenOrders = orders.filter(
    order => ["Aguardando", "Em preparo"].includes(order.status)
  );
  
  // Filter orders that are delivered but not paid
  const pendingPaymentOrders = orders.filter(
    order => order.status === "Entregue" && !order.paid
  );

  // Add a new order
  const addOrder = (orderData: Omit<Order, "id" | "elapsedTime" | "priority">) => {
    const orderId = `#${String(orders.length + 1).padStart(3, '0')}`;
    
    // Add prepared: false to each item
    const itemsWithPreparation = orderData.items.map(item => ({
      ...item,
      prepared: false
    }));
    
    const newOrder: Order = {
      id: orderId,
      ...orderData,
      items: itemsWithPreparation,
      elapsedTime: "0 min",
      priority: "Normal"
    };
    
    setOrders([...orders, newOrder]);
  };

  // Update order status
  const updateOrderStatus = (id: string, status: Order["status"]) => {
    setOrders(
      orders.map(order => 
        order.id === id ? { ...order, status } : order
      )
    );
  };
  
  // Toggle item preparation status
  const toggleItemPrepared = (orderId: string, itemIndex: number) => {
    setOrders(
      orders.map(order => {
        if (order.id === orderId) {
          // Make a copy of the items array
          const updatedItems = [...order.items];
          
          // Check if the item index is valid
          if (itemIndex >= 0 && itemIndex < updatedItems.length) {
            // Toggle the prepared status of the specified item
            updatedItems[itemIndex] = {
              ...updatedItems[itemIndex],
              prepared: !updatedItems[itemIndex].prepared
            };
          }
          
          // Return the updated order
          return { ...order, items: updatedItems };
        }
        return order;
      })
    );
  };
  
  // Mark order as paid
  const markOrderAsPaid = (orderId: string, paymentMethod: Order["paymentMethod"]) => {
    setOrders(
      orders.map(order => 
        order.id === orderId 
          ? { ...order, paid: true, paymentMethod } 
          : order
      )
    );
  };
  
  // Update inventory when a sale occurs - pass to ProductContext
  const updateInventoryOnSale = (items: OrderItem[]) => {
    // Forward the call to the ProductContext
    updateProductInventory(items);
  };

  return (
    <OrdersContext.Provider 
      value={{ 
        orders, 
        kitchenOrders,
        pendingPaymentOrders,
        addOrder, 
        updateOrderStatus,
        toggleItemPrepared,
        markOrderAsPaid,
        updateInventoryOnSale
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

// Custom hook to use the orders context
export const useOrders = () => useContext(OrdersContext);
