import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingStep1Schema, OnboardingStep1Dto } from '@repo/shared-types';
import { useOnboardingStore } from '../../stores/onboardingStore.js';
import { Input } from '../ui/Input.js';
import { Button } from '../ui/Button.js';
import { Card } from '../ui/Card.js';
import { User, Phone, Mail, Lock, ArrowRight } from 'lucide-react';

export const Step1Account: React.FC = () => {
  const { draft, updateDraft, nextStep } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingStep1Dto>({
    resolver: zodResolver(onboardingStep1Schema),
    defaultValues: {
      fullName: draft.step1?.fullName || '',
      mobileNumber: draft.step1?.mobileNumber || '',
      email: draft.step1?.email || '',
      password: draft.step1?.password || '',
      confirmPassword: draft.step1?.confirmPassword || '',
    },
  });

  const onSubmit = (data: OnboardingStep1Dto) => {
    updateDraft('step1', data);
    nextStep();
  };

  return (
    <Card className="max-w-xl mx-auto">
      <div className="mb-6">
        <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Step 1 of 6</span>
        <h2 className="text-2xl font-bold text-slate-100 mt-1">Create Merchant Account</h2>
        <p className="text-sm text-slate-400 mt-1">Set up your credentials to manage your store and payouts.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="e.g. Ramesh Sharma"
          leftIcon={<User className="w-4 h-4" />}
          error={errors.fullName?.message}
          {...register('fullName')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Mobile Number"
            placeholder="10-digit number (e.g. 9876543210)"
            leftIcon={<Phone className="w-4 h-4" />}
            error={errors.mobileNumber?.message}
            {...register('mobileNumber')}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="merchant@example.com"
            leftIcon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Create Password"
            type="password"
            placeholder="Min. 8 characters"
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Re-enter password"
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" className="w-full sm:w-auto">
            <span>Register and Continue</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </Card>
  );
};
