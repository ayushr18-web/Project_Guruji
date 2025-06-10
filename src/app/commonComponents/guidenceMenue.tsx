'use client';

import { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  X,
  BrainCircuit,
  MessageCircle,
  UserCircle2
} from 'lucide-react';

export default function GuidanceMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative px-3 py-1.5 rounded-md hover:text-white hover:bg-[#703e11]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 text-sm font-medium"
      >
        <span className="flex items-center gap-1">
          <BrainCircuit size={16} />
          Guidance
          <ChevronDown size={12} />
        </span>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute transform -translate-x-1/2  top-full mt-3 z-50 w-[90vw] max-w-5xl bg-[#fdf6e9] border border-orange-200 shadow-2xl rounded-md p-6 grid grid-cols-2 gap-6 text-sm"
        >
          {/* Close Icon */}
          <button
            className="absolute top-4 right-4 text-orange-600 hover:text-orange-800"
            onClick={() => setIsOpen(false)}
          >
            <X />
          </button>

          {/* Column 1: Teachings & Meditation */}
          <div>
            <h3 className="font-semibold text-orange-700 mb-3">📜 Teachings</h3>
            <ul className="space-y-2 text-[#3b2c1e] mb-6">
              <li className="flex items-center gap-2"><BrainCircuit size={16} /> Teachings</li>
              <li className="flex items-center gap-2"><BrainCircuit size={16} /> Meditation</li>
            </ul>

            <div className="flex items-start gap-3 p-3 bg-[#fff8e7] rounded-md shadow-sm border text-[13px]">
              <img
                src="https://v0-29-may.vercel.app/images/guruji.png"
                alt="Sadguru"
                className="w-12 h-12 rounded object-cover"
              />
              <div>
                <div className="text-[#c77b00] font-semibold">Sadguru Riteshwarji Maharaj</div>
                <div className="text-gray-800">Spiritual guidance for your journey</div>
              </div>
            </div>
          </div>

          {/* Column 2: Personal Guidance */}
          <div>
            <h3 className="font-semibold text-orange-700 mb-3">🧘 Personal Guidance</h3>
            <ul className="space-y-2 text-[#3b2c1e] mb-6">
              <li className="flex items-center gap-2"><MessageCircle size={16} /> Chat with Guruji</li>
              <li className="flex items-center gap-2"><MessageCircle size={16} /> Speak to Guruji</li>
              <li className="flex items-center gap-2"><UserCircle2 size={16} /> Your Dashboard</li>
            </ul>

            <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md text-[13px] shadow-md">
              <div className="font-semibold text-[15px] mb-1">Spiritual Guidance</div>
              <p>Receive personalized spiritual guidance through AI-powered conversations with Guruji.</p>
            </div>
          </div>

          {/* Footer Quote */}
          <div className="col-span-2 pt-5 mt-4 border-t text-center text-orange-700 text-[13px] italic">
            “The journey of a thousand miles begins with a single step.” — Begin your spiritual journey today.
          </div>
        </div>
      )}
    </div>
  );
}
