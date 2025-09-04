# 🩺 Clinic Master

**Clinic Master** is a web application where a doctor can manage clinic operations, including booking, patient information, inventory, and financial tracking. 🔗 [Live-Demo](https://abdullah-clinic.netlify.app)

---

📷 DEMO
![Homepage](https://res.cloudinary.com/deuxt0stn/image/upload/v1756971480/Annotation_2025-09-04_102543_lgurwh.png)

![All Appointments](https://res.cloudinary.com/deuxt0stn/image/upload/v1756971481/Annotation_2025-09-04_102617_h9uxho.png)

![Patient History](https://res.cloudinary.com/deuxt0stn/image/upload/v1756971480/Annotation_2025-09-04_103000_t0ochl.png)

![medical prescriptions](https://res.cloudinary.com/deuxt0stn/image/upload/v1756971480/Annotation_2025-09-04_103237_rwfnnx.png)

---

## ✨ Features

- Full CRUD operations for managing patient bookings.
- track every medical visit, store patient history, and print medical prescriptions.
- Generate reports for financial insights.
- Track clinic revenues and expenses for accurate financial management.
- Manage clinic inventory and supplies efficiently.
- Manage incoming and past appointments with a clear overview.

- Clean, modern, and user-friendly interface

---

## 🛠️ Tech Stack

- **React**
- **Supabase (Back-End)**
- **React Router**
- **CSS Modules**
- **Conext API**
- **React Query**
- **react-hot-toast**
- **react-error-boundary**
- **react-hook-form**

---

## Setup Instructions

**Prerequisites**

- Node.js (v16 or higher)
- npm

**1.Clone the Repository**

```bash
git clone https://github.com/AbdullaNassar/Smart-Clinic.git

cd Smart-Clinic
```

**2. Install Dependencies**

```bash
npm install
```

**3. Run the Development Servers**

```bash
npm run dev
```

---

## 📁 Project Structure

```
└── 📁src
    └── 📁features
        └── 📁authentication
            └── 📁components
                ├── LoginForm.jsx
                ├── Logout.jsx
                ├── UserAvatar.jsx
            └── 📁hooks
                ├── useLogin.js
                ├── useLogout.jsx
                ├── useUser.js
            └── 📁pages
                ├── Login.jsx
            └── 📁services
                ├── apiAuth.js
        └── 📁Booking
            └── 📁components
                ├── NoBookingMessage.jsx
                ├── NoBookingMessage.module.css
            └── 📁hooks
                ├── useBookingInfo.js
                ├── useBookings.js
                ├── useCreateBooking.js
                ├── useDeleteBooking.js
                ├── useTodayActivity.js
                ├── useUpdateBooking.js
            └── 📁pages
                ├── AllBookings.jsx
                ├── AllBookings.module.css
                ├── NewBooking.jsx
                ├── NewBooking.module.css
                ├── TodayBooking.jsx
                ├── TodayBooking.module.css
                ├── UpdateBooking.jsx
                ├── UpdateBooking.module.css
            └── 📁services
                ├── apiBooking.js
        └── 📁Dashboard
            └── 📁components
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
            └── 📁hooks
                ├── useRecentBookings.js
            └── 📁pages
                ├── Main.jsx
                ├── Main.module.css
        └── 📁ExpensesRevenues
            └── 📁hooks
                ├── useAddClinicExpense.js
                ├── useAddExpense.js
                ├── useAddRevenue.js
                ├── useExpenses.js
                ├── useMyExpenses.js
                ├── useRevenues.js
            └── 📁pages
                ├── NewExpense.jsx
                ├── NewExpense.module.css
                ├── ShowExpenses.jsx
                ├── ShowExpenses.module.css
                ├── ShowRevenues.jsx
                ├── ShowRevenues.module.css
            └── 📁services
                ├── apiExpenses.js
                ├── apiMyExpenses.js
                ├── apiMyRevenues.js
                ├── apiRevenues.js
        └── 📁Kashf
            └── 📁components
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
            └── 📁hooks
                ├── useAddDisease.js
                ├── useAddFood.js
                ├── useAddMedicalTest.js
                ├── useAddMedicine.js
                ├── useAddSymptom.js
                ├── useAddXray.js
                ├── useDiseases.js
                ├── useFoods.js
                ├── useMedicalTests.js
                ├── useMedicines.js
                ├── useSymptoms.js
                ├── useXrays.js
            └── 📁services
                ├── apiDiseases.js
                ├── apiFood.js
                ├── apiMedicalTest.js
                ├── apiMedicine.js
                ├── apiSymptoms.js
                ├── apiXrays.js
        └── 📁patient
            └── 📁context
                ├── PatientContext.jsx
            └── 📁hooks
                ├── useAddPatient.js
                ├── usePatientInfo.js
                ├── usePatients.js
            └── 📁pages
                ├── NewPatient.jsx
                ├── NewPatient.module.css
                ├── PatientDetails.jsx
                ├── PatientDetails.module.css
                ├── PatientHistory.jsx
                ├── PatientHistory.module.css
            └── 📁services
                ├── apiPatients.js
        └── 📁Reservation
            └── 📁hooks
                ├── useCreateReservation.js
                ├── useReservetions.js
            └── 📁pages
                ├── AllReservations.jsx
                ├── AllReservations.module.css
                ├── NewReservation.jsx
                ├── NewReservation.module.css
                ├── ShowReservation.jsx
                ├── ShowReservation.module.css
            └── 📁services
                ├── apiReservation.js
        └── 📁store
            └── 📁pages
                ├── Store.jsx
                ├── Store.module.css
    └── 📁shared
        └── 📁components
            └── 📁layout
                ├── AppLayout.jsx
                ├── AppLayout.module.css
                ├── Header.jsx
                ├── Header.module.css
                ├── Sidebar.jsx
                ├── Sidebar.module.css
            └── 📁ui
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
                ├── NotFound.jsx
                ├── NotFound.module.css
                ├── Pagination.jsx
                ├── Pagnition.jsx
                ├── ProtectedRoute.jsx
                ├── Row.jsx
                ├── Select.jsx
                ├── Slect.jsx
                ├── SortBy.jsx
                ├── Spinner.jsx
                ├── SpinnerMini.jsx
                ├── Table.jsx
                ├── TableOperations.jsx
                ├── Tag.jsx
                ├── Textarea.jsx
        └── 📁services
            ├── supabase.js
        └── 📁styles
            ├── GlobalStyles.js
        └── 📁utils
            ├── helper.js
            ├── theme.js
    ├── App.jsx
    ├── index.css
    └── main.jsx
```
