import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Plus, 
  X, 
  CheckCircle2, 
  Sparkles, 
  UserPlus, 
  Info,
  ChevronRight,
  History
} from 'lucide-react';
import { Customer } from '../types';

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: '101房间刘宝妈',
    phone: '138****0001',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    aiSummary: '用户咨询产后身材恢复、月子餐及通乳服务。表现出中等程度的消费倾向，对服务细节较为敏感，特别是产后康复项目的专业度。建议重点推介产后瑜伽和乳腺疏通项目。',
    aiTags: ['产后恢复', '通乳需求', '高客单潜在', '在意品牌'],
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
    aiSummary: '二胎家庭，育儿经验丰富。对大房型有明确偏好，关注环境隐私和安保。对价格敏感度较低，主要对比金牌月嫂的排期情况。',
    aiTags: ['二胎家庭', '注重隐私', '高净值', '直接转化型'],
    staffTags: ['大房型偏好'],
    ratings: { intent: 90, power: 95, urgency: 85 },
    lastFollowUp: '2024-04-27 09:15',
    status: '待签约'
  }
];

export default function EmployeeReviewCenter() {
  const [selectedCustomerId, setSelectedCustomerId] = useState(mockCustomers[0].id);
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCustomer = mockCustomers.find(c => c.id === selectedCustomerId)!;
  const [currentAiTags, setCurrentAiTags] = useState(selectedCustomer.aiTags);
  const [currentStaffTags, setCurrentStaffTags] = useState(selectedCustomer.staffTags);
  const [ratings, setRatings] = useState(selectedCustomer.ratings);

  const handleRemoveAiTag = (tag: string) => {
    setCurrentAiTags(currentAiTags.filter(t => t !== tag));
  };

  const handleAddStaffTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag && !currentStaffTags.includes(newTag)) {
      setCurrentStaffTags([...currentStaffTags, newTag]);
      setNewTag('');
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('跟进反馈已提交成功！');
    }, 1000);
  };

  return (
    <div className="h-full flex gap-6 overflow-hidden">
      {/* Selection Column */}
      <div className="w-80 flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="搜索待核实客户..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00c9b7] focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {mockCustomers.map(customer => (
            <button
              key={customer.id}
              onClick={() => setSelectedCustomerId(customer.id)}
              className={`w-full p-3 rounded-xl mb-1 text-left flex items-center gap-3 transition-all ${
                selectedCustomerId === customer.id 
                  ? 'bg-[#00c9b7]/10 border border-[#00c9b7]/20 shadow-sm' 
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              <img src={customer.avatar} className="w-10 h-10 rounded-full" alt="" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="font-bold text-gray-900 truncate">{customer.name}</span>
                  <span className="text-[10px] text-gray-400">{customer.lastFollowUp.split(' ')[0]}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{customer.phone}</p>
              </div>
              <ChevronRight className={`text-gray-300 transition-transform ${selectedCustomerId === customer.id ? 'translate-x-1 text-[#00c9b7]' : ''}`} size={16} />
            </button>
          ))}
        </div>
      </div>

      {/* Main Control Panel */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        {/* Customer Profile Header */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div className="flex gap-4">
              <img src={selectedCustomer.avatar} className="w-16 h-16 rounded-2xl shadow-md" alt="" />
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCustomer.name}</h2>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {selectedCustomer.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><History size={14} /> 最后更新: {selectedCustomer.lastFollowUp}</span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
              <UserPlus size={16} /> 完善资料
            </button>
          </div>

          <div className="bg-[#f0fff4] border border-green-100 p-4 rounded-xl flex gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white shrink-0 mt-1 shadow-sm">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-1">AI 洞察摘要</p>
              <p className="text-sm text-green-900 leading-relaxed font-medium">
                {selectedCustomer.aiSummary}
              </p>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Tag Correction Section */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Info size={18} className="text-[#00c9b7]" /> 标签纠偏与完善
            </h3>
            
            <div className="flex-1 space-y-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">AI 提取标签 (点击删除无效项)</p>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {currentAiTags.map(tag => (
                      <motion.button
                        layout
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        key={tag}
                        onClick={() => handleRemoveAiTag(tag)}
                        className="px-3 py-1.5 bg-gray-100 group hover:bg-red-50 hover:text-red-600 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5"
                      >
                        {tag}
                        <X size={14} className="text-gray-400 group-hover:text-red-400" />
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">补充线下调研特征</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentStaffTags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-[#00c9b7]/10 text-[#00c9b7] rounded-lg text-sm font-bold flex items-center gap-1.5 border border-[#00c9b7]/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <form onSubmit={handleAddStaffTag} className="flex gap-2">
                  <input 
                    type="text" 
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="输入新特征标签 (如: 家属陪同、停车需求)" 
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c9b7] focus:border-transparent transition-all font-medium text-sm"
                  />
                  <button type="submit" className="p-2.5 bg-[#00c9b7] text-white rounded-xl shadow-md hover:bg-[#00b2a2] transition-all">
                    <Plus size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Scoring Section */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#00c9b7]" /> 多维度意向分校准
            </h3>
            
            <div className="flex-1 space-y-8 py-2">
              <ScoringSlider 
                label="转化意向度" 
                value={ratings.intent} 
                onChange={(v) => setRatings({...ratings, intent: v})} 
                color="bg-[#00c9b7]"
              />
              <ScoringSlider 
                label="消费能力" 
                value={ratings.power} 
                onChange={(v) => setRatings({...ratings, power: v})} 
                color="bg-amber-500"
              />
              <ScoringSlider 
                label="孕产急迫度" 
                value={ratings.urgency} 
                onChange={(v) => setRatings({...ratings, urgency: v})} 
                color="bg-rose-500"
              />
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">建议综合等级</p>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-black text-gray-900 tracking-tighter">
                    {Math.round((ratings.intent + ratings.power + ratings.urgency) / 3) > 80 ? 'A+' : 'B'}
                  </span>
                  <span className="text-xs font-bold text-gray-400">综合判定</span>
                </div>
              </div>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-4 bg-[#00c9b7] text-white rounded-xl font-bold shadow-xl shadow-[#00c9b7]/30 hover:bg-[#00b2a2] transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? '正在同步数据...' : '确认同步到总部'}
                {!isSubmitting && <Sparkles size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoringSlider({ label, value, onChange, color }: { label: string, value: number, onChange: (v: number) => void, color: string }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="font-bold text-gray-700">{label}</label>
        <span className={`px-2 py-0.5 rounded-md text-white font-black text-sm tracking-tighter ${color}`}>
          {value}%
        </span>
      </div>
      <div className="relative h-2 bg-gray-100 rounded-full">
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={value} 
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <motion.div 
          className={`absolute left-0 top-0 bottom-0 rounded-full ${color}`}
          initial={false}
          animate={{ width: `${value}%` }}
        />
        <motion.div 
          className="absolute w-5 h-5 bg-white border-2 border-gray-900 rounded-full -top-1.5 shadow-md z-0"
          initial={false}
          animate={{ left: `calc(${value}% - 10px)` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-gray-300 font-bold uppercase tracking-widest">
        <span>低下</span>
        <span>中等</span>
        <span>极高</span>
      </div>
    </div>
  );
}
