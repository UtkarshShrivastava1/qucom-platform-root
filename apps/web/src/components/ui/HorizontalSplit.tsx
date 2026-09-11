'use client';
// components/SplitCard.tsx
import React from 'react';
import Image from 'next/image';

interface SplitCardProps {
  imageSrc: string;
  imageAlt: string;
  tag?: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  onCtaClick?: () => void;
  reverse?: boolean;
}



export const SplitCard: React.FC<SplitCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  tag,
  description,
  ctaText,
  onCtaClick,
  reverse = false,
}) => {
  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
      <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
        
        {/* Image Section */}
        <div className="relative h-64 w-full md:h-auto md:w-1/2">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Content Section */}
        <div className="flex w-full flex-col justify-center p-6 md:w-1/2 md:p-8">
          {tag && (
            <span className="mb-2 w-max rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-600">
              {tag}
            </span>
          )}
          
          <h3 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
            {title}
          </h3>
          
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            {description}
          </p>

          {ctaText && (
            <div className="mt-6">
              <button
                onClick={onCtaClick}
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {ctaText}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SplitCard;
