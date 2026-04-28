import React from 'react';
import { 
  BarChart3, 
  Users, 
  Settings, 
  FileText, 
  LayoutDashboard, 
  ClipboardCheck, 
  LogOut,
  Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  const menuItems = isAdmin ? [
    { id: 'dashboard', label: '主要仪表盘', icon: LayoutDashboard },
    { id: 'customers', label: '客户管理', icon: Users },
    { id: 'articles', label: '文章管理', icon: FileText },
    { id: 'models', label: '模型配置', icon: BarChart3 },
    { id: 'settings', label: '系统设置', icon: Settings },
  ] : [
    { id: 'staff_customers', label: '客户管理', icon: Users },
    { id: 'staff_review', label: '评分反馈', icon: ClipboardCheck },
  ];

  return (
    <div className="w-64 h-full bg-[#1a1c1e] text-gray-400 flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#00c9b7] rounded-lg flex items-center justify-center text-white font-bold">
          E
        </div>
        <span className="text-white font-bold text-lg tracking-wider">AI ER MEI</span>
      </div>

      <nav className="flex-1 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 transition-colors relative ${
                isActive ? 'text-white bg-white/5' : 'hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-[#00c9b7]"
                />
              )}
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
              alt="Avatar" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate">{user?.name}</p>
            <p className="text-xs truncate">{user?.role === 'admin' ? '系统管理员' : '金牌管家'}</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="flex items-center gap-2 text-sm hover:text-white transition-colors w-full"
        >
          <LogOut size={16} />
          <span>退出登录</span>
        </button>
      </div>
    </div>
  );
}
