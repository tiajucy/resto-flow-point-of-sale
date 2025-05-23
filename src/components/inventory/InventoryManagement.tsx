
import { useState } from "react";
import { useProducts, Product, InventoryTransaction } from "@/context/ProductContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export function InventoryManagement() {
  const { products, inventoryTransactions, addInventoryTransaction } = useProducts();
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"todos" | "entrada" | "saída" | "ajuste">("todos");
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [transactionData, setTransactionData] = useState({
    type: "entrada" as "entrada" | "saída" | "ajuste",
    quantity: "1",
    reason: ""
  });
  
  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter transactions based on filter type
  const filteredTransactions = inventoryTransactions.filter(transaction =>
    filterType === "todos" || transaction.type === filterType
  );
  
  // Sort transactions by date descending
  const sortedTransactions = [...filteredTransactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setShowTransactionForm(true);
  };
  
  const handleSubmitTransaction = () => {
    if (!selectedProduct) return;
    
    try {
      const quantity = parseInt(transactionData.quantity);
      
      if (isNaN(quantity) || quantity <= 0) {
        throw new Error("A quantidade deve ser um número positivo.");
      }
      
      // For "saída", check if there's enough stock
      if (transactionData.type === "saída" && quantity > selectedProduct.stock) {
        throw new Error("Quantidade insuficiente em estoque.");
      }
      
      // Add the transaction
      addInventoryTransaction({
        productId: selectedProduct.id,
        type: transactionData.type,
        quantity,
        reason: transactionData.reason
      });
      
      // Reset form and close dialog
      setTransactionData({
        type: "entrada",
        quantity: "1",
        reason: ""
      });
      setShowTransactionForm(false);
    } catch (error) {
      console.error("Error adding transaction:", error);
      // Toast could be added here for error feedback
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Gestão de Estoque</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Products Inventory Section */}
        <Card>
          <CardHeader>
            <CardTitle>Produtos em Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="overflow-auto max-h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Estoque</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        <Badge className={
                          product.stock < 5 
                            ? "bg-red-100 text-red-800" 
                            : product.stock < 10 
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }>
                          {product.stock}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleProductSelect(product)}
                        >
                          Ajustar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        {/* Inventory Transactions Section */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Movimentações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Select 
                value={filterType} 
                onValueChange={(value: "todos" | "entrada" | "saída" | "ajuste") => setFilterType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="entrada">Entrada</SelectItem>
                  <SelectItem value="saída">Saída</SelectItem>
                  <SelectItem value="ajuste">Ajuste</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="overflow-auto max-h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Qtd</TableHead>
                    <TableHead>Motivo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedTransactions.map((transaction) => {
                    const product = products.find(p => p.id === transaction.productId);
                    const date = new Date(transaction.date);
                    
                    return (
                      <TableRow key={transaction.id}>
                        <TableCell className="whitespace-nowrap">
                          {format(date, "dd/MM/yyyy HH:mm")}
                        </TableCell>
                        <TableCell>{product?.name || "Produto não encontrado"}</TableCell>
                        <TableCell>
                          <Badge className={
                            transaction.type === "entrada" 
                              ? "bg-green-100 text-green-800" 
                              : transaction.type === "saída"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                          }>
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{transaction.quantity}</TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {transaction.reason}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Transaction Form Dialog */}
      <Dialog open={showTransactionForm} onOpenChange={setShowTransactionForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Movimentação de Estoque</DialogTitle>
            <DialogDescription>
              {selectedProduct && (
                <div>
                  <p className="font-medium">{selectedProduct.name}</p>
                  <p className="text-sm">
                    Estoque atual: <span className="font-medium">{selectedProduct.stock}</span>
                  </p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="type">Tipo de Movimentação</Label>
              <Select 
                value={transactionData.type} 
                onValueChange={(value: "entrada" | "saída" | "ajuste") => 
                  setTransactionData({ ...transactionData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entrada">Entrada</SelectItem>
                  <SelectItem value="saída">Saída</SelectItem>
                  <SelectItem value="ajuste">Ajuste</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="quantity">Quantidade</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={transactionData.quantity}
                onChange={(e) => setTransactionData({ ...transactionData, quantity: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="reason">Motivo</Label>
              <Textarea
                id="reason"
                value={transactionData.reason}
                onChange={(e) => setTransactionData({ ...transactionData, reason: e.target.value })}
                placeholder="Descreva o motivo da movimentação..."
                rows={3}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTransactionForm(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmitTransaction}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
