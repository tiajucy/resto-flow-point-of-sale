
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserCircle, LogOut } from "lucide-react"
import { toast } from "sonner"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  // In a real application, this would come from an API call or context
  const trialDaysLeft = 7;
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  
  // Mock user data for the profile dialog
  const userData = {
    name: "Usuário Demo",
    email: "usuario@demo.com",
    role: "Administrador",
    establishment: "Restaurante Demo"
  };
  
  const handleLogout = () => {
    // In a real app, this would clear auth tokens, etc.
    toast.success("Sessão encerrada com sucesso!");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-gray-600 hover:text-gray-900" />
              <h1 className="text-xl font-semibold text-gray-800">Sistema PDV</h1>
            </div>
            
            <div className="flex items-center gap-4">
              {trialDaysLeft > 0 && (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                  Período de teste: {trialDaysLeft} dias restantes
                </Badge>
              )}
              
              {/* Profile Dialog */}
              <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <UserCircle className="h-4 w-4" />
                    Perfil
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Perfil do Usuário</DialogTitle>
                    <DialogDescription>
                      Informações do seu perfil
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                    <div className="flex flex-col gap-2 border-b pb-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Nome:</span>
                        <span className="font-medium">{userData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Email:</span>
                        <span className="font-medium">{userData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Cargo:</span>
                        <span className="font-medium">{userData.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Estabelecimento:</span>
                        <span className="font-medium">{userData.establishment}</span>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setProfileOpen(false)}
                    >
                      Fechar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              {/* Logout Dialog */}
              <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <LogOut className="h-4 w-4" />
                    Sair
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmar saída</DialogTitle>
                    <DialogDescription>
                      Tem certeza que deseja sair do sistema?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setLogoutDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleLogout}
                    >
                      Confirmar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
