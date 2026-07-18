# 🎯 Button Of Destiny

<div align="center">
  <p align="center">
    <strong>An Interactive, Event-Driven Proposal Web App</strong><br />
    A charming Next.js application designed to ask someone out on a date, integrated with a central API proxy and a Telegram Bot for instant notification routing.
  </p>
</div>

---

## 🚀 Overview

**Button Of Destiny** is a dynamic, highly interactive frontend application built to present a playful, gamified, and cute questionnaire asking the user out on a date.

Beyond its lighthearted presentation, the project serves as a practical implementation of **event-driven notifications** and microservices interaction. When a user completes the multi-step questionnaire and hits submit, the frontend fires a secured request to a central proxy API, which processes the payload and immediately triggers a **Telegram Bot API** broadcast to deliver the scheduling details straight to my personal device.

### ✨ Key Features

- **Interactive UI Flow:** A carefully timed, highly responsive multi-step form featuring cute animations and logic designed to capture date preferences (time, venue, activity).
- **Decoupled Architecture:** The client application does not directly call Telegram or hold sensitive bot tokens. It routes all payloads securely through an external proxy layer.
- **Instant Telegram Alerts:** Leverages Telegram Bot API integration to instantly push real-time summaries of the submission directly to the host's Telegram ID.
- **Fully Responsive:** Fluid layouts ensure the application looks perfect and operates smoothly on both mobile devices and desktops.

---

## 📐 Integration Architecture

The application communicates across three distinct layers to ensure security and real-time messaging updates without exposing bot credentials to the browser:

```text
┌─────────────────────────┐                 Secure HTTP Request                 ┌──────────────────────────┐
│  "Button of Destiny"    │ ──────────────────────────────────────────────────> │ Centralized Backend API  │
│      Next.js Client     │ <────────────────────────────────────────────────── │  (Validates Bearer Token)│
└─────────────────────────┘                   Status Response                   └──────────────────────────┘
                                                                                             │
                                                                                             │ Triggers Serverless
                                                                                             │ Bot Payload Dispatch
                                                                                             ▼
┌─────────────────────────┐               Instant Push Notification             ┌──────────────────────────┐
│   Host's Telegram ID    │ <────────────────────────────────────────────────── │     Telegram Bot API     │
│   (Real-time Date Alert)│                                                     └──────────────────────────┘
```
