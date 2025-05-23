
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const LandingPage = () => {
  const features = [
    "Sistema de PDV completo",
    "Gestão de produtos e categorias",
    "Kitchen Display System (KDS)",
    "Controle de caixa com turnos",
    "Relatórios detalhados",
    "Configuração de impressoras",
    "Sistema de cupons",
    "Interface responsiva"
  ]

  const plans = [
    {
      name: "Básico",
      price: "R$ 49,90",
      period: "/mês",
      features: [
        "Até 100 produtos",
        "1 terminal PDV",
        "Relatórios básicos",
        "Suporte por email"
      ]
    },
    {
      name: "Profissional",
      price: "R$ 99,90",
      period: "/mês",
      features: [
        "Produtos ilimitados",
        "3 terminais PDV",
        "KDS completo",
        "Relatórios avançados",
        "Suporte prioritário",
        "Integração com delivery"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "R$ 199,90",
      period: "/mês",
      features: [
        "Tudo do Profissional",
        "Terminais ilimitados",
        "Multi-estabelecimentos",
        "API personalizada",
        "Suporte 24/7",
        "Consultoria gratuita"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">POS</span>
            </div>
            <span className="font-bold text-xl text-gray-800">RestaurantePOS</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline">Entrar</Button>
            <Button className="bg-gradient-primary hover:bg-primary-700">
              Começar Grátis
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            O Sistema PDV que seu Restaurante Precisa
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-fade-in">
            Gerencie seu estabelecimento de forma completa com nosso sistema moderno, 
            intuitivo e feito especialmente para restaurantes, lanchonetes e food trucks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4">
              Teste Grátis por 30 Dias
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4">
              Ver Demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nossa plataforma oferece todas as ferramentas essenciais para modernizar 
              e otimizar a gestão do seu estabelecimento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Check className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="font-medium text-gray-800">{feature}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Planos que Cabem no seu Bolso
            </h2>
            <p className="text-xl text-gray-600">
              Escolha o plano ideal para o tamanho do seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`bg-white shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                  plan.popular ? "border-2 border-primary-500 transform scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-secondary px-4 py-2 rounded-full text-white text-sm font-bold">
                      MAIS POPULAR
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-800">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-primary-600">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  <Button 
                    className={`w-full mt-8 ${
                      plan.popular 
                        ? "bg-gradient-primary hover:bg-primary-700" 
                        : "bg-gray-800 hover:bg-gray-900"
                    }`}
                    size="lg"
                  >
                    Começar Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para Revolucionar seu Restaurante?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Junte-se a milhares de estabelecimentos que já modernizaram sua gestão conosco.
          </p>
          
          <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4">
            Comece seu Teste Gratuito
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">POS</span>
                </div>
                <span className="font-bold text-xl">RestaurantePOS</span>
              </div>
              <p className="text-gray-400">
                A solução completa para gestão de restaurantes e estabelecimentos alimentícios.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Funcionalidades</li>
                <li>Preços</li>
                <li>Demonstração</li>
                <li>Integrações</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Central de Ajuda</li>
                <li>Documentação</li>
                <li>Contato</li>
                <li>Status</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Sobre</li>
                <li>Blog</li>
                <li>Carreiras</li>
                <li>Termos de Uso</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RestaurantePOS. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
