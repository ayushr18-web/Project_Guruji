'use client';

import { Bell, Globe, Info, Home, Library, ChevronDown, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import MegaMenu from './megaMenue';

export default function Header() {
  return (
    <header className="bg-[#fdf6e9] shadow-sm px-4 md:px-10 py-2 flex items-center justify-between h-16">
      
      {/* Left: Logo */}
      <div className="flex items-center space-x-4">
        <img
          src="https://v0-29-may.vercel.app/bliss-sanatni.svg" 
          alt="Sanatni Logo"
          width={180}
          height={180}
        />
      </div>

      {/* Center: Nav Links */}
      <nav className="hidden md:flex space-x-6 items-center text-[#1c1b1b] text-sm font-medium">
        <Link href="/" className="bg-[#703e11] text-white px-3 py-1.5 rounded-md"> 
          <Home size={16} className="inline-block mr-1" />
          Home
        </Link>
        

        {/* Dropdown-like items */}
        {/* <div className="group relative px-3 py-1.5 rounded-md hover:text-white  hover:bg-[#703e11]"> */}
            <MegaMenu/>
          {/* <button className="flex items-center gap-1  ">
            <Library size={16} />
               Resource<ChevronDown size={12} />
          </button> */}
       
        {/* </div> */}

        <div className="group relative">
          <button className="flex items-center gap-1  px-3 py-1.5 hover:text-white  hover:bg-[#703e11]">
            <HelpCircle size={16} />
            Guidance <ChevronDown size={12} />
          </button>
         
        </div>

        <div className="group relative">
          <button className="flex items-center gap-1 hover:text-white  px-3 py-1.5  hover:bg-[#703e11]">
            <Info size={16} />
            About <ChevronDown size={12} />
          </button>
         
        </div>
      </nav>

      {/* Right: Language + Notifications */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center gap-1 px-3 py-1 border rounded-md text-sm">
          <Globe size={16} />
          English
        </button>

        <div className="relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 text-[10px] bg-[#c86400] text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">2</span>
        </div>
      </div>
    </header>
  );
}
