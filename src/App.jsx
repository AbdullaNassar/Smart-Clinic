import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { PatientProvider } from "./features/patient/context/PatientContext";
import GlobalStyles from "./shared/styles/GlobalStyles";
import ProtectedRoute from "./shared/components/ui/ProtectedRoute";
import Spinner from "./shared/components/ui/Spinner";

const Main = lazy(() => import("./features/Dashboard/pages/Main"));
const NewPatient = lazy(() => import("./features/patient/pages/NewPatient"));
const PatientHostory = lazy(() =>
  import("./features/patient/pages/PatientHistory")
);
const NewBooking = lazy(() => import("./features/Booking/pages/NewBooking"));
const AllBookings = lazy(() => import("./features/Booking/pages/NewBooking"));
const AllReservations = lazy(() =>
  import("./features/Reservation/pages/AllReservations")
);
const NewReservation = lazy(() =>
  import("./features/Reservation/pages/NewReservation")
);
const TodayBooking = lazy(() =>
  import("./features/Booking/pages/TodayBooking")
);
const PatientDetails = lazy(() =>
  import("./features/patient/pages/PatientDetails")
);
const ShowReservation = lazy(() =>
  import("./features/Reservation/pages/ShowReservation")
);
const NewExpense = lazy(() =>
  import("./features/ExpensesRevenues/pages/NewExpense")
);
const ShowExpenses = lazy(() =>
  import("./features/ExpensesRevenues/pages/ShowExpenses")
);
const ShowRevenues = lazy(() =>
  import("./features/ExpensesRevenues/pages/ShowRevenues")
);
const Login = lazy(() => import("./features/authentication/pages/Login"));
const AppLayout = lazy(() => import("./shared/components/layout/AppLayout"));
const UpdateBooking = lazy(() =>
  import("./features/Booking/pages/UpdateBooking")
);
const Store = lazy(() => import("./features/store/pages/Store"));
const NotFound = lazy(() => import("./shared/components/ui/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <PatientProvider>
        <GlobalStyles />
        <BrowserRouter>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/" element={<Main />} />
                <Route path="/newPatient" element={<NewPatient />} />
                <Route path="/patientHistory" element={<PatientHostory />} />
                <Route path="/todayBooking" element={<TodayBooking />} />
                <Route path="/allBookings" element={<AllBookings />} />
                <Route path="/newBooking" element={<NewBooking />} />
                <Route path="/updateBooking/:id" element={<UpdateBooking />} />
                <Route path="/newReservations" element={<NewReservation />} />
                <Route path="/allReservations" element={<AllReservations />} />
                <Route
                  path="/ReservationDetails"
                  element={<ShowReservation />}
                />
                <Route
                  path="/patientDetails/:id"
                  element={<PatientDetails />}
                />
                <Route path="/newExpense" element={<NewExpense />} />
                <Route path="/expenses" element={<ShowExpenses />} />
                <Route path="/revenues" element={<ShowRevenues />} />
                <Route path="/store" element={<Store />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </PatientProvider>
    </QueryClientProvider>
  );
}

export default App;
