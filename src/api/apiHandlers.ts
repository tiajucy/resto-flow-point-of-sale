
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
let establishments: any[] = [];

// Define plans and payment history
let plans = [
  {
    id: 1,
    name: "Básico",
    price: 49.90,
    period: "mês",
    features: [
      "Até 100 produtos",
      "1 terminal PDV",
      "Relatórios básicos",
      "Suporte por email"
    ]
  },
  {
    id: 2,
    name: "Profissional",
    price: 99.90,
    period: "mês",
    features: [
      "Produtos ilimitados",
      "3 terminais PDV",
      "KDS completo",
      "Relatórios avançados",
      "Suporte prioritário",
      "Integração com delivery"
    ],
    popular: true
  },
  {
    id: 3,
    name: "Enterprise",
    price: 199.90,
    period: "mês",
    features: [
      "Tudo do Profissional",
      "Terminais ilimitados",
      "Multi-estabelecimentos",
      "API personalizada",
      "Suporte 24/7",
      "Consultoria gratuita"
    ]
  }
];

let paymentHistory = [
  {
    id: 1,
    establishmentId: 'est-001',
    planId: 2,
    planName: "Profissional",
    amount: 99.90,
    status: "Pago",
    paymentMethod: "Cartão de crédito",
    date: "2023-12-15",
    invoiceUrl: "#",
    period: "15/12/2023 - 14/01/2024"
  },
  {
    id: 2,
    establishmentId: 'est-001',
    planId: 2,
    planName: "Profissional",
    amount: 99.90,
    status: "Pago",
    paymentMethod: "Cartão de crédito",
    date: "2024-01-15",
    invoiceUrl: "#",
    period: "15/01/2024 - 14/02/2024"
  },
  {
    id: 3,
    establishmentId: 'est-001',
    planId: 3,
    planName: "Enterprise",
    amount: 199.90,
    status: "Processando",
    paymentMethod: "Cartão de crédito",
    date: "2024-02-15",
    invoiceUrl: "#",
    period: "15/02/2024 - 14/03/2024"
  }
];

// Initialize with sample data
const initializeApiData = (
  initialProducts: Product[], 
  initialInventory: InventoryTransaction[], 
  initialOrders: Order[]
) => {
  products = initialProducts;
  inventoryTransactions = initialInventory;
  orders = initialOrders;
  
  // Initialize a sample establishment with plan
  if (establishments.length === 0) {
    establishments.push({
      id: 'est-001',
      name: "Restaurante São Paulo",
      currentPlanId: 2,
      status: "active",
      createdAt: "2023-10-01"
    });
  }
};

