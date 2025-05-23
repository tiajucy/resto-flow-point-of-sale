
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-800">Configurações</h2>

        <Tabs defaultValue="establishment" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="establishment">Estabelecimento</TabsTrigger>
            <TabsTrigger value="printer">Impressora</TabsTrigger>
            <TabsTrigger value="coupons">Cupons</TabsTrigger>
            <TabsTrigger value="system">Sistema</TabsTrigger>
          </TabsList>

          <TabsContent value="establishment" className="space-y-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Informações do Estabelecimento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome do Estabelecimento</Label>
                    <Input id="name" defaultValue="Restaurante São Paulo" />
                  </div>
                  <div>
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input id="cnpj" defaultValue="12.345.678/0001-90" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" defaultValue="(11) 99999-9999" />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" defaultValue="contato@restaurante.com" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">Endereço Completo</Label>
                  <Input id="address" defaultValue="Rua das Flores, 123 - Centro - São Paulo/SP" />
                </div>
                
                <Button className="bg-gradient-primary hover:bg-primary-700">
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="printer" className="space-y-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Configurações de Impressora</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="printer-name">Nome da Impressora</Label>
                    <Input id="printer-name" placeholder="Impressora Cozinha" />
                  </div>
                  <div>
                    <Label htmlFor="printer-ip">Endereço IP</Label>
                    <Input id="printer-ip" placeholder="192.168.1.100" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="auto-print" />
                  <Label htmlFor="auto-print">Impressão automática de pedidos</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="print-customer" />
                  <Label htmlFor="print-customer">Imprimir via do cliente</Label>
                </div>
                
                <Button className="bg-gradient-primary hover:bg-primary-700">
                  Testar Impressão
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coupons" className="space-y-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Sistema de Cupons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="enable-coupons" />
                  <Label htmlFor="enable-coupons">Ativar sistema de cupons</Label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="discount-percent">Desconto Padrão (%)</Label>
                    <Input id="discount-percent" type="number" defaultValue="10" />
                  </div>
                  <div>
                    <Label htmlFor="min-order">Valor Mínimo do Pedido</Label>
                    <Input id="min-order" type="number" defaultValue="50.00" />
                  </div>
                </div>
                
                <Button className="bg-gradient-primary hover:bg-primary-700">
                  Criar Novo Cupom
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="notifications" />
                  <Label htmlFor="notifications">Notificações sonoras</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="auto-refresh" />
                  <Label htmlFor="auto-refresh">Atualização automática de pedidos</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="dark-mode" />
                  <Label htmlFor="dark-mode">Modo escuro</Label>
                </div>
                
                <div>
                  <Label htmlFor="currency">Moeda</Label>
                  <Input id="currency" defaultValue="BRL" />
                </div>
                
                <div>
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Input id="timezone" defaultValue="America/Sao_Paulo" />
                </div>
                
                <Button className="bg-gradient-primary hover:bg-primary-700">
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

export default Settings
