export interface IDailySalesAnalytics {
  Day: string;
  SubscriptionEntryDate: string;
  TotalSales: string;
}

export interface IWeeklySalesAnalytics {
  Week: string;
  TotalSalesPerWeek: string;
}

export interface IMonthlySalesAnalytics {
  Months: string;
  TotalSalesPerMonth: string;
}
