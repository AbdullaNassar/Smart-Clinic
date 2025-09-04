# 🩺 Clinic Master

**Clinic Master** is a web application where a doctor can manage clinic operations, including booking, patient information, inventory, and financial tracking.

---

## [🚀Live Demo](https://abdullah-clinic.netlify.app/)

## ✨ Features

- Add new Patient bookings
- Track historical bookings for each patient.
- Manage incoming and past appointments with a clear overview.
- Track revenues and expenses.
- Generate reports for financial insights.
- Monitor and manage clinic inventory to ensure adequate supplies.
- integrate with WhatsApp to make real-time chat between users and the doctor
- Fully responsive design
- State management using **Context API** & **React Query**
- Clean, modern, and user-friendly interface

---

## 🛠️ Tech Stack

- **React**
- **Supabase (Back-End)**
- **React Router**
- **CSS Modules**
- **Conext API**
- \*_React Query_
- **react-hot-toast**
- **react-error-boundary**
- **react-hook-form**

---

## 📁 Project Structure

```bash
└── 📁src
    └── 📁contexts
        ├── PatientContext.jsx
    └── 📁features
        └── 📁authentication
            ├── LoginForm.jsx
            ├── Logout.jsx
            ├── SignupForm.jsx
            ├── UpdatePasswordForm.jsx
            ├── UpdateUserDataForm.jsx
            ├── useLogin.js
            ├── useLogout.jsx
            ├── UserAvatar.jsx
            ├── useSignup.js
            ├── useUser.js
        └── 📁Booking
            ├── AllBookings.jsx
            ├── AllBookings.module.css
            ├── Booking.jsx
            ├── Booking.module.css
            ├── NewBooking.jsx
            ├── NewBooking.module.css
            ├── TodayBooking.jsx
            ├── TodayBooking.module.css
            ├── UpdateBooking.jsx
            ├── UpdateBooking.module.css
            ├── useTodayActivity.js
        └── 📁Dashboard
            ├── DashboardBox.jsx
            ├── DashboardFilter.jsx
            ├── DashboardLayout.jsx
            ├── DuartionChart.jsx
            ├── SalesChart.jsx
            ├── Stat.jsx
            ├── Stats.jsx
            ├── Stats.module.css
            ├── TodayActivity.jsx
            ├── TodayItem.jsx
            ├── useRecentBookings.jsx
        └── 📁ExpensesRevenues
            ├── ExpensesRevenues.jsx
            ├── ExpensesRevenues.module.css
            ├── NewExpense.jsx
            ├── NewExpense.module.css
            ├── NewRevenue.jsx
            ├── ShowExpenses.jsx
            ├── ShowExpenses.module.css
            ├── ShowRevenues.jsx
            ├── ShowRevenues.module.css
        └── 📁Kashf
            └── 📁displayReservation
                ├── ShowReservation.jsx
                ├── ShowReservation.module.css
            └── 📁newReservFeatures
                ├── Diagnosis.jsx
                ├── Diagnosis.module.css
                ├── Food.jsx
                ├── Food.module.css
                ├── MedicalTest.module.css
                ├── MedicalTests.jsx
                ├── OldDiasies.jsx
                ├── OldDiasies.module.css
                ├── OpposingMedications.jsx
                ├── OpposingMedications.module.css
                ├── PatientInfo.jsx
                ├── PatientInfo.module.css
                ├── Printer.jsx
                ├── Printer.module.css
                ├── PrinterSetting.jsx
                ├── PrinterSetting.module.css
                ├── QickCheck.module.css
                ├── QuickCheck.jsx
                ├── Rosheta.jsx
                ├── Rosheta.module.css
                ├── Symptoms.jsx
                ├── Symptoms.module.css
                ├── Xrays.jsx
                ├── Xrays.module.css
            ├── AllReservations.jsx
            ├── AllReservations.module.css
            ├── NewReservation.jsx
            ├── NewReservation.module.css
            ├── Reservation.jsx
        └── 📁patient
            ├── PatientDetails.jsx
            ├── PatientDetails.module.css
            ├── Patients.jsx
            ├── Patients.module.css
        └── 📁Reservation
            ├── Reservation.jsx
        └── 📁seetings
            ├── Settings.jsx
        └── 📁store
            ├── Store.jsx
            ├── Store.module.css
    └── 📁pages
        ├── DailyInfo.module.css
        ├── Login.jsx
        ├── Main.jsx
        ├── Main.module.css
        ├── NewPatient.jsx
        ├── NewPatient.module.css
        ├── PatientHistory.jsx
        ├── PatientHistory.module.css
        ├── Reply.jsx
    └── 📁services
        ├── apiAuth.js
        ├── apiBooking.js
        ├── apiDiseases.js
        ├── apiExpenses.js
        ├── apiFood.js
        ├── apiMedicalTest.js
        ├── apiMedicine.js
        ├── apiMyExpenses.js
        ├── apiMyRevenues.js
        ├── apiPatients.js
        ├── apiReservation.js
        ├── apiRevenues.js
        ├── apiSymptoms.js
        ├── apiXrays.js
        ├── supabase.js
    └── 📁styles
        ├── GlobalStyles.js
    └── 📁UI
        ├── AppLayout.jsx
        ├── AppLayout.module.css
        ├── Button.jsx
        ├── ButtonGroup.jsx
        ├── ButtonIcon.jsx
        ├── ButtonText.jsx
        ├── Checkbox.jsx
        ├── CnfirmDelete.jsx
        ├── ConfirmDelete.jsx
        ├── ConfirmDelete.module.css
        ├── DataItem.jsx
        ├── Empty.jsx
        ├── ErrorFallback.jsx
        ├── FileInput.jsx
        ├── Filter.jsx
        ├── Flag.jsx
        ├── Footer.jsx
        ├── Footer.module.css
        ├── Form.jsx
        ├── FormRow.jsx
        ├── Header.jsx
        ├── Header.module.css
        ├── HeaderMenu.jsx
        ├── Heading.jsx
        ├── Input.jsx
        ├── Logo.jsx
        ├── LogoHeader.jsx
        ├── LogoHeader.module.css
        ├── MainNav.jsx
        ├── MainNav.module.css
        ├── Menus.jsx
        ├── Modal-v1.jsx
        ├── Modal.jsx
        ├── Modal.module.css
        ├── ModalJonas.jsx
        ├── MyFilter.jsx
        ├── MyHeading.jsx
        ├── MyHeading.module.css
        ├── Pagination.jsx
        ├── Pagnition.jsx
        ├── ProtectedRoute.jsx
        ├── Row.jsx
        ├── Select.jsx
        ├── Sidebar.jsx
        ├── Sidebar.module.css
        ├── Slect.jsx
        ├── SortBy.jsx
        ├── Spinner.jsx
        ├── SpinnerMini.jsx
        ├── Table.jsx
        ├── TableOperations.jsx
        ├── Tag.jsx
        ├── Temo.jsx
        ├── Textarea.jsx
    └── 📁utils
        ├── helper.js
        ├── theme.js
        ├── utilities.css
    ├── App.jsx
    ├── index.css
    ├── index.js
    ├── main.jsx
```
