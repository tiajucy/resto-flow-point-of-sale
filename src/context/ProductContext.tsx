
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { OrderItem } from "./OrdersContext";
import { useToast } from "@/hooks/use-toast";

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  stock: number;
  status: "Ativo" | "Inativo";
}

export interface InventoryTransaction {
  id: number;
  productId: number;
  type: "entrada" | "saída" | "ajuste";
  quantity: number;
  date: string;
  reason: string;
}

interface ProductContextType {
  products: Product[];
  inventoryTransactions: InventoryTransaction[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  addInventoryTransaction: (transaction: Omit<InventoryTransaction, "id" | "date">) => void;
  updateInventoryOnSale: (items: OrderItem[]) => void;
  lowStockProducts: Product[];
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  inventoryTransactions: [],
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
  addInventoryTransaction: () => {},
  updateInventoryOnSale: () => {},
  lowStockProducts: [],
});

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Hambúrguer Artesanal", category: "Lanches", price: 25.90, status: "Ativo", image: "/placeholder.svg", description: "Hambúrguer artesanal grelhado com queijo e bacon", stock: 20 },
    { id: 2, name: "Pizza Margherita", category: "Pizzas", price: 35.50, status: "Ativo", image: "/placeholder.svg", description: "Pizza tradicional com molho de tomate, queijo e manjericão", stock: 15 },
    { id: 3, name: "Refrigerante Lata", category: "Bebidas", price: 5.00, status: "Ativo", image: "/placeholder.svg", description: "Refrigerante em lata 350ml", stock: 50 },
    { id: 4, name: "Batata Frita", category: "Acompanhamentos", price: 12.00, status: "Ativo", image: "/placeholder.svg", description: "Porção de batatas fritas crocantes", stock: 30 },
  ]);
  
  const [inventoryTransactions, setInventoryTransactions] = useState<InventoryTransaction[]>([]);
  
  // Calculate low stock products (less than 10 items)
  const lowStockProducts = products.filter(product => product.stock < 10);
  
  // Show alert for low stock products
  useEffect(() => {
    if (lowStockProducts.length > 0) {
      toast({
        title: "Produtos com estoque baixo!",
        description: `${lowStockProducts.length} produtos estão com estoque abaixo do mínimo.`,
        variant: "destructive",
      });
    }
  }, [lowStockProducts.length]);
  
  // Add a new product
  const addProduct = (productData: Omit<Product, "id">) => {
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    const newProduct: Product = {
      id: newId,
      ...productData,
    };
    
    setProducts([...products, newProduct]);
    
    // Add initial inventory transaction
    if (productData.stock > 0) {
      addInventoryTransaction({
        productId: newId,
        type: "entrada",
        quantity: productData.stock,
        reason: "Estoque inicial"
      });
    }
    
    toast({
      title: "Produto adicionado",
      description: `${productData.name} foi adicionado ao catálogo.`
    });
  };
  
  // Update an existing product
  const updateProduct = (updatedProduct: Product) => {
    const oldProduct = products.find(p => p.id === updatedProduct.id);
    
    setProducts(
      products.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    
    // Add inventory transaction if stock changed
    if (oldProduct && oldProduct.stock !== updatedProduct.stock) {
      const difference = updatedProduct.stock - oldProduct.stock;
      
      addInventoryTransaction({
        productId: updatedProduct.id,
        type: difference > 0 ? "entrada" : "ajuste",
        quantity: Math.abs(difference),
        reason: "Ajuste de estoque"
      });
    }
    
    toast({
      title: "Produto atualizado",
      description: `${updatedProduct.name} foi atualizado com sucesso.`
    });
  };
  
  // Delete a product
  const deleteProduct = (id: number) => {
    const productToDelete = products.find(p => p.id === id);
    
    if (productToDelete) {
      setProducts(products.filter(product => product.id !== id));
      
      toast({
        title: "Produto excluído",
        description: `${productToDelete.name} foi removido do catálogo.`
      });
    }
  };
  
  // Add a new inventory transaction
  const addInventoryTransaction = (transactionData: Omit<InventoryTransaction, "id" | "date">) => {
    const newId = inventoryTransactions.length 
      ? Math.max(...inventoryTransactions.map(t => t.id)) + 1 
      : 1;
    
    const newTransaction: InventoryTransaction = {
      id: newId,
      ...transactionData,
      date: new Date().toISOString(),
    };
    
    setInventoryTransactions([...inventoryTransactions, newTransaction]);
    
    // Update product stock based on transaction
    updateProductStock(
      transactionData.productId, 
      transactionData.type === "entrada" 
        ? transactionData.quantity 
        : -transactionData.quantity
    );
  };
  
  // Update product stock directly
  const updateProductStock = (productId: number, quantityChange: number) => {
    setProducts(
      products.map(product => {
        if (product.id === productId) {
          const newStock = product.stock + quantityChange;
          return { ...product, stock: newStock >= 0 ? newStock : 0 };
        }
        return product;
      })
    );
  };
  
  // Update inventory when an order is placed
  const updateInventoryOnSale = (items: OrderItem[]) => {
    console.log("Updating inventory for sale items:", items);
    
    items.forEach(item => {
      if (item.productId) {
        // Find the product
        const product = products.find(p => p.id === item.productId);
        
        if (product) {
          console.log(`Processing item: ${item.name}, quantity: ${item.quantity}, product ID: ${item.productId}`);
          
          // Create inventory transaction for the sale
          addInventoryTransaction({
            productId: item.productId,
            type: "saída",
            quantity: item.quantity,
            reason: "Venda"
          });
          
          // Show toast for low inventory after sale if needed
          const remainingStock = product.stock - item.quantity;
          if (remainingStock < 10 && remainingStock > 0) {
            toast({
              title: "Estoque baixo!",
              description: `${product.name} está com apenas ${remainingStock} unidades em estoque.`,
              variant: "warning"
            });
          } else if (remainingStock <= 0) {
            toast({
              title: "Produto sem estoque!",
              description: `${product.name} está sem estoque disponível.`,
              variant: "destructive"
            });
          }
        } else {
          console.warn(`Product with ID ${item.productId} not found in inventory`);
        }
      }
    });
  };
  
  return (
    <ProductContext.Provider
      value={{
        products,
        inventoryTransactions,
        addProduct,
        updateProduct,
        deleteProduct,
        addInventoryTransaction,
        updateInventoryOnSale,
        lowStockProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
