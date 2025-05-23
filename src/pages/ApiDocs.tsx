import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApiDocs() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">API Documentation</h2>
          <p className="text-muted-foreground">
            Complete documentation for the PDV system API endpoints.
          </p>
        </div>

        <Tabs defaultValue="products" className="space-y-4">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="establishments">Establishments</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Products API</CardTitle>
                <CardDescription>
                  Endpoints for managing products
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Product API docs */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Get All Products</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">GET</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/products</code></div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Array of product objects</div>
                  </div>
                </div>

                {/* Additional product endpoints */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Get Product by ID</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">GET</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/products/:id</code></div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Product object</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Create New Product</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">POST</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/products</code></div>
                    <div className="font-medium">Request Body</div>
                    <div className="col-span-3">Product object (without id)</div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Created product object (with id)</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Update Product</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">PUT</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/products/:id</code></div>
                    <div className="font-medium">Request Body</div>
                    <div className="col-span-3">Product object (with id)</div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Updated product object</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Delete Product</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">DELETE</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/products/:id</code></div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Success message or status</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Get Low Stock Products</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">GET</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/products/low-stock</code></div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Array of product objects with low stock</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Inventory API</CardTitle>
                <CardDescription>
                  Endpoints for managing inventory transactions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Get All Inventory Transactions</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">GET</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/inventory</code></div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Array of inventory transaction objects</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Add Inventory Transaction</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">POST</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/inventory/transaction</code></div>
                    <div className="font-medium">Request Body</div>
                    <div className="col-span-3">Inventory transaction object (without id and date)</div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Created inventory transaction object (with id and date)</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Get Transactions by Product</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">GET</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/inventory/product/:productId</code></div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Array of inventory transaction objects for a specific product</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Orders API</CardTitle>
                <CardDescription>
                  Endpoints for managing orders
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Get All Orders</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">GET</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/orders</code></div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Array of order objects</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Get Order by ID</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">GET</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/orders/:id</code></div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Order object</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Create New Order</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">POST</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/orders</code></div>
                    <div className="font-medium">Request Body</div>
                    <div className="col-span-3">Order object (without id and elapsedTime)</div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Created order object (with id and elapsedTime)</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Update Order Status</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">PATCH</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/orders/:id/status</code></div>
                    <div className="font-medium">Request Body</div>
                    <div className="col-span-3">{`{ status: "Aguardando" | "Em preparo" | "Entregue" | "Cancelado" }`}</div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Updated order object</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Get Kitchen Orders</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">GET</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/orders/kitchen</code></div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Array of order objects with status "Aguardando" or "Em preparo"</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Toggle Item Prepared Status</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">PATCH</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/orders/:orderId/items/:itemIndex/toggle-prepared</code></div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Updated order object</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="establishments">
            <Card>
              <CardHeader>
                <CardTitle>Establishments API</CardTitle>
                <CardDescription>
                  Endpoints for managing establishments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Get All Establishments</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">GET</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/establishments</code></div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Array of establishment objects</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Get Establishment by ID</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">GET</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/establishments/:id</code></div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Establishment object</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Create New Establishment</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">POST</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/establishments</code></div>
                    <div className="font-medium">Request Body</div>
                    <div className="col-span-3">Establishment object (without id and createdAt)</div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Created establishment object (with id and createdAt)</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Update Establishment</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">PUT</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/establishments/:id</code></div>
                    <div className="font-medium">Request Body</div>
                    <div className="col-span-3">Establishment object (with id)</div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Updated establishment object</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Toggle Establishment Status</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">PATCH</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/establishments/:id/toggle-status</code></div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Updated establishment object with toggled status</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Get Current Plan</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">GET</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/establishments/:id/current-plan</code></div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Current plan object for the establishment</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Update Plan</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">PATCH</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/establishments/:id/update-plan</code></div>
                    <div className="font-medium">Request Body</div>
                    <div className="col-span-3">{`{ planId: number }`}</div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Updated establishment object</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Get Payment History</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">GET</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/establishments/:id/payments</code></div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Array of payment objects</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans">
            <Card>
              <CardHeader>
                <CardTitle>Plans API</CardTitle>
                <CardDescription>
                  Endpoints for managing plans
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Get All Plans</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">GET</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/plans</code></div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Array of plan objects</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Get Plan by ID</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">GET</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/plans/:id</code></div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">Plan object</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports API</CardTitle>
                <CardDescription>
                  Endpoints for retrieving analytical reports and statistics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Get Sales Data</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">GET</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/reports/sales/:period</code></div>
                    <div className="font-medium">Parameters</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">period</code> - one of: day, week, month</div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">
                      <pre className="bg-muted p-2 rounded text-xs overflow-auto">
{`{
  "labels": ["01:00", "02:00", ...],
  "data": [10, 15, 20, ...]
}`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Get Revenue Data</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">GET</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/reports/revenue/:period</code></div>
                    <div className="font-medium">Parameters</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">period</code> - one of: day, week, month</div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">
                      <pre className="bg-muted p-2 rounded text-xs overflow-auto">
{`{
  "labels": ["01:00", "02:00", ...],
  "data": [150, 320, 450, ...]
}`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Get Top Products</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">GET</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/reports/top-products/:period</code></div>
                    <div className="font-medium">Parameters</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">period</code> - one of: day, week, month</div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">
                      <pre className="bg-muted p-2 rounded text-xs overflow-auto">
{`[
  {
    "id": 1,
    "name": "Product Name",
    "quantity": 42,
    "revenue": 399.90,
    "rank": 1
  },
  ...
]`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Get Order Statistics</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">GET</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/reports/order-stats/:period</code></div>
                    <div className="font-medium">Parameters</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">period</code> - one of: day, week, month</div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">
                      <pre className="bg-muted p-2 rounded text-xs overflow-auto">
{`{
  "total": 157,
  "average": 45.90,
  "completed": 142,
  "canceled": 15,
  "byStatus": [
    { "status": "Entregue", "count": 142 },
    { "status": "Cancelado", "count": 15 }
  ]
}`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Get Daily Activity</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Method</div>
                    <div className="col-span-3">GET</div>
                    <div className="font-medium">Endpoint</div>
                    <div className="col-span-3"><code className="bg-muted px-1 rounded">/api/reports/daily-activity</code></div>
                    <div className="font-medium">Response</div>
                    <div className="col-span-3">
                      <pre className="bg-muted p-2 rounded text-xs overflow-auto">
{`{
  "labels": ["00:00", "01:00", "02:00", ...],
  "data": [5, 2, 0, 3, ...],
  "peakHour": "19:00",
  "slowestHour": "04:00"
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
