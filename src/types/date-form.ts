export type DateFormStep = "hero" | "invitation" | "planning" | "success";

export interface DatePlanFormData {
  /** Where the receiver wants to go */
  preferredLocation: string;
  /** Any custom location they typed in */
  customLocation: string;
  /** Preferred date string (ISO or display string) */
  preferredDate: string;
  /** Preferred time of day */
  preferredTime: string;
  /** Activities they'd enjoy */
  selectedActivities: string[];
  /** Any extra notes or wishes */
  extraNotes: string;
}

export interface TelegramPayload {
  receiverName: string;
  formData: DatePlanFormData;
  submittedAt: string;
}