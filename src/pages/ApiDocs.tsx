import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { API_ROUTES } from "@/api/apiRoutes"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

const ApiDocs = () => {
  const { toast } = useToast();
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado para a área de transferência",
      description: "URL da API copiada com sucesso",
    });
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Documentação da API</h2>
          <Badge className="px-3 py-1 text-base">v1.0</Badge>
        </div>

        <Card className="bg-white shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Introdução</h3>
              <p className="text-gray-600">
                Esta é a documentação da API do sistema de gerenciamento de restaurante. 
                Você pode usar esta API para integrar outras aplicações com o sistema, 
                acessando dados e funcionalidades como gerenciamento de produtos, 
                controle de estoque e pedidos.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">URL Base</h4>
                <div className="flex items-center gap-2">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono flex-1">
                    {window.location.origin}/api
                  </code>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => copyToClipboard(`${window.location.origin}/api`)}
                  >
                    <Copy size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="products">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="inventory">Estoque</TabsTrigger>
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <Card className="bg-white shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-gray-800">API de Produtos</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-8">
                    {/* GET All Products */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">GET</Badge>
                          <h3 className="font-semibold text-lg">Listar Todos os Produtos</h3>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(`${window.location.origin}${API_ROUTES.products.getAll}`)}
                        >
                          <Copy size={16} className="mr-1" /> Copiar URL
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono flex-1">
                          {API_ROUTES.products.getAll}
                        </code>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Descrição</h4>
                        <p className="text-gray-600">Retorna todos os produtos cadastrados no sistema.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Resposta</h4>
                        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`[
  {
    "id": 1,
    "name": "Hambúrguer Artesanal",
    "description": "Hambúrguer artesanal grelhado com queijo e bacon",
    "category": "Lanches",
    "price": 25.9,
    "image": "/placeholder.svg",
    "stock": 20,
    "status": "Ativo"
  },
  ...
]`}
                        </pre>
                      </div>
                    </div>
                    
                    {/* GET Product by ID */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">GET</Badge>
                          <h3 className="font-semibold text-lg">Obter Produto por ID</h3>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(`${window.location.origin}${API_ROUTES.products.getById(1)}`)}
                        >
                          <Copy size={16} className="mr-1" /> Copiar URL
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono flex-1">
                          {API_ROUTES.products.getById(":id")}
                        </code>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Descrição</h4>
                        <p className="text-gray-600">Retorna os detalhes de um produto específico pelo seu ID.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Resposta</h4>
                        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "id": 1,
  "name": "Hambúrguer Artesanal",
  "description": "Hambúrguer artesanal grelhado com queijo e bacon",
  "category": "Lanches",
  "price": 25.9,
  "image": "/placeholder.svg",
  "stock": 20,
  "status": "Ativo"
}`}
                        </pre>
                      </div>
                    </div>
                    
                    {/* POST Create Product */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">POST</Badge>
                          <h3 className="font-semibold text-lg">Criar Produto</h3>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(`${window.location.origin}${API_ROUTES.products.create}`)}
                        >
                          <Copy size={16} className="mr-1" /> Copiar URL
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono flex-1">
                          {API_ROUTES.products.create}
                        </code>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Descrição</h4>
                        <p className="text-gray-600">Cria um novo produto no sistema.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Corpo da Requisição</h4>
                        <pre className="bg-gray-800 text-amber-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "name": "Novo Produto",
  "description": "Descrição do produto",
  "category": "Categoria",
  "price": 19.90,
  "image": "/placeholder.svg",
  "stock": 10,
  "status": "Ativo"
}`}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Resposta</h4>
                        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "id": 5,
  "name": "Novo Produto",
  "description": "Descrição do produto",
  "category": "Categoria",
  "price": 19.90,
  "image": "/placeholder.svg",
  "stock": 10,
  "status": "Ativo"
}`}
                        </pre>
                      </div>
                    </div>
                    
                    {/* PUT Update Product */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">PUT</Badge>
                          <h3 className="font-semibold text-lg">Atualizar Produto</h3>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(`${window.location.origin}${API_ROUTES.products.update(1)}`)}
                        >
                          <Copy size={16} className="mr-1" /> Copiar URL
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono flex-1">
                          {API_ROUTES.products.update(":id")}
                        </code>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Descrição</h4>
                        <p className="text-gray-600">Atualiza um produto existente no sistema.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Corpo da Requisição</h4>
                        <pre className="bg-gray-800 text-amber-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "id": 1,
  "name": "Hambúrguer Artesanal Atualizado",
  "description": "Descrição atualizada",
  "category": "Lanches",
  "price": 29.90,
  "image": "/placeholder.svg",
  "stock": 15,
  "status": "Ativo"
}`}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Resposta</h4>
                        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "id": 1,
  "name": "Hambúrguer Artesanal Atualizado",
  "description": "Descrição atualizada",
  "category": "Lanches",
  "price": 29.90,
  "image": "/placeholder.svg",
  "stock": 15,
  "status": "Ativo"
}`}
                        </pre>
                      </div>
                    </div>
                    
                    {/* DELETE Product */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">DELETE</Badge>
                          <h3 className="font-semibold text-lg">Excluir Produto</h3>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(`${window.location.origin}${API_ROUTES.products.delete(1)}`)}
                        >
                          <Copy size={16} className="mr-1" /> Copiar URL
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono flex-1">
                          {API_ROUTES.products.delete(":id")}
                        </code>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Descrição</h4>
                        <p className="text-gray-600">Remove um produto do sistema.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Resposta</h4>
                        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  true
}`}
                        </pre>
                      </div>
                    </div>
                    
                    {/* GET Low Stock */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">GET</Badge>
                          <h3 className="font-semibold text-lg">Produtos com Estoque Baixo</h3>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(`${window.location.origin}${API_ROUTES.products.lowStock}`)}
                        >
                          <Copy size={16} className="mr-1" /> Copiar URL
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono flex-1">
                          {API_ROUTES.products.lowStock}
                        </code>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Descrição</h4>
                        <p className="text-gray-600">Retorna todos os produtos com estoque abaixo do mínimo (menos de 10 unidades).</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Resposta</h4>
                        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`[
  {
    "id": 5,
    "name": "Sobremesa Especial",
    "description": "Sobremesa da casa",
    "category": "Sobremesas",
    "price": 15.50,
    "image": "/placeholder.svg",
    "stock": 8,
    "status": "Ativo"
  },
  ...
]`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inventory">
            <Card className="bg-white shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-gray-800">API de Estoque</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-8">
                    {/* GET All Inventory */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">GET</Badge>
                          <h3 className="font-semibold text-lg">Listar Transações de Estoque</h3>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(`${window.location.origin}${API_ROUTES.inventory.getAll}`)}
                        >
                          <Copy size={16} className="mr-1" /> Copiar URL
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono flex-1">
                          {API_ROUTES.inventory.getAll}
                        </code>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Descrição</h4>
                        <p className="text-gray-600">Retorna todas as transações de estoque registradas.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Resposta</h4>
                        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`[
  {
    "id": 1,
    "productId": 1,
    "type": "entrada",
    "quantity": 20,
    "date": "2025-05-23T14:30:00.000Z",
    "reason": "Estoque inicial"
  },
  ...
]`}
                        </pre>
                      </div>
                    </div>
                    
                    {/* POST Add Transaction */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">POST</Badge>
                          <h3 className="font-semibold text-lg">Adicionar Transação de Estoque</h3>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(`${window.location.origin}${API_ROUTES.inventory.addTransaction}`)}
                        >
                          <Copy size={16} className="mr-1" /> Copiar URL
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono flex-1">
                          {API_ROUTES.inventory.addTransaction}
                        </code>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Descrição</h4>
                        <p className="text-gray-600">Adiciona uma nova transação de estoque e atualiza o estoque do produto.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Corpo da Requisição</h4>
                        <pre className="bg-gray-800 text-amber-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "productId": 1,
  "type": "entrada",
  "quantity": 5,
  "reason": "Compra de fornecedor"
}`}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Resposta</h4>
                        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "id": 5,
  "productId": 1,
  "type": "entrada",
  "quantity": 5,
  "date": "2025-05-23T15:45:30.000Z",
  "reason": "Compra de fornecedor"
}`}
                        </pre>
                      </div>
                    </div>
                    
                    {/* GET Transactions by Product */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">GET</Badge>
                          <h3 className="font-semibold text-lg">Transações por Produto</h3>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(`${window.location.origin}${API_ROUTES.inventory.getByProduct(1)}`)}
                        >
                          <Copy size={16} className="mr-1" /> Copiar URL
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono flex-1">
                          {API_ROUTES.inventory.getByProduct(":productId")}
                        </code>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Descrição</h4>
                        <p className="text-gray-600">Retorna todas as transações de estoque para um produto específico.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Resposta</h4>
                        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`[
  {
    "id": 1,
    "productId": 1,
    "type": "entrada",
    "quantity": 20,
    "date": "2025-05-23T14:30:00.000Z",
    "reason": "Estoque inicial"
  },
  {
    "id": 5,
    "productId": 1,
    "type": "entrada",
    "quantity": 5,
    "date": "2025-05-23T15:45:30.000Z",
    "reason": "Compra de fornecedor"
  }
]`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card className="bg-white shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-gray-800">API de Pedidos</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-8">
                    {/* GET All Orders */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">GET</Badge>
                          <h3 className="font-semibold text-lg">Listar Todos os Pedidos</h3>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(`${window.location.origin}${API_ROUTES.orders.getAll}`)}
                        >
                          <Copy size={16} className="mr-1" /> Copiar URL
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono flex-1">
                          {API_ROUTES.orders.getAll}
                        </code>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Descrição</h4>
                        <p className="text-gray-600">Retorna todos os pedidos registrados no sistema.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Resposta</h4>
                        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`[
  {
    "id": "#001",
    "customer": "Mesa 5",
    "items": [
      {
        "id": 1,
        "name": "Hambúrguer Artesanal",
        "quantity": 2,
        "notes": "Sem cebola",
        "prepared": true,
        "productId": 1,
        "price": 25.90
      }
    ],
    "status": "Em preparo",
    "time": "14:30",
    "total": 51.80,
    "elapsedTime": "15m"
  },
  ...
]`}
                        </pre>
                      </div>
                    </div>
                    
                    {/* GET Order by ID */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">GET</Badge>
                          <h3 className="font-semibold text-lg">Obter Pedido por ID</h3>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(`${window.location.origin}${API_ROUTES.orders.getById("#001")}`)}
                        >
                          <Copy size={16} className="mr-1" /> Copiar URL
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono flex-1">
                          {API_ROUTES.orders.getById(":id")}
                        </code>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Descrição</h4>
                        <p className="text-gray-600">Retorna os detalhes de um pedido específico pelo seu ID.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Resposta</h4>
                        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "id": "#001",
  "customer": "Mesa 5",
  "items": [
    {
      "id": 1,
      "name": "Hambúrguer Artesanal",
      "quantity": 2,
      "notes": "Sem cebola",
      "prepared": true,
      "productId": 1,
      "price": 25.90
    }
  ],
  "status": "Em preparo",
  "time": "14:30",
  "total": 51.80,
  "elapsedTime": "15m"
}`}
                        </pre>
                      </div>
                    </div>
                    
                    {/* POST Create Order */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">POST</Badge>
                          <h3 className="font-semibold text-lg">Criar Pedido</h3>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(`${window.location.origin}${API_ROUTES.orders.create}`)}
                        >
                          <Copy size={16} className="mr-1" /> Copiar URL
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono flex-1">
                          {API_ROUTES.orders.create}
                        </code>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Descrição</h4>
                        <p className="text-gray-600">Cria um novo pedido no sistema e atualiza o estoque dos produtos.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Corpo da Requisição</h4>
                        <pre className="bg-gray-800 text-amber-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "customer": "Mesa 8",
  "items": [
    {
      "id": 1,
      "name": "Pizza Margherita",
      "quantity": 1,
      "notes": "",
      "prepared": false,
      "productId": 2,
      "price": 35.50
    }
  ],
  "status": "Aguardando",
  "time": "16:45",
  "total": 35.50
}`}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Resposta</h4>
                        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "id": "#005",
  "customer": "Mesa 8",
  "items": [
    {
      "id": 1,
      "name": "Pizza Margherita",
      "quantity": 1,
      "notes": "",
      "prepared": false,
      "productId": 2,
      "price": 35.50
    }
  ],
  "status": "Aguardando",
  "time": "16:45",
  "total": 35.50,
  "elapsedTime": "0m"
}`}
                        </pre>
                      </div>
                    </div>
                    
                    {/* PATCH Update Order Status */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">PATCH</Badge>
                          <h3 className="font-semibold text-lg">Atualizar Status do Pedido</h3>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(`${window.location.origin}${API_ROUTES.orders.updateStatus("#001")}`)}
                        >
                          <Copy size={16} className="mr-1" /> Copiar URL
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono flex-1">
                          {API_ROUTES.orders.updateStatus(":id")}
                        </code>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Descrição</h4>
                        <p className="text-gray-600">Atualiza o status de um pedido existente.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Corpo da Requisição</h4>
                        <pre className="bg-gray-800 text-amber-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "status": "Pronto"
}`}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Resposta</h4>
                        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "id": "#001",
  "customer": "Mesa 5",
  "items": [...],
  "status": "Pronto",
  "time": "14:30",
  "total": 51.80,
  "elapsedTime": "15m"
}`}
                        </pre>
                      </div>
                    </div>
                    
                    {/* GET Kitchen Orders */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">GET</Badge>
                          <h3 className="font-semibold text-lg">Pedidos da Cozinha</h3>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(`${window.location.origin}${API_ROUTES.orders.kitchen}`)}
                        >
                          <Copy size={16} className="mr-1" /> Copiar URL
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono flex-1">
                          {API_ROUTES.orders.kitchen}
                        </code>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Descrição</h4>
                        <p className="text-gray-600">Retorna todos os pedidos que estão em preparação na cozinha (status "Aguardando" ou "Em preparo").</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Resposta</h4>
                        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`[
  {
    "id": "#001",
    "customer": "Mesa 5",
    "items": [...],
    "status": "Em preparo",
    "time": "14:30",
    "total": 51.80,
    "elapsedTime": "15m"
  },
  {
    "id": "#003",
    "customer": "Balcão",
    "items": [...],
    "status": "Aguardando",
    "time": "14:50",
    "total": 28.50,
    "elapsedTime": "5m"
  }
]`}
                        </pre>
                      </div>
                    </div>
                    
                    {/* PATCH Toggle Item Prepared */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">PATCH</Badge>
                          <h3 className="font-semibold text-lg">Alterar Status do Item do Pedido</h3>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(`${window.location.origin}${API_ROUTES.orders.toggleItemPrepared("#001", 0)}`)}
                        >
                          <Copy size={16} className="mr-1" /> Copiar URL
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono flex-1">
                          {API_ROUTES.orders.toggleItemPrepared(":id", ":itemIndex")}
                        </code>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Descrição</h4>
                        <p className="text-gray-600">Alterna o status "prepared" de um item específico do pedido.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Resposta</h4>
                        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "id": "#001",
  "customer": "Mesa 5",
  "items": [
    {
      "id": 1,
      "name": "Hambúrguer Artesanal",
      "quantity": 2,
      "notes": "Sem cebola",
      "prepared": false,
      "productId": 1,
      "price": 25.90
    },
    ...
  ],
  "status": "Em preparo",
  "time": "14:30",
  "total": 51.80,
  "elapsedTime": "15m"
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

export default ApiDocs
