
import { useState } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/components/ui/sonner"
import { NewOrderForm } from "@/components/forms/NewOrderForm"
import { POSInterface } from "@/components/pos/POSInterface"
import { Sheet, SheetContent } from "@/components/ui/sheet"

const Orders = () => {
  const [selectedStatus, setSelectedStatus] = useState("Todos")
  const [isNewOrderDialogOpen, setIsNewOrderDialogOpen] = useState(false)
  const [isPOSOpen, setIsPOSOpen] = useState(false)
  const [currentOrderType, setCurrentOrderType] = useState<"mesa" | "retirada" | "delivery" | null>(null)
  const [orders, setOrders] = useState([
    {
      id: "#001",
      customer: "Mesa 5",
      items: ["2x Hambúrguer Artesanal", "1x Batata Frita", "2x Refrigerante"],
      total: 85.50,
      status: "Em preparo",
      time: "14:30",
      estimatedTime: "15 min"
    },
    {
      id: "#002", 
      customer: "Mesa 12",
      items: ["1x Pizza Margherita", "1x Refrigerante"],
      total: 42.00,
      status: "Pronto",
      time: "14:25",
      estimatedTime: "Pronto"
    },
    {
      id: "#003",
      customer: "Balcão",
      items: ["1x Hambúrguer Simples", "1x Batata Frita"],
      total: 28.50,
      status: "Entregue",
      time: "14:20",
      estimatedTime: "Entregue"
    },
    {
      id: "#004",
      customer: "Mesa 3",
      items: ["3x Pizza Calabresa", "2x Refrigerante"],
      total: 96.00,
      status: "Aguardando",
      time: "14:35",
      estimatedTime: "20 min"
    }
  ])

  const statusOptions = ["Todos", "Aguardando", "Em preparo", "Pronto", "Entregue"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aguardando": return "bg-gray-100 text-gray-800"
      case "Em preparo": return "bg-yellow-100 text-yellow-800"
      case "Pronto": return "bg-green-100 text-green-800"
      case "Entregue": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const filteredOrders = selectedStatus === "Todos" 
    ? orders 
    : orders.filter(order => order.status === selectedStatus)
    
  const handleNewOrder = (orderData: any) => {
    const orderId = `#${String(orders.length + 1).padStart(3, '0')}`;
    
    // Format the customer information based on order type
    let customerDisplay = '';
    if (orderData.orderType === 'mesa') {
      customerDisplay = `Mesa ${orderData.tableNumber}`;
    } else if (orderData.orderType === 'retirada') {
      customerDisplay = `Balcão - ${orderData.customerName}`;
    } else if (orderData.orderType === 'delivery') {
      customerDisplay = `Delivery - ${orderData.customerName}`;
    }
    
    // Parse the items array from the POS interface
    const itemsArray = orderData.items || [];
    
    // Create the new order
    const newOrder = {
      id: orderId,
      customer: customerDisplay,
      items: itemsArray.length > 0 ? itemsArray : ["Itens não especificados"],
      total: orderData.total || 0,
      status: "Aguardando",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedTime: "20 min"
    };
    
    // Update orders state
    setOrders(prevOrders => [...prevOrders, newOrder]);
    
    toast.success("Pedido criado com sucesso!");
    setIsNewOrderDialogOpen(false);
    setIsPOSOpen(false);
  }

  const openPOS = (orderType: "mesa" | "retirada" | "delivery") => {
    setCurrentOrderType(orderType);
    setIsPOSOpen(true);
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Pedidos</h2>
          <Button 
            className="bg-gradient-primary hover:bg-primary-700 text-white shadow-lg"
            onClick={() => setIsNewOrderDialogOpen(true)}
          >
            Novo Pedido
          </Button>
        </div>

        {/* Status Filter */}
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex gap-2 flex-wrap">
              {statusOptions.map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus(status)}
                  className={selectedStatus === status ? "bg-gradient-primary" : ""}
                >
                  {status}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {order.id} - {order.customer}
                  </CardTitle>
                  <Badge className={`${getStatusColor(order.status)}`}>
                    {order.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">Pedido às {order.time}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Itens:</h4>
                  <ul className="space-y-1">
                    {order.items.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600">• {item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-xl font-bold text-primary-600">
                    R$ {order.total.toFixed(2)}
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {order.estimatedTime}
                  </span>
                </div>
                
                <div className="flex gap-2 pt-2">
                  {order.status === "Aguardando" && (
                    <Button size="sm" className="flex-1 bg-yellow-500 hover:bg-yellow-600">
                      Iniciar Preparo
                    </Button>
                  )}
                  {order.status === "Em preparo" && (
                    <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600">
                      Marcar Pronto
                    </Button>
                  )}
                  {order.status === "Pronto" && (
                    <Button size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600">
                      Entregar
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="flex-1">
                    Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* New Order Type Selection Dialog */}
      <Dialog open={isNewOrderDialogOpen} onOpenChange={setIsNewOrderDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Novo Pedido</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 py-4">
            <Button 
              onClick={() => {
                setIsNewOrderDialogOpen(false);
                openPOS("mesa");
              }}
              className="bg-blue-500 hover:bg-blue-600 h-16 text-lg"
            >
              Pedido de Mesa
            </Button>
            <Button 
              onClick={() => {
                setIsNewOrderDialogOpen(false);
                openPOS("retirada");
              }}
              className="bg-amber-500 hover:bg-amber-600 h-16 text-lg"
            >
              Pedido de Retirada
            </Button>
            <Button 
              onClick={() => {
                setIsNewOrderDialogOpen(false);
                openPOS("delivery");
              }}
              className="bg-green-500 hover:bg-green-600 h-16 text-lg"
            >
              Pedido de Delivery
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* POS Interface */}
      <Sheet open={isPOSOpen} onOpenChange={setIsPOSOpen}>
        <SheetContent side="right" className="w-full sm:max-w-full md:max-w-4xl p-0 overflow-y-auto">
          {currentOrderType && (
            <POSInterface 
              orderType={currentOrderType} 
              onSubmit={handleNewOrder}
              onCancel={() => setIsPOSOpen(false)}
            />
          )}
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  )
}

export default Orders
