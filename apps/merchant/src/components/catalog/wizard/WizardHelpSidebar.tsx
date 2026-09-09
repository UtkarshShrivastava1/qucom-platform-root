import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { WizardStep } from '../../../stores/catalogStore.js';

interface WizardHelpSidebarProps {
  step: WizardStep;
}

export const WizardHelpSidebar: React.FC<WizardHelpSidebarProps> = ({ step }) => {
  const [openSection1, setOpenSection1] = useState(true);
  const [openSection2, setOpenSection2] = useState(true);

  if (step === 1) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          {/* Header */}
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
            <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center">
              <Lightbulb className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Need Help?</h4>
          </div>

          {/* Accordion Item 1 */}
          <div className="border-b border-slate-100 py-2.5">
            <button
              type="button"
              onClick={() => setOpenSection1(!openSection1)}
              className="w-full flex items-center justify-between text-left text-xs font-semibold text-slate-800 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <span>How to choose the right category?</span>
              {openSection1 ? (
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
            {openSection1 && (
              <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
                Select the most relevant category, sub-category and product type for your product.
                This helps customers find your product easily and improves search ranking.
              </p>
            )}
          </div>

          {/* Accordion Item 2 */}
          <div className="pt-2.5">
            <button
              type="button"
              onClick={() => setOpenSection2(!openSection2)}
              className="w-full flex items-center justify-between text-left text-xs font-semibold text-slate-800 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <span>Brand Guidelines</span>
              {openSection2 ? (
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
            {openSection2 && (
              <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
                List products only under brands that you are authorized to sell. If your brand is
                not listed, you can request for approval. Approval usually takes 1–3 business days.
              </p>
            )}
          </div>
        </div>

        {/* Example Card */}
        <div className="bg-slate-50 rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          <h5 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            Example
          </h5>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-start justify-between">
              <span className="text-slate-500">Category:</span>
              <span className="font-semibold text-slate-800">Men</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-slate-500">Sub-category:</span>
              <span className="font-semibold text-slate-800">T-Shirts</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-slate-500">Product Type:</span>
              <span className="font-semibold text-slate-800">Round Neck T-Shirt</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-slate-500">Brand:</span>
              <span className="font-semibold text-slate-800">PUMA</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-slate-500">HSN Code:</span>
              <span className="font-mono font-semibold text-slate-800">61091000</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          {/* Header */}
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
            <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center">
              <Lightbulb className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Need Help?</h4>
          </div>

          {/* Accordion Item 1: Image Guidelines */}
          <div className="border-b border-slate-100 py-2.5">
            <button
              type="button"
              onClick={() => setOpenSection1(!openSection1)}
              className="w-full flex items-center justify-between text-left text-xs font-semibold text-slate-800 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <span>Image Guidelines</span>
              {openSection1 ? (
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
            {openSection1 && (
              <ul className="mt-2 space-y-1.5 text-[11px] leading-relaxed text-slate-500">
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Upload clear, high-resolution images (min. 500x500 px).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Use a plain white or neutral clean background.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Show multiple angles (front, back, side, neck shot, zoom).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Supported formats: JPG, PNG, WEBP (Max 10MB each).</span>
                </li>
              </ul>
            )}
          </div>

          {/* Accordion Item 2: Product Title Guidelines */}
          <div className="pt-2.5">
            <button
              type="button"
              onClick={() => setOpenSection2(!openSection2)}
              className="w-full flex items-center justify-between text-left text-xs font-semibold text-slate-800 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <span>Product Title Guidelines</span>
              {openSection2 ? (
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
            {openSection2 && (
              <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
                Use a clear and descriptive title with key details like brand, product type, color,
                and key fabric. Avoid all caps or promotional spam.
              </p>
            )}
          </div>
        </div>

        {/* Example Card */}
        <div className="bg-slate-50 rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          <h5 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            Example
          </h5>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-start justify-between gap-2">
              <span className="text-slate-500 shrink-0">Product Name:</span>
              <span className="font-semibold text-slate-800 text-right">
                Men Black Round Neck T-Shirt
              </span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-slate-500">Brand:</span>
              <span className="font-semibold text-slate-800">PUMA</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-slate-500">HSN Code:</span>
              <span className="font-mono font-semibold text-slate-800">61091000</span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <span className="text-slate-500 shrink-0">Description:</span>
              <span className="text-[11px] text-slate-600 text-right">
                Premium quality cotton round neck t-shirt for men.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 3 guidance
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
          <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-slate-900">Need Help?</h4>
        </div>

        <div className="space-y-3 text-xs text-slate-600">
          <div>
            <h6 className="font-semibold text-slate-800">Pricing & Tax</h6>
            <p className="text-[11px] text-slate-500 mt-1">
              Ensure selling price is less than or equal to MRP. Correct tax rates ensure GST
              compliance on invoicing.
            </p>
          </div>
          <div>
            <h6 className="font-semibold text-slate-800">Storage & Warehouse</h6>
            <p className="text-[11px] text-slate-500 mt-1">
              Providing bin and shelf coordinates speeds up dispatch runner order picking by up to
              60%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
