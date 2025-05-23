
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Minus, AlertCircle } from "lucide-react";
import { useProducts, Product as ProductType } from "@/context/ProductContext";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductListProps {
  products: Product[];
  onAddItem: (product: Product, quantity: number, notes: string) => void;
}

export const ProductList = ({ products, onAddItem }: ProductListProps) => {
  const { products: inventoryProducts } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleProductClick = (product: Product) => {
    // Check if product has enough stock
    const inventoryProduct = inventoryProducts.find(p => p.id === product.id);
    
    if (inventoryProduct && inventoryProduct.stock <= 0) {
      toast({
        title: "Produto sem estoque!",
        description: `${product.name} está sem estoque disponível.`,
        variant: "destructive"
      });
      return;
    }
    
    setSelectedProduct(product);
    setQuantity(1);
    setNotes("");
    setDialogOpen(true);
  };
  
  const handleAddToOrder = () => {
    if (selectedProduct && quantity > 0) {
      // Check if we have enough stock
      const inventoryProduct = inventoryProducts.find(p => p.id === selectedProduct.id);
      
      if (inventoryProduct && inventoryProduct.stock < quantity) {
        toast({
          title: "Estoque insuficiente!",
          description: `Apenas ${inventoryProduct.stock} unidades disponíveis.`,
          variant: "destructive"
        });
        return;
      }
      
      onAddItem(selectedProduct, quantity, notes);
      setDialogOpen(false);
    }
  };
  
  const handleIncreaseQuantity = () => {
    // Check if we have enough stock before increasing
    if (selectedProduct) {
      const inventoryProduct = inventoryProducts.find(p => p.id === selectedProduct.id);
      
      if (inventoryProduct && quantity >= inventoryProduct.stock) {
        toast({
          description: `Apenas ${inventoryProduct.stock} unidades disponíveis.`,
        });
        return;
      }
    }
    
    setQuantity(prev => prev + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const getStockForProduct = (productId: number) => {
    const product = inventoryProducts.find(p => p.id === productId);
    return product?.stock || 0;
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map((product) => {
          const stock = getStockForProduct(product.id);
          const outOfStock = stock <= 0;
          
          return (
            <Card 
              key={product.id} 
              className={`cursor-pointer hover:shadow-lg transition-shadow overflow-hidden ${
                outOfStock ? 'opacity-60' : ''
              }`}
              onClick={() => handleProductClick(product)}
            >
              <div className="aspect-square bg-gray-100 overflow-hidden relative">
                {/* Use the correct image path or placeholder if image is not valid */}
                <img 
                  src={product.image || "/placeholder.svg"} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
                
                {/* Stock badge in top-right corner */}
                <Badge 
                  variant="secondary" 
                  className="absolute top-2 right-2 text-xs font-medium bg-green-500 text-white z-10"
                >
                  {stock}
                </Badge>
                
                {outOfStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <Badge variant="destructive" className="text-xs font-bold">
                      SEM ESTOQUE
                    </Badge>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm truncate">{product.name}</h3>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-primary-700 font-bold">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <Button 
                    size="sm" 
                    className="h-7 w-7 p-0 rounded-full"
                    disabled={outOfStock}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Product Customization Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              
              <div className="py-4 space-y-4">
                {/* Show product image in dialog */}
                <div className="w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="font-medium">Preço unitário:</div>
                  <div className="font-bold text-primary-700">
                    R$ {selectedProduct.price.toFixed(2)}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="font-medium">Estoque disponível:</div>
                  <Badge>
                    {getStockForProduct(selectedProduct.id)} unidades
                  </Badge>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Quantidade:
                  </label>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDecreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      max={getStockForProduct(selectedProduct.id)}
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        const max = getStockForProduct(selectedProduct.id);
                        
                        if (val > max) {
                          toast({
                            description: `Apenas ${max} unidades disponíveis.`,
                          });
                          setQuantity(max);
                        } else {
                          setQuantity(val || 1);
                        }
                      }}
                      className="w-16 text-center mx-2"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleIncreaseQuantity}
                      disabled={quantity >= getStockForProduct(selectedProduct.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Observações (Opcional):
                  </label>
                  <Textarea
                    placeholder="Ex: Sem cebola, bem passado, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="flex items-center justify-between font-bold text-lg">
                  <div>Total:</div>
                  <div className="text-primary-700">
                    R$ {(selectedProduct.price * quantity).toFixed(2)}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddToOrder}>
                  Adicionar ao Pedido
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
