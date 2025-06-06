'use client';

import { useState, useRef, useEffect } from 'react';
import { BookOpen, Headphones, MapPin, Calendar, Layers3, Landmark, Map, FolderOpen, BookMarked, X, ChevronDown, Library } from 'lucide-react';

export default function MegaMenu() {
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
    <div className="relative  px-3 py-1.5 rounded-md hover:text-white  hover:bg-[#703e11]">
     <button
  onClick={() => setIsOpen(!isOpen)}
  className="flex items-center gap-1 px-2 py-1 text-sm font-medium"
>
  <span className="flex items-center gap-1">
    <Library size={16} />
    Resource
    <ChevronDown size={12} />
  </span>
</button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute left-10  top-16 z-40 w-[90vw] max-w-4xl bg-[#fdf6e9] border border-orange-200 shadow-xl rounded-md p-6 grid grid-cols-4 gap-6 text-sm"
        >
          {/* Close Icon */}
          <button
            className="absolute top-2 right-3 text-orange-600 hover:text-orange-800"
            onClick={() => setIsOpen(false)}
          >
            <X />
          </button>

          {/* Books & Audio */}
          <div>
            <h3 className="font-semibold text-orange-700 mb-2">📖 Books & Audio</h3>
            <ul className="space-y-1 text-[#3b2c1e]">
              <li className="flex items-center gap-2"><BookOpen size={16} /> Books</li>
              <li className="flex items-center gap-2"><Headphones size={16} /> Audiobooks</li>
            </ul>
            <div className="mt-4 p-3 bg-[#fff8e7] rounded-md shadow-sm border text-[13px]">
              <div className="font-semibold text-[#c77b00] mb-1">Featured Book</div>
              <div className="flex items-start gap-3">
                <img src="http://v0-29-may.vercel.app/krishna-spiritual-book-cover.png" alt="Bhagavad Gita" className="w-10 h-10 rounded" />
                <div>
                  <div className="font-semibold text-gray-900">Bhagavad Gita</div>
                  <div className="text-xs text-gray-600">Divine wisdom for daily life</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stories & Collections */}
          <div>
            <h3 className="font-semibold text-orange-700 mb-2">📚 Stories & Collections</h3>
            <ul className="space-y-1 text-[#3b2c1e]">
              <li className="flex items-center gap-2"><BookOpen size={16} /> Stories</li>
              <li className="flex items-center gap-2"><FolderOpen size={16} /> Collections</li>
              <li className="flex items-center gap-2"><Landmark size={16} /> Lost Heritage</li>
            </ul>
            <div className="mt-4 p-3 bg-[#fff8e7] rounded-md shadow-sm border text-[13px]">
              <div className="font-semibold text-[#c77b00] mb-1">Popular Story</div>
              <div>
                <div className="font-semibold text-gray-900">The Divine Journey of Self-Discovery</div>
                <div className="text-xs text-gray-900">A transformative tale of spiritual awakening</div>
              </div>
            </div>
          </div>

          {/* Sacred Places */}
          <div>
            <h3 className="font-semibold text-orange-700 mb-2">📍 Sacred Places</h3>
            <ul className="space-y-1 text-[#3b2c1e]">
              <li className="flex items-center gap-2"><MapPin size={16} /> Sacred Places</li>
              <li className="flex items-center gap-2"><Layers3 size={16} /> Pilgrimage Routes</li>
              <li className="flex items-center gap-2"><Map size={16} /> Places Map</li>
            </ul>
          </div>

          {/* Calendar */}
          <div>
            <h3 className="font-semibold text-orange-700 mb-2">📅 Calendar</h3>
            <ul className="space-y-1 text-[#3b2c1e]">
              <li className="flex items-center gap-2"><Calendar size={16} /> Panchang</li>
            </ul>
          </div>

          {/* Footer text */}
          <div className="col-span-4 mt-6 text-center text-sm text-orange-700 border-t pt-4">
            Explore our extensive collection of spiritual resources to deepen your practice.
          </div>
        </div>
      )}
    </div>
  );
}
