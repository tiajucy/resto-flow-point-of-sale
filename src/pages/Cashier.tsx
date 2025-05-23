
import { useState } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Cashier = () => {
  const [cashierOpen, setCashierOpen] = useState(true)
  const [currentShift, setCurrentShift] = useState({
    openTime: "08:00",
    initialAmount: 100.00,
    currentAmount: 847.50
  })

  const pendingPayments = [
    { id: "#002", customer: "Mesa 12", total: 42.00, items: ["1x Pizza Margherita", "1x Refrigerante"] },
    { id: "#006", customer: "Mesa 8", total: 67.50, items: ["2x Hambúrguer", "1x Batata Frita"] },
    { id: "#007", customer: "Balcão", total: 23.00, items: ["1x Lanche Natural", "1x Suco"] }
  ]

  const todayTransactions = [
    { id: "#001", customer: "Mesa 5", total: 85.50, method: "Cartão", time: "14:30" },
    { id: "#003", customer: "Balcão", total: 28.50, method: "Dinheiro", time: "14:20" },
    { id: "#005", customer: "Mesa 3", total: 96.00, method: "PIX", time: "14:15" }
  ]

  const handlePayment = (orderId: string, method: string) => {
    console.log(`Processando pagamento do pedido ${orderId} via ${method}`)
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
            <Button 
              variant="outline"
              onClick={() => setCashierOpen(!cashierOpen)}
            >
              {cashierOpen ? "Fechar Caixa" : "Abrir Caixa"}
            </Button>
          </div>
        </div>

        {/* Cash Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Valor Inicial</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">R$ {currentShift.initialAmount.toFixed(2)}</p>
              <p className="text-green-100">Abertura às {currentShift.openTime}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Valor Atual</CardTitle>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Payments */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Pedidos Aguardando Pagamento ({pendingPayments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingPayments.map((payment) => (
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
                      <p key={index} className="text-sm text-gray-700">• {item}</p>
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
              ))}
            </CardContent>
          </Card>

          {/* Today's Transactions */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Transações de Hoje
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayTransactions.map((transaction) => (
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
              ))}
              
              <div className="pt-3 border-t border-gray-200">
                <Button variant="outline" className="w-full">
                  Ver Relatório Completo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Cashier
