
import React, { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, AlertCircle, Download, ChevronRight, ArrowUp } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { EstablishmentsAPI, PlansAPI } from "@/api/apiService"
import { toast } from "sonner"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"

interface Plan {
  id: number;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
}

interface Payment {
  id: number;
  establishmentId: string;
  planId: number;
  planName: string;
  amount: number;
  status: string;
  paymentMethod: string;
  date: string;
  invoiceUrl: string;
  period: string;
}

const EstablishmentPlans = () => {
  const establishmentId = "est-001"; // In a real app, this would come from authentication context
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  
  // Fetch current plan data
  const { 
    data: currentPlan,
    isLoading: isLoadingCurrentPlan,
    isError: isCurrentPlanError,
    refetch: refetchCurrentPlan
  } = useQuery({
    queryKey: ["currentPlan", establishmentId],
    queryFn: () => EstablishmentsAPI.getCurrentPlan(establishmentId)
  });

  // Fetch all available plans
  const { 
    data: plans,
    isLoading: isLoadingPlans,
    isError: isPlansError
  } = useQuery({
    queryKey: ["plans"],
    queryFn: PlansAPI.getAll
  });

  // Fetch payment history
  const { 
    data: paymentHistory,
    isLoading: isLoadingPaymentHistory,
    isError: isPaymentHistoryError,
    refetch: refetchPaymentHistory
  } = useQuery({
    queryKey: ["paymentHistory", establishmentId],
    queryFn: () => EstablishmentsAPI.getPaymentHistory(establishmentId)
  });

  // Handle plan upgrade
  const handleUpgradePlan = async () => {
    if (!selectedPlan) return;
    
    try {
      await EstablishmentsAPI.updatePlan(establishmentId, selectedPlan.id);
      
      // Refetch current plan and payment history to update UI
      await refetchCurrentPlan();
      await refetchPaymentHistory();
      
      setIsUpgradeDialogOpen(false);
      toast.success(`Plano atualizado para ${selectedPlan.name} com sucesso!`);
    } catch (error) {
      console.error("Erro ao atualizar plano:", error);
      toast.error("Erro ao atualizar plano. Tente novamente mais tarde.");
    }
  };

  // Open upgrade dialog with selected plan
  const openUpgradeDialog = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsUpgradeDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    if (status === "Pago") {
      return <Badge className="bg-green-500">Pago</Badge>;
    } else if (status === "Processando") {
      return <Badge className="bg-orange-500">Processando</Badge>;
    } else {
      return <Badge className="bg-red-500">Pendente</Badge>;
    }
  };
  
  // Format price to Brazilian currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-800">Gestão de Planos</h2>
        
        <Tabs defaultValue="current-plan" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="current-plan">Plano Atual</TabsTrigger>
            <TabsTrigger value="payment-history">Histórico de Pagamentos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current-plan" className="space-y-6">
            {isLoadingCurrentPlan ? (
              <Card className="bg-white shadow-lg p-6 flex items-center justify-center">
                <p>Carregando informações do plano...</p>
              </Card>
            ) : isCurrentPlanError ? (
              <Card className="bg-white shadow-lg p-6">
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle size={20} />
                  <p>Erro ao carregar informações do plano.</p>
                </div>
              </Card>
            ) : currentPlan ? (
              <>
                <Card className="bg-white shadow-lg relative overflow-hidden">
                  {currentPlan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-primary text-white px-4 py-1 rounded-bl-lg">
                      Plano Atual
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{currentPlan.name}</CardTitle>
                    <p className="text-3xl font-bold text-primary-600 mt-2">
                      {formatCurrency(currentPlan.price)}<span className="text-base font-normal text-gray-500">/{currentPlan.period}</span>
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-gray-700">Próxima cobrança:</p>
                        <p className="text-gray-600">{currentPlan.nextPaymentDate}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Tipo de renovação:</p>
                        <p className="text-gray-600">{currentPlan.renewalType}</p>
                      </div>
                      <div className="border-t pt-4">
                        <p className="font-medium text-gray-700 mb-2">Recursos incluídos:</p>
                        <ul className="space-y-2">
                          {currentPlan.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Check className="text-green-500 h-5 w-5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <h3 className="text-xl font-bold text-gray-800 mt-8">Planos Disponíveis</h3>
                
                {isLoadingPlans ? (
                  <p>Carregando planos disponíveis...</p>
                ) : isPlansError ? (
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle size={20} />
                    <p>Erro ao carregar planos disponíveis.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan: Plan) => (
                      <Card 
                        key={plan.id}
                        className={`shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden ${
                          currentPlan.id === plan.id ? "border-2 border-primary-500" : ""
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute top-0 right-0 bg-gradient-secondary text-white px-4 py-1 rounded-bl-lg">
                            Popular
                          </div>
                        )}
                        {currentPlan.id === plan.id && (
                          <div className="absolute top-0 left-0 bg-gradient-primary text-white px-4 py-1 rounded-br-lg">
                            Atual
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle>{plan.name}</CardTitle>
                          <p className="text-2xl font-bold text-primary-600 mt-2">
                            {formatCurrency(plan.price)}<span className="text-sm font-normal text-gray-500">/{plan.period}</span>
                          </p>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {plan.features.slice(0, 4).map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm">
                                <Check className="text-green-500 h-4 w-4 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                            {plan.features.length > 4 && (
                              <li className="text-sm text-gray-500 pl-6">
                                + {plan.features.length - 4} recursos
                              </li>
                            )}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            className={`w-full ${
                              currentPlan.id === plan.id 
                                ? "bg-gray-200 text-gray-700 cursor-not-allowed" 
                                : currentPlan.price < plan.price
                                  ? "bg-gradient-primary hover:bg-primary-700"
                                  : "bg-gray-800 hover:bg-gray-900"
                            }`}
                            disabled={currentPlan.id === plan.id}
                            onClick={() => openUpgradeDialog(plan)}
                          >
                            {currentPlan.id === plan.id ? (
                              "Plano Atual"
                            ) : currentPlan.price < plan.price ? (
                              <span className="flex items-center gap-1">
                                <ArrowUp className="h-4 w-4" /> Fazer Upgrade
                              </span>
                            ) : (
                              "Mudar Plano"
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            ) : null}
          </TabsContent>
          
          <TabsContent value="payment-history" className="space-y-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Histórico de Pagamentos</CardTitle>
              </CardHeader>
              
              <CardContent>
                {isLoadingPaymentHistory ? (
                  <p>Carregando histórico de pagamentos...</p>
                ) : isPaymentHistoryError ? (
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle size={20} />
                    <p>Erro ao carregar histórico de pagamentos.</p>
                  </div>
                ) : paymentHistory && paymentHistory.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100 text-left">
                          <th className="p-3 text-gray-700 font-semibold">Data</th>
                          <th className="p-3 text-gray-700 font-semibold">Plano</th>
                          <th className="p-3 text-gray-700 font-semibold">Período</th>
                          <th className="p-3 text-gray-700 font-semibold">Valor</th>
                          <th className="p-3 text-gray-700 font-semibold">Status</th>
                          <th className="p-3 text-gray-700 font-semibold">Fatura</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentHistory.map((payment: Payment) => (
                          <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="p-3">{new Date(payment.date).toLocaleDateString('pt-BR')}</td>
                            <td className="p-3">{payment.planName}</td>
                            <td className="p-3">{payment.period}</td>
                            <td className="p-3">{formatCurrency(payment.amount)}</td>
                            <td className="p-3">{getStatusBadge(payment.status)}</td>
                            <td className="p-3">
                              <Button variant="ghost" size="sm" className="text-primary-600 p-0">
                                <Download size={16} className="mr-1" /> Fatura
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Nenhum pagamento encontrado.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Plan Upgrade Confirmation Dialog */}
      <Dialog open={isUpgradeDialogOpen} onOpenChange={setIsUpgradeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar mudança de plano</DialogTitle>
            <DialogDescription>
              Você está prestes a mudar para o plano {selectedPlan?.name}.
            </DialogDescription>
          </DialogHeader>
          
          {selectedPlan && (
            <>
              <div className="py-4">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Novo plano:</span>
                    <span className="font-bold">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Valor mensal:</span>
                    <span className="text-primary-600 font-bold">{formatCurrency(selectedPlan.price)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Data de início:</span>
                    <span>{new Date().toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  <p>Ao confirmar, você autoriza a cobrança conforme os termos do plano selecionado.</p>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsUpgradeDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  className="bg-gradient-primary hover:bg-primary-700"
                  onClick={handleUpgradePlan}
                >
                  Confirmar Mudança
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default EstablishmentPlans;
