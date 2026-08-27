import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hoverEffect = false, ...props }) => {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl shadow-slate-950/40',
          hoverEffect && 'transition-all duration-200 hover:border-slate-700/80 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-brand-950/20',
          className,
        ),
      )}
      {...props}
    >
      {children}
    </div>
  );
};
