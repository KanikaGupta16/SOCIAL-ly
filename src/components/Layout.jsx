import React from 'react';

const Layout = ({ left, center, right }) => {
  return (
    <div className="flex h-screen w-screen bg-gray-950 overflow-hidden">
      {/* Left Panel - Input (25%) */}
      <div className="w-1/4 h-full min-w-[300px]">
        {left}
      </div>

      {/* Center Panel - Intelligence (25%) */}
      <div className="w-1/4 h-full min-w-[300px]">
        {center}
      </div>

      {/* Right Panel - Output (50%) */}
      <div className="w-2/4 h-full min-w-[500px]">
        {right}
      </div>
    </div>
  );
};

export default Layout;
