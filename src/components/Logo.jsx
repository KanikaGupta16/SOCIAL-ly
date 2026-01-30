import React from 'react';
import logoImage from '../assets/logo.png';

const Logo = ({ className = "", size = "normal" }) => {
  const isSmall = size === "small";
  // Increased dimensions for "large" size to be much bigger
  const dim = isSmall ? 40 : 160; 
  const textSize = isSmall ? "text-xl" : "text-4xl";
  const containerSize = isSmall ? "w-10 h-10" : "w-40 h-40";

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* Icon Container with Crop Effect */}
      <div className={`relative ${containerSize} flex items-center justify-center rounded-full overflow-hidden border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-white`}>
        <img 
          src={logoImage} 
          alt="SOCIAL-ly Logo" 
          className="w-[150%] h-[150%] max-w-none object-cover object-center"
        />
      </div>

      {/* Text - Only show if not just the icon or if needed. 
          For the "Build Brilliant" style, the logo might just be the icon sticker. 
          I'll hide the text for the large version to match the "sticker" look, 
          but keep it for the small sidebar version.
      */}
      {!isSmall ? null : (
        <div className={`ml-3 font-bold tracking-tight ${textSize} font-serif-display text-brand-black`}>
          SOCIAL<span className="text-pink-500">-ly</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
