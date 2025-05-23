
import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

// Define types for our settings
interface EstablishmentSettings {
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  address: string;
}

interface PrinterSettings {
  name: string;
  ip: string;
  autoPrint: boolean;
  printCustomer: boolean;
}

interface CouponSettings {
  enabled: boolean;
  discountPercent: number;
  minOrder: number;
}

interface SystemSettings {
  notifications: boolean;
  autoRefresh: boolean;
  darkMode: boolean;
  currency: string;
  timezone: string;
}

const Settings = () => {
  // Initialize state for each settings section
  const [establishmentSettings, setEstablishmentSettings] = useState<EstablishmentSettings>({
    name: "Restaurante São Paulo",
    cnpj: "12.345.678/0001-90",
    phone: "(11) 99999-9999",
    email: "contato@restaurante.com",
    address: "Rua das Flores, 123 - Centro - São Paulo/SP"
  });

  const [printerSettings, setPrinterSettings] = useState<PrinterSettings>({
    name: "Impressora Cozinha",
    ip: "192.168.1.100",
    autoPrint: false,
    printCustomer: false
  });

  const [couponSettings, setCouponSettings] = useState<CouponSettings>({
    enabled: false,
    discountPercent: 10,
    minOrder: 50
  });

  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    notifications: false,
    autoRefresh: false,
    darkMode: false,
    currency: "BRL",
    timezone: "America/Sao_Paulo"
  });

  // Load saved settings from localStorage on component mount
  useEffect(() => {
    const savedEstablishmentSettings = localStorage.getItem('establishmentSettings');
    const savedPrinterSettings = localStorage.getItem('printerSettings');
    const savedCouponSettings = localStorage.getItem('couponSettings');
    const savedSystemSettings = localStorage.getItem('systemSettings');

    if (savedEstablishmentSettings) {
      setEstablishmentSettings(JSON.parse(savedEstablishmentSettings));
    }
    if (savedPrinterSettings) {
      setPrinterSettings(JSON.parse(savedPrinterSettings));
    }
    if (savedCouponSettings) {
      setCouponSettings(JSON.parse(savedCouponSettings));
    }
    if (savedSystemSettings) {
      setSystemSettings(JSON.parse(savedSystemSettings));
    }
  }, []);

  // Handle saving establishment settings
  const handleSaveEstablishment = () => {
    localStorage.setItem('establishmentSettings', JSON.stringify(establishmentSettings));
    toast.success("Configurações do estabelecimento salvas com sucesso!");
  };

  // Handle saving printer settings
  const handleSavePrinter = () => {
    localStorage.setItem('printerSettings', JSON.stringify(printerSettings));
    toast.success("Configurações de impressora salvas com sucesso!");
  };

  // Handle saving coupon settings
  const handleSaveCoupon = () => {
    localStorage.setItem('couponSettings', JSON.stringify(couponSettings));
    toast.success("Configurações de cupons salvas com sucesso!");
  };

  // Handle saving system settings
  const handleSaveSystem = () => {
    localStorage.setItem('systemSettings', JSON.stringify(systemSettings));
    toast.success("Configurações do sistema salvas com sucesso!");
  };

  // Handle test printing
  const handleTestPrint = () => {
    toast.success("Teste de impressão enviado com sucesso!");
  };

  // Handle coupon creation
  const handleCreateCoupon = () => {
    toast.success("Novo cupom criado com sucesso!");
  };

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
                    <Input 
                      id="name" 
                      value={establishmentSettings.name} 
                      onChange={(e) => setEstablishmentSettings({
                        ...establishmentSettings,
                        name: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input 
                      id="cnpj" 
                      value={establishmentSettings.cnpj}
                      onChange={(e) => setEstablishmentSettings({
                        ...establishmentSettings,
                        cnpj: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input 
                      id="phone" 
                      value={establishmentSettings.phone}
                      onChange={(e) => setEstablishmentSettings({
                        ...establishmentSettings,
                        phone: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input 
                      id="email" 
                      value={establishmentSettings.email}
                      onChange={(e) => setEstablishmentSettings({
                        ...establishmentSettings,
                        email: e.target.value
                      })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">Endereço Completo</Label>
                  <Input 
                    id="address" 
                    value={establishmentSettings.address}
                    onChange={(e) => setEstablishmentSettings({
                      ...establishmentSettings,
                      address: e.target.value
                    })}
                  />
                </div>
                
                <Button 
                  className="bg-gradient-primary hover:bg-primary-700"
                  onClick={handleSaveEstablishment}
                >
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
                    <Input 
                      id="printer-name" 
                      placeholder="Impressora Cozinha" 
                      value={printerSettings.name}
                      onChange={(e) => setPrinterSettings({
                        ...printerSettings,
                        name: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="printer-ip">Endereço IP</Label>
                    <Input 
                      id="printer-ip" 
                      placeholder="192.168.1.100" 
                      value={printerSettings.ip}
                      onChange={(e) => setPrinterSettings({
                        ...printerSettings,
                        ip: e.target.value
                      })}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="auto-print" 
                    checked={printerSettings.autoPrint}
                    onCheckedChange={(checked) => setPrinterSettings({
                      ...printerSettings,
                      autoPrint: checked
                    })}
                  />
                  <Label htmlFor="auto-print">Impressão automática de pedidos</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="print-customer" 
                    checked={printerSettings.printCustomer}
                    onCheckedChange={(checked) => setPrinterSettings({
                      ...printerSettings,
                      printCustomer: checked
                    })}
                  />
                  <Label htmlFor="print-customer">Imprimir via do cliente</Label>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    className="bg-gradient-primary hover:bg-primary-700"
                    onClick={handleTestPrint}
                  >
                    Testar Impressão
                  </Button>
                  <Button 
                    className="bg-gradient-primary hover:bg-primary-700"
                    onClick={handleSavePrinter}
                  >
                    Salvar Configurações
                  </Button>
                </div>
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
                  <Switch 
                    id="enable-coupons" 
                    checked={couponSettings.enabled}
                    onCheckedChange={(checked) => setCouponSettings({
                      ...couponSettings,
                      enabled: checked
                    })}
                  />
                  <Label htmlFor="enable-coupons">Ativar sistema de cupons</Label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="discount-percent">Desconto Padrão (%)</Label>
                    <Input 
                      id="discount-percent" 
                      type="number" 
                      value={couponSettings.discountPercent}
                      onChange={(e) => setCouponSettings({
                        ...couponSettings,
                        discountPercent: Number(e.target.value)
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="min-order">Valor Mínimo do Pedido</Label>
                    <Input 
                      id="min-order" 
                      type="number" 
                      value={couponSettings.minOrder}
                      onChange={(e) => setCouponSettings({
                        ...couponSettings,
                        minOrder: Number(e.target.value)
                      })}
                    />
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    className="bg-gradient-primary hover:bg-primary-700"
                    onClick={handleCreateCoupon}
                  >
                    Criar Novo Cupom
                  </Button>
                  <Button 
                    className="bg-gradient-primary hover:bg-primary-700"
                    onClick={handleSaveCoupon}
                  >
                    Salvar Configurações
                  </Button>
                </div>
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
                  <Switch 
                    id="notifications" 
                    checked={systemSettings.notifications}
                    onCheckedChange={(checked) => setSystemSettings({
                      ...systemSettings,
                      notifications: checked
                    })}
                  />
                  <Label htmlFor="notifications">Notificações sonoras</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="auto-refresh" 
                    checked={systemSettings.autoRefresh}
                    onCheckedChange={(checked) => setSystemSettings({
                      ...systemSettings,
                      autoRefresh: checked
                    })}
                  />
                  <Label htmlFor="auto-refresh">Atualização automática de pedidos</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="dark-mode" 
                    checked={systemSettings.darkMode}
                    onCheckedChange={(checked) => setSystemSettings({
                      ...systemSettings,
                      darkMode: checked
                    })}
                  />
                  <Label htmlFor="dark-mode">Modo escuro</Label>
                </div>
                
                <div>
                  <Label htmlFor="currency">Moeda</Label>
                  <Input 
                    id="currency" 
                    value={systemSettings.currency}
                    onChange={(e) => setSystemSettings({
                      ...systemSettings,
                      currency: e.target.value
                    })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Input 
                    id="timezone" 
                    value={systemSettings.timezone}
                    onChange={(e) => setSystemSettings({
                      ...systemSettings,
                      timezone: e.target.value
                    })}
                  />
                </div>
                
                <Button 
                  className="bg-gradient-primary hover:bg-primary-700"
                  onClick={handleSaveSystem}
                >
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
