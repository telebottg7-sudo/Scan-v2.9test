import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, Share2, PlusSquare } from 'lucide-react';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'header' | 'sidebar' | 'banner';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ className = '', variant = 'header' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA / standalone, suppress the button
  if (isInstalled) {
    return null;
  }

  // Native prompt available (Android Chrome, Edge, Chrome Desktop)
  if (isInstallable) {
    if (variant === 'sidebar') {
      return (
        <button
          onClick={install}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-200 transition-all active:scale-95 ${className}`}
        >
          <Download size={18} className="shrink-0" />
          <span>Install Web App</span>
        </button>
      );
    }

    return (
      <button
        onClick={install}
        className={`inline-flex items-center gap-2 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 px-3.5 py-2 text-sm font-bold shadow-sm transition-all active:scale-95 ${className}`}
        title="Install ScanRx app on this device"
      >
        <Download size={16} />
        <span className="hidden sm:inline">Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`inline-flex items-center gap-2 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 px-3.5 py-2 text-sm font-bold shadow-sm transition-all active:scale-95 ${className}`}
        >
          <Smartphone size={16} />
          <span className="hidden sm:inline">Install on iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600">
                    <Smartphone size={20} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Install on iPhone / iPad</h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                  <Share2 size={18} className="text-violet-600 shrink-0 mt-0.5" />
                  <p>1. Tap the <strong>Share</strong> button in your Safari toolbar at the bottom.</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                  <PlusSquare size={18} className="text-violet-600 shrink-0 mt-0.5" />
                  <p>2. Scroll down and select <strong>"Add to Home Screen"</strong>.</p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-6 w-full rounded-xl bg-violet-600 py-3 text-sm font-bold text-white hover:bg-violet-700 transition shadow-lg shadow-violet-100"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback general install button (triggers in-UI instructions)
  return (
    <>
      <button
        onClick={() => setShowIOSGuide(true)}
        className={`inline-flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 text-xs font-semibold transition-all ${className}`}
        title="Install App"
      >
        <Download size={14} />
        <span className="hidden sm:inline">Install App</span>
      </button>

      {showIOSGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600">
                  <Download size={20} />
                </div>
                <h3 className="text-base font-bold text-slate-900">Install ScanRx App</h3>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-600">
              <p>You can install ScanRx directly on your device:</p>
              <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
                <div><strong>Chrome / Edge:</strong> Click the install icon in the URL address bar or browser menu (`⋮`).</div>
                <div><strong>Mobile (Safari):</strong> Tap <em>Share</em> and select <em>"Add to Home Screen"</em>.</div>
                <div><strong>Mobile (Chrome):</strong> Tap `⋮` and select <em>"Install app"</em> or <em>"Add to Home screen"</em>.</div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-6 w-full rounded-xl bg-violet-600 py-3 text-sm font-bold text-white hover:bg-violet-700 transition shadow-lg shadow-violet-100"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
