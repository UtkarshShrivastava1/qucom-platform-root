import React from 'react';
import { ShieldCheck, Calendar, Star } from 'lucide-react';

export const AnnouncementsBar: React.FC = () => {
  const announcements = [
    {
      id: '1',
      title: 'Big savings days coming soon!',
      description: 'Get your best deals ready for the sale and increase your visibility.',
      date: '18 May 2024',
      icon: ShieldCheck,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
    },
    {
      id: '2',
      title: 'New payout cycle update',
      description: 'Payouts will be processed every Tuesday.',
      date: '17 May 2024',
      icon: Calendar,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
    },
    {
      id: '3',
      title: 'Policy update',
      description: 'Please review the Returns & Refund policy updates.',
      date: '15 May 2024',
      icon: Star,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
    },
  ];

  return (
    <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
      <div className="flex items-center justify-between pb-0.5">
        <h3 className="text-xs sm:text-sm font-bold text-slate-900">Announcements</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        {announcements.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 flex items-start gap-2.5 hover:bg-slate-100/60 transition-colors"
            >
              <div className={`w-7 h-7 rounded-lg ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1.5">
                  <h4 className="text-[11px] font-bold text-slate-900 truncate leading-snug">{item.title}</h4>
                  <span className="text-[9px] text-slate-400 font-medium shrink-0 whitespace-nowrap">{item.date}</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight line-clamp-1 mt-0.5">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
