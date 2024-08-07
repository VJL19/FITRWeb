export interface IDailySalesAnalytics {
  Day: string;
  SubscriptionEntryDate: string;
  TotalSales: string;
  SubscriptionType: string;
}

export interface ITodaySalesAnalytics {
  SubscriptionEntryDate: string;
  Hours: number;
  TotalSalesPer4Hr: number;
  SubscriptionType: string;
}

export interface IDailySalesData {
  Day: string;
  SubscriptionEntryDate: string;
  sessionUserSales: string;
  monthlyUserSales: number;
}
export interface ITodaySalesData {
  SubscriptionEntryDate: string;
  Hours: string;
  TotalSalesPer4Hr: number;
  sessionUserSales: string;
  monthlyUserSales: number;
}
export interface IWeeklySalesData {
  Week: string;
  sessionUserSales: string;
  monthlyUserSales: number;
}
export interface IMonthlySalesData {
  Months: string;
  sessionUserSales: string;
  monthlyUserSales: number;
}

export interface IWeeklySalesAnalytics {
  Week: string;
  TotalSalesPerWeek: string;
  SubscriptionType: string;
}

export interface IMonthlySalesAnalytics {
  Months: string;
  TotalSalesPerMonth: string;
  SubscriptionType: string;
}
