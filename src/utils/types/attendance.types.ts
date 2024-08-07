import IUser from "./users.types";

interface IAttendance extends IUser {
  AttendanceID: number;
  SubscriptionType: string;
  TimeIn: string;
  TimeOut: string;
  SubscriptionExpectedEnd: string;
  DateTapped: string;
  IsPaid: string;
  TotalUsers?: number;
  TotalSessionUsers?: number;
  TotalMonthlyUsers?: number;
}

export default IAttendance;
