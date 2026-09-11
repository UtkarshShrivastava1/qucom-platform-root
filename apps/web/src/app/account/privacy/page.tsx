'use client';

import React from 'react';
import { Shield, Database, Eye, Share2, Lock, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white pb-24 pt-4">
      <div className="mx-auto max-w-3xl px-5">
        
        {/* Header */}
        <div className="relative mb-8 pb-6 border-b border-gray-100">
          <div className="pr-32">
            <h1 className="text-[22px] font-bold text-[#192168] mb-2">Privacy Policy</h1>
            <p className="text-xs text-gray-500 leading-relaxed">Last updated: May 12, 2024</p>
          </div>
          {/* Mock Graphic Container */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-contain bg-no-repeat bg-right opacity-90"
               style={{ backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/2830/2830305.png')" }}>
          </div>
        </div>

        {/* Intro Banner */}
        <div className="flex items-start gap-3 rounded-xl bg-blue-50 p-4 border border-blue-100 mb-8">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#1668F6] shadow-sm">
            <Shield className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-bold text-blue-900 text-sm mb-1">We respect your privacy</h4>
            <p className="text-[11px] text-blue-800/80 leading-relaxed">
              Viztore is committed to protecting your personal data. This privacy policy explains how we collect, use, and share your information when you use our services.
            </p>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <HighlightCard icon={<Database className="h-4 w-4 text-emerald-500" />} title="Data Collection" desc="What we collect" />
          <HighlightCard icon={<Eye className="h-4 w-4 text-blue-500" />} title="Usage" desc="How we use it" />
          <HighlightCard icon={<Share2 className="h-4 w-4 text-purple-500" />} title="Sharing" desc="Who we share with" />
          <HighlightCard icon={<Lock className="h-4 w-4 text-amber-500" />} title="Security" desc="How we protect it" />
        </div>

        {/* Policy Content */}
        <div className="space-y-8 text-sm">
          <PolicySection title="1. Information We Collect" icon={<FileText className="h-5 w-5 text-[#192168]" />}>
            <p className="text-gray-600 mb-3 leading-relaxed">We collect several different types of information for various purposes to provide and improve our Service to you:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong className="text-gray-800">Personal Data:</strong> Name, email address, phone number, and delivery address.</li>
              <li><strong className="text-gray-800">Usage Data:</strong> Information on how the Service is accessed and used.</li>
              <li><strong className="text-gray-800">Transaction Data:</strong> Details about payments to and from you and other details of products or services you have purchased from us.</li>
            </ul>
          </PolicySection>

          <PolicySection title="2. How We Use Your Information" icon={<FileText className="h-5 w-5 text-[#192168]" />}>
            <p className="text-gray-600 mb-3 leading-relaxed">Viztore uses the collected data for various purposes:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>To provide and maintain our Service.</li>
              <li>To notify you about changes to our Service.</li>
              <li>To provide customer support.</li>
              <li>To gather analysis or valuable information so that we can improve our Service.</li>
            </ul>
          </PolicySection>

          <PolicySection title="3. Data Security" icon={<FileText className="h-5 w-5 text-[#192168]" />}>
            <p className="text-gray-600 leading-relaxed">
              The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </PolicySection>

          <PolicySection title="4. Sharing of Information" icon={<FileText className="h-5 w-5 text-[#192168]" />}>
            <p className="text-gray-600 leading-relaxed">
              We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work.
            </p>
          </PolicySection>
        </div>

      </div>
    </main>
  );
}

function HighlightCard({ icon, title, desc }: any) {
  return (
    <div className="flex flex-col rounded-xl border border-gray-100 bg-gray-50 p-3 shadow-sm">
      <div className="mb-2 h-7 w-7 flex items-center justify-center rounded-lg bg-white border border-gray-100">
        {icon}
      </div>
      <h4 className="text-[11px] font-bold text-gray-900 mb-0.5">{title}</h4>
      <p className="text-[9px] text-gray-500">{desc}</p>
    </div>
  );
}

function PolicySection({ title, icon, children }: any) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="text-base font-bold text-[#192168]">{title}</h3>
      </div>
      <div className="pl-7">
        {children}
      </div>
    </div>
  );
}
