import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';
import DashboardLayout from './layouts/DashboardLayout';

/**
 * App — Root component with routing configuration
 */
export default function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Landing page — no sidebar/navbar */}
          <Route path="/" element={<Landing />} />

          {/* Dashboard routes — wrapped in layout with sidebar */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Dashboard />} /> {/* Dummy — reuses Dashboard */}
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}
