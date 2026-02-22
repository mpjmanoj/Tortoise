import React, { useState, useRef, useEffect } from 'react';
import { UserData } from '../types';
import { X, Camera, Crop, Pencil, Mail, ChevronDown, ChevronRight } from 'lucide-react';
import { COUNTRY_CODES } from '../utils/countries';

interface UserFormProps {
  userData: UserData;
  setUserData: (data: UserData) => void;
  onBack: () => void;
  onContinue: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ userData, setUserData, onBack, onContinue }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cropperImageRef = useRef<HTMLImageElement>(null);

  const [error, setError] = useState<string>('');

  // Modal States
  const [showCamera, setShowCamera] = useState(false);
  const [showCropper, setShowCropper] = useState(false);

  // Temporary image storage for cropping
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [cropper, setCropper] = useState<any>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // --- Photo Input Handlers (UNCHANGED LOGIC) ---

  useEffect(() => {
    return () => {
      if (tempImage && tempImage.startsWith('blob:')) {
        URL.revokeObjectURL(tempImage);
      }
    };
  }, [tempImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Image size should be less than 10MB');
        return;
      }
      const objectUrl = URL.createObjectURL(file);
      setTempImage(objectUrl);
      setShowCropper(true);
      setError('');
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const startCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Camera not available. Please open at http://localhost:3000/ or upload a photo.');
      return;
    }
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      setStream(mediaStream);
      setShowCamera(true);
      setError('');
    } catch (err: any) {
      console.error(err);
      if (err.name === 'NotAllowedError') {
        setError('Camera permission denied. Please allow camera access in browser settings.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found. Please upload a photo instead.');
      } else {
        setError('Unable to access camera. Please upload a photo instead.');
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setTempImage(dataUrl);
        stopCamera();
        setShowCropper(true);
      }
    }
  };

  useEffect(() => {
    if (showCamera && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [showCamera, stream]);

  // --- Cropper Logic (UNCHANGED LOGIC) ---

  useEffect(() => {
    if (showCropper && cropperImageRef.current) {
      const timer = setTimeout(() => {
        const newCropper = new (window as any).Cropper(cropperImageRef.current, {
          aspectRatio: 1,
          viewMode: 1,
          dragMode: 'move',
          autoCropArea: 0.8,
          guides: true,
          center: true,
          highlight: false,
          background: false,
          modal: true,
          cropBoxMovable: true,
          cropBoxResizable: true,
          toggleDragModeOnDblclick: false,
        });
        setCropper(newCropper);
      }, 10);
      return () => clearTimeout(timer);
    }
    return () => {
      if (cropper) {
        cropper.destroy();
        setCropper(null);
      }
    };
  }, [showCropper]);

  const saveCrop = () => {
    if (cropper) {
      const canvas = cropper.getCroppedCanvas({
        width: 1080,
        height: 1080,
        fillColor: '#fff',
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
      });
      const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.95);
      setUserData({ ...userData, photo: croppedDataUrl });
      setShowCropper(false);
      setTempImage(null);
    }
  };

  const cancelCrop = () => {
    setShowCropper(false);
    setTempImage(null);
  };

  // --- Form Validation ---

  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      userData.fullName.trim().length > 2 &&
      emailRegex.test(userData.email.trim()) &&
      userData.phone.trim().length >= 10
    );
  };

  const handleContinue = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (isFormValid()) {
      setError('');
      onContinue();
    } else {
      if (userData.fullName.trim().length <= 2) {
        setError('Please enter your full name (at least 3 characters).');
      } else if (!emailRegex.test(userData.email.trim())) {
        setError('Please enter a valid email address (e.g. name@example.com).');
      } else if (userData.phone.trim().length < 10) {
        setError('Please enter a valid 10-digit phone number.');
      } else {
        setError('Please fill all required fields to continue.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F0E9] pt-20 pb-12 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 relative">

          {/* Back button */}
          <button
            onClick={onBack}
            className="absolute top-6 left-6 text-stone-400 hover:text-earth transition-colors font-sans text-sm"
          >
            ← Back
          </button>

          {/* Header */}
          <div className="text-center mb-8 mt-2">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-2xl">🐢</span>
              <span className="bg-green-50 text-leaf text-[10px] font-sans font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                TORTOISE GUARDIAN
              </span>
            </div>

            <h2 className="text-3xl font-bold text-blue-900 font-sans">Enter Details</h2>
          </div>

          <div className="flex flex-col gap-7">

            {/* Photo Section */}
            <div className="flex flex-col items-center">
              <div
                className="relative w-28 h-28 mb-4 group cursor-pointer"
                onClick={() => {
                  if (userData.photo) {
                    setTempImage(userData.photo);
                    setShowCropper(true);
                  } else {
                    fileInputRef.current?.click();
                  }
                }}
              >
                <div className={`w-full h-full rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 ${userData.photo ? 'bg-white shadow-md' : 'bg-slate-50 border-2 border-slate-100'}`}>
                  {userData.photo ? (
                    <img src={userData.photo} className="w-full h-full object-cover" alt="Profile" />
                  ) : (
                    <Camera className="text-slate-400 opacity-50" size={36} strokeWidth={1.5} />
                  )}
                </div>
                <div className="absolute bottom-1 right-1 w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center border-[3px] border-white shadow-sm transition-transform group-hover:scale-110">
                  <Pencil size={13} className="text-white fill-white" />
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold tracking-widest text-blue-900">
                <button onClick={() => fileInputRef.current?.click()} className="hover:text-blue-700 transition-colors uppercase">
                  Upload Photo
                </button>
                <span className="text-slate-300 text-lg font-light">|</span>
                <button onClick={startCamera} className="hover:text-blue-700 transition-colors uppercase">
                  Use Camera
                </button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {/* Inputs */}
            <div className="space-y-5">

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">
                  Full Name <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  value={userData.fullName}
                  onChange={(e) => {
                    setUserData({ ...userData, fullName: e.target.value });
                    if (error && e.target.value.trim().length > 2) setError('');
                  }}
                  placeholder="Ram Kumar"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 text-stone-700 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all"
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">
                  WhatsApp <span className="text-orange-500">*</span>
                </label>
                <div className="flex bg-slate-50 border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-900/10 focus-within:border-blue-900 focus-within:bg-white transition-all">
                  <div className="bg-slate-100 px-2 flex items-center text-stone-600 border-r border-slate-200 min-w-[100px] justify-center relative">
                    <select
                      className="bg-transparent outline-none appearance-none cursor-pointer w-full text-center py-4 pl-2 pr-6 z-10"
                      value={userData.countryCode}
                      onChange={(e) => setUserData({ ...userData, countryCode: e.target.value })}
                    >
                      {COUNTRY_CODES.map((country, index) => (
                        <option key={`${country.code}-${index}`} value={country.code}>
                          {country.name} ({country.code})
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="text-stone-400 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
                  </div>
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => {
                      setUserData({ ...userData, phone: e.target.value.replace(/\D/g, '') });
                      if (error && e.target.value.replace(/\D/g, '').length >= 10) setError('');
                    }}
                    placeholder="98765 43210"
                    className="flex-1 bg-transparent border-none px-5 py-4 text-stone-700 placeholder-slate-400 outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">
                  Email <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => {
                      setUserData({ ...userData, email: e.target.value });
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (error && emailRegex.test(e.target.value)) setError('');
                    }}
                    placeholder="name@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 pr-12 text-stone-700 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all"
                  />
                  <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            {/* Opt-in */}
            <div className="flex items-start gap-3">
              <input
                id="optIn"
                type="checkbox"
                checked={userData.optIn !== false}
                onChange={(e) => setUserData({ ...userData, optIn: e.target.checked })}
                className="mt-1 w-4 h-4 rounded cursor-pointer accent-orange-500"
              />
              <label htmlFor="optIn" className="text-sm text-stone-600 cursor-pointer leading-snug">
                I agree to receive information about similar initiatives in the future.
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-xl flex items-start gap-2" role="alert">
                <X size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${isFormValid()
                ? 'bg-slate-200 text-slate-500 hover:bg-leaf hover:text-white hover:shadow-lg hover:-translate-y-1'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
            >
              Continue <ChevronRight size={20} />
            </button>

          </div>
        </div>
      </div>

      {/* CAMERA MODAL — UNCHANGED LOGIC */}
      {showCamera && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-black rounded-2xl overflow-hidden aspect-[3/4] md:aspect-video flex items-center justify-center border border-stone-800">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover transform scale-x-[-1]"
            />
            <div className="absolute inset-0 pointer-events-none border-[1px] border-white/20" />
            <div className="absolute bottom-6 w-full flex items-center justify-center gap-8">
              <button
                onClick={stopCamera}
                className="w-12 h-12 rounded-full bg-stone-800 text-white flex items-center justify-center hover:bg-stone-700 transition-colors"
              >
                <X size={20} />
              </button>
              <button
                onClick={capturePhoto}
                className="w-16 h-16 rounded-full bg-white border-4 border-blue-900 flex items-center justify-center hover:scale-105 transition-transform"
              >
                <div className="w-10 h-10 rounded-full bg-blue-900" />
              </button>
              <div className="w-12" />
            </div>
          </div>
          <p className="text-white mt-4 text-sm font-medium opacity-80">Position your face within the frame</p>
        </div>
      )}

      {/* CROPPER MODAL — UNCHANGED LOGIC */}
      {showCropper && tempImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white z-10">
              <div className="flex items-center gap-2">
                <Crop size={20} className="text-leaf" />
                <h3 className="font-bold text-lg text-slate-800">Adjust Photo</h3>
              </div>
              <button onClick={cancelCrop} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <div className="relative flex-1 bg-slate-900 overflow-hidden min-h-[300px]">
              <img
                ref={cropperImageRef}
                src={tempImage}
                alt="Crop Preview"
                className="max-w-full opacity-0"
              />
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-end gap-3 z-10">
              <button
                onClick={cancelCrop}
                className="px-6 py-2.5 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveCrop}
                className="px-6 py-2.5 bg-leaf hover:bg-leaf/90 text-white font-bold rounded-xl shadow-lg transition-colors"
              >
                Save Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};