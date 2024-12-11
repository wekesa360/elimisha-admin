// src/components/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './layout/sidebar';
import { Header } from './layout/header';
import { Loading } from './layout/loading';
import { useGlobalStore } from '@/lib/store';

// Pages
import Dashboard from '@/pages/dashboard/page';
import EventsPage from '@/pages/events/page';
import DonationsPage from '@/pages/donations/page';
import ActivitiesPage from '@/pages/activities/page';
import PartnersPage from '@/pages/partners/page';
import ContactsPage from '@/pages/contacts/page';
import PostersPage from '@/pages/posters/page';
import SettingsPage from '@/pages/settings/page';

export default function AdminDashboard() {
  const [isMounted, setIsMounted] = useState(false);
  const sidebarOpen = useGlobalStore((state) => state.sidebarOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Loading />;
  }

  return (
    <div className="h-screen bg-background">
      <div className="flex h-full">
        <Sidebar />
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
          <Header />
          <main className="p-6 overflow-y-auto h-[calc(100vh-4rem)]">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/donations" element={<DonationsPage />} />
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/posters" element={<PostersPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}