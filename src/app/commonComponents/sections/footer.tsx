// components/Footer.tsx
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';

export const  Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#914e27] text-[#f5f0e6] px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        {/* Left - Logo and Tagline */}
        <div className="flex flex-col items-start">
          <Image
            src="/logo.png" // replace with your logo path
            alt="Sanatni Logo"
            width={140}
            height={40}
            className="mb-4"
          />
          <h2 className="text-3xl font-medium leading-tight">
            Vedic Heritage<br />Reimagined Digitally
          </h2>
          <p className="mt-2 text-sm text-[#f5f0e6]/80 max-w-xs">
            A spiritual platform dedicated to Sadguru Riteshwari Maharaj
          </p>
        </div>

        {/* Right - Links and Icons */}
        <div className="flex flex-col md:flex-row justify-between w-full md:w-auto gap-10">
          <div className="flex flex-col gap-2 text-sm">
            <a href="#">About Guruji</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <a href="#">Contact</a>
            <a href="#">Terms of Service</a>
          </div>
          <div className="flex gap-4 mt-2 md:mt-0 text-[#f5f0e6]">
            <FaFacebookF className="hover:text-white" />
            <FaTwitter className="hover:text-white" />
            <FaInstagram className="hover:text-white" />
            <FaYoutube className="hover:text-white" />
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-[#f5f0e6]/70 mt-10">
        © {currentYear} Sanatni. All rights reserved.
      </p>
    </footer>
  );
}
