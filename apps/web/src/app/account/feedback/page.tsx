'use client';

import React, { useState } from 'react';
import { MessageSquare, Frown, Meh, Smile, Camera, ArrowRight, Star } from 'lucide-react';
import { branding } from '@repo/shared-types';

export default function FeedbackPage() {
  const [rating, setRating] = useState<number | null>(null);
  const [subject, setSubject] = useState('Overall Experience');
  const [npsScore, setNpsScore] = useState<number | null>(10);

  const subjects = ['Overall Experience', 'Product Quality', 'Delivery Experience', 'Store Experience', 'App Experience'];

  return (
    <main className="min-h-screen bg-[#f4f5f9] pb-24 pt-4">
      <div className="mx-auto max-w-3xl px-5">
        
        {/* Header Section */}
        <div className="relative mb-6">
          <div className="pr-32">
            <h1 className="text-[22px] font-bold text-[#192168] mb-2">Feedback</h1>
            <p className="text-xs text-gray-500 leading-relaxed">We value your feedback and are always looking to improve.</p>
          </div>
          {/* Mock Graphic Container */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-contain bg-no-repeat bg-right opacity-90"
               style={{ backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/3249/3249880.png')" }}>
          </div>
        </div>

        {/* Experience Rating */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-surface-200/50 mb-4">
          <h3 className="text-sm font-bold text-[#192168] mb-4">How was your experience with {branding.appName}?</h3>
          <div className="flex justify-between items-center">
            <RatingIcon icon={<Frown className="h-8 w-8" />} label="Very Poor" index={1} active={rating === 1} onClick={() => setRating(1)} />
            <RatingIcon icon={<Frown className="h-8 w-8" />} label="Poor" index={2} active={rating === 2} onClick={() => setRating(2)} />
            <RatingIcon icon={<Meh className="h-8 w-8" />} label="Average" index={3} active={rating === 3} onClick={() => setRating(3)} />
            <RatingIcon icon={<Smile className="h-8 w-8" />} label="Good" index={4} active={rating === 4} onClick={() => setRating(4)} />
            <RatingIcon icon={<Smile className="h-8 w-8" />} label="Excellent" index={5} active={rating === 5} onClick={() => setRating(5)} />
          </div>
        </div>

        {/* Feedback Subject */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-surface-200/50 mb-4">
          <h3 className="text-sm font-bold text-[#192168] mb-4">What is your feedback about?</h3>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0">
            {subjects.map((item) => (
              <button
                key={item}
                onClick={() => setSubject(item)}
                className={`flex flex-col items-center justify-center shrink-0 w-24 h-20 rounded-xl border transition-all ${
                  subject === item 
                    ? 'border-[#1668F6] bg-blue-50/50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="mb-2">
                  <Star className={`h-5 w-5 ${subject === item ? 'text-[#1668F6]' : 'text-gray-400'}`} />
                </div>
                <span className={`text-[9px] font-bold text-center leading-tight ${subject === item ? 'text-[#1668F6]' : 'text-gray-600'}`}>
                  {item.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br/></React.Fragment>)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tell us more */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-surface-200/50 mb-4">
          <h3 className="text-sm font-bold text-[#192168] mb-1">Tell us more <span className="text-gray-400 text-xs font-normal">(Optional)</span></h3>
          <textarea
            placeholder="Share your thoughts, suggestions or issues..."
            className="w-full h-24 bg-transparent resize-none text-sm text-gray-900 outline-none placeholder:text-gray-400 mt-2"
          ></textarea>
          <div className="text-right text-[10px] text-gray-400 font-medium">0/500</div>
        </div>

        {/* NPS */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-surface-200/50 mb-4">
          <h3 className="text-sm font-bold text-[#192168] mb-4">Would you recommend {branding.appName} to others?</h3>
          <div className="flex justify-between items-center overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {[0,1,2,3,4,5,6,7,8,9,10].map((score) => (
              <button
                key={score}
                onClick={() => setNpsScore(score)}
                className={`flex shrink-0 items-center justify-center w-10 h-10 rounded-xl text-sm font-bold transition-all border ${
                  npsScore === score 
                    ? 'bg-[#1668F6] text-white border-[#1668F6]' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {score}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-[9px] font-bold text-gray-400 mt-1">
            <span>Not at all</span>
            <span>Definitely</span>
          </div>
        </div>

        {/* Screenshots */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-surface-200/50 mb-8">
          <h3 className="text-sm font-bold text-[#192168] mb-1">Add Screenshots <span className="text-gray-400 text-xs font-normal">(Optional)</span></h3>
          <p className="text-[11px] text-gray-500 mb-4">You can upload screenshots to help us understand better.</p>
          <button className="flex flex-col items-center justify-center w-24 h-24 rounded-xl border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors">
            <Camera className="h-6 w-6 text-gray-400 mb-2" />
            <span className="text-[10px] font-bold text-[#192168]">Upload Image</span>
            <span className="text-[8px] text-gray-500">(Max 3 images)</span>
          </button>
        </div>

        {/* Submit */}
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1668F6] py-3.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition">
          Submit Feedback
          <ArrowRight className="h-4 w-4" />
        </button>

      </div>
    </main>
  );
}

function RatingIcon({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 group">
      <div className={`flex items-center justify-center h-12 w-12 rounded-full border transition-all ${
        active ? 'border-[#1668F6] text-[#1668F6] bg-blue-50/50' : 'border-gray-200 text-gray-400 group-hover:border-gray-300'
      }`}>
        {icon}
      </div>
      <span className={`text-[10px] font-bold ${active ? 'text-[#192168]' : 'text-gray-500'}`}>{label}</span>
    </button>
  );
}
