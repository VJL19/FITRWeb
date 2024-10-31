interface IUser {
  UserID?: number;
  LastName: string;
  FirstName: string;
  MiddleName: string;
  Birthday: string;
  Age: string;
  ContactNumber: string;
  Email: string;
  Address: string;
  Height: string;
  Weight: string;
  Username: string;
  Password: string;
  ConfirmPassword: string;
  ProfilePic?: string;
  SubscriptionType: string;
  Gender: string;
  RFIDNumber?: string;
  Activation?: string;
  IsRFIDActive?: string;
  TotalUser?: number;
  SubscriptionExpectedEnd?: string;
  Role?: string;
}

export interface IOTP {
  OTPCode: number;
}
export default IUser;
