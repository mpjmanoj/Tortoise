import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { UserForm } from './components/UserForm';
import { Quiz } from './components/Quiz';
import { CertificatePreview } from './components/CertificatePreview';
import { Success } from './components/Success';
import { TortoiseBuddy } from './components/TortoiseBuddy';
import { UserData, Step } from './types';
import { saveUserData } from './services/dataStore';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.Home);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+91',
    photo: '',
    optIn: true,
    score: 0,
  });
  const [quizMood, setQuizMood] = useState<'neutral' | 'happy' | 'sad'>('neutral');

  const goToStep = useCallback((step: Step) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(step);
      window.scrollTo(0, 0);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 16);
  }, []);

  const handleReset = () => {
    setUserData({ fullName: '', email: '', phone: '', countryCode: '+91', photo: '', optIn: true, score: 0 });
    setQuizMood('neutral');
    goToStep(Step.Home);
  };

  const handleQuizComplete = (score: number) => {
    setUserData(prev => ({ ...prev, score }));
    goToStep(Step.Certificate);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    const saved = await saveUserData(userData, {});
    setIsSubmitting(false);
    if (!saved) {
      setSubmitError('Could not save your commitment. Check your connection and try again.');
      return;
    }
    goToStep(Step.Success);
  };

  return (
    <div className="min-h-screen font-sans text-stone-800 flex flex-col relative overflow-x-hidden bg-[#F2F0E9] selection:bg-leaf/30">
      {/* Film grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      {/* Top light gradient */}
      <div className="fixed top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-stone-200/40 to-transparent pointer-events-none z-0" />

      <Navbar onLogoClick={handleReset} />

      {/* TortoiseBuddy — shown on Form and Quiz steps */}
      {(currentStep === Step.Form || currentStep === Step.Quiz) && (
        <TortoiseBuddy mood={currentStep === Step.Quiz ? quizMood : 'neutral'} />
      )}

      <main className={`flex-1 transition-opacity duration-200 ease-in-out relative z-10 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {currentStep === Step.Home && (
          <Hero onStart={() => goToStep(Step.Form)} />
        )}
        {currentStep === Step.Form && (
          <UserForm
            userData={userData}
            setUserData={setUserData}
            onBack={() => goToStep(Step.Home)}
            onContinue={() => goToStep(Step.Quiz)}
          />
        )}
        {currentStep === Step.Quiz && (
          <Quiz
            onComplete={handleQuizComplete}
            onBack={() => goToStep(Step.Form)}
            onMoodChange={setQuizMood}
          />
        )}
        {currentStep === Step.Certificate && (
          <CertificatePreview
            userData={userData}
            onBack={() => goToStep(Step.Quiz)}
            onConfirm={handleConfirm}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        )}
        {currentStep === Step.Success && (
          <Success userData={userData} onReset={handleReset} />
        )}
      </main>
    </div>
  );
};

export default App;