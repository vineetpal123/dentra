# 🦷 Dentra – Phase 1 MVP Feature List

## 🎯 Objective

Dentra Phase 1 aims to help dental clinics manage their **day-to-day operations digitally**—appointments, patients, treatments, and billing—without relying on registers, Excel sheets, or WhatsApp chaos.

The goal is to deliver **maximum daily value with minimum complexity**, enabling fast adoption and early monetization.

---

## 🧑‍⚕️ Target Users

- Dental clinic owners (Dentists)
- Receptionists / clinic staff

---

## 1️⃣ Authentication & Access Management

### Login

- Mobile number based login
- OTP verification
- No passwords

### Roles & Permissions

- Clinic Owner (Dentist)
- Receptionist
- Role-based access control

---

## 2️⃣ Clinic Setup (One-Time)

- Clinic name
- Clinic address
- Working hours
- Default appointment duration
- GST number (optional)
- India timezone by default

---

## 3️⃣ Appointment Management (Core Module)

- Create appointment
- Edit appointment
- Cancel appointment
- Appointment statuses:
  - Booked
  - Completed
  - Cancelled
  - No-show

- Day-wise calendar view
- Assign dentist to appointment

**Success Metric:** Appointment creation in under 30 seconds

---

## 4️⃣ Patient Management

- Create patient using phone number
- Auto-detect returning patients
- Patient profile includes:
  - Name
  - Phone number
  - Age
  - Gender

- Patient list and search
- View patient visit history

---

## 5️⃣ Visit & Treatment Records

- Visit automatically linked to appointment
- Chief complaint
- Treatment notes (free-text)
- Prescription notes (text-based)
- Upload reports / X-rays (image or PDF)

> Note: Advanced dental charting is intentionally excluded from Phase 1

---

## 6️⃣ Billing & Payments

- Create invoice from visit
- Add treatment line items
- Apply discounts
- Supported payment modes:
  - Cash
  - UPI
  - Card

- Generate printable invoice (PDF)

---

## 7️⃣ Patient Communication

- WhatsApp appointment confirmation message
- WhatsApp appointment reminder (1 day before)
- Customizable message templates
- SMS fallback if WhatsApp delivery fails

**Goal:** Reduce no-shows and improve clinic efficiency

---

## 8️⃣ Staff Management

- Add dentists and clinic staff
- Enable / disable staff accounts
- Assign appointment availability
- Manage roles and permissions

---

## 9️⃣ Dashboard (Minimal & Useful)

- Today’s appointment count
- Completed appointments
- Pending appointments
- Cancelled / no-show count
- List of upcoming appointments

> No analytics or charts in Phase 1

---

## 🔟 Settings

- Edit clinic profile details
- Update working hours
- Configure appointment duration
- Manage WhatsApp message templates
- View subscription status (read-only)

---

## ❌ Features Explicitly Excluded from Phase 1

The following features are intentionally out of scope for Phase 1:

- Online patient self-booking
- Patient mobile app
- Inventory / stock management
- Dental charting & tooth diagrams
- Reports & analytics
- Insurance / TPA management
- Teleconsultation
- Multi-branch clinic support

---

## 🧩 Phase 1 User Flow

Login → Dashboard → Appointments → Patient Visit → Invoice → WhatsApp Reminder

If this flow works smoothly, Dentra Phase 1 is considered successful.

---

## 🏁 Phase 1 Success Criteria

- Minimum 5 clinics actively using Dentra daily
- At least 2 paying clinics
- Dentists confirm they no longer need Excel or registers

---

## 📌 Phase 1 Positioning Statement

**Dentra is a simple, fast, and reliable clinic management system built specifically for dental clinics to manage appointments, patients, treatments, and billing—all in one place.**

---

_End of Dentra Phase 1 MVP Document_

Login
↓
Dashboard
↓
Appointments
↓
Patient Visit
↓
Invoice
↓
WhatsApp Reminder

| Module            | Time        |
| ----------------- | ----------- |
| Auth & roles      | 3 days      |
| Appointments      | 6 days      |
| Patients          | 4 days      |
| Visits            | 5 days      |
| Billing           | 5 days      |
| WhatsApp          | 4 days      |
| Dashboard         | 3 days      |
| Settings & polish | 5 days      |
| **Total**         | **35 days** |

| Feature                               | Status   | Notes                                   |
| ------------------------------------- | -------- | --------------------------------------- |
| Overlap prevention on **drag & drop** | Not done | Need to use `revert()` callback in saga |
| Business hours enforcement            | Not done | Prevent booking outside 9 AM – 6 PM     |
| Appointment duration config           | Not done | 15 / 30 / 45 min slots                  |
| Theme persistence (dark/light mode)   | Not done | Save in localStorage or Redux           |
| Table pagination / server-side sort   | Not done | For large datasets                      |
| Export / print appointments           | Not done | Optional, could be CSV / PDF            |
| Role-based permissions                | Not done | Admin vs staff access                   |
| Notifications / reminders             | Not done | Optional, future enhancement            |
