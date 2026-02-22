import React, { useState, useRef } from 'react';
import { UserData } from '../types';
import { Poster } from './Poster';
import { Download, Share2, RefreshCw, CheckCircle, Loader2 } from 'lucide-react';

interface SuccessProps {
  userData: UserData;
  onReset: () => void;
}

export const Success: React.FC<SuccessProps> = ({ userData, onReset }) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const generateImageBlob = async (): Promise<Blob | null> => {
    if (!posterRef.current || !(window as any).html2canvas) return null;
    try {
      const elementToCapture = posterRef.current;
      const clone = elementToCapture.cloneNode(true) as HTMLElement;
      const name = userData.fullName || 'Guardian';
      clone.style.position = 'fixed';
      clone.style.top = '-10000px';
      clone.style.left = '-10000px';
      clone.style.width = '800px';
      clone.style.height = `${(800 * 1600) / 1080}px`;
      clone.style.transform = 'none';
      clone.style.margin = '0';
      clone.style.boxShadow = 'none';
      clone.style.borderRadius = '0';
      const nameElement = clone.querySelector('h2') as HTMLElement;
      const nameContainer = nameElement?.parentElement as HTMLElement;
      if (nameElement && nameContainer) {
        nameElement.style.fontSize = (name.length > 20) ? '38px' : (name.length > 13) ? '50px' : '64px';
        nameElement.style.whiteSpace = 'nowrap';
        nameElement.style.fontWeight = '600';
        nameElement.style.textAlign = 'center';
        nameContainer.style.width = '100%';
        nameContainer.style.left = '0';
        nameContainer.style.top = '52%';
      }
      document.body.appendChild(clone);
      await new Promise(resolve => setTimeout(resolve, 100));
      const canvas = await (window as any).html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: null
      });
      document.body.removeChild(clone);
      return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    } catch (err) {
      console.error('Error generating image:', err);
      const clone = document.body.lastElementChild;
      if (clone && (clone as HTMLElement).style?.top === '-10000px') {
        document.body.removeChild(clone);
      }
      return null;
    }
  };

  const handleDownload = async () => {
    setIsProcessing(true);
    const blob = await generateImageBlob();
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Tortoise_Guardian_${userData.fullName.replace(/\s+/g, '_')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    setIsProcessing(false);
  };

  const handleShare = async () => {
    setIsProcessing(true);
    const blob = await generateImageBlob();
    if (blob) {
      const file = new File([blob], 'tortoise_guardian.png', { type: 'image/png' });
      if (navigator.share) {
        try {
          await navigator.share({
            files: [file],
            title: 'Tortoise Guardian Certificate',
            text: `🐢 I scored ${userData.score}/20 on the Tortoise Conservation Quiz! Join the movement. #TortoiseGuardians`,
          });
        } catch (err) {
          console.log('Share aborted', err);
        }
      } else {
        alert('Sharing not supported on this browser. Downloading instead.');
        handleDownload();
      }
    }
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-[#F2F0E9] pt-24 pb-16 px-4 flex flex-col items-center">
      <div className="w-full max-w-lg flex flex-col items-center text-center animate-fade-in">

        <button
          onClick={onReset}
          className="self-start mb-6 text-earth/60 hover:text-earth font-sans text-sm flex items-center gap-2 transition-colors"
        >
          ← Back to Home
        </button>

        <div className="w-16 h-16 bg-leaf/10 rounded-full flex items-center justify-center mb-5">
          <CheckCircle size={32} className="text-leaf" />
        </div>

        <h1 className="font-serif text-4xl font-bold text-earth mb-2">
          Guardian Certified! 🐢
        </h1>
        <p className="font-sans text-earth/60 mb-2">
          Thank you, <span className="font-bold text-earth">{userData.fullName}</span>.
        </p>
        <p className="font-sans text-earth/60 mb-8">
          You scored <span className="font-bold text-leaf">{userData.score} / 20</span> and earned your Guardian Certificate.
        </p>


        {/* Poster with ref for capture */}
        <div className="relative mb-8 w-full max-w-[350px] shadow-xl rounded-none md:rounded-lg overflow-hidden border border-stone-200">
          <div ref={posterRef}>
            <Poster userData={userData} />
          </div>
          {isProcessing && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20">
              <div className="flex flex-col items-center">
                <Loader2 className="w-8 h-8 text-leaf animate-spin mb-2" />
                <span className="font-sans text-xs font-bold text-leaf">GENERATING...</span>
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="w-full space-y-3">
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              disabled={isProcessing}
              className="flex-1 py-4 bg-stone-800 text-white font-serif font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-stone-900 transition-colors disabled:opacity-50"
            >
              <Download size={20} /> Download
            </button>
            <button
              onClick={handleShare}
              disabled={isProcessing}
              className="flex-1 py-4 bg-leaf text-white font-serif font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-leaf/20 hover:-translate-y-1 transition-all disabled:opacity-50"
            >
              <Share2 size={20} /> Share
            </button>
          </div>
          <button
            onClick={onReset}
            className="w-full py-3 border-2 border-earth/20 text-earth font-sans font-semibold text-sm hover:border-earth/40 flex items-center justify-center gap-2 mt-2 rounded-xl transition-all"
          >
            <RefreshCw size={14} /> Take Quiz Again
          </button>
        </div>
      </div>
    </div>
  );
};