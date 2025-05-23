
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
      <Card className="w-full max-w-md bg-white shadow-2xl animate-fade-in">
        <CardHeader className="text-center pb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">POS</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            RestaurantePOS
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Sistema de PDV para Restaurantes
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Button 
              className="w-full bg-gradient-primary hover:bg-primary-700 text-white font-semibold py-3"
              onClick={() => window.location.href = '/dashboard'}
            >
              Acessar Sistema
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full border-primary-500 text-primary-600 hover:bg-primary-50 py-3"
              onClick={() => window.location.href = '/'}
            >
              Voltar ao Site
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              Novo por aqui?
            </p>
            <Button variant="link" className="text-primary-600 hover:text-primary-700">
              Criar uma conta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
