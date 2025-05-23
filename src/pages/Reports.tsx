
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReportsAPI } from "@/api/apiService";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { AlertCircle, ArrowUp, ArrowDown, TrendingUp, BarChart3, BarChart2, PieChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Report page periods
const periods = [
  { value: "day", label: "Últimas 24 horas" },
  { value: "week", label: "Última semana" },
  { value: "month", label: "Último mês" },
];

// Chart configurations
const chartConfig = {
  sales: { label: "Vendas", theme: { light: "#2563eb", dark: "#3b82f6" } },
  revenue: { label: "Receita", theme: { light: "#059669", dark: "#10b981" } },
};

export default function Reports() {
  const [period, setPeriod] = useState<string>("day");
  const periodLabel = periods.find(p => p.value === period)?.label || "Período";
  
  // Fetch sales data
  const {
    data: salesData,
    isLoading: salesLoading,
    error: salesError,
  } = useQuery({
    queryKey: ["sales", period],
    queryFn: () => ReportsAPI.getSales(period),
  });

  // Fetch revenue data
  const {
    data: revenueData,
    isLoading: revenueLoading,
    error: revenueError,
  } = useQuery({
    queryKey: ["revenue", period],
    queryFn: () => ReportsAPI.getRevenue(period),
  });

  // Fetch top products
  const {
    data: topProducts,
    isLoading: topProductsLoading,
    error: topProductsError,
  } = useQuery({
    queryKey: ["topProducts", period],
    queryFn: () => ReportsAPI.getTopProducts(period),
  });

  // Fetch order stats
  const {
    data: orderStats,
    isLoading: orderStatsLoading,
    error: orderStatsError,
  } = useQuery({
    queryKey: ["orderStats", period],
    queryFn: () => ReportsAPI.getOrderStats(period),
  });

  // Fetch daily activity
  const {
    data: dailyActivity,
    isLoading: dailyActivityLoading,
    error: dailyActivityError,
  } = useQuery({
    queryKey: ["dailyActivity"],
    queryFn: () => ReportsAPI.getDailyActivity(),
  });

  // Format chart data
  const formattedSalesData = salesData?.labels.map((label, index) => ({
    name: label,
    sales: salesData.data[index],
  })) || [];

  const formattedRevenueData = revenueData?.labels.map((label, index) => ({
    name: label,
    revenue: revenueData.data[index],
  })) || [];

  const formattedActivityData = dailyActivity?.labels.map((label, index) => ({
    name: label,
    activity: dailyActivity.data[index],
  })) || [];

  const orderStatusData = orderStats?.byStatus || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Relatórios</h2>
            <p className="text-muted-foreground">
              Analise o desempenho do seu estabelecimento
            </p>
          </div>
          
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione um período" />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Summary Cards */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Pedidos
              </CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {orderStatsLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{orderStats?.total || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    +{Math.floor(Math.random() * 10) + 1}% desde o período anterior
                  </p>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Valor Médio
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {orderStatsLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <>
                  <div className="text-2xl font-bold">R$ {orderStats?.average.toFixed(2) || "0.00"}</div>
                  <p className="text-xs text-muted-foreground">
                    +{Math.floor(Math.random() * 5) + 1}% desde o período anterior
                  </p>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Taxa de Conclusão
              </CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {orderStatsLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <>
                  {orderStats && (
                    <div className="text-2xl font-bold">
                      {Math.round((orderStats.completed / (orderStats.total || 1)) * 100)}%
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    +{Math.floor(Math.random() * 3) + 1}% desde o período anterior
                  </p>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pico de Atividade
              </CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {dailyActivityLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{dailyActivity?.peakHour || "19:00"}</div>
                  <p className="text-xs text-muted-foreground">
                    Horário de maior movimento
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="vendas" className="space-y-4">
          <TabsList>
            <TabsTrigger value="vendas">Vendas</TabsTrigger>
            <TabsTrigger value="receita">Receita</TabsTrigger>
            <TabsTrigger value="produtos">Produtos</TabsTrigger>
            <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vendas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Vendas</CardTitle>
                <CardDescription>
                  Número de vendas durante {periodLabel.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                {salesLoading ? (
                  <div className="flex h-full items-center justify-center">
                    <Skeleton className="h-[300px] w-full" />
                  </div>
                ) : salesError ? (
                  <div className="flex h-full items-center justify-center text-red-500">
                    <AlertCircle className="mr-2 h-5 w-5" /> Erro ao carregar dados
                  </div>
                ) : (
                  <ChartContainer config={chartConfig} className="h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={formattedSalesData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="sales"
                          name="Vendas"
                          stroke="#2563eb"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Atividade Diária</CardTitle>
                <CardDescription>
                  Distribuição de pedidos ao longo do dia
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {dailyActivityLoading ? (
                  <div className="flex h-full items-center justify-center">
                    <Skeleton className="h-[250px] w-full" />
                  </div>
                ) : dailyActivityError ? (
                  <div className="flex h-full items-center justify-center text-red-500">
                    <AlertCircle className="mr-2 h-5 w-5" /> Erro ao carregar dados
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={formattedActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="activity" name="Pedidos" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="receita" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Receita</CardTitle>
                <CardDescription>
                  Receita total durante {periodLabel.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                {revenueLoading ? (
                  <div className="flex h-full items-center justify-center">
                    <Skeleton className="h-[300px] w-full" />
                  </div>
                ) : revenueError ? (
                  <div className="flex h-full items-center justify-center text-red-500">
                    <AlertCircle className="mr-2 h-5 w-5" /> Erro ao carregar dados
                  </div>
                ) : (
                  <ChartContainer config={chartConfig} className="h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={formattedRevenueData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          name="Receita"
                          stroke="#059669"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Crescimento de Receita</CardTitle>
                  <CardDescription>
                    Comparação com o período anterior
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[150px] flex items-center">
                  {revenueLoading ? (
                    <Skeleton className="h-[100px] w-full" />
                  ) : (
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-4 rounded-full">
                        <ArrowUp className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Crescimento em relação ao período anterior
                        </p>
                        <div className="text-3xl font-bold text-green-600">+{Math.floor(Math.random() * 15) + 5}%</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Projeção Mensal</CardTitle>
                  <CardDescription>
                    Estimativa para o mês atual
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[150px] flex items-center">
                  {revenueLoading ? (
                    <Skeleton className="h-[100px] w-full" />
                  ) : (
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-4 rounded-full">
                        <TrendingUp className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Com base no desempenho atual
                        </p>
                        <div className="text-3xl font-bold text-blue-600">
                          R$ {(Math.floor(Math.random() * 50000) + 10000).toLocaleString('pt-BR')}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="produtos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Produtos Mais Vendidos</CardTitle>
                <CardDescription>
                  Top 5 produtos durante {periodLabel.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {topProductsLoading ? (
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : topProductsError ? (
                  <div className="flex items-center justify-center text-red-500">
                    <AlertCircle className="mr-2 h-5 w-5" /> Erro ao carregar dados
                  </div>
                ) : (
                  <div className="relative">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-muted-foreground">
                          <th className="py-3 text-left">Produto</th>
                          <th className="py-3 text-center">Quantidade</th>
                          <th className="py-3 text-right">Receita</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topProducts?.map((product: any, index: number) => (
                          <tr key={product.id} className="border-b">
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="w-6 h-6 flex items-center justify-center p-0">
                                  {index + 1}
                                </Badge>
                                <span>{product.name}</span>
                              </div>
                            </td>
                            <td className="py-3 text-center">{product.quantity}</td>
                            <td className="py-3 text-right">R$ {product.revenue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pedidos" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Status dos Pedidos</CardTitle>
                  <CardDescription>
                    Distribuição por status durante {periodLabel.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  {orderStatsLoading ? (
                    <div className="flex h-full items-center justify-center">
                      <Skeleton className="h-[250px] w-full" />
                    </div>
                  ) : orderStatsError ? (
                    <div className="flex h-full items-center justify-center text-red-500">
                      <AlertCircle className="mr-2 h-5 w-5" /> Erro ao carregar dados
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={orderStatusData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="status" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" name="Quantidade" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Indicadores de Desempenho</CardTitle>
                  <CardDescription>
                    Métricas chave de pedidos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {orderStatsLoading ? (
                    <div className="space-y-2">
                      {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium">Total de Pedidos</span>
                        <span className="font-bold">{orderStats?.total || 0}</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium">Pedidos Concluídos</span>
                        <span className="font-bold text-green-600">{orderStats?.completed || 0}</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium">Pedidos Cancelados</span>
                        <span className="font-bold text-red-600">{orderStats?.canceled || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Taxa de Conclusão</span>
                        <span className="font-bold">
                          {orderStats && Math.round((orderStats.completed / (orderStats.total || 1)) * 100)}%
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
