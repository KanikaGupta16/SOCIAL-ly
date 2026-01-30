import React from 'react';
import { User, Mail, MapPin, Edit2, Shield } from 'lucide-react';

const Profile = ({ userData }) => {
  return (
    <div className="flex-1 bg-brand-cream p-8 text-brand-black overflow-y-auto relative">
      {/* Dotted Background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        <h2 className="text-4xl font-serif-display font-black mb-8 flex items-center">
           <span className="bg-tag-green p-2 rounded-lg border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] mr-4">
             <User className="text-black" size={32} />
          </span>
          Profile
        </h2>
        
        <div className="bg-white rounded-2xl border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] overflow-hidden">
          {/* Cover Banner */}
          <div className="h-32 bg-dot-pattern border-b-2 border-black relative overflow-hidden">
             <div className="absolute inset-0 bg-tag-purple opacity-30"></div>
             <div className="absolute top-4 right-4">
                <button className="bg-white p-2 rounded-full border-2 border-black hover:bg-gray-100 transition-colors">
                  <Edit2 size={16} />
                </button>
             </div>
          </div>

          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="relative -mt-16 mb-6">
              <div className="w-32 h-32 rounded-full bg-tag-yellow border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <User size={64} className="text-black" />
              </div>
            </div>
            
            <div className="flex justify-between items-start">
               <div>
                 <h3 className="text-3xl font-serif-display font-black mb-1 text-black">{userData?.name || 'Alex Chen'}</h3>
                 <p className="text-lg font-bold bg-tag-pink px-2 inline-block border border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-6">
                   {userData?.role || 'Product Designer'}
                 </p>
               </div>
               <div className="flex space-x-2">
                 <span className="bg-gray-100 px-3 py-1 rounded-full border border-black text-xs font-bold flex items-center">
                   <Shield size={12} className="mr-1" /> Pro Member
                 </span>
               </div>
            </div>
            
            <div className="space-y-4 border-t-2 border-black/10 pt-6">
              <div className="flex items-center text-gray-700 font-medium">
                <div className="w-8 h-8 rounded border-2 border-black bg-gray-50 flex items-center justify-center mr-3">
                   <MapPin size={16} className="text-black" />
                </div>
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center text-gray-700 font-medium">
                <div className="w-8 h-8 rounded border-2 border-black bg-gray-50 flex items-center justify-center mr-3">
                   <Mail size={16} className="text-black" />
                </div>
                <span>user@example.com</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-black/10">
               <h4 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-4">Linked Accounts</h4>
               <div className="flex gap-3">
                  {['Twitter', 'LinkedIn', 'Instagram'].map(platform => (
                    <button key={platform} className="px-4 py-2 rounded-lg border-2 border-black font-bold text-sm hover:bg-gray-50 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all">
                      {platform}
                    </button>
                  ))}
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
