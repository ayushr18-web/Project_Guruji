'use client';

import {
  Bell,
  Globe,
  Info,
  Home,
  ChevronDown,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';
import ResourceMenu from '../resourceMenue';
import { UserButton, SignInButton, SignUpButton, useAuth } from '@clerk/nextjs';
import GuidanceMenu from '../guidenceMenue';
import AboutMenu from '../AboutMenue';

export default function Header() {
  const { isSignedIn } = useAuth();

  return (
    <header className="bg-[#fdf6e9] shadow-sm px-4 md:px-10 py-2 h-16 flex items-center justify-between">
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
        <div className="flex gap-2">
          <ResourceMenu />
          <GuidanceMenu />
          <AboutMenu/>
        </div>

       
      </nav>

      {/* Right: Language + Notifications + Auth */}
      <div className="flex items-ce  Fvnter space-x-4">
        <button className="flex items-center gap-1 px-3 py-1 border rounded-md text-sm">
          <Globe size={16} />
          English
        </button>

        <div className="relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 text-[10px] bg-[#c86400] text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">
            2
          </span>
        </div>

        {/* Auth Buttons */}
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <div className="flex items-center space-x-2">
            <SignInButton mode="redirect">
              <button className="px-3 py-1.5 text-sm font-medium border border-[#703e11] text-[#703e11] rounded-md hover:bg-[#703e11] hover:text-white transition">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="redirect">
              <button className="px-3 py-1.5 text-sm font-medium bg-[#703e11] text-white rounded-md hover:bg-[#582e0c] transition">
                Sign Up
              </button>
            </SignUpButton>
</div>
        )}
      </div>
    </header>
  );
}
