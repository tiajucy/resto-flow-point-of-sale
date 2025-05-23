
import { useState } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useOrders } from "@/context/OrdersContext"
import { toast } from "@/components/ui/sonner"
import { DollarSign, Wallet } from "lucide-react"

const Cashier = () => {
  // Cash register state
  const [cashierOpen, setCashierOpen] = useState(false)
  const [showOpenCashierDialog, setShowOpenCashierDialog] = useState(false)
  const [showCloseCashierDialog, setShowCloseCashierDialog] = useState(false)
  const [initialAmount, setInitialAmount] = useState("")
  const [closingAmount, setClosingAmount] = useState("")

  // Current shift data
  const [currentShift, setCurrentShift] = useState({
    openTime: "",
    initialAmount: 0,
    currentAmount: 0
  })

  // Get orders from context
  const { pendingPaymentOrders, orders, markOrderAsPaid } = useOrders()
  
  // Sales history - paid orders for current shift
  const [todayTransactions, setTodayTransactions] = useState<{
    id: string;
    customer: string;
    total: number;
    method: string;
    time: string;
  }[]>([])

  const handleOpenCashier = () => {
    if (!initialAmount || isNaN(parseFloat(initialAmount)) || parseFloat(initialAmount) < 0) {
      toast.error("Por favor, informe um valor válido para abrir o caixa.");
      return;
    }
    
    const amount = parseFloat(initialAmount);
    
    setCurrentShift({
      openTime: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      initialAmount: amount,
      currentAmount: amount
    });
    
    setCashierOpen(true);
    setShowOpenCashierDialog(false);
    toast.success("Caixa aberto com sucesso!");
  }

  const handleCloseCashier = () => {
    if (!closingAmount || isNaN(parseFloat(closingAmount))) {
      toast.error("Por favor, informe um valor válido para fechar o caixa.");
      return;
    }
    
    const reportedAmount = parseFloat(closingAmount);
    const calculatedAmount = currentShift.currentAmount;
    const difference = reportedAmount - calculatedAmount;
    
    let message = `Caixa fechado. Valor inicial: R$ ${currentShift.initialAmount.toFixed(2)}`;
    message += ` - Valor final calculado: R$ ${calculatedAmount.toFixed(2)}`;
    
    if (difference !== 0) {
      const differenceType = difference > 0 ? "sobra" : "falta";
      message += ` - ${differenceType} de R$ ${Math.abs(difference).toFixed(2)}`;
    } else {
      message += " - Valores conferem!";
    }
    
    toast.success(message);
    
    // Reset cashier state
    setCashierOpen(false);
    setShowCloseCashierDialog(false);
    setTodayTransactions([]);
    setCurrentShift({
      openTime: "",
      initialAmount: 0,
      currentAmount: 0
    });
  }

  const handlePayment = (orderId: string, method: "Dinheiro" | "Cartão" | "PIX") => {
    const order = pendingPaymentOrders.find(order => order.id === orderId);
    if (!order) return;
    
    const now = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    // Add to transactions
    setTodayTransactions([...todayTransactions, {
      id: order.id,
      customer: order.customer,
      total: order.total,
      method,
      time: now
    }]);
    
    // Update cash amount (only for cash payments)
    if (method === "Dinheiro") {
      setCurrentShift({
        ...currentShift,
        currentAmount: currentShift.currentAmount + order.total
      });
    }
    
    // Mark order as paid
    markOrderAsPaid(orderId, method);
    
    toast.success(`Pagamento do pedido ${orderId} processado via ${method}`);
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Caixa</h2>
          <div className="flex gap-3">
            <Badge 
              variant={cashierOpen ? "default" : "secondary"}
              className={`text-lg px-4 py-2 ${cashierOpen ? "bg-green-500" : "bg-red-500"}`}
            >
              {cashierOpen ? "Caixa Aberto" : "Caixa Fechado"}
            </Badge>
            {!cashierOpen ? (
              <Button 
                variant="outline"
                onClick={() => setShowOpenCashierDialog(true)}
              >
                Abrir Caixa
              </Button>
            ) : (
              <Button 
                variant="outline"
                onClick={() => setShowCloseCashierDialog(true)}
              >
                Fechar Caixa
              </Button>
            )}
          </div>
        </div>

        {/* Cash Status */}
        {cashierOpen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Valor Inicial
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">R$ {currentShift.initialAmount.toFixed(2)}</p>
                <p className="text-green-100">Abertura às {currentShift.openTime}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Valor Atual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">R$ {currentShift.currentAmount.toFixed(2)}</p>
                <p className="text-blue-100">Total em caixa</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Vendas do Dia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">R$ {(currentShift.currentAmount - currentShift.initialAmount).toFixed(2)}</p>
                <p className="text-purple-100">Lucro do turno</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Payments */}
          {cashierOpen && (
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Pedidos Aguardando Pagamento ({pendingPaymentOrders.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingPaymentOrders.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Nenhum pedido aguardando pagamento
                  </div>
                ) : (
                  pendingPaymentOrders.map((payment) => (
                    <div key={payment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {payment.id} - {payment.customer}
                        </h4>
                        <span className="text-xl font-bold text-primary-600">
                          R$ {payment.total.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">Itens:</p>
                        {payment.items.map((item, index) => (
                          <p key={index} className="text-sm text-gray-700">• {item.quantity}x {item.name}</p>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => handlePayment(payment.id, "Dinheiro")}
                        >
                          Dinheiro
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-blue-500 hover:bg-blue-600"
                          onClick={() => handlePayment(payment.id, "Cartão")}
                        >
                          Cartão
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-purple-500 hover:bg-purple-600"
                          onClick={() => handlePayment(payment.id, "PIX")}
                        >
                          PIX
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          )}

          {/* Today's Transactions */}
          {cashierOpen && (
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Transações de Hoje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {todayTransactions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Nenhuma transação registrada hoje
                  </div>
                ) : (
                  todayTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">
                          {transaction.id} - {transaction.customer}
                        </p>
                        <p className="text-sm text-gray-600">
                          {transaction.method} • {transaction.time}
                        </p>
                      </div>
                      <span className="font-bold text-green-600">
                        R$ {transaction.total.toFixed(2)}
                      </span>
                    </div>
                  ))
                )}
                
                {todayTransactions.length > 0 && (
                  <div className="pt-3 border-t border-gray-200">
                    <Button variant="outline" className="w-full">
                      Ver Relatório Completo
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
        
        {!cashierOpen && (
          <Card className="bg-white shadow-lg">
            <CardContent className="p-12 text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Caixa está fechado
              </h3>
              <p className="text-gray-600 mb-6">
                Para iniciar as operações, é necessário abrir o caixa informando o valor inicial.
              </p>
              <Button 
                size="lg"
                onClick={() => setShowOpenCashierDialog(true)}
                className="bg-green-500 hover:bg-green-600"
              >
                Abrir Caixa
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Open Cashier Dialog */}
      <Dialog open={showOpenCashierDialog} onOpenChange={setShowOpenCashierDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Abrir Caixa</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="initialAmount">Valor em caixa (R$)</Label>
              <Input 
                id="initialAmount" 
                type="number"
                step="0.01" 
                placeholder="0.00" 
                value={initialAmount} 
                onChange={(e) => setInitialAmount(e.target.value)}
              />
              <p className="text-sm text-gray-500">
                Informe o valor que está atualmente no caixa para iniciar o turno.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowOpenCashierDialog(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleOpenCashier}>
              Confirmar e Abrir Caixa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Close Cashier Dialog */}
      <Dialog open={showCloseCashierDialog} onOpenChange={setShowCloseCashierDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Fechar Caixa</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="closingAmount">Valor em caixa (R$)</Label>
              <Input 
                id="closingAmount" 
                type="number" 
                step="0.01"
                placeholder="0.00" 
                value={closingAmount} 
                onChange={(e) => setClosingAmount(e.target.value)}
              />
              <p className="text-sm text-gray-500">
                Informe o valor que está contando fisicamente no caixa para conferência.
              </p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm font-medium">Valor calculado no sistema: <span className="font-bold">R$ {currentShift.currentAmount.toFixed(2)}</span></p>
              <p className="text-sm font-medium">Valor inicial do turno: <span className="font-bold">R$ {currentShift.initialAmount.toFixed(2)}</span></p>
              <p className="text-sm font-medium">Vendas em dinheiro: <span className="font-bold">R$ {(currentShift.currentAmount - currentShift.initialAmount).toFixed(2)}</span></p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowCloseCashierDialog(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleCloseCashier} className="bg-red-500 hover:bg-red-600">
              Confirmar e Fechar Caixa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}

export default Cashier
