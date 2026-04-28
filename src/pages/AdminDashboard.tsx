import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, PieChart, Activity, Globe } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">系统总览 (管理员)</h1>
        <p className="text-gray-500 font-medium">全局数据大盘工作区</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '累计客流', value: '12,482', icon: Globe, color: 'bg-blue-600' },
          { label: 'AI 标签准确率', value: '94.2%', icon: Activity, color: 'bg-purple-600' },
          { label: '转化意向均分', value: '78.5', icon: BarChart3, color: 'bg-green-600' },
          { label: '员工反馈覆盖', value: '98%', icon: PieChart, color: 'bg-orange-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-white mb-4`}>
              <stat.icon size={20} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm h-64 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-4 font-bold text-2xl italic">
          Data Viz
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">全局数据走势图</h3>
        <p className="text-gray-400 text-sm max-w-md">
          此处为管理员的高级图表区域，包含 ROI 分析、获客渠道追踪、以及员工绩效核算等核心指标。
        </p>
      </div>
    </div>
  );
}
