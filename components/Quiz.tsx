import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../types';

interface QuizProps {
    onComplete: (score: number) => void;
    onBack: () => void;
    onMoodChange: (mood: 'neutral' | 'happy' | 'sad') => void;
}

type AnswerState = 'idle' | 'selected' | 'verifying' | 'revealed';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];
const AUTO_ADVANCE_MS = 4000;

export const Quiz: React.FC<QuizProps> = ({ onComplete, onBack, onMoodChange }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [answerState, setAnswerState] = useState<AnswerState>('idle');
    const [score, setScore] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');

    const question = QUIZ_QUESTIONS[currentIndex];
    const isLast = currentIndex === QUIZ_QUESTIONS.length - 1;
    const progressPct = Math.round((currentIndex / QUIZ_QUESTIONS.length) * 100);

    // Reset per-question state when question changes
    useEffect(() => {
        setSelectedOption(null);
        setAnswerState('idle');
        setFeedbackText('');
        onMoodChange('neutral');
    }, [currentIndex]);

    const handleConfirm = useCallback(() => {
        if (selectedOption === null || answerState !== 'selected') return;

        setAnswerState('verifying');
        onMoodChange('neutral');

        // Wait 3 seconds before revealing the result
        setTimeout(() => {
            const isCorrect = selectedOption === question.correctAnswer;
            const newScore = isCorrect ? score + 1 : score;

            setAnswerState('revealed');
            setFeedbackText(isCorrect ? 'Correct! Well done.' : 'Oops! Good try.');
            onMoodChange(isCorrect ? 'happy' : 'sad');

            if (isCorrect) setScore(newScore);

            // Give them 2 seconds to read the feedback before moving on
            setTimeout(() => {
                if (isLast) {
                    onComplete(newScore);
                } else {
                    setCurrentIndex(i => i + 1);
                }
            }, 2000);
        }, 3000);
    }, [selectedOption, answerState, question, score, isLast, onComplete, onMoodChange]);

    const getOptionStyle = (idx: number) => {
        if (answerState === 'idle' || answerState === 'selected' || answerState === 'verifying') {
            if (selectedOption === idx) {
                return `border-leaf bg-leaf/10 scale-[1.02] ring-2 ring-leaf/20 shadow-sm ${answerState === 'verifying' ? 'animate-pulse' : ''}`;
            }
            return 'border-stone-200 bg-white/50 hover:border-leaf/30 hover:bg-white/80 cursor-pointer';
        }
        // State: revealed
        if (idx === question.correctAnswer) {
            return 'border-leaf bg-leaf/20 shadow-sm';
        }
        if (idx === selectedOption && idx !== question.correctAnswer) {
            return 'border-red-400 bg-red-100';
        }
        return 'border-stone-100 bg-white/30 opacity-50 blur-[1px]';
    };

    return (
        <div className="min-h-screen bg-[#F2F0E9] pt-20 pb-16 px-4 md:px-8 flex flex-col items-center">
            <div className="w-full max-w-3xl">

                {/* Back */}
                <button
                    onClick={onBack}
                    className="text-earth/60 hover:text-earth mb-6 font-sans text-sm font-medium transition-colors"
                >
                    ← Back to Details
                </button>

                {/* Progress bar */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-sans font-semibold text-xs tracking-[0.2em] uppercase text-leaf">
                            Question {currentIndex + 1} / {QUIZ_QUESTIONS.length}
                        </span>
                        <span className="font-serif italic text-earth/60 text-sm">{progressPct}% Complete</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-leaf rounded-full transition-all duration-500"
                            style={{ width: `${progressPct}%` }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/80 shadow-[0_20px_50px_-12px_rgba(62,39,35,0.1)] p-8 md:p-12 mb-6">

                    {/* Question */}
                    <p className="font-serif font-medium text-stone-800 text-2xl md:text-3xl min-h-[80px] mb-8 leading-snug">
                        {question.question}
                    </p>

                    {/* Options grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {question.options.map((opt, idx) => (
                            <button
                                key={idx}
                                disabled={answerState === 'revealed'}
                                onClick={() => {
                                    if (answerState === 'revealed') return;
                                    setSelectedOption(idx);
                                    setAnswerState('selected');
                                }}
                                className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${getOptionStyle(idx)}`}
                            >
                                {/* Letter circle */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-sans font-bold text-sm shrink-0 transition-colors ${answerState === 'revealed' && idx === question.correctAnswer
                                    ? 'bg-leaf text-white'
                                    : answerState === 'revealed' && idx === selectedOption
                                        ? 'bg-red-400 text-white'
                                        : selectedOption === idx
                                            ? 'bg-leaf text-white'
                                            : 'bg-stone-100 text-stone-500'
                                    }`}>
                                    {answerState === 'revealed' && idx === question.correctAnswer
                                        ? <Check size={14} />
                                        : answerState === 'revealed' && idx === selectedOption && idx !== question.correctAnswer
                                            ? <X size={14} />
                                            : OPTION_LETTERS[idx]}
                                </div>
                                <span className="font-sans text-sm md:text-base text-stone-700">{opt}</span>
                            </button>
                        ))}
                    </div>

                    {/* Feedback text */}
                    {answerState === 'revealed' && (
                        <p className={`mt-6 text-center font-serif italic text-lg animate-pulse ${selectedOption === question.correctAnswer ? 'text-leaf' : 'text-red-500'
                            }`}>
                            {feedbackText}
                        </p>
                    )}
                </div>

                {/* Confirm & Next button / Verifying state */}
                {answerState !== 'revealed' && (
                    <button
                        onClick={handleConfirm}
                        disabled={selectedOption === null || answerState === 'verifying'}
                        className={`w-full py-4 rounded-2xl font-serif text-xl flex items-center justify-center gap-3 transition-all duration-300 ${answerState === 'verifying'
                            ? 'bg-stone-100 text-stone-400'
                            : selectedOption !== null
                                ? 'bg-leaf text-white shadow-[0_8px_24px_rgba(85,139,47,0.35)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(85,139,47,0.4)]'
                                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                            }`}
                    >
                        {answerState === 'verifying' ? (
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-stone-300 border-t-leaf rounded-full animate-spin" />
                                Verifying Answer...
                            </div>
                        ) : (
                            <>
                                {isLast ? 'Submit Quiz' : 'Confirm & Next'} <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                )}

                {/* Auto-advancing indicator */}
                {answerState === 'revealed' && (
                    <div className="flex justify-center mt-4">
                        <div className="flex items-center gap-2 text-earth/50 font-sans text-sm">
                            <div className="w-4 h-4 border-2 border-earth/30 border-t-leaf rounded-full animate-spin" />
                            {isLast ? 'Finishing...' : 'Next question coming...'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
