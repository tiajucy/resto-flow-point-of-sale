
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
  establishmentId: string; // Add establishment isolation
}

export interface InventoryTransaction {
  id: number;
  productId: number;
  type: "entrada" | "saída" | "ajuste";
  quantity: number;
  date: string;
  reason: string;
  establishmentId: string; // Add establishment isolation
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
  currentEstablishmentId: string;
  setCurrentEstablishmentId: (id: string) => void;
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
  currentEstablishmentId: "est-001",
  setCurrentEstablishmentId: () => {},
});

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  
  // Current establishment context - in a real app this would come from authentication
  const [currentEstablishmentId, setCurrentEstablishmentId] = useState<string>("est-001");
  
  const [allProducts, setAllProducts] = useState<Product[]>([
    { id: 1, name: "Hambúrguer Artesanal", category: "Lanches", price: 25.90, status: "Ativo", image: "/placeholder.svg", description: "Hambúrguer artesanal grelhado com queijo e bacon", stock: 20, establishmentId: "est-001" },
    { id: 2, name: "Pizza Margherita", category: "Pizzas", price: 35.50, status: "Ativo", image: "/placeholder.svg", description: "Pizza tradicional com molho de tomate, queijo e manjericão", stock: 15, establishmentId: "est-001" },
    { id: 3, name: "Refrigerante Lata", category: "Bebidas", price: 5.00, status: "Ativo", image: "/placeholder.svg", description: "Refrigerante em lata 350ml", stock: 50, establishmentId: "est-001" },
    { id: 4, name: "Batata Frita", category: "Acompanhamentos", price: 12.00, status: "Ativo", image: "/placeholder.svg", description: "Porção de batatas fritas crocantes", stock: 30, establishmentId: "est-001" },
    // Sample data for another establishment
    { id: 5, name: "Sushi Salmão", category: "Japonês", price: 18.90, status: "Ativo", image: "/placeholder.svg", description: "Sushi fresco de salmão", stock: 25, establishmentId: "est-002" },
    { id: 6, name: "Temaki Atum", category: "Japonês", price: 22.50, status: "Ativo", image: "/placeholder.svg", description: "Temaki de atum com cream cheese", stock: 18, establishmentId: "est-002" },
  ]);
  
  const [allInventoryTransactions, setAllInventoryTransactions] = useState<InventoryTransaction[]>([]);
  
  // Filter products by current establishment
  const products = allProducts.filter(product => product.establishmentId === currentEstablishmentId);
  
  // Filter inventory transactions by current establishment
  const inventoryTransactions = allInventoryTransactions.filter(transaction => transaction.establishmentId === currentEstablishmentId);
  
  // Calculate low stock products (less than 10 items) for current establishment only
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
    const newId = allProducts.length ? Math.max(...allProducts.map(p => p.id)) + 1 : 1;
    
    const newProduct: Product = {
      id: newId,
      ...productData,
      establishmentId: currentEstablishmentId, // Assign to current establishment
    };
    
    setAllProducts([...allProducts, newProduct]);
    
    // Add initial inventory transaction
    if (productData.stock > 0) {
      addInventoryTransaction({
        productId: newId,
        type: "entrada",
        quantity: productData.stock,
        reason: "Estoque inicial",
        establishmentId: currentEstablishmentId,
      });
    }
    
    toast({
      title: "Produto adicionado",
      description: `${productData.name} foi adicionado ao catálogo.`
    });
  };
  
  // Update an existing product
  const updateProduct = (updatedProduct: Product) => {
    // Ensure the product belongs to current establishment
    if (updatedProduct.establishmentId !== currentEstablishmentId) {
      toast({
        title: "Erro",
        description: "Você não tem permissão para editar este produto.",
        variant: "destructive"
      });
      return;
    }
    
    const oldProduct = allProducts.find(p => p.id === updatedProduct.id);
    
    setAllProducts(
      allProducts.map(product => 
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
        reason: "Ajuste de estoque",
        establishmentId: currentEstablishmentId,
      });
    }
    
    toast({
      title: "Produto atualizado",
      description: `${updatedProduct.name} foi atualizado com sucesso.`
    });
  };
  
  // Delete a product
  const deleteProduct = (id: number) => {
    const productToDelete = allProducts.find(p => p.id === id && p.establishmentId === currentEstablishmentId);
    
    if (!productToDelete) {
      toast({
        title: "Erro",
        description: "Produto não encontrado ou você não tem permissão para excluí-lo.",
        variant: "destructive"
      });
      return;
    }
    
    setAllProducts(allProducts.filter(product => product.id !== id));
    
    toast({
      title: "Produto excluído",
      description: `${productToDelete.name} foi removido do catálogo.`
    });
  };
  
  // Add a new inventory transaction
  const addInventoryTransaction = (transactionData: Omit<InventoryTransaction, "id" | "date">) => {
    const newId = allInventoryTransactions.length 
      ? Math.max(...allInventoryTransactions.map(t => t.id)) + 1 
      : 1;
    
    const newTransaction: InventoryTransaction = {
      id: newId,
      ...transactionData,
      date: new Date().toISOString(),
      establishmentId: transactionData.establishmentId || currentEstablishmentId, // Ensure establishment is set
    };
    
    setAllInventoryTransactions([...allInventoryTransactions, newTransaction]);
    
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
    setAllProducts(
      allProducts.map(product => {
        if (product.id === productId && product.establishmentId === currentEstablishmentId) {
          const newStock = product.stock + quantityChange;
          return { ...product, stock: newStock >= 0 ? newStock : 0 };
        }
        return product;
      })
    );
  };
  
  // Update inventory when an order is placed
  const updateInventoryOnSale = (items: OrderItem[]) => {
    console.log("Updating inventory for sale items:", JSON.stringify(items));
    
    if (!items || items.length === 0) {
      console.warn("No items provided to update inventory");
      return;
    }
    
    items.forEach(item => {
      if (!item.productId) {
        console.warn(`Item ${item.name} has no productId, skipping inventory update`);
        return;
      }
      
      // Find the product in current establishment
      const product = products.find(p => p.id === item.productId);
      
      if (product) {
        console.log(`Processing item: ${item.name}, quantity: ${item.quantity}, product ID: ${item.productId}, current stock: ${product.stock}`);
        
        // Create inventory transaction for the sale
        addInventoryTransaction({
          productId: item.productId,
          type: "saída",
          quantity: item.quantity,
          reason: "Venda",
          establishmentId: currentEstablishmentId,
        });
        
        // Show toast for low inventory after sale if needed
        const remainingStock = product.stock - item.quantity;
        if (remainingStock < 10 && remainingStock > 0) {
          toast({
            title: "Estoque baixo!",
            description: `${product.name} está com apenas ${remainingStock} unidades em estoque.`,
            variant: "default" 
          });
        } else if (remainingStock <= 0) {
          toast({
            title: "Produto sem estoque!",
            description: `${product.name} está sem estoque disponível.`,
            variant: "destructive"
          });
        }
      } else {
        console.warn(`Product with ID ${item.productId} not found in current establishment inventory`);
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
        lowStockProducts,
        currentEstablishmentId,
        setCurrentEstablishmentId
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
