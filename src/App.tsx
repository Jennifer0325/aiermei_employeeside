/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import Sidebar from './components/Sidebar';
import CustomerManagement from './pages/CustomerManagement';
import EmployeeReviewCenter from './pages/EmployeeReviewCenter';
import AdminDashboard from './pages/AdminDashboard';
import { Search, Bell, Settings as SettingsIcon } from 'lucide-react';

function DashboardLayout() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(user?.role === 'admin' ? 'dashboard' : 'staff_customers');

  // Handle role changes
  useEffect(() => {
    setActiveTab(user?.role === 'admin' ? 'dashboard' : 'staff_customers');
  }, [user?.role]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'staff_customers':
      case 'customers':
        return <CustomerManagement />;
      case 'staff_review':
        return <EmployeeReviewCenter />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-20 bg-white rounded-3xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">开发中</h2>
            <p className="text-gray-500">页面 [{activeTab}] 正在建设中...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f9fa]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between shadow-sm z-10 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="快速全局搜索..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#00c9b7]/30"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
              <SettingsIcon size={20} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-[#f8f9fa]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function MainApp() {
  const { user } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  return <DashboardLayout />;
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
