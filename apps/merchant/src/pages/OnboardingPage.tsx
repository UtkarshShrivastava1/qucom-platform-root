import React from 'react';
import { useOnboardingStore } from '../stores/onboardingStore.js';
import { StepProgressBar } from '../components/onboarding/StepProgressBar.js';
import { Step1Account } from '../components/onboarding/Step1Account.js';
import { Step2Legal } from '../components/onboarding/Step2Legal.js';
import { Step3Signature } from '../components/onboarding/Step3Signature.js';
import { Step4StoreLocation } from '../components/onboarding/Step4StoreLocation.js';
import { Step5Operations } from '../components/onboarding/Step5Operations.js';
import { Step6Financials } from '../components/onboarding/Step6Financials.js';
import { ReviewWaitingRoom } from '../components/onboarding/ReviewWaitingRoom.js';
import { branding } from '../lib/branding.js';

interface OnboardingPageProps {
  onEnterDashboard: () => void;
  onGoToLogin: () => void;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({
  onEnterDashboard,
  onGoToLogin,
}) => {
  const { currentStep, setStep, isUnderReview } = useOnboardingStore();

  if (isUnderReview) {
    return (
      <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 flex items-center justify-center">
        <ReviewWaitingRoom onEnterDashboard={onEnterDashboard} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Top Header */}
      <header className="h-16 border-b border-slate-800/80 px-4 sm:px-8 flex items-center justify-between bg-slate-900/60 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-brand-500/20">
            {branding.appName.charAt(0)}
          </div>
          <div>
            <h1 className="font-bold text-sm text-slate-100">{branding.appName}</h1>
            <span className="text-[10px] text-brand-400 font-semibold uppercase tracking-wider">Merchant Partner Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-400 hidden sm:inline">Already registered?</span>
          <button
            type="button"
            onClick={onGoToLogin}
            className="text-brand-400 hover:text-brand-300 font-semibold transition-colors"
          >
            Log In
          </button>
        </div>
      </header>

      {/* Main Wizard Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto py-8 px-4 sm:px-6">
        <StepProgressBar currentStep={currentStep} onStepClick={(step) => setStep(step)} />

        <div className="transition-all duration-300">
          {currentStep === 1 && <Step1Account />}
          {currentStep === 2 && <Step2Legal />}
          {currentStep === 3 && <Step3Signature />}
          {currentStep === 4 && <Step4StoreLocation />}
          {currentStep === 5 && <Step5Operations />}
          {currentStep === 6 && <Step6Financials />}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-slate-900 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} {branding.appName}. Hyperlocal Retail Commerce Infrastructure.
      </footer>
    </div>
  );
};
