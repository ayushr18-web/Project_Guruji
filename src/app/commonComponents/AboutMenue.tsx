'use client';

import { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  X,
  Info,
  User,
  Mail,
  Shield,
  FileText
} from 'lucide-react';

export default function AboutMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left">
      {/* About Button with Chevron */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium hover:text-white hover:bg-[#703e11] rounded-md"
      >
        About
        <ChevronDown size={14} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={menuRef}
           className="absolute left-0 top-full mt-2 w-[360px] bg-[#fdfaf3] border border-orange-200 rounded-xl shadow-xl z-50 text-sm"
        >
          {/* Header */}
          <div className="flex justify-between items-start p-4 border-b">
            <div className="flex items-center gap-3">
              <img
                src="https://v0-29-may.vercel.app/images/guruji.png"
                alt="Sadguru"
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <div className="text-[15px] font-semibold text-gray-800">
                  Sadguru Riteshwarji Maharaj
                </div>
                <div className="text-[13px] text-gray-500">
                  Spiritual Leader & Guide
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-orange-600 hover:text-orange-800"
            >
              <X size={18} />
            </button>
          </div>

          {/* Menu Items */}
          <div className="px-4 py-3 space-y-3 text-[14px] text-[#3b2c1e]">
            <div className="flex items-center gap-2 font-semibold text-orange-600">
              <Info size={16} />
              About
            </div>

            <div className="pl-5 space-y-3">
              <div className="flex items-center gap-2">
                <User size={16} className="text-orange-500" />
                About Sadguru Riteshwarji Maharaj
              </div>
              <div className="flex items-center gap-2">
                <Info size={16} className="text-orange-500" />
                About Sanatni Platform
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-orange-500" />
                Contact Us
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-orange-500" />
                Privacy Policy
              </div>
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-orange-500" />
                Terms of Use
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[#fff2cc] text-center text-[13px] text-orange-700 px-4 py-2 rounded-b-xl border-t">
            Dedicated to spreading spiritual wisdom and guidance.
          </div>
        </div>
      )}
    </div>
  );
}
