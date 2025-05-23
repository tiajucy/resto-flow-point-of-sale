
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setNotes("");
    setDialogOpen(true);
  };
  
  const handleAddToOrder = () => {
    if (selectedProduct && quantity > 0) {
      onAddItem(selectedProduct, quantity, notes);
      setDialogOpen(false);
    }
  };
  
  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map((product) => (
          <Card 
            key={product.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden" 
            onClick={() => handleProductClick(product)}
          >
            <div className="aspect-square bg-gray-100 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
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
        ))}
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
                <div className="flex items-center justify-between">
                  <div className="font-medium">Preço unitário:</div>
                  <div className="font-bold text-primary-700">
                    R$ {selectedProduct.price.toFixed(2)}
                  </div>
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
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-16 text-center mx-2"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleIncreaseQuantity}
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
