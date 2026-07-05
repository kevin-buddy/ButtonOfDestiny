export type DateFormStep = "hero" | "invitation" | "planning" | "success";
// The shape of your Supabase table data
export interface InvitationConfig {
  uuid: string;
  senderName: string;
  receiverName: string;
  heroPhotoUrl: string;
  heroPhotoAlt: string;
  headline: string;
  personalMessage: string;
  invitationQuestion: string;
  yesButtonLabel: string;
  noButtonLabel: string;
  noPanicMessages: string[];
  locationSuggestions: string[];
  activitySuggestions: string[];
  successHeadline: string;
  successMessage: string;
}

export interface DatePlanFormData {
  preferredLocation: string;
  customLocation: string;
  preferredDate: string;
  preferredTime: string;
  selectedActivities: string[];
  extraNotes: string;
}

export interface TelegramPayload {
  uuid: string;
  receiverName: string;
  formData: DatePlanFormData;
  submittedAt: string;
}