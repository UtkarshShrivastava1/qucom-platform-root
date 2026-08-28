import React, { useState, useRef, useEffect } from 'react';
import { useOnboardingStore } from '../../stores/onboardingStore.js';

interface Step2SignatureProps {
  onContinue: () => void;
  onBack?: () => void;
}

export const Step2Signature: React.FC<Step2SignatureProps> = ({ onContinue }) => {
  const { draft, updateStep } = useOnboardingStore();

  const [activeTab, setActiveTab] = useState<'draw' | 'create'>('draw');
  const [typedName, setTypedName] = useState(
    draft.step3?.signatureType === 'generate' ? draft.step3.signatureData : 'Thoufiq Ahmed',
  );
  const [signatureAdded, setSignatureAdded] = useState(Boolean(draft.step3?.signatureData));
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (activeTab === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [activeTab]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e && e.touches.length > 0 ? e.touches[0]!.clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e && e.touches.length > 0 ? e.touches[0]!.clientY : (e as React.MouseEvent).clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e && e.touches.length > 0 ? e.touches[0]!.clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e && e.touches.length > 0 ? e.touches[0]!.clientY : (e as React.MouseEvent).clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setSignatureAdded(false);
  };

  const handleAddSignature = () => {
    if (activeTab === 'draw') {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dataUrl = canvas.toDataURL('image/png');
      updateStep(3, {
        signatureType: 'draw',
        signatureData: dataUrl,
        authorizedSignatoryName: 'Authorized Signatory',
        signatoryDesignation: 'proprietor' as any,
        consentDate: new Date().toISOString(),
      });
    } else {
      const nameToUse = typedName?.trim() || 'Thoufiq Ahmed';
      updateStep(3, {
        signatureType: 'generate',
        signatureData: nameToUse,
        authorizedSignatoryName: nameToUse,
        signatoryDesignation: 'proprietor' as any,
        consentDate: new Date().toISOString(),
      });
    }

    setSignatureAdded(true);
    setError(null);
  };

  const handleFinalContinue = () => {
    if (!signatureAdded) {
      handleAddSignature();
    }
    onContinue();
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
          2
        </div>
        <h2 className="text-sm font-bold tracking-wider text-blue-600 uppercase">
          ID & SIGNATURE VERIFICATION
        </h2>
      </div>

      <p className="text-xs text-slate-500 mb-6">
        Please provide your e-signature to verify your identity.
      </p>

      {error && (
        <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-medium">
          {error}
        </div>
      )}

      {/* Signature Box */}
      <div className="space-y-4">
        <label className="block text-xs font-semibold text-slate-700">
          Signature Verification *
        </label>

        <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-4 shadow-xs">
          <h3 className="text-xs font-bold text-slate-900">Add Your e-Signature</h3>

          {/* Draw / Create Tabs */}
          <div className="flex items-center gap-6 border-b border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('draw')}
              className={`pb-2.5 font-semibold transition-all relative ${
                activeTab === 'draw'
                  ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Draw
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('create')}
              className={`pb-2.5 font-semibold transition-all relative ${
                activeTab === 'create'
                  ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Create
            </button>
          </div>

          {/* Draw Tab Content */}
          {activeTab === 'draw' && (
            <div className="relative border border-slate-200 rounded-xl p-4 bg-slate-50/40">
              <div className="flex justify-end mb-1">
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Clear
                </button>
              </div>

              <div className="relative bg-white rounded-lg border border-slate-200 h-44 overflow-hidden flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={176}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-full cursor-crosshair touch-none"
                />
                <div className="absolute bottom-4 left-6 right-6 border-b border-slate-300 pointer-events-none flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">×</span>
                  <span className="text-[10px] text-slate-400 font-medium">Draw Signature</span>
                </div>
              </div>
            </div>
          )}

          {/* Create Tab Content */}
          {activeTab === 'create' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Enter your name to create a signature *
                </label>
                <input
                  type="text"
                  value={typedName || ''}
                  onChange={(e) => setTypedName(e.target.value)}
                  placeholder="e.g. Thoufiq Ahmed"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="h-32 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center p-4">
                <span
                  style={{ fontFamily: "'Brush Script MT', 'Dancing Script', cursive" }}
                  className="text-3xl sm:text-4xl text-slate-900 tracking-wide select-none"
                >
                  {typedName || 'Your Signature'}
                </span>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-[11px] text-slate-500 leading-relaxed">
            By clicking on "Add", I understand that this is my electronic signature and is valid
            when used by me or my agent.
          </p>

          {/* Actions inside Signature Box */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClear}
              className="px-5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleAddSignature}
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all"
            >
              {signatureAdded ? 'Signature Added ✓' : 'Add'}
            </button>
          </div>
        </div>

        {/* Big Bottom Continue Button */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleFinalContinue}
            className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
