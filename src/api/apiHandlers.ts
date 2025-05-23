
import { Product, InventoryTransaction } from "../context/ProductContext";
import { Order, OrderItem } from "../context/OrdersContext";

// In-memory storage for our "API"
// In a real-world scenario, these would be replaced with actual API calls to a backend
let products: Product[] = [
  { id: 1, name: "Hambúrguer Artesanal", category: "Lanches", price: 25.90, status: "Ativo", image: "/placeholder.svg", description: "Hambúrguer artesanal grelhado com queijo e bacon", stock: 20 },
  { id: 2, name: "Pizza Margherita", category: "Pizzas", price: 35.50, status: "Ativo", image: "/placeholder.svg", description: "Pizza tradicional com molho de tomate, queijo e manjericão", stock: 15 },
  { id: 3, name: "Refrigerante Lata", category: "Bebidas", price: 5.00, status: "Ativo", image: "/placeholder.svg", description: "Refrigerante em lata 350ml", stock: 50 },
  { id: 4, name: "Batata Frita", category: "Acompanhamentos", price: 12.00, status: "Ativo", image: "/placeholder.svg", description: "Porção de batatas fritas crocantes", stock: 30 },
];

let inventoryTransactions: InventoryTransaction[] = [];
let orders: Order[] = [];

// Initialize with sample data
const initializeApiData = (
  initialProducts: Product[], 
  initialInventory: InventoryTransaction[], 
  initialOrders: Order[]
) => {
  products = initialProducts;
  inventoryTransactions = initialInventory;
  orders = initialOrders;
};

// Products Handler
export const ProductsHandler = {
  getAll: () => [...products],
  
  getById: (id: number) => {
    const product = products.find(p => p.id === id);
    if (!product) throw new Error(`Product with ID ${id} not found`);
    return product;
  },
  
  create: (product: Omit<Product, "id">) => {
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct: Product = { ...product, id: newId };
    products.push(newProduct);
    return newProduct;
  },
  
  update: (updatedProduct: Product) => {
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index === -1) throw new Error(`Product with ID ${updatedProduct.id} not found`);
    products[index] = updatedProduct;
    return updatedProduct;
  },
  
  delete: (id: number) => {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error(`Product with ID ${id} not found`);
    products.splice(index, 1);
    return true;
  },
  
  getLowStock: () => products.filter(product => product.stock < 10),
};

// Inventory Handler
export const InventoryHandler = {
  getAll: () => [...inventoryTransactions],
  
  addTransaction: (transaction: Omit<InventoryTransaction, "id" | "date">) => {
    const newId = inventoryTransactions.length 
      ? Math.max(...inventoryTransactions.map(t => t.id)) + 1 
      : 1;
    
    const newTransaction: InventoryTransaction = {
      ...transaction,
      id: newId,
      date: new Date().toISOString(),
    };
    
    inventoryTransactions.push(newTransaction);
    
    // Update product stock
    const product = products.find(p => p.id === transaction.productId);
    if (product) {
      const stockChange = transaction.type === "entrada" 
        ? transaction.quantity 
        : -transaction.quantity;
      
      product.stock = Math.max(0, product.stock + stockChange);
    }
    
    return newTransaction;
  },
  
  getByProduct: (productId: number) => 
    inventoryTransactions.filter(t => t.productId === productId),
};

// Orders Handler
export const OrdersHandler = {
  getAll: () => [...orders],
  
  getById: (id: string) => {
    const order = orders.find(o => o.id === id);
    if (!order) throw new Error(`Order with ID ${id} not found`);
    return order;
  },
  
  create: (orderData: Omit<Order, "id" | "elapsedTime">) => {
    // Generate unique ID
    const orderId = `#${String(orders.length + 1).padStart(3, '0')}`;
    
    // Create new order
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      elapsedTime: "0m",
    };
    
    orders.push(newOrder);
    
    // Update product stock
    if (orderData.items && orderData.items.length > 0) {
      orderData.items.forEach(item => {
        if (item.productId) {
          const product = products.find(p => p.id === item.productId);
          if (product) {
            product.stock = Math.max(0, product.stock - item.quantity);
          }
        }
      });
    }
    
    return newOrder;
  },
  
  updateStatus: (id: string, status: Order["status"]) => {
    const order = orders.find(o => o.id === id);
    if (!order) throw new Error(`Order with ID ${id} not found`);
    
    order.status = status;
    return order;
  },
  
  getKitchenOrders: () => 
    orders.filter(o => ["Aguardando", "Em preparo"].includes(o.status)),
  
  toggleItemPrepared: (orderId: string, itemIndex: number) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) throw new Error(`Order with ID ${orderId} not found`);
    
    if (!order.items[itemIndex]) throw new Error(`Item at index ${itemIndex} not found`);
    
    order.items[itemIndex].prepared = !order.items[itemIndex].prepared;
    return order;
  },
};

export { initializeApiData };
