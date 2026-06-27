/**
 * ✏️  EDIT THIS FILE to personalise your date invitation.
 * Everything here is designed to be changed — make it yours!
 */

export const invitationConfig = {
  /** Your name (the person sending the invitation) */
  senderName: "Alex",

  /** The name of the person you're asking out */
  receiverName: "Mia",

  /**
   * A photo to show on the hero section.
   * • Local file:  put it in /public/photo.jpg  → use "/photo.jpg"
   * • URL:         paste any direct image URL here
   * Leave as "" to show a illustrated heart placeholder instead.
   */
  heroPhotoUrl: "",

  /** Alt text for the hero photo (accessibility) */
  heroPhotoAlt: "A photo of us",

  /** The main headline — shown big and bold above your message */
  headline: "Hey Mia 🌸",

  /**
   * Your personal message — be as sweet (or funny) as you want.
   * Use \n for line breaks.
   */
  personalMessage:
    "Every time I see you, my whole day gets better.\nI've been wanting to ask you this for a while, and I finally worked up the courage...",

  /** Shown just before the Yes / No buttons */
  invitationQuestion: "Will you go on a date with me?",

  /** Label on the "yes" button */
  yesButtonLabel: "Yes! 🥹",

  /** Label on the "no" button (it will run away 😄) */
  noButtonLabel: "No...",

  /** Messages that appear when the "No" button is hovered / clicked */
  noPanicMessages: [
    "Wait, don't click that! 🙈",
    "Are you sure sure? 👀",
    "Give me a chance! 🥺",
    "Okay but hear me out... 💌",
    "This button is broken, try the other one 😅",
    "Pleeeease? 🙏",
  ],

  /** Pre-filled location suggestions in the form */
  locationSuggestions: [
    "A cozy little restaurant 🍝",
    "A picnic in the park 🧺",
    "Coffee and a bookstore stroll ☕",
    "Mini golf + ice cream 🏌️‍♀️🍦",
    "A movie night at the cinema 🎬",
    "Cooking together at home 👨‍🍳",
    "Surprise me! ✨",
  ],

  /** Activity suggestions */
  activitySuggestions: [
    "Eat yummy food 😋",
    "Take lots of photos 📸",
    "Laugh until our stomachs hurt 😂",
    "Talk about everything and nothing",
    "Watch the sunset 🌅",
    "Dance badly but have fun 💃",
  ],

  /** Text shown on the success screen after form submission */
  successHeadline: "You've made me the happiest person! 🎉",
  successMessage:
    "I'm already excited. I'll reach out soon with the details. Can't wait! 💕",
} as const;

export type InvitationConfig = typeof invitationConfig;