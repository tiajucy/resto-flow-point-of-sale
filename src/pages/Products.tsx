
import { useState } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ProductForm } from "@/components/forms/ProductForm"
import { useProducts } from "@/context/ProductContext"
import { Pencil, Trash2, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InventoryManagement } from "@/components/inventory/InventoryManagement"

const Products = () => {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)
  const [deleteDialog, setDeleteDialog] = useState(false)
  
  const { products, deleteProduct, lowStockProducts } = useProducts()

  const categories = ["Todos", "Lanches", "Pizzas", "Bebidas", "Acompanhamentos"]
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  
  const handleEdit = (productId: number) => {
    setSelectedProduct(productId)
    setShowForm(true)
  }
  
  const handleDelete = (productId: number) => {
    setSelectedProduct(productId)
    setDeleteDialog(true)
  }
  
  const confirmDelete = () => {
    if (selectedProduct !== null) {
      deleteProduct(selectedProduct)
      setDeleteDialog(false)
      toast({
        description: "Produto excluído com sucesso!"
      })
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Produtos</h2>
          <Button 
            onClick={() => {
              setSelectedProduct(null)
              setShowForm(true)
            }}
            className="bg-gradient-primary hover:bg-primary-700 text-white shadow-lg"
          >
            Novo Produto
          </Button>
        </div>

        <Tabs defaultValue="products">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="inventory">Gestão de Estoque</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            {/* Search and Filters */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Buscar produtos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={selectedCategory === category ? "bg-gradient-primary" : ""}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {lowStockProducts.length > 0 && (
              <Card className="bg-yellow-50 border-yellow-200 my-4">
                <CardContent className="p-4 flex items-center gap-2">
                  <AlertTriangle className="text-yellow-500" size={20} />
                  <p className="text-yellow-800">
                    {lowStockProducts.length} produtos com estoque baixo!
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="p-0">
                    <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.category}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary-600">
                          R$ {product.price.toFixed(2)}
                        </span>
                        <Badge 
                          variant="secondary" 
                          className={`${
                            product.stock < 5 
                              ? "bg-red-100 text-red-800" 
                              : product.stock < 10 
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          Estoque: {product.stock}
                        </Badge>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleEdit(product.id)}
                        >
                          <Pencil className="mr-1 h-4 w-4" />
                          Editar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 text-red-600 hover:text-red-700 hover:border-red-600"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="mr-1 h-4 w-4" />
                          Excluir
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="inventory">
            <InventoryManagement />
          </TabsContent>
        </Tabs>

        {showForm && (
          <ProductForm 
            productId={selectedProduct} 
            onClose={() => setShowForm(false)}
          />
        )}
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialog(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Excluir Produto
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

export default Products
