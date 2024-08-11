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
  sessionUserSales: number;
  monthlyUserSales: number;
}
export interface ITodaySalesData {
  SubscriptionEntryDate: string;
  Hours: string;
  TotalSalesPer4Hr: number;
  sessionUserSales: number;
  monthlyUserSales: number;
}
export interface IWeeklySalesData {
  Week: string;
  sessionUserSales: number;
  monthlyUserSales: number;
}
export interface IWeeklyGrowthRateData {
  Week: string;
  sessionUsersGrowthRate: number;
  monthlyUsersGrowthRate: number;
}
export interface IMonthlyGrowthRateData {
  Months: string;
  sessionUsersGrowthRate: number;
  monthlyUsersGrowthRate: number;
}
export interface IDailyGrowthRateData {
  Day: string;
  SubscriptionEntryDate: string;
  sessionUsersGrowthRate: number;
  monthlyUsersGrowthRate: number;
}
export interface IMonthlySalesData {
  Months: string;
  sessionUserSales: number;
  monthlyUserSales: number;
}

export interface IWeeklyGrowthRate {
  Week: string;
  TotalSalesPerWeek: string;
  SubscriptionType: string;
  GrowthRate: number;
}
export interface IDailyGrowthRate {
  Day: string;
  TotalSales: string;
  SubscriptionType: string;
  GrowthRate: number;
  SubscriptionEntryDate: string;
}

export interface IMonthlyGrowthRate {
  Months: string;
  TotalSalesPerMonth: string;
  SubscriptionType: string;
  GrowthRate: number;
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
