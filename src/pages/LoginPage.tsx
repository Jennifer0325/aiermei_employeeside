import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Role } from '../types';
import { motion } from 'motion/react';
import { ShieldCheck, UserCircle, ChevronDown } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [role, setRole] = useState<Role>('staff');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(role);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
      >
        <div className="p-8 pb-0 text-center">
          <div className="w-16 h-16 bg-[#00c9b7] rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-lg shadow-[#00c9b7]/30">
            E
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">爱儿美月子中心</h1>
          <p className="text-gray-500 font-medium font-sans">AI 智慧客情管理系统</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 pt-10 flex flex-col gap-5">
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">登录角色</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#00c9b7] transition-colors">
                {role === 'admin' ? <ShieldCheck size={20} /> : <UserCircle size={20} />}
              </div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full pl-10 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c9b7] focus:border-transparent transition-all appearance-none cursor-pointer font-medium text-gray-700"
              >
                <option value="staff">前端员工 (金牌管家)</option>
                <option value="admin">后台管理员 (系统管控)</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">账号</label>
            <input 
              type="text" 
              placeholder="请输入登录账号"
              defaultValue="admin123"
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c9b7] focus:border-transparent transition-all font-medium text-gray-700"
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">密码</label>
            <input 
              type="password" 
              placeholder="请输入访问密码"
              defaultValue="••••••••"
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c9b7] focus:border-transparent transition-all font-medium text-gray-700"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`mt-4 w-full bg-[#00c9b7] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#00c9b7]/30 hover:bg-[#00b2a2] transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 flex items-center justify-center gap-2`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              '进入管理系统'
            )}
          </button>
        </form>

        <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">© 2024 Ai Er Mei Technology. All rights reserved.</p>
        </div>
      </motion.div>
    </div>
  );
}
