
import { useState } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

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

  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [newFeature, setNewFeature] = useState("");

  const handleEditPlan = (plan: Plan) => {
    setEditingPlan({ ...plan });
  };

  const handleSavePlan = () => {
    if (editingPlan) {
      setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
      setEditingPlan(null);
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
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Gerenciamento de Planos</h2>
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
      </div>
    </DashboardLayout>
  );
};

export default SuperAdmin;
