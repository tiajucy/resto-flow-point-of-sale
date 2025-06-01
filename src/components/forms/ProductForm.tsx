import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useProducts, Product } from "@/context/ProductContext"
import { toast } from "@/hooks/use-toast"

interface ProductFormProps {
  productId: number | null;
  onClose: () => void;
}

export function ProductForm({ productId, onClose }: ProductFormProps) {
  const { products, addProduct, updateProduct, currentEstablishmentId } = useProducts();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "0",
    status: "Ativo" as "Ativo" | "Inativo",
    image: null as File | null
  });
  
  const [previewImage, setPreviewImage] = useState<string>("/placeholder.svg");
  const isEditing = productId !== null;

  useEffect(() => {
    // If editing, load the product data
    if (isEditing) {
      const productToEdit = products.find(p => p.id === productId);
      if (productToEdit) {
        setFormData({
          name: productToEdit.name,
          description: productToEdit.description,
          price: productToEdit.price.toString(),
          category: productToEdit.category,
          stock: productToEdit.stock.toString(),
          status: productToEdit.status,
          image: null
        });
        setPreviewImage(productToEdit.image);
      }
    }
  }, [productId, products, isEditing]);

  const categories = [
    "Lanches",
    "Pizzas", 
    "Bebidas",
    "Acompanhamentos",
    "Sobremesas"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      const price = parseFloat(formData.price);
      const stock = parseInt(formData.stock);
      
      if (isNaN(price) || price <= 0) {
        throw new Error("O preço deve ser um valor válido maior que zero.");
      }
      
      if (isNaN(stock) || stock < 0) {
        throw new Error("A quantidade em estoque deve ser um valor válido não negativo.");
      }
      
      const productData: Omit<Product, "id"> = {
        name: formData.name,
        description: formData.description,
        price,
        category: formData.category,
        stock,
        status: formData.status,
        image: previewImage,
        establishmentId: currentEstablishmentId
      };
      
      if (isEditing && productId) {
        // Update existing product
        updateProduct({ ...productData, id: productId });
        toast({
          title: "Produto atualizado",
          description: `${formData.name} foi atualizado com sucesso.`
        });
      } else {
        // Add new product
        addProduct(productData);
        toast({
          title: "Produto adicionado",
          description: `${formData.name} foi adicionado com sucesso.`
        });
      }
      
      onClose();
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao salvar o produto.",
        variant: "destructive"
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white shadow-2xl animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            {isEditing ? "Editar Produto" : "Novo Produto"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome do Produto</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Hambúrguer Artesanal"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descrição do produto..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="stock">Quantidade em Estoque</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: "Ativo" | "Inativo") => 
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="image">Imagem do Produto</Label>
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer flex-1"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-primary hover:bg-primary-700"
              >
                {isEditing ? "Atualizar Produto" : "Salvar Produto"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
