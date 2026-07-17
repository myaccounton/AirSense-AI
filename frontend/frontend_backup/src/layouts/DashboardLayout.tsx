import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

/**
 * DashboardLayout — Wraps dashboard pages with Navbar + Sidebar
 */
export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main style={{
          flex: 1,
          padding: '24px',
          overflowY: 'auto',
          minHeight: 'calc(100vh - 60px)',
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
