
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useOrders } from "@/context/OrdersContext"
import { toast } from "@/components/ui/sonner"

const KitchenDisplay = () => {
  const { kitchenOrders, updateOrderStatus } = useOrders();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgente": return "bg-red-100 text-red-800 border-red-200"
      case "Normal": return "bg-blue-100 text-blue-800 border-blue-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleOrderReady = (orderId: string) => {
    updateOrderStatus(orderId, "Pronto");
    toast.success(`Pedido ${orderId} marcado como pronto!`);
  }

  const handleMoreTime = (orderId: string) => {
    toast.info(`Mais tempo solicitado para o pedido ${orderId}`);
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Cozinha (KDS)</h2>
          <div className="flex gap-3">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {kitchenOrders.length} Pedidos em Preparo
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {kitchenOrders.map((order) => (
            <Card 
              key={order.id} 
              className={`bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${
                order.priority === "Urgente" ? "border-l-red-500" : "border-l-blue-500"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-800">
                    {order.id}
                  </CardTitle>
                  <Badge className={getPriorityColor(order.priority)}>
                    {order.priority}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-gray-700">{order.customer}</p>
                  <p className="text-sm text-gray-600">Pedido às {order.time}</p>
                </div>
                <div className="text-sm font-medium text-red-600">
                  Tempo: {order.elapsedTime}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 text-lg">Itens para Preparar:</h4>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">
                            {item.quantity}x {item.name}
                          </span>
                        </div>
                        {item.notes && (
                          <p className="text-sm text-orange-600 mt-1 font-medium">
                            Obs: {item.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-3">
                  <Button 
                    size="lg" 
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold"
                    onClick={() => handleOrderReady(order.id)}
                  >
                    Pronto
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="flex-1 border-gray-300 hover:bg-gray-50"
                    onClick={() => handleMoreTime(order.id)}
                  >
                    Mais Tempo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {kitchenOrders.length === 0 && (
          <Card className="bg-white shadow-lg">
            <CardContent className="p-12 text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Nenhum pedido em preparo
              </h3>
              <p className="text-gray-600">
                Todos os pedidos foram finalizados. Aguardando novos pedidos...
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

export default KitchenDisplay
