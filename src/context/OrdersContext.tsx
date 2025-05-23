
import { createContext, useState, useContext, ReactNode } from "react";

// Define the order item interface
export interface OrderItem {
  name: string;
  quantity: number;
  notes: string;
  price?: number; // Adicionando o preço do item
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
  total: number; // Adicionando o campo total ao pedido
}

// Context interface
interface OrdersContextType {
  orders: Order[];
  kitchenOrders: Order[];
  addOrder: (order: Omit<Order, "id" | "elapsedTime" | "priority">) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
}

// Create context with default values
const OrdersContext = createContext<OrdersContextType>({
  orders: [],
  kitchenOrders: [],
  addOrder: () => {},
  updateOrderStatus: () => {},
});

// Provider component
export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "#001",
      customer: "Mesa 5",
      items: [
        { name: "Hambúrguer Artesanal", quantity: 2, notes: "Sem cebola", price: 25.90 },
        { name: "Batata Frita", quantity: 1, notes: "", price: 12.00 }
      ],
      status: "Em preparo",
      time: "14:30",
      elapsedTime: "5 min",
      priority: "Normal",
      total: 63.80
    },
    {
      id: "#004",
      customer: "Mesa 3", 
      items: [
        { name: "Pizza Calabresa", quantity: 3, notes: "Borda recheada", price: 38.00 }
      ],
      status: "Aguardando",
      time: "14:35",
      elapsedTime: "2 min",
      priority: "Urgente",
      total: 114.00
    },
    {
      id: "#005",
      customer: "Balcão",
      items: [
        { name: "Hambúrguer Simples", quantity: 1, notes: "", price: 18.90 },
        { name: "Refrigerante", quantity: 1, notes: "Gelado", price: 5.00 }
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

  // Add a new order
  const addOrder = (orderData: Omit<Order, "id" | "elapsedTime" | "priority">) => {
    const orderId = `#${String(orders.length + 1).padStart(3, '0')}`;
    
    const newOrder: Order = {
      id: orderId,
      ...orderData,
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

  return (
    <OrdersContext.Provider 
      value={{ 
        orders, 
        kitchenOrders,
        addOrder, 
        updateOrderStatus 
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

// Custom hook to use the orders context
export const useOrders = () => useContext(OrdersContext);
