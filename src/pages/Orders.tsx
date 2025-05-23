
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
import { useOrders, Order, OrderItem } from "@/context/OrdersContext"

const Orders = () => {
  const [selectedStatus, setSelectedStatus] = useState("Todos")
  const [isNewOrderDialogOpen, setIsNewOrderDialogOpen] = useState(false)
  const [isPOSOpen, setIsPOSOpen] = useState(false)
  const [currentOrderType, setCurrentOrderType] = useState<"mesa" | "retirada" | "delivery" | null>(null)
  const { orders, addOrder, updateOrderStatus } = useOrders();

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
    // Format the customer information based on order type
    let customerDisplay = '';
    if (orderData.orderType === 'mesa') {
      customerDisplay = `Mesa ${orderData.tableNumber}`;
    } else if (orderData.orderType === 'retirada') {
      customerDisplay = `Balcão - ${orderData.customerName}`;
    } else if (orderData.orderType === 'delivery') {
      customerDisplay = `Delivery - ${orderData.customerName}`;
    }
    
    // Transform the items array to match the expected format
    let parsedItems: OrderItem[] = [];
    
    if (Array.isArray(orderData.items)) {
      if (typeof orderData.items[0] === 'string') {
        // Handle string array case
        parsedItems = orderData.items.map((item: string) => {
          // Parse item strings like "2x Hambúrguer Artesanal"
          const match = item.match(/(\d+)x (.+?)(?:\((.+?)\))?$/);
          if (match) {
            const quantity = parseInt(match[1]);
            const name = match[2].trim();
            const notes = match[3] ? match[3].trim() : '';
            return { name, quantity, notes };
          }
          return { name: item, quantity: 1, notes: '' };
        });
      } else if (orderData.itemDetails && Array.isArray(orderData.itemDetails)) {
        // Use detailed items if available
        parsedItems = orderData.itemDetails.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          notes: item.notes || '',
        }));
      }
    }
    
    // Create the new order
    addOrder({
      customer: customerDisplay,
      items: parsedItems.length > 0 ? parsedItems : [{ name: "Itens não especificados", quantity: 1, notes: "" }],
      status: "Aguardando",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    
    toast.success("Pedido criado com sucesso!");
    setIsNewOrderDialogOpen(false);
    setIsPOSOpen(false);
  }

  const openPOS = (orderType: "mesa" | "retirada" | "delivery") => {
    setCurrentOrderType(orderType);
    setIsPOSOpen(true);
  }

  const handleStatusUpdate = (orderId: string, newStatus: Order["status"]) => {
    updateOrderStatus(orderId, newStatus);
    toast.success(`Status do pedido ${orderId} atualizado para ${newStatus}`);
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
          {filteredOrders.map((order) => {
            // Format items for display on the card
            const displayItems = order.items.map(item => 
              `${item.quantity}x ${item.name}${item.notes ? ` (${item.notes})` : ''}`
            );
            
            // Calculate total (placeholder for now)
            const orderTotal = 0;
            
            return (
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
                      {displayItems.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600">• {item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="text-xl font-bold text-primary-600">
                      R$ {orderTotal.toFixed(2)}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {order.elapsedTime}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    {order.status === "Aguardando" && (
                      <Button 
                        size="sm" 
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600"
                        onClick={() => handleStatusUpdate(order.id, "Em preparo")}
                      >
                        Iniciar Preparo
                      </Button>
                    )}
                    {order.status === "Em preparo" && (
                      <Button 
                        size="sm" 
                        className="flex-1 bg-green-500 hover:bg-green-600"
                        onClick={() => handleStatusUpdate(order.id, "Pronto")}
                      >
                        Marcar Pronto
                      </Button>
                    )}
                    {order.status === "Pronto" && (
                      <Button 
                        size="sm" 
                        className="flex-1 bg-blue-500 hover:bg-blue-600"
                        onClick={() => handleStatusUpdate(order.id, "Entregue")}
                      >
                        Entregar
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="flex-1">
                      Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
