import React, { useState } from 'react';
import {
  X,
  Search,
  ChevronRight,
  ChevronDown,
  Headphones,
  Phone,
  Mail,
} from 'lucide-react';
import { branding } from '../../../lib/branding.js';

interface HelpSupportDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    id: '1',
    question: 'How do I create a new order?',
    answer: 'You can create a manual order by clicking "Create Order" from Quick Actions or from the Orders Management screen.',
  },
  {
    id: '2',
    question: 'How can I manage my products?',
    answer: 'Navigate to "Products / Catalog" from the sidebar. You can add individual SKUs or use "Bulk Upload" to import multiple products using a CSV sheet.',
  },
  {
    id: '3',
    question: 'How do I update stock?',
    answer: 'Go to "Inventory" or click "Adjust Stock" on your dashboard to modify real-time stock levels for any product variant.',
  },
  {
    id: '4',
    question: 'How do I generate an invoice?',
    answer: 'Click "Create New Bill" from the dashboard or "Billing & Invoicing" to generate Tax Invoices, Quotations, or Credit Notes with GST calculations.',
  },
  {
    id: '5',
    question: 'How do payouts work?',
    answer: 'Payouts are calculated from completed orders and settled directly to your registered bank account every Tuesday.',
  },
  {
    id: '6',
    question: 'How can I track my orders?',
    answer: 'Click "Orders" in the sidebar to see real-time statuses (Pending, Confirmed, Packed, Shipped, Delivered) and verify delivery OTPs.',
  },
  {
    id: '7',
    question: 'What is the Returns & Refund policy?',
    answer: 'Customers can initiate returns within 7 days of delivery. You can review and approve return requests under "Returns & Refunds".',
  },
  {
    id: '8',
    question: 'How do I add staff members?',
    answer: 'Open "Settings" > "Staff & Permissions" to invite team members with restricted role-based access.',
  },
  {
    id: '9',
    question: `How can I contact ${branding.appName} support?`,
    answer: `Reach our merchant support team 24/7 via phone at 1800-123-4567 or email at ${branding.supportEmail}.`,
  },
];

export const HelpSupportDrawer: React.FC<HelpSupportDrawerProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredFaqs = faqItems.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Slide-out Panel */}
      <div className="relative w-full max-w-md bg-white text-slate-800 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Help & Support</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Greeting */}
          <div>
            <h3 className="text-sm font-bold text-slate-900">Hi! How can we help you?</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Find quick answers to common questions below.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help topics..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          {/* FAQ Accordion List */}
          <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div key={faq.id} className="bg-white">
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    className="w-full px-3.5 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-xs font-semibold text-slate-800">{faq.question}</span>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="px-3.5 pb-3 text-xs text-slate-600 bg-slate-50/60 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still need help? Card */}
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-center space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900">Still need help?</h4>
            <p className="text-[11px] text-slate-600">Our support team is here for you.</p>
            <button
              type="button"
              onClick={() => alert(`Contacting ${branding.appName} support...`)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Headphones className="w-4 h-4" />
              <span>Contact Support</span>
            </button>
            <div className="text-[11px] text-slate-500 space-y-0.5 pt-1">
              <p className="flex items-center justify-center gap-1.5">
                <Phone className="w-3 h-3 text-slate-400" />
                <span>Call us: 1800-123-4567</span>
              </p>
              <p className="flex items-center justify-center gap-1.5">
                <Mail className="w-3 h-3 text-slate-400" />
                <span>Email: {branding.supportEmail}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
