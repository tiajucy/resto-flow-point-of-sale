
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  // In a real application, this would come from an API call or context
  const trialDaysLeft = 7;
  
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
              <Button variant="outline" size="sm">
                Perfil
              </Button>
              <Button variant="outline" size="sm">
                Sair
              </Button>
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
