
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
            <FormField
              control={form.control}
              name="tableNumber"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Número da Mesa</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: 5" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="retirada" className="space-y-4">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Nome do Cliente</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nome completo" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerPhone"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>WhatsApp</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="(00) 00000-0000" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="delivery" className="space-y-4">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Nome do Cliente</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nome completo" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerPhone"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>WhatsApp</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="(00) 00000-0000" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Endereço Completo</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Rua, número, bairro, cidade" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Ponto de Referência (opcional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Próximo a..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deliveryFee"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Taxa de Entrega (R$)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          {/* Common fields for all order types */}
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <FormField
              control={form.control}
              name="items"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Itens do Pedido</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Lista de itens (opcionalmente, você pode adicionar itens posteriormente)"
                      rows={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
