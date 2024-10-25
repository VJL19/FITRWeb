export interface IDailyAttendeesAnalytics {
  TotalAttendees: number;
  Day: string;
  DateTapped: string;
  SubscriptionType: string;
}
export interface IDailyAttendeesData {
  Day: string;
  DateTapped: string;
  sessionUserAttendees: number;
  monthlyUserAttendees: number;
}
export interface IWeeklyAttendeesAnalytics {
  TotalAttendees: number;
  Day: string;
  DateTapped: string;
  SubscriptionType: string;
  Week: string;
}
export interface IMonthlyAttendeesAnalytics {
  TotalAttendees: number;
  DateTapped: string;
  SubscriptionType: string;
  Months: string;
}

export interface IMonthlyAttendeesData {
  Months: string;
  sessionUserAttendees: number;
  monthlyUserAttendees: number;
}

export interface IWeeklyAttendeesData {
  Day: string;
  DateTapped: string;
  Week: string;
  sessionUserAttendees: number;
  monthlyUserAttendees: number;
}
