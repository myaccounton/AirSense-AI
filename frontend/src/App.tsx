import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from './pages/Landing';
import SelectCity from './pages/SelectCity';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';
import DashboardLayout from './layouts/DashboardLayout';

/**
 * App — Root component with routing configuration including select city flows
 */
export default function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Landing page — no sidebar/navbar */}
          <Route path="/" element={<Landing />} />

          {/* Select City Page */}
          <Route path="/select-city" element={<SelectCity />} />

          {/* Dashboard routes — wrapped in layout with sidebar */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/:city" element={<Dashboard />} />
            <Route path="/analysis/:city" element={<Analysis />} />
            <Route path="/reports/:city" element={<Reports />} />
            <Route path="/settings/:city" element={<Dashboard />} />
          </Route>

          {/* Fallback route to select-city */}
          <Route path="/dashboard" element={<Navigate to="/select-city" replace />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}