// Products Handler
export const ProductsHandler = {
  getAll: () => [...products],
  
  getById: (id: number | string) => {
    const numId = typeof id === 'string' ? parseInt(id) : id;
    const product = products.find(p => p.id === numId);
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
  
  delete: (id: number | string) => {
    const numId = typeof id === 'string' ? parseInt(id) : id;
    const index = products.findIndex(p => p.id === numId);
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
  
  getByProduct: (productId: number | string) => {
    const numId = typeof productId === 'string' ? parseInt(productId) : productId;
    return inventoryTransactions.filter(t => t.productId === numId);
  }
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

// New Plans Handler
export const PlansHandler = {
  getAll: () => [...plans],
  
  getById: (id: number | string) => {
    const numId = typeof id === 'string' ? parseInt(id) : id;
    const plan = plans.find(p => p.id === numId);
    if (!plan) throw new Error(`Plan with ID ${id} not found`);
    return plan;
  },
};

// Expanded Establishments Handler
export const EstablishmentsHandler = {
  getAll: () => [...establishments],
  
  getById: (id: string | number) => {
    const establishment = establishments.find(e => e.id === id);
    if (!establishment) throw new Error(`Establishment with ID ${id} not found`);
    return establishment;
  },
  
  create: (establishmentData: any) => {
    const newId = `est-${String(establishments.length + 1).padStart(3, '0')}`;
    
    const newEstablishment = {
      ...establishmentData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    establishments.push(newEstablishment);
    return newEstablishment;
  },
  
  update: (updatedEstablishment: any) => {
    const index = establishments.findIndex(e => e.id === updatedEstablishment.id);
    if (index === -1) throw new Error(`Establishment with ID ${updatedEstablishment.id} not found`);
    
    establishments[index] = updatedEstablishment;
    return updatedEstablishment;
  },
  
  toggleStatus: (id: string | number) => {
    const establishment = establishments.find(e => e.id === id);
    if (!establishment) throw new Error(`Establishment with ID ${id} not found`);
    
    establishment.status = establishment.status === 'active' ? 'inactive' : 'active';
    return establishment;
  },
  
  getCurrentPlan: (id: string | number) => {
    const establishment = establishments.find(e => e.id === id);
    if (!establishment) throw new Error(`Establishment with ID ${id} not found`);
    
    const plan = plans.find(p => p.id === establishment.currentPlanId);
    if (!plan) throw new Error(`Plan with ID ${establishment.currentPlanId} not found for establishment ${id}`);
    
    return {
      ...plan,
      nextPaymentDate: "2023-03-15",
      renewalType: "Automática"
    };
  },
  
  updatePlan: (id: string | number, planId: number) => {
    const establishment = establishments.find(e => e.id === id);
    if (!establishment) throw new Error(`Establishment with ID ${id} not found`);
    
    const plan = plans.find(p => p.id === planId);
    if (!plan) throw new Error(`Plan with ID ${planId} not found`);
    
    establishment.currentPlanId = planId;
    
    const today = new Date();
    const paymentDate = today.toISOString().split('T')[0];
    
    // Convert id to string to ensure type consistency
    const establishmentIdString = String(id);
    
    const newPayment = {
      id: paymentHistory.length + 1,
      establishmentId: establishmentIdString,
      planId: planId,
      planName: plan.name,
      amount: plan.price,
      status: "Processando",
      paymentMethod: "Cartão de crédito",
      date: paymentDate,
      invoiceUrl: "#",
      period: `${paymentDate} - ${new Date(today.setMonth(today.getMonth() + 1)).toISOString().split('T')[0]}`
    };
    
    paymentHistory.push(newPayment);
    
    return establishment;
  },
  
  getPaymentHistory: (id: string | number) => {
    return paymentHistory.filter(payment => payment.establishmentId === id);
  },
};

// Reports Handler - Adding this new handler
export const ReportsHandler = {
  // Get sales data by period (day, week, month)
  getSales: (period: string) => {
    // Mock data for sales report
    let data: number[] = [];
    let labels: string[] = [];
    
    // Generate data based on period
    switch(period) {
      case 'day':
        labels = Array.from({length: 24}, (_, i) => `${i}:00`);
        data = labels.map(() => Math.floor(Math.random() * 30));
        break;
      case 'week':
        labels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        data = labels.map(() => Math.floor(Math.random() * 100) + 20);
        break;
      case 'month':
        labels = Array.from({length: 30}, (_, i) => `${i+1}`);
        data = labels.map(() => Math.floor(Math.random() * 200) + 50);
        break;
      default:
        labels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        data = labels.map(() => Math.floor(Math.random() * 100) + 20);
    }
    
    return { labels, data };
  },
  
  // Get revenue data by period
  getRevenue: (period: string) => {
    // Mock data for revenue report
    let data: number[] = [];
    let labels: string[] = [];
    
    // Generate data based on period
    switch(period) {
      case 'day':
        labels = Array.from({length: 24}, (_, i) => `${i}:00`);
        data = labels.map(() => Math.random() * 1000 + 100);
        break;
      case 'week':
        labels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        data = labels.map(() => Math.random() * 3000 + 500);
        break;
      case 'month':
        labels = Array.from({length: 30}, (_, i) => `${i+1}`);
        data = labels.map(() => Math.random() * 5000 + 1000);
        break;
      default:
        labels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        data = labels.map(() => Math.random() * 3000 + 500);
    }
    
    return { labels, data };
  },
  
  // Get top products by period
  getTopProducts: (period: string) => {
    // Mock data for top products
    return [
      { id: 1, name: "Hambúrguer Artesanal", quantity: 124, revenue: 3211.60 },
      { id: 2, name: "Pizza Margherita", quantity: 98, revenue: 3479.00 },
      { id: 3, name: "Refrigerante Lata", quantity: 210, revenue: 1050.00 },
      { id: 4, name: "Batata Frita", quantity: 145, revenue: 1740.00 },
      { id: 5, name: "Milk Shake", quantity: 78, revenue: 1170.00 }
    ];
  },
  
  // Get order statistics by period
  getOrderStats: (period: string) => {
    // Mock data for order stats
    return {
      total: Math.floor(Math.random() * 500) + 100,
      completed: Math.floor(Math.random() * 400) + 80,
      canceled: Math.floor(Math.random() * 20) + 5,
      average: Math.random() * 100 + 30,
      byStatus: [
        { status: "Concluído", count: Math.floor(Math.random() * 300) + 100 },
        { status: "Em preparo", count: Math.floor(Math.random() * 50) + 10 },
        { status: "Aguardando", count: Math.floor(Math.random() * 30) + 5 },
        { status: "Cancelado", count: Math.floor(Math.random() * 20) + 5 }
      ]
    };
  },
  
  // Get daily activity data
  getDailyActivity: () => {
    const hours = Array.from({length: 24}, (_, i) => `${i}:00`);
    const data = hours.map(() => Math.floor(Math.random() * 30));
    
    // Find peak hour
    const peakIndex = data.indexOf(Math.max(...data));
    const peakHour = hours[peakIndex];
    
    return {
      labels: hours,
      data,
      peakHour
    };
  }
};

export { initializeApiData, establishments, plans, paymentHistory };
