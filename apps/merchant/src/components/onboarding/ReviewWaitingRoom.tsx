import React from 'react';
import { Card } from '../ui/Card.js';
import { Button } from '../ui/Button.js';
import { Badge } from '../ui/Badge.js';
import { Clock, ShieldCheck, Mail, Store, CheckCircle, ArrowRight } from 'lucide-react';
import { useOnboardingStore } from '../../stores/onboardingStore.js';

interface ReviewWaitingRoomProps {
  onEnterDashboard: () => void;
}

export const ReviewWaitingRoom: React.FC<ReviewWaitingRoomProps> = ({ onEnterDashboard }) => {
  const { draft, resetOnboarding } = useOnboardingStore();

  const storeName = draft.step4?.storeDisplayName || 'Your Retail Store';
  const merchantEmail = draft.step1?.email || 'merchant@example.com';
  const gstin = draft.step2?.gstin || '29ABCDE1234F1Z5';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="text-center p-8 border-brand-500/30 shadow-2xl shadow-brand-950/40">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Clock className="w-8 h-8" />
        </div>

        <Badge variant="warning" size="md" className="mb-3">
          Verification in Progress
        </Badge>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
          Store Profile Under Super Admin Review
        </h1>

        <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed mb-6">
          Thank you for completing the 6-step registration for <strong className="text-slate-200">{storeName}</strong>.
          Our team is reviewing your GSTIN and business credentials. You will receive an automated activation confirmation at{' '}
          <span className="text-brand-400 font-medium">{merchantEmail}</span>.
        </p>

        {/* Approval Flow Timeline */}
        <div className="border border-slate-800 rounded-xl p-5 bg-slate-950/60 text-left mb-6 space-y-4">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Verification & Activation Workflow
          </span>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-semibold text-slate-200">6-Step Registration Completed</h5>
              <p className="text-[11px] text-slate-400">Account, Legal PAN/GSTIN, E-sign, Address & Bank mapped</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 animate-spin" />
            <div>
              <h5 className="text-xs font-semibold text-slate-200">Super Admin Queue Review</h5>
              <p className="text-[11px] text-slate-400">Verifying GST certificate & geographical store coordinates (Avg: 2–4 hours)</p>
            </div>
          </div>

          <div className="flex items-start gap-3 opacity-60">
            <Mail className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-semibold text-slate-300">Credential & Approval Dispatch</h5>
              <p className="text-[11px] text-slate-400">Automated activation link & operational access dispatched to email</p>
            </div>
          </div>

          <div className="flex items-start gap-3 opacity-60">
            <Store className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-semibold text-slate-300">Hyperlocal Digital Storefront Live</h5>
              <p className="text-[11px] text-slate-400">Products discoverable by customers within 3–4 km delivery radius</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="secondary" onClick={resetOnboarding}>
            Edit Registration Draft
          </Button>

          <Button onClick={onEnterDashboard}>
            <span>Preview Merchant Dashboard</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
