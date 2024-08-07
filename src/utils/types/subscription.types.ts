import IUser from "./users.types";

interface ISubscriptions extends IUser {
  SubscriptionID: number;
  SubscriptionAmount: number;
  SubscriptionType: string;
  SubscriptionMethod: string;
  SubscriptionStatus: string;
  SubscriptionUploadedImage: string;
  SubscriptionEntryDate: string;
  No_M_SubscriptionID: number;
  TotalPending?: number;
  TotalFulfill?: number;
  TotalSales?: number;
  TotalSessionUserSales?: number;
  TotalMonthlyUserSales?: number;
  AverageSales?: number;
  AverageSessionSales?: number;
  AverageMonthlySales?: number;
}

export interface IEditSubscription {
  SubscriptionStatus: string;
}
export default ISubscriptions;
