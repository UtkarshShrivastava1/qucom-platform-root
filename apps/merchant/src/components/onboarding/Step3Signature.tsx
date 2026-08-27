import React, { useRef, useState, useEffect } from 'react';
import { useOnboardingStore } from '../../stores/onboardingStore.js';
import { Button } from '../ui/Button.js';
import { Card } from '../ui/Card.js';
import { Input } from '../ui/Input.js';
import { PenLine, Sparkles, RotateCcw, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

export const Step3Signature: React.FC = () => {
  const { draft, updateDraft, nextStep, prevStep } = useOnboardingStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState<'draw' | 'generate'>('generate');
  const [signatoryName, setSignatoryName] = useState(
    draft.step3?.authorizedSignatoryName || draft.step2?.legalBusinessName || draft.step1?.fullName || 'Merchant Representative',
  );
  const [hasSignature, setHasSignature] = useState(!!draft.step3?.signatureData);
  const [generatedFont, setGeneratedFont] = useState<'cursive1' | 'cursive2' | 'formal'>('cursive1');

  // Canvas mouse/touch event handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [mode]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0]?.clientX || 0 : e.clientX;
    const clientY = 'touches' in e ? e.touches[0]?.clientY || 0 : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0]?.clientX || 0 : e.clientX;
    const clientY = 'touches' in e ? e.touches[0]?.clientY || 0 : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleContinue = () => {
    let signatureData = '';
    if (mode === 'draw' && canvasRef.current) {
      signatureData = canvasRef.current.toDataURL('image/png');
    } else {
      signatureData = `generated:${generatedFont}:${signatoryName}`;
    }

    updateDraft('step3', {
      signatureType: mode,
      signatureData: signatureData || `signature-${Date.now()}`,
      authorizedSignatoryName: signatoryName,
    });

    nextStep();
  };

  return (
    <Card className="max-w-xl mx-auto">
      <div className="mb-6">
        <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Step 3 of 6</span>
        <h2 className="text-2xl font-bold text-slate-100 mt-1">Electronic Signature Authorization</h2>
        <p className="text-sm text-slate-400 mt-1">
          Authorize your merchant registration profile with legally binding electronic consent.
        </p>
      </div>

      <div className="space-y-5">
        <Input
          label="Authorized Signatory Name"
          value={signatoryName}
          onChange={(e) => setSignatoryName(e.target.value)}
          placeholder="Full name of authorized person"
        />

        {/* Mode Selector */}
        <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1">
          <button
            type="button"
            onClick={() => setMode('generate')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-2 transition-all ${
              mode === 'generate'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Signature</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('draw')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-2 transition-all ${
              mode === 'draw'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>Draw on Screen</span>
          </button>
        </div>

        {/* Dynamic Generator Mode */}
        {mode === 'generate' && (
          <div className="space-y-3">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-6 text-center">
              <span className="text-xs text-slate-500 uppercase tracking-wider block mb-2">Electronic Signature Preview</span>
              <div
                className={`text-2xl sm:text-3xl text-brand-300 py-3 italic tracking-wide select-none ${
                  generatedFont === 'cursive1'
                    ? 'font-serif'
                    : generatedFont === 'cursive2'
                    ? 'font-mono'
                    : 'font-sans font-light uppercase tracking-widest'
                }`}
              >
                {signatoryName || 'Authorized Signatory'}
              </div>
              <div className="text-[11px] text-slate-500 mt-2">
                Digitally authenticated on {new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setGeneratedFont('cursive1')}
                className={`flex-1 py-1.5 px-2 text-xs rounded-lg border transition-all ${
                  generatedFont === 'cursive1'
                    ? 'border-brand-500 bg-brand-500/10 text-brand-400'
                    : 'border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                Style 1 (Script)
              </button>
              <button
                type="button"
                onClick={() => setGeneratedFont('cursive2')}
                className={`flex-1 py-1.5 px-2 text-xs rounded-lg border transition-all ${
                  generatedFont === 'cursive2'
                    ? 'border-brand-500 bg-brand-500/10 text-brand-400'
                    : 'border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                Style 2 (Flow)
              </button>
              <button
                type="button"
                onClick={() => setGeneratedFont('formal')}
                className={`flex-1 py-1.5 px-2 text-xs rounded-lg border transition-all ${
                  generatedFont === 'formal'
                    ? 'border-brand-500 bg-brand-500/10 text-brand-400'
                    : 'border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                Style 3 (Formal)
              </button>
            </div>
          </div>
        )}

        {/* Draw Canvas Mode */}
        {mode === 'draw' && (
          <div className="space-y-2">
            <div className="relative border-2 border-dashed border-slate-700 rounded-xl bg-slate-950/90 overflow-hidden">
              <canvas
                ref={canvasRef}
                width={500}
                height={160}
                className="w-full h-40 cursor-crosshair touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
              {!hasSignature && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-xs text-slate-500">
                  Draw your signature here with finger or mouse
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={clearCanvas}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear Signature</span>
              </button>
            </div>
          </div>
        )}

        <div className="bg-slate-900/40 border border-slate-800/60 p-3 rounded-xl flex items-start gap-2.5">
          <CheckCircle className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
          <p className="text-xs text-slate-400 leading-relaxed">
            By proceeding, you declare that all submitted merchant documents and tax information are accurate and authorized.
          </p>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <Button type="button" variant="outline" onClick={prevStep}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back</span>
          </Button>

          <Button type="button" onClick={handleContinue}>
            <span>Continue to Store Setup</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
