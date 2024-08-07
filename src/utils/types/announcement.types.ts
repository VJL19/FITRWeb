export interface IAnnouncements {
  AnnouncementID: number;
  AnnouncementImage: string;
  AnnouncementTitle: string;
  AnnouncementDate: string;
  AnnouncementDescription: string;
  TotalAnnouncements?: number;
}

export interface IPreviewAnnouncements {
  AnnouncementID: number;
  AnnouncementImage: string | File | undefined;
  AnnouncementTitle: string;
  AnnouncementDate: string;
  AnnouncementDescription: string;
}
