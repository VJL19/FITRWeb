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
}

export interface IEditSubscription {
  SubscriptionStatus: string;
}
export default ISubscriptions;
