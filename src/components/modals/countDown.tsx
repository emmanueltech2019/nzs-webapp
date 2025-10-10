
/**
 * CountdownModal
 *  - Default: counts down to November 10th of the current year (client local timezone)
 *  - Props:
 *     isOpen?: boolean (default: true) - control visibility
 *     onClose?: () => void - close callback
 *     year?: number - override year (defaults to current year)
 *     title?: string - modal title
 */

"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  year?: number;
  title?: string;
}

interface TimeLeft {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownModal: React.FC<CountdownModalProps> = ({
  isOpen = true,
  onClose = () => {},
  year,
  title = "Sales Kickoff!",
}) => {
  const now = new Date();
  const targetYear = year ?? now.getFullYear();
  const targetDate = new Date(targetYear, 10, 10, 0, 0, 0);

  const getTimeLeft = (): TimeLeft => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();
    if (diff <= 0)
      return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    const total = diff;
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return { total, days, hours, minutes, seconds };
  };

  const [remaining, setRemaining] = useState<TimeLeft>(getTimeLeft());

  useEffect(() => {
    if (!isOpen) return;
    const t = setInterval(() => {
      setRemaining(getTimeLeft());
    }, 1000);
    return () => clearInterval(t);
  }, [isOpen, targetYear]);

  const formatted = (n: number): string => String(n).padStart(2, "0");

  const content = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-slate-600">
              Starting: {targetDate.toLocaleString()}
            </p>
            <p className="text-[12px]">Welcome! Vendors are currently being onboarded. Products and services will be live shortly. Thank you for your patience as we build Nigeria’s first business ecosystem.</p>
          </div>

          <button
            aria-label="Close countdown"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 flex justify-center">
          {remaining.total === 0 ? (
            <div className="text-center">
              <div className="text-xl font-bold">The date has arrived 🎉</div>
              <div className="mt-2 text-sm text-slate-600">{`November 10, ${targetYear}`}</div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3 text-center">
              <TimeBlock label="Days" value={remaining.days.toString()} />
              <TimeBlock label="Hours" value={formatted(remaining.hours)} />
              <TimeBlock label="Minutes" value={formatted(remaining.minutes)} />
              <TimeBlock label="Seconds" value={formatted(remaining.seconds)} />
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );

  return <AnimatePresence>{isOpen && content}</AnimatePresence>;
};

interface TimeBlockProps {
  label: string;
  value: string;
}

const TimeBlock: React.FC<TimeBlockProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="rounded-lg border px-3 py-4 text-2xl font-mono font-semibold">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
};

export default CountdownModal;

/*
Usage example (in a parent component):

import CountdownModal from './CountdownModal';
import { useState } from 'react';

function Page() {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Countdown</button>
      <CountdownModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}
*/