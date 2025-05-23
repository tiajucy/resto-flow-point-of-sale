
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const Dashboard = () => {
  const stats = [
    { title: "Vendas Hoje", value: "R$ 2.450,00", change: "+12%", color: "text-green-600" },
    { title: "Pedidos", value: "48", change: "+8%", color: "text-blue-600" },
    { title: "Produtos", value: "156", change: "+2%", color: "text-purple-600" },
    { title: "Média por Pedido", value: "R$ 51,04", change: "+15%", color: "text-orange-600" },
  ]

  const recentOrders = [
    { id: "#001", customer: "Mesa 5", total: "R$ 85,50", status: "Em preparo", time: "14:30" },
    { id: "#002", customer: "Mesa 12", total: "R$ 42,00", status: "Pronto", time: "14:25" },
    { id: "#003", customer: "Balcão", total: "R$ 28,50", status: "Entregue", time: "14:20" },
    { id: "#004", customer: "Mesa 3", total: "R$ 96,00", status: "Em preparo", time: "14:15" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          <Button className="bg-gradient-primary hover:bg-primary-700 text-white shadow-lg">
            Novo Pedido
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  <span className={`text-sm font-medium ${stat.color}`}>{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Pedidos Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{order.id} - {order.customer}</span>
                        <span className="text-sm text-gray-500">{order.time}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-lg font-semibold text-gray-800">{order.total}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.status === "Pronto" ? "bg-green-100 text-green-800" :
                          order.status === "Em preparo" ? "bg-yellow-100 text-yellow-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-primary-50">
                  <Square className="h-6 w-6" />
                  <span>Novo Produto</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-primary-50">
                  <Clock className="h-6 w-6" />
                  <span>Ver Pedidos</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-primary-50">
                  <Printer className="h-6 w-6" />
                  <span>Cozinha</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-primary-50">
                  <Settings className="h-6 w-6" />
                  <span>Configurações</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
