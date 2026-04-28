import React from 'react';
import { motion } from 'motion/react';
import { Search, Filter, MoreHorizontal, MessageSquare, Phone, MapPin, Tag as TagIcon, ChevronRight } from 'lucide-react';
import { Customer } from '../types';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: '101房间刘宝妈',
    phone: '138****0001',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    aiSummary: '用户咨询产后身材恢复、月子餐及通乳服务。',
    aiTags: ['产后恢复', '通乳需求', '高客单潜在'],
    staffTags: ['家属存疑', '需要停车位'],
    ratings: { intent: 75, power: 80, urgency: 65 },
    lastFollowUp: '2024-04-26 14:22',
    status: '跟进中'
  },
  {
    id: '2',
    name: '102房间张宝妈',
    phone: '139****1122',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    aiSummary: '二胎家庭，育儿经验丰富。对大房型有明确偏好。',
    aiTags: ['二胎家庭', '注重隐私', '高净值'],
    staffTags: ['大房型偏好'],
    ratings: { intent: 90, power: 95, urgency: 85 },
    lastFollowUp: '2024-04-27 09:15',
    status: '待签约'
  },
  {
    id: '3',
    name: '305房赵女士',
    phone: '185****9988',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
    aiSummary: '关注月子餐营养均衡，对食材来源非常在意的严谨客户。',
    aiTags: ['营养专家型', '高端月子餐', '品质控'],
    staffTags: ['指定厨师'],
    ratings: { intent: 60, power: 70, urgency: 40 },
    lastFollowUp: '2024-04-28 08:30',
    status: '初步接触'
  },
  {
    id: '4',
    name: '208房陈宝妈',
    phone: '137****4455',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Buddy',
    aiSummary: '主要是家属在做决定，本人性格温和，关注母婴护理的细节。',
    aiTags: ['家属决策型', '注重细节', '长周期'],
    staffTags: ['婆婆意见多'],
    ratings: { intent: 45, power: 65, urgency: 30 },
    lastFollowUp: '2024-04-25 18:10',
    status: '流转中'
  }
];

export default function CustomerManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter">客户管理</h1>
          <p className="text-gray-500 font-medium">当前管理系统内共有 {mockCustomers.length} 位待转化的潜在客户</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索客户姓名/手机号..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00c9b7] focus:border-transparent min-w-[280px]"
            />
          </div>
          <button className="p-2.5 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 text-gray-500 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
        {mockCustomers.map((customer, i) => (
          <CustomerCard key={customer.id} customer={customer} index={i} />
        ))}
      </div>
    </div>
  );
}

function CustomerCard({ customer, index }: { customer: Customer, index: number }) {
  const avgScore = Math.round((customer.ratings.intent + customer.ratings.power + customer.ratings.urgency) / 3);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all group"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3">
            <div className="relative">
              <img src={customer.avatar} className="w-14 h-14 rounded-2xl shadow-sm border border-gray-100" alt="" />
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white ${
                avgScore > 80 ? 'bg-rose-500' : 'bg-[#00c9b7]'
              }`}>
                {avgScore > 80 ? 'A' : 'B'}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 group-hover:text-[#00c9b7] transition-colors">{customer.name}</h3>
              <p className="text-xs text-gray-400 font-mono mt-0.5">{customer.phone}</p>
              <div className="flex items-center gap-1 mt-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                  customer.status === '待签约' ? 'bg-rose-100 text-rose-600' : 
                  customer.status === '跟进中' ? 'bg-[#00c9b7]/10 text-[#00c9b7]' : 'bg-gray-100 text-gray-500'
                }`}>
                  {customer.status}
                </span>
              </div>
            </div>
          </div>
          <button className="text-gray-300 hover:text-gray-600">
            <MoreHorizontal size={20} />
          </button>
        </div>

        <div className="space-y-3 mb-5">
          <div className="flex flex-wrap gap-1.5">
            {customer.aiTags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-1 bg-gray-50 text-gray-500 rounded-md text-[10px] font-bold border border-gray-100">
                {tag}
              </span>
            ))}
            {customer.staffTags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-[#00c9b7]/5 text-[#00c9b7] rounded-md text-[10px] font-bold border border-[#00c9b7]/10">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 italic">
            "{customer.aiSummary}"
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-50">
          <ScoreMini label="意向" score={customer.ratings.intent} color="text-[#00c9b7]" />
          <ScoreMini label="消费" score={customer.ratings.power} color="text-amber-500" />
          <ScoreMini label="急迫" score={customer.ratings.urgency} color="text-rose-500" />
        </div>
      </div>

      <div className="flex border-t border-gray-100">
        <button className="flex-1 py-3 text-[11px] font-bold text-gray-500 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5 border-r border-gray-100">
          <MessageSquare size={14} /> 沟通记录
        </button>
        <button className="flex-1 py-3 text-[11px] font-bold text-[#00c9b7] hover:bg-[#00c9b7]/5 transition-colors flex items-center justify-center gap-1.5">
          立即核复 <ChevronRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}

function ScoreMini({ label, score, color }: { label: string, score: number, color: string }) {
  return (
    <div className="text-center">
      <p className="text-[10px] font-bold text-gray-400 mb-0.5">{label}</p>
      <p className={`text-sm font-black ${color}`}>{score}%</p>
    </div>
  );
}
