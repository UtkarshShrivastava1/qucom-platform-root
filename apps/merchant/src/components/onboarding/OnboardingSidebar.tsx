import React from 'react';
import {
  Smartphone,
  CreditCard,
  Store,
  Landmark,
  Check,
  ShieldCheck,
  Headphones,
  Users,
  TrendingUp,
} from 'lucide-react';
import { branding } from '../../lib/branding.js';

export type OnboardingMainStep = 1 | 2 | 3 | 4;

interface OnboardingSidebarProps {
  activeMainStep: OnboardingMainStep;
  subStepIndex?: number;
  onSelectStep?: (step: OnboardingMainStep) => void;
}

export const OnboardingSidebar: React.FC<OnboardingSidebarProps> = ({
  activeMainStep,
  onSelectStep,
}) => {
  const steps = [
    {
      stepNumber: 1,
      title: '1. Mobile & E-mail Verification',
      substeps: ['Mobile Verification', 'E-mail Verification'],
      icon: Smartphone,
      description: 'Your mobile number and email address to ensure secure communication.',
      completedDescription: 'Your mobile number and email address have been verified successfully.',
    },
    {
      stepNumber: 2,
      title: '2. ID & Signature Verification',
      substeps: ['ID Verification', 'Signature Verification'],
      icon: CreditCard,
      description: 'Verify your identity to ensure a safe and trustworthy marketplace.',
    },
    {
      stepNumber: 3,
      title: '3. Create Your Store',
      substeps: ['Store Details', 'Business Information'],
      icon: Store,
      description: 'Provide your store and business details to help customers trust your brand.',
    },
    {
      stepNumber: 4,
      title: '4. Bank Account Information',
      substeps: ['Add Bank Details'],
      icon: Landmark,
      description: 'Add your bank details to receive payments securely and on time.',
    },
  ];

  return (
    <div className="bg-slate-50/70 border border-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome to {branding.appName}
          </h2>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Complete these simple steps to create your seller account and start selling on{' '}
            {branding.appName}.
          </p>
        </div>

        {/* 4 Step Blocks */}
        <div className="space-y-4">
          {steps.map((s) => {
            const isCompleted = activeMainStep > s.stepNumber;
            const isActive = activeMainStep === s.stepNumber;
            const Icon = s.icon;

            return (
              <div
                key={s.stepNumber}
                onClick={() => onSelectStep && isCompleted && onSelectStep(s.stepNumber as OnboardingMainStep)}
                className={`p-4 rounded-2xl border transition-all ${
                  isActive
                    ? 'bg-white border-blue-200 shadow-sm ring-1 ring-blue-500/10'
                    : isCompleted
                    ? 'bg-white/80 border-slate-200 cursor-pointer hover:border-slate-300'
                    : 'bg-transparent border-transparent opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-50 text-emerald-600'
                          : isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <h3
                        className={`text-xs font-bold ${
                          isActive || isCompleted ? 'text-slate-900' : 'text-slate-500'
                        }`}
                      >
                        {s.title}
                      </h3>

                      <div className="space-y-0.5 mt-1">
                        {s.substeps.map((sub, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                            {isCompleted ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                            ) : (
                              <div
                                className={`w-1.5 h-1.5 rounded-full ${
                                  isActive ? 'bg-blue-600' : 'bg-slate-300'
                                }`}
                              />
                            )}
                            <span
                              className={
                                isCompleted
                                  ? 'text-slate-700 font-medium'
                                  : isActive
                                  ? 'text-slate-900 font-semibold'
                                  : 'text-slate-400'
                              }
                            >
                              {sub}
                            </span>
                          </div>
                        ))}
                      </div>

                      <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                        {isCompleted && s.completedDescription
                          ? s.completedDescription
                          : s.description}
                      </p>
                    </div>
                  </div>

                  {/* Status Indicator on Right */}
                  {isCompleted && (
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                  {isActive && (
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                      {s.stepNumber}
                    </div>
                  )}
                  {!isActive && !isCompleted && (
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 font-bold text-xs flex items-center justify-center shrink-0">
                      {s.stepNumber}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom 4 Trust Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-slate-200/80">
        <div className="flex flex-col items-center text-center p-2">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-slate-900">Secure & Reliable</span>
          <span className="text-[10px] text-slate-500">100% Safe Platform</span>
        </div>

        <div className="flex flex-col items-center text-center p-2">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5">
            <Headphones className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-slate-900">24x7 Support</span>
          <span className="text-[10px] text-slate-500">We're here to help</span>
        </div>

        <div className="flex flex-col items-center text-center p-2">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5">
            <Users className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-slate-900">10,000+ Sellers</span>
          <span className="text-[10px] text-slate-500">Trust {branding.appName}</span>
        </div>

        <div className="flex flex-col items-center text-center p-2">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-slate-900">5X Growth</span>
          <span className="text-[10px] text-slate-500">Scale your business</span>
        </div>
      </div>
    </div>
  );
};
