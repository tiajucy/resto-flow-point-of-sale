
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

interface EstablishmentData {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  
  // User data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Establishment data
  const [establishmentData, setEstablishmentData] = useState<EstablishmentData>({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: ""
  });

  // Get selected plan from localStorage
  useEffect(() => {
    const plan = localStorage.getItem("selectedPlan");
    if (plan) {
      setSelectedPlan(JSON.parse(plan));
    }
  }, []);

  const handleEstablishmentDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEstablishmentData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("As senhas não correspondem");
      return;
    }
    
    if (establishmentData.name === "") {
      toast.error("Por favor, informe o nome do estabelecimento");
      return;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      establishment: establishmentData,
      plan: selectedPlan,
      createdAt: new Date().toISOString(),
      trialEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 day trial
    };
    
    // Store user in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    // Store establishment data
    const establishments = JSON.parse(localStorage.getItem("establishments") || "[]");
    const newEstablishment = {
      id: Date.now().toString(),
      userId: newUser.id,
      ...establishmentData
    };
    establishments.push(newEstablishment);
    localStorage.setItem("establishments", JSON.stringify(establishments));
    
    // Set current user
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    
    // Remove selected plan from localStorage
    localStorage.removeItem("selectedPlan");
    
    toast.success("Conta criada com sucesso!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen py-8 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-white">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">POS</span>
            </div>
            <CardTitle className="text-3xl font-bold">Crie sua Conta</CardTitle>
            <CardDescription>
              {selectedPlan ? (
                <div className="mt-2">
                  <p>Plano selecionado: <strong>{selectedPlan.name}</strong></p>
                  <p className="text-sm text-primary-600">Você terá 7 dias de teste gratuito</p>
                </div>
              ) : (
                <p>Preencha os dados para criar sua conta</p>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Seus Dados</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha *</Label>
                    <Input 
                      id="password" 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Senha *</Label>
                    <Input 
                      id="confirm-password" 
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Dados do Estabelecimento</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="establishment-name">Nome do Estabelecimento *</Label>
                    <Input 
                      id="establishment-name" 
                      name="name"
                      value={establishmentData.name}
                      onChange={handleEstablishmentDataChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input 
                      id="address" 
                      name="address"
                      value={establishmentData.address}
                      onChange={handleEstablishmentDataChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input 
                      id="city" 
                      name="city"
                      value={establishmentData.city}
                      onChange={handleEstablishmentDataChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado</Label>
                    <Input 
                      id="state" 
                      name="state"
                      value={establishmentData.state}
                      onChange={handleEstablishmentDataChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">CEP</Label>
                    <Input 
                      id="zip" 
                      name="zip"
                      value={establishmentData.zip}
                      onChange={handleEstablishmentDataChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      value={establishmentData.phone}
                      onChange={handleEstablishmentDataChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full md:w-auto"
                  onClick={() => navigate("/")}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-gradient-primary"
                >
                  Criar Conta
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <div className="text-center text-sm">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-primary-600 hover:underline">
                Faça Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
