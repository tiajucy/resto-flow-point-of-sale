
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// Create a base schema with common fields
const baseOrderSchema = {
  items: z.string().optional(),
};

// Define the validation schema based on order type
const tableOrderSchema = z.object({
  orderType: z.literal("mesa"),
  tableNumber: z.string().min(1, "Número da mesa é obrigatório"),
  ...baseOrderSchema
});

const pickupOrderSchema = z.object({
  orderType: z.literal("retirada"),
  customerName: z.string().min(3, "Nome é obrigatório e deve ter no mínimo 3 caracteres"),
  customerPhone: z.string().min(10, "Telefone é obrigatório"),
  ...baseOrderSchema
});

const deliveryOrderSchema = z.object({
  orderType: z.literal("delivery"),
  customerName: z.string().min(3, "Nome é obrigatório e deve ter no mínimo 3 caracteres"),
  customerPhone: z.string().min(10, "Telefone é obrigatório"),
  address: z.string().min(5, "Endereço completo é obrigatório"),
  reference: z.string().optional(),
  deliveryFee: z.coerce.number().min(0, "Taxa de entrega não pode ser negativa"),
  ...baseOrderSchema
});

// Union the schemas
const orderSchema = z.discriminatedUnion("orderType", [
  tableOrderSchema,
  pickupOrderSchema,
  deliveryOrderSchema
]);

type OrderFormValues = z.infer<typeof orderSchema>;

interface NewOrderFormProps {
  onSubmit: (data: any) => void;
}

export const NewOrderForm = ({ onSubmit }: NewOrderFormProps) => {
  const [orderType, setOrderType] = useState<"mesa" | "retirada" | "delivery">("mesa");
  
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      orderType: "mesa",
      tableNumber: "",
      items: "",
    } as any,
  });

  const handleTabChange = (value: string) => {
    setOrderType(value as "mesa" | "retirada" | "delivery");
    
    // Reset the form with new defaults based on order type
    if (value === "mesa") {
      form.reset({
        orderType: "mesa",
        tableNumber: "",
        items: "",
      });
    } else if (value === "retirada") {
      form.reset({
        orderType: "retirada",
        customerName: "",
        customerPhone: "",
        items: "",
      });
    } else if (value === "delivery") {
      form.reset({
        orderType: "delivery",
        customerName: "",
        customerPhone: "",
        address: "",
        reference: "",
        deliveryFee: 0,
        items: "",
      });
    }
  };

  const handleFormSubmit = (data: OrderFormValues) => {
    // Create a new data object with a total field
    const orderData = {
      ...data,
      total: orderType === "delivery" ? 
        ((data as any).deliveryFee || 0) : 0,
      status: "Aguardando",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    onSubmit(orderData);
  };

  return (
    <Tabs defaultValue="mesa" className="w-full" onValueChange={handleTabChange}>
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="mesa">Mesa</TabsTrigger>
        <TabsTrigger value="retirada">Retirada</TabsTrigger>
        <TabsTrigger value="delivery">Delivery</TabsTrigger>
      </TabsList>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          <TabsContent value="mesa" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tableNumber">Número da Mesa</Label>
              <Input 
                id="tableNumber" 
                placeholder="Ex: 5"
                {...form.register("tableNumber", { shouldUnregister: true })}
              />
              {orderType === "mesa" && form.formState.errors.tableNumber && (
                <p className="text-sm text-red-500">{form.formState.errors.tableNumber.message}</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="retirada" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Nome do Cliente</Label>
              <Input 
                id="customerName" 
                placeholder="Nome completo"
                {...form.register("customerName", { shouldUnregister: true })}
              />
              {orderType === "retirada" && form.formState.errors.customerName && (
                <p className="text-sm text-red-500">{form.formState.errors.customerName?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerPhone">WhatsApp</Label>
              <Input 
                id="customerPhone" 
                placeholder="(00) 00000-0000"
                {...form.register("customerPhone", { shouldUnregister: true })}
              />
              {orderType === "retirada" && form.formState.errors.customerPhone && (
                <p className="text-sm text-red-500">{form.formState.errors.customerPhone?.message}</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="delivery" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Nome do Cliente</Label>
              <Input 
                id="customerName" 
                placeholder="Nome completo"
                {...form.register("customerName", { shouldUnregister: true })}
              />
              {orderType === "delivery" && form.formState.errors.customerName && (
                <p className="text-sm text-red-500">{form.formState.errors.customerName?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerPhone">WhatsApp</Label>
              <Input 
                id="customerPhone" 
                placeholder="(00) 00000-0000"
                {...form.register("customerPhone", { shouldUnregister: true })}
              />
              {orderType === "delivery" && form.formState.errors.customerPhone && (
                <p className="text-sm text-red-500">{form.formState.errors.customerPhone?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Endereço Completo</Label>
              <Textarea 
                id="address" 
                placeholder="Rua, número, bairro, cidade"
                {...form.register("address", { shouldUnregister: true })}
              />
              {orderType === "delivery" && form.formState.errors.address && (
                <p className="text-sm text-red-500">{form.formState.errors.address?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference">Ponto de Referência (opcional)</Label>
              <Input 
                id="reference" 
                placeholder="Próximo a..."
                {...form.register("reference", { shouldUnregister: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryFee">Taxa de Entrega (R$)</Label>
              <Input 
                id="deliveryFee" 
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...form.register("deliveryFee", { shouldUnregister: true, valueAsNumber: true })}
              />
              {orderType === "delivery" && form.formState.errors.deliveryFee && (
                <p className="text-sm text-red-500">{form.formState.errors.deliveryFee?.message}</p>
              )}
            </div>
          </TabsContent>

          {/* Common fields for all order types */}
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <Label htmlFor="items">Itens do Pedido</Label>
            <Textarea 
              id="items" 
              placeholder="Lista de itens (opcionalmente, você pode adicionar itens posteriormente)"
              {...form.register("items")}
              rows={4}
            />
          </div>

          <input type="hidden" {...form.register("orderType")} value={orderType} />

          <div className="flex justify-end gap-2 pt-4">
            <Button type="submit" className="bg-gradient-primary">
              Criar Pedido
            </Button>
          </div>
        </form>
      </Form>
    </Tabs>
  );
};
