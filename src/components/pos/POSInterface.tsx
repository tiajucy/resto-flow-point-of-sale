import { useState } from "react";
import { ProductList } from "./ProductList";
import { OrderSummary } from "./OrderSummary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProducts } from "@/context/ProductContext";
import { useOrders } from "@/context/OrdersContext";

// Sample product categories for demonstration
const productCategories = [
  "Todos", "Lanches", "Pizzas", "Bebidas", "Sobremesas", "Acompanhamentos"
];

interface POSInterfaceProps {
  orderType: "mesa" | "retirada" | "delivery";
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const POSInterface = ({ orderType, onSubmit, onCancel }: POSInterfaceProps) => {
  const { products: inventoryProducts, updateInventoryOnSale } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [orderItems, setOrderItems] = useState<Array<{
    id: number;
    productId: number;
    name: string;
    price: number;
    quantity: number;
    notes: string;
  }>>([]);
  
  // For customer details based on order type
  const [tableNumber, setTableNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [reference, setReference] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);

  // Use real product data from our inventory
  const availableProducts = inventoryProducts.map(product => ({
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    image: product.image || "/placeholder.svg"
  }));

  // Filter products by category and search term
  const filteredProducts = availableProducts.filter(product => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddItem = (product: any, quantity: number, notes: string) => {
    const newItem = {
      id: Date.now(),
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      notes: notes
    };
    setOrderItems([...orderItems, newItem]);
  };

  const handleRemoveItem = (id: number) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setOrderItems(orderItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const calculateTotal = () => {
    const itemsTotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity, 
      0
    );
    return orderType === "delivery" ? itemsTotal + deliveryFee : itemsTotal;
  };

  const handleSubmitOrder = () => {
    // Validate form based on order type
    if (orderType === "mesa" && !tableNumber) {
      alert("Por favor, informe o número da mesa.");
      return;
    }
    
    if ((orderType === "retirada" || orderType === "delivery") && (!customerName || !customerPhone)) {
      alert("Nome e telefone do cliente são obrigatórios.");
      return;
    }
    
    if (orderType === "delivery" && !address) {
      alert("Endereço de entrega é obrigatório.");
      return;
    }
    
    if (orderItems.length === 0) {
      alert("Adicione pelo menos um item ao pedido.");
      return;
    }
    
    // Update inventory right away when order is placed
    updateInventoryOnSale(orderItems);
    
    // Format items for display on order card
    const formattedItems = orderItems.map(item => {
      const itemText = `${item.quantity}x ${item.name}`;
      return item.notes ? `${itemText} (${item.notes})` : itemText;
    });
    
    // Create order data
    const orderData = {
      orderType,
      tableNumber,
      customerName,
      customerPhone,
      address,
      reference,
      deliveryFee,
      items: formattedItems,
      total: calculateTotal(),
      itemDetails: orderItems // Keep detailed version for future reference
    };
    
    onSubmit(orderData);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">
            {orderType === "mesa" ? "Pedido de Mesa" : 
             orderType === "retirada" ? "Pedido de Retirada" : "Pedido de Delivery"}
          </h2>
          <Button variant="outline" onClick={onCancel}>Fechar</Button>
        </div>

        {/* Customer Information Section based on order type */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          {orderType === "mesa" && (
            <div className="flex items-center">
              <span className="font-medium mr-2">Número da Mesa:</span>
              <Input
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="max-w-[100px]"
                placeholder="Ex: 5"
              />
            </div>
          )}
          
          {(orderType === "retirada" || orderType === "delivery") && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-medium">Nome do Cliente:</label>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nome completo"
                />
              </div>
              <div className="space-y-2">
                <label className="font-medium">Telefone:</label>
                <Input
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>
          )}
          
          {orderType === "delivery" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <label className="font-medium">Endereço Completo:</label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Rua, número, bairro, cidade"
                />
              </div>
              <div className="space-y-2">
                <label className="font-medium">Ponto de Referência:</label>
                <Input
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Próximo a..."
                />
              </div>
              <div className="space-y-2">
                <label className="font-medium">Taxa de Entrega (R$):</label>
                <Input
                  type="number"
                  min="0"
                  step="0.50"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(Number(e.target.value))}
                  className="max-w-[150px]"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Side - Product Selection */}
        <div className="w-2/3 border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center gap-4 mb-4">
              <Input 
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>

            <div className="overflow-x-auto">
              <Tabs defaultValue="Todos" className="w-full">
                <TabsList className="flex overflow-x-auto pb-1 mb-2">
                  {productCategories.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      onClick={() => setSelectedCategory(category)}
                      className="whitespace-nowrap"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value="Todos" className="mt-0">
                  <ProductList 
                    products={filteredProducts} 
                    onAddItem={handleAddItem} 
                  />
                </TabsContent>
                {productCategories.slice(1).map((category) => (
                  <TabsContent key={category} value={category} className="mt-0">
                    <ProductList 
                      products={filteredProducts} 
                      onAddItem={handleAddItem} 
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
        
        {/* Right Side - Order Summary */}
        <div className="w-1/3 flex flex-col bg-gray-50">
          <div className="flex-1 overflow-hidden">
            <OrderSummary
              items={orderItems}
              onRemoveItem={handleRemoveItem}
              onQuantityChange={handleQuantityChange}
              total={calculateTotal()}
              deliveryFee={orderType === "delivery" ? deliveryFee : 0}
            />
          </div>
          
          <div className="p-4 border-t bg-gray-50">
            <Button 
              onClick={handleSubmitOrder}
              className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
              disabled={orderItems.length === 0}
            >
              Finalizar Pedido • R$ {calculateTotal().toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
