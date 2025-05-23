
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }
    
    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.email === email);
    
    if (user && user.password === password) {
      // Store logged in user info
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast.success("Login realizado com sucesso!");
      navigate("/dashboard");
    } else {
      toast.error("Email ou senha inválidos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">POS</span>
          </div>
          <CardTitle className="text-2xl font-bold">Entrar no Sistema</CardTitle>
          <CardDescription>
            Digite seu email e senha para acessar o sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="seu@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link to="/forgot-password" className="text-sm text-primary-600 hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-primary">
              Entrar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Não tem uma conta?{" "}
            <Link to="/register" className="text-primary-600 hover:underline">
              Registre-se
            </Link>
          </div>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => navigate("/")}
          >
            Voltar para a Página Inicial
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
