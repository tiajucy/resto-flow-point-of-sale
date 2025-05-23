import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { eye, Check, X, History, CreditCard, Store, AlertCircle } from "lucide-react"

interface PlanFeature {
  id: string
  description: string
}

interface Plan {
  id: string
  name: string
  price: number
  period: string
  features: PlanFeature[]
  popular?: boolean
}

interface Payment {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
  planId: string
}

interface Establishment {
  id: string
  name: string
  email: string
  phone: string
  address: string
  status: 'active' | 'inactive'
  planId: string
  createdAt: string
  lastPayment: string
}

const SuperAdmin = () => {
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "basic",
      name: "Básico",
      price: 49.90,
      period: "mês",
      features: [
        { id: "1", description: "Até 100 produtos" },
        { id: "2", description: "1 terminal PDV" },
        { id: "3", description: "Relatórios básicos" },
        { id: "4", description: "Suporte por email" },
      ]
    },
    {
      id: "pro",
      name: "Profissional",
      price: 99.90,
      period: "mês",
      features: [
        { id: "1", description: "Produtos ilimitados" },
        { id: "2", description: "3 terminais PDV" },
        { id: "3", description: "KDS completo" },
        { id: "4", description: "Relatórios avançados" },
        { id: "5", description: "Suporte prioritário" },
        { id: "6", description: "Integração com delivery" },
      ],
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 199.90,
      period: "mês",
      features: [
        { id: "1", description: "Tudo do Profissional" },
        { id: "2", description: "Terminais ilimitados" },
        { id: "3", description: "Multi-estabelecimentos" },
        { id: "4", description: "API personalizada" },
        { id: "5", description: "Suporte 24/7" },
        { id: "6", description: "Consultoria gratuita" },
      ]
    }
  ]);

  const [establishments, setEstablishments] = useState<Establishment[]>([
    {
      id: "est-001",
      name: "Restaurante do Centro",
      email: "contato@restaurantedocentro.com",
      phone: "(11) 99999-8888",
      address: "Rua Augusta, 1500, São Paulo, SP",
      status: "active",
      planId: "pro",
      createdAt: "2023-10-15",
      lastPayment: "2025-04-10",
    },
    {
      id: "est-002",
      name: "Pizzaria Napolitana",
      email: "atendimento@napolitana.com",
      phone: "(11) 99777-6666",
      address: "Av. Paulista, 900, São Paulo, SP",
      status: "active",
      planId: "basic",
      createdAt: "2024-01-05",
      lastPayment: "2025-05-01",
    },
    {
      id: "est-003",
      name: "Bistrô Gourmet",
      email: "reservas@bistrogourmet.com",
      phone: "(11) 98765-4321",
      address: "Rua Oscar Freire, 300, São Paulo, SP",
      status: "inactive",
      planId: "enterprise",
      createdAt: "2023-08-20",
      lastPayment: "2024-12-15",
    },
  ]);

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "pay-001",
      date: "2025-04-10",
      amount: 99.90,
      status: "paid",
      planId: "pro"
    },
    {
      id: "pay-002",
      date: "2025-03-10",
      amount: 99.90,
      status: "paid",
      planId: "pro"
    },
    {
      id: "pay-003",
      date: "2025-05-01",
      amount: 49.90,
      status: "paid",
      planId: "basic"
    },
    {
      id: "pay-004",
      date: "2025-04-01",
      amount: 49.90,
      status: "paid",
      planId: "basic"
    },
    {
      id: "pay-005",
      date: "2024-12-15",
      amount: 199.90,
      status: "paid",
      planId: "enterprise"
    },
    {
      id: "pay-006",
      date: "2024-11-15",
      amount: 199.90,
      status: "failed",
      planId: "enterprise"
    },
  ]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedPlans = localStorage.getItem('plans');
    if (storedPlans) {
      setPlans(JSON.parse(storedPlans));
    }
    
    const storedEstablishments = localStorage.getItem('establishments');
    if (storedEstablishments) {
      setEstablishments(JSON.parse(storedEstablishments));
    }
    
    const storedPayments = localStorage.getItem('payments');
    if (storedPayments) {
      setPayments(JSON.parse(storedPayments));
    }
  }, []);

  // Save data to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('plans', JSON.stringify(plans));
  }, [plans]);
  
  useEffect(() => {
    localStorage.setItem('establishments', JSON.stringify(establishments));
  }, [establishments]);
  
  useEffect(() => {
    localStorage.setItem('payments', JSON.stringify(payments));
  }, [payments]);

  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [newFeature, setNewFeature] = useState("");
  const [viewEstablishment, setViewEstablishment] = useState<Establishment | null>(null);
  const [editEstablishment, setEditEstablishment] = useState<Establishment | null>(null);
  const [selectedTab, setSelectedTab] = useState("plans");
  
  // Helper function to get plan name by ID
  const getPlanName = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    return plan ? plan.name : "Desconhecido";
  };
  
  // Helper function to get payments by establishment ID
  const getPaymentsByEstablishment = (establishmentId: string) => {
    const establishment = establishments.find(e => e.id === establishmentId);
    if (!establishment) return [];
    
    return payments.filter(p => p.planId === establishment.planId);
  };
  
  // Toggle establishment status
  const toggleEstablishmentStatus = (id: string) => {
    setEstablishments(establishments.map(est => {
      if (est.id === id) {
        return {
          ...est,
          status: est.status === 'active' ? 'inactive' : 'active'
        };
      }
      return est;
    }));
    toast.success("Status do estabelecimento atualizado com sucesso!");
  };
  
  // Save edited establishment
  const handleSaveEstablishment = () => {
    if (editEstablishment) {
      setEstablishments(establishments.map(est => 
        est.id === editEstablishment.id ? editEstablishment : est
      ));
      setEditEstablishment(null);
      toast.success("Dados do estabelecimento atualizados com sucesso!");
    }
  };

  // Plan management functions
  const handleEditPlan = (plan: Plan) => {
    setEditingPlan({ ...plan });
  };

  const handleSavePlan = () => {
    if (editingPlan) {
      setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
      setEditingPlan(null);
      toast.success("Plano atualizado com sucesso!");
    }
  };

  const handleCancelEdit = () => {
    setEditingPlan(null);
    setNewFeature("");
  };

  const handleAddFeature = () => {
    if (editingPlan && newFeature) {
      const updatedPlan = {
        ...editingPlan,
        features: [
          ...editingPlan.features,
          { id: Date.now().toString(), description: newFeature }
        ]
      };
      setEditingPlan(updatedPlan);
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (featureId: string) => {
    if (editingPlan) {
      const updatedPlan = {
        ...editingPlan,
        features: editingPlan.features.filter(f => f.id !== featureId)
      };
      setEditingPlan(updatedPlan);
    }
  };

  const handleSetPopular = (planId: string) => {
    setPlans(plans.map(p => ({
      ...p,
      popular: p.id === planId
    })));
    toast.success("Plano marcado como popular!");
  };

  const renderStatusBadge = (status: 'active' | 'inactive') => {
    if (status === 'active') {
      return <Badge className="bg-green-500">Ativo</Badge>;
    } else {
      return <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300">Inativo</Badge>;
    }
  };
  
  const renderPaymentStatusBadge = (status: 'paid' | 'pending' | 'failed') => {
    if (status === 'paid') {
      return <Badge className="bg-green-500">Pago</Badge>;
    } else if (status === 'pending') {
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">Pendente</Badge>;
    } else {
      return <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300">Falhou</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Painel SuperAdmin</h2>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="plans">Planos</TabsTrigger>
            <TabsTrigger value="establishments">Estabelecimentos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="plans" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Gerenciamento de Planos</h3>
              <Button className="bg-gradient-primary hover:bg-primary-700 text-white shadow-lg">
                Adicionar Novo Plano
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {editingPlan ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Editar Plano</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="plan-name">Nome do Plano</Label>
                        <Input
                          id="plan-name"
                          value={editingPlan.name}
                          onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="plan-price">Preço (R$)</Label>
                        <Input
                          id="plan-price"
                          type="number"
                          step="0.01"
                          value={editingPlan.price}
                          onChange={(e) => setEditingPlan({...editingPlan, price: parseFloat(e.target.value)})}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <Label>Features do Plano</Label>
                        <div className="flex gap-2">
                          <Input 
                            placeholder="Nova feature" 
                            value={newFeature} 
                            onChange={(e) => setNewFeature(e.target.value)} 
                          />
                          <Button type="button" onClick={handleAddFeature}>Adicionar</Button>
                        </div>
                      </div>
                      
                      <div className="mt-2 space-y-2">
                        {editingPlan.features.map(feature => (
                          <div key={feature.id} className="flex items-center justify-between border p-2 rounded">
                            <span>{feature.description}</span>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => handleRemoveFeature(feature.id)}
                            >
                              Remover
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="popular" 
                        checked={editingPlan.popular || false} 
                        onChange={e => setEditingPlan({...editingPlan, popular: e.target.checked})}
                      />
                      <Label htmlFor="popular">Marcar como plano mais popular</Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" onClick={handleCancelEdit}>Cancelar</Button>
                    <Button onClick={handleSavePlan}>Salvar Alterações</Button>
                  </CardFooter>
                </Card>
              ) : (
                <>
                  {plans.map(plan => (
                    <Card key={plan.id} className={plan.popular ? "border-primary-500 border-2" : ""}>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>{plan.name}</CardTitle>
                          <p className="text-2xl font-bold text-primary-600">
                            R$ {plan.price.toFixed(2)}/{plan.period}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {plan.popular && (
                            <Badge className="bg-primary-500">Mais Popular</Badge>
                          )}
                          <Button variant="outline" size="sm" onClick={() => handleSetPopular(plan.id)}>
                            Marcar como Popular
                          </Button>
                          <Button size="sm" onClick={() => handleEditPlan(plan)}>
                            Editar
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <h4 className="font-medium mb-2">Features:</h4>
                        <ul className="space-y-1">
                          {plan.features.map(feature => (
                            <li key={feature.id} className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                              <span>{feature.description}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="establishments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Gerenciamento de Estabelecimentos</h3>
              <Button className="bg-gradient-primary hover:bg-primary-700 text-white shadow-lg">
                Adicionar Novo Estabelecimento
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Lista de Estabelecimentos</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Plano</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Último Pagamento</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {establishments.map((est) => (
                      <TableRow key={est.id}>
                        <TableCell className="font-medium">{est.name}</TableCell>
                        <TableCell>{est.email}</TableCell>
                        <TableCell>{getPlanName(est.planId)}</TableCell>
                        <TableCell>{renderStatusBadge(est.status)}</TableCell>
                        <TableCell>{est.lastPayment}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => setViewEstablishment(est)}
                                >
                                  Detalhes
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="text-xl">Detalhes do Estabelecimento</DialogTitle>
                                </DialogHeader>
                                {viewEstablishment && (
                                  <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <h3 className="text-lg font-medium">Informações Gerais</h3>
                                        <div className="space-y-2 mt-2">
                                          <div>
                                            <Label className="text-sm text-gray-500">Nome</Label>
                                            <p className="font-medium">{viewEstablishment.name}</p>
                                          </div>
                                          <div>
                                            <Label className="text-sm text-gray-500">Email</Label>
                                            <p>{viewEstablishment.email}</p>
                                          </div>
                                          <div>
                                            <Label className="text-sm text-gray-500">Telefone</Label>
                                            <p>{viewEstablishment.phone}</p>
                                          </div>
                                          <div>
                                            <Label className="text-sm text-gray-500">Endereço</Label>
                                            <p>{viewEstablishment.address}</p>
                                          </div>
                                          <div>
                                            <Label className="text-sm text-gray-500">Status</Label>
                                            <div>{renderStatusBadge(viewEstablishment.status)}</div>
                                          </div>
                                          <div>
                                            <Label className="text-sm text-gray-500">Data de Cadastro</Label>
                                            <p>{viewEstablishment.createdAt}</p>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div>
                                        <h3 className="text-lg font-medium">Plano Atual</h3>
                                        <div className="space-y-2 mt-2">
                                          <div>
                                            <Label className="text-sm text-gray-500">Nome do Plano</Label>
                                            <p className="font-medium">{getPlanName(viewEstablishment.planId)}</p>
                                          </div>
                                          <div>
                                            <Label className="text-sm text-gray-500">Último Pagamento</Label>
                                            <p>{viewEstablishment.lastPayment}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <h3 className="text-lg font-medium mb-2">Histórico de Pagamentos</h3>
                                      <Table>
                                        <TableHeader>
                                          <TableRow>
                                            <TableHead>Data</TableHead>
                                            <TableHead>Valor</TableHead>
                                            <TableHead>Plano</TableHead>
                                            <TableHead>Status</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {getPaymentsByEstablishment(viewEstablishment.id).map(payment => (
                                            <TableRow key={payment.id}>
                                              <TableCell>{payment.date}</TableCell>
                                              <TableCell>R$ {payment.amount.toFixed(2)}</TableCell>
                                              <TableCell>{getPlanName(payment.planId)}</TableCell>
                                              <TableCell>{renderPaymentStatusBadge(payment.status)}</TableCell>
                                            </TableRow>
                                          ))}
                                          {getPaymentsByEstablishment(viewEstablishment.id).length === 0 && (
                                            <TableRow>
                                              <TableCell colSpan={4} className="text-center py-4">
                                                Nenhum pagamento encontrado
                                              </TableCell>
                                            </TableRow>
                                          )}
                                        </TableBody>
                                      </Table>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setEditEstablishment({...est})}
                            >
                              Editar
                            </Button>
                            
                            <Button 
                              variant={est.status === 'active' ? "destructive" : "default"}
                              size="sm" 
                              onClick={() => toggleEstablishmentStatus(est.id)}
                            >
                              {est.status === 'active' ? 'Inativar' : 'Ativar'}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Edit Establishment Dialog */}
        {editEstablishment && (
          <Dialog open={!!editEstablishment} onOpenChange={(open) => !open && setEditEstablishment(null)}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Editar Estabelecimento</DialogTitle>
                <DialogDescription>
                  Edite os detalhes do estabelecimento abaixo
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="est-name">Nome</Label>
                  <Input
                    id="est-name"
                    value={editEstablishment.name}
                    onChange={(e) => setEditEstablishment({...editEstablishment, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="est-email">Email</Label>
                  <Input
                    id="est-email"
                    type="email"
                    value={editEstablishment.email}
                    onChange={(e) => setEditEstablishment({...editEstablishment, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="est-phone">Telefone</Label>
                  <Input
                    id="est-phone"
                    value={editEstablishment.phone}
                    onChange={(e) => setEditEstablishment({...editEstablishment, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="est-address">Endereço</Label>
                  <Textarea
                    id="est-address"
                    value={editEstablishment.address}
                    onChange={(e) => setEditEstablishment({...editEstablishment, address: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="est-plan">Plano</Label>
                  <select 
                    id="est-plan"
                    className="w-full p-2 border rounded"
                    value={editEstablishment.planId}
                    onChange={(e) => setEditEstablishment({...editEstablishment, planId: e.target.value})}
                  >
                    {plans.map(plan => (
                      <option key={plan.id} value={plan.id}>{plan.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditEstablishment(null)}>Cancelar</Button>
                <Button onClick={handleSaveEstablishment}>Salvar Alterações</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

      </div>
    </DashboardLayout>
  );
};

export default SuperAdmin;
