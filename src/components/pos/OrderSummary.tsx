
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, Edit2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OrderItem } from "@/context/OrdersContext";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface OrderSummaryProps {
  items: OrderItem[];
  onRemoveItem: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
  onNotesChange?: (id: number, notes: string) => void;
  total: number;
  deliveryFee?: number;
}

export const OrderSummary = ({ 
  items, 
  onRemoveItem, 
  onQuantityChange,
  onNotesChange,
  total,
  deliveryFee = 0
}: OrderSummaryProps) => {
  const subtotal = total - deliveryFee;
  const [editingNotes, setEditingNotes] = useState<number | null>(null);
  const [editNoteText, setEditNoteText] = useState("");

  const handleEditNotes = (id: number, currentNotes: string) => {
    setEditingNotes(id);
    setEditNoteText(currentNotes);
  };

  const saveNotes = (id: number) => {
    if (onNotesChange) {
      onNotesChange(id, editNoteText);
    }
    setEditingNotes(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-white">
        <h2 className="text-xl font-bold">Resumo do Pedido</h2>
        <p className="text-gray-500 text-sm">{items.length} itens</p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 p-8 text-center text-gray-500">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </div>
          <p className="font-medium">Seu pedido está vazio</p>
          <p className="text-sm">Adicione itens do cardápio ao seu pedido</p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-hidden flex flex-col">
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">{item.name}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveItem(item.id)}
                        className="h-6 w-6 p-0 text-gray-500 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {editingNotes === item.id ? (
                      <div className="mb-2">
                        <Textarea
                          placeholder="Observações (ex: sem cebola)"
                          value={editNoteText}
                          onChange={(e) => setEditNoteText(e.target.value)}
                          className="text-sm resize-none h-16 mb-2"
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingNotes(null)}
                            className="text-xs h-7"
                          >
                            Cancelar
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => saveNotes(item.id)}
                            className="text-xs h-7"
                          >
                            Salvar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between mb-2">
                        <p className="text-sm text-gray-500">
                          {item.notes || "Sem observações"}
                        </p>
                        {onNotesChange && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditNotes(item.id, item.notes)}
                            className="h-5 w-5 p-0 text-blue-500 hover:text-blue-700"
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-primary-700 font-medium">
                        R$ {item.price?.toFixed(2)}
                      </div>

                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-7 w-7 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <span className="w-6 text-center font-medium">
                          {item.quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                          className="h-7 w-7 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t bg-white space-y-2 mt-auto">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              
              {deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span>Taxa de entrega</span>
                  <span>R$ {deliveryFee.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span className="text-primary-700">R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
