import React from 'react';
import { Home, Bookmark, FileText, User, Settings, LogOut } from 'lucide-react';
import Logo from './Logo';

const Sidebar = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'saved-memos', icon: Bookmark, label: 'Saved Memos' },
    { id: 'ready-posts', icon: FileText, label: 'Ready Posts' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="w-64 bg-brand-cream border-r-2 border-black flex flex-col h-full shadow-[4px_0px_0px_rgba(0,0,0,0.1)] relative z-20">
      <div className="p-6 flex justify-center border-b-2 border-black/10">
        <Logo size="small" />
      </div>

      <nav className="flex-1 px-4 space-y-3 mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 font-bold ${
              currentView === item.id
                ? 'bg-tag-yellow border-black text-black shadow-[4px_4px_0px_rgba(0,0,0,1)] -translate-y-1'
                : 'bg-transparent border-transparent text-gray-600 hover:bg-white hover:border-black hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1'
            }`}
          >
            <item.icon size={20} className={currentView === item.id ? 'text-black' : 'text-gray-500'} />
            <span className="">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t-2 border-black/10 space-y-2">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors font-medium">
          <Settings size={20} />
          <span className="">Settings</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium">
          <LogOut size={20} />
          <span className="">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
