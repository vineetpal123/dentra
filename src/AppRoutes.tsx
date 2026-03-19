import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/AppointmentModule";
import Patients from "./pages/Patients";
// import BusinessHours from "../pages/BusinessHours";
// import Settings from "../pages/Settings";
import MainLayout from "./layout/MainLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/patients" element={<Patients />} />
          {/* 
          <Route path="/business-hours" element={<BusinessHours />} />
          <Route path="/settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
