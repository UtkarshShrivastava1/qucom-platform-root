import React from 'react';
import { Check } from 'lucide-react';

interface StepProgressBarProps {
  currentStep: number;
  totalSteps?: number;
  onStepClick?: (step: number) => void;
}

const steps = [
  { step: 1, title: 'Account', desc: 'Credentials' },
  { step: 2, title: 'Legal', desc: 'GSTIN & PAN' },
  { step: 3, title: 'E-Sign', desc: 'Authorization' },
  { step: 4, title: 'Store', desc: 'Address & Pin' },
  { step: 5, title: 'Operations', desc: 'Category & Hours' },
  { step: 6, title: 'Bank', desc: 'Settlements' },
];

export const StepProgressBar: React.FC<StepProgressBarProps> = ({ currentStep, onStepClick }) => {
  return (
    <div className="w-full py-4 mb-8">
      {/* Mobile Step Indicator */}
      <div className="sm:hidden flex items-center justify-between bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">Step {currentStep} of 6</span>
          <h4 className="text-base font-semibold text-slate-100">{steps[currentStep - 1]?.title}</h4>
        </div>
        <span className="text-xs text-slate-400">{steps[currentStep - 1]?.desc}</span>
      </div>

      {/* Desktop Stepper */}
      <div className="hidden sm:grid grid-cols-6 gap-2 relative">
        {steps.map((item) => {
          const isCompleted = currentStep > item.step;
          const isCurrent = currentStep === item.step;

          return (
            <button
              key={item.step}
              type="button"
              onClick={() => onStepClick && isCompleted && onStepClick(item.step)}
              disabled={!isCompleted}
              className={`flex flex-col items-center text-center group transition-all duration-200 ${
                isCompleted ? 'cursor-pointer' : isCurrent ? 'cursor-default' : 'cursor-not-allowed opacity-50'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 mb-2 ${
                  isCompleted
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                    : isCurrent
                    ? 'bg-brand-500/20 text-brand-400 border-2 border-brand-500 shadow-lg shadow-brand-500/20'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : item.step}
              </div>
              <span className={`text-xs font-semibold ${isCurrent ? 'text-slate-100' : 'text-slate-400'}`}>
                {item.title}
              </span>
              <span className="text-[10px] text-slate-400 truncate max-w-[90px]">{item.desc}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
