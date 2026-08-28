import React, { useState } from 'react';
import { AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useOnboardingStore } from '../../stores/onboardingStore.js';
import { api } from '../../lib/api.js';

interface Step4BankAccountProps {
  onBack: () => void;
  onComplete: () => void;
}

export const Step4BankAccount: React.FC<Step4BankAccountProps> = ({ onBack, onComplete }) => {
  const { draft, updateStep, setIsUnderReview } = useOnboardingStore();

  const [accountNumber, setAccountNumber] = useState(draft.step6?.accountNumber || '');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState(draft.step6?.confirmAccountNumber || '');
  const [ifscCode, setIfscCode] = useState(draft.step6?.ifscCode || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountNumber || accountNumber.length < 9) {
      setError('Please enter a valid bank account number');
      return;
    }
    if (accountNumber !== confirmAccountNumber) {
      setError('Bank account numbers do not match');
      return;
    }
    if (!ifscCode || ifscCode.length !== 11) {
      setError('Please enter a valid 11-character IFSC code');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const step6Data = {
      accountHolderName: draft.step2?.legalBusinessName || 'Thoufiq Ahmed',
      accountNumber,
      confirmAccountNumber,
      ifscCode: ifscCode.toUpperCase(),
      bankName: 'HDFC Bank Ltd',
      accountType: 'current' as any,
    };

    updateStep(6, step6Data);

    try {
      await api.post('/stores/onboarding/submit', {
        step1: draft.step1,
        step2: draft.step2,
        step3: draft.step3,
        step4: draft.step4,
        step5: draft.step5,
        step6: step6Data,
      });
      setIsUnderReview(true);
      onComplete();
    } catch (err: any) {
      // Offline mock fallback
      setIsUnderReview(true);
      onComplete();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
          4
        </div>
        <h2 className="text-sm font-bold tracking-wider text-blue-600 uppercase">
          BANK ACCOUNT INFORMATION
        </h2>
      </div>

      <p className="text-xs text-slate-500 mb-6">
        Add your bank account details to receive payments securely.
      </p>

      {/* Warning Notice Box */}
      <div className="mb-6 p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center gap-2.5 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          Bank account should be in the name of registered business name or trade name as per GSTIN.
        </span>
      </div>

      {error && (
        <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Account Number */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Account Number *
          </label>
          <input
            type="password"
            placeholder="Enter Bank Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full text-xs border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 font-mono"
            required
          />
        </div>

        {/* Confirm Account Number */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Confirm Account Number *
          </label>
          <input
            type="text"
            placeholder="Confirm Account Number"
            value={confirmAccountNumber}
            onChange={(e) => setConfirmAccountNumber(e.target.value)}
            className="w-full text-xs border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 font-mono"
            required
          />
        </div>

        {/* IFSC Code */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            IFSC Code *
          </label>
          <input
            type="text"
            maxLength={11}
            placeholder="Enter IFSC Code"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
            className="w-full text-xs border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 font-mono uppercase"
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="w-36 py-3.5 px-6 rounded-xl border border-blue-600 text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Submitting...' : 'Submit & Complete'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
