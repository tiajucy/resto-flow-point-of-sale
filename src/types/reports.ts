
// Reports API Types

// Sales/Revenue data structure
export interface ChartData {
  labels: string[];
  data: number[];
}

// Top product data structure
export interface TopProduct {
  id: number;
  name: string;
  quantity: number;
  revenue: number;
  rank: number;
}

// Order status breakdown
export interface OrderStatusCount {
  status: string;
  count: number;
}

// Order statistics data structure
export interface OrderStats {
  total: number;
  average: number;
  completed: number;
  canceled: number;
  byStatus: OrderStatusCount[];
}

// Daily activity data structure
export interface DailyActivity extends ChartData {
  peakHour: string;
  slowestHour: string;
}

// Format for a single data point on a chart
export interface ChartDataPoint {
  name: string;
  [key: string]: string | number; // For different data keys like sales, revenue, etc.
}
