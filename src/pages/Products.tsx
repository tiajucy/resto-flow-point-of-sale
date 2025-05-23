
import { useState } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ProductForm } from "@/components/forms/ProductForm"

const Products = () => {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const products = [
    { id: 1, name: "Hambúrguer Artesanal", category: "Lanches", price: 25.90, status: "Ativo", image: "/placeholder.svg" },
    { id: 2, name: "Pizza Margherita", category: "Pizzas", price: 35.50, status: "Ativo", image: "/placeholder.svg" },
    { id: 3, name: "Refrigerante Lata", category: "Bebidas", price: 5.00, status: "Ativo", image: "/placeholder.svg" },
    { id: 4, name: "Batata Frita", category: "Acompanhamentos", price: 12.00, status: "Ativo", image: "/placeholder.svg" },
  ]

  const categories = ["Todos", "Lanches", "Pizzas", "Bebidas", "Acompanhamentos"]
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Produtos</h2>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-gradient-primary hover:bg-primary-700 text-white shadow-lg"
          >
            Novo Produto
          </Button>
        </div>

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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {product.status}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Excluir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {showForm && (
          <ProductForm onClose={() => setShowForm(false)} />
        )}
      </div>
    </DashboardLayout>
  )
}

export default Products
