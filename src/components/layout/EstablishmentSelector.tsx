
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Building2 } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { useOrders } from "@/context/OrdersContext";

// Sample establishments - in a real app this would come from API/context
const establishments = [
  { id: "est-001", name: "Restaurante São Paulo", type: "Restaurante" },
  { id: "est-002", name: "Sushi Bar Tokyo", type: "Sushi Bar" },
];

export const EstablishmentSelector = () => {
  const { currentEstablishmentId, setCurrentEstablishmentId } = useProducts();
  const { setCurrentEstablishmentId: setOrdersEstablishmentId } = useOrders();
  
  const currentEstablishment = establishments.find(est => est.id === currentEstablishmentId);
  
  const handleEstablishmentChange = (establishmentId: string) => {
    setCurrentEstablishmentId(establishmentId);
    setOrdersEstablishmentId(establishmentId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 min-w-[200px]">
          <Building2 className="h-4 w-4" />
          <span className="truncate">
            {currentEstablishment?.name || "Selecionar Estabelecimento"}
          </span>
          <ChevronDown className="h-4 w-4 ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        {establishments.map((establishment) => (
          <DropdownMenuItem
            key={establishment.id}
            onClick={() => handleEstablishmentChange(establishment.id)}
            className={`cursor-pointer ${
              establishment.id === currentEstablishmentId ? "bg-primary/10" : ""
            }`}
          >
            <div className="flex flex-col">
              <span className="font-medium">{establishment.name}</span>
              <span className="text-xs text-gray-500">{establishment.type}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
