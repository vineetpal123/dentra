import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Appointments from './modules/appointments/pages';
import Patients from './modules/patients/pages';
import BusinessHours from './pages/BusinessHours';
import Settings from './pages/Settings';
import MainLayout from './layout/MainLayout';
import { ProtectedRoute, UnprotectedRoute } from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Unprotected Routes - accessible only when not authenticated */}
        {/* Add your login page here when ready */}
        <Route path="/login" element={<UnprotectedRoute element={<LoginPage />} />} />

        {/* Protected Routes - requires authentication */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/appointments" element={<ProtectedRoute element={<Appointments />} />} />
          <Route path="/patients" element={<ProtectedRoute element={<Patients />} />} />
          <Route path="/business-hours" element={<ProtectedRoute element={<BusinessHours />} />} />
          <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
