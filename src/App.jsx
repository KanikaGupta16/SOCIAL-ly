import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Onboarding from './components/Onboarding';
import Welcome from './components/Welcome';
import Login from './components/Login';
import InputPanel from './components/InputPanel';
import IntelligencePanel from './components/IntelligencePanel';
import OutputPanel from './components/OutputPanel';
import SavedMemos from './components/SavedMemos';
import ReadyPosts from './components/ReadyPosts';
import Profile from './components/Profile';

function App() {
  // Auth States: 'welcome', 'login', 'onboarding', 'app'
  const [authState, setAuthState] = useState('welcome');
  const [userData, setUserData] = useState(null);
  
  // App Navigation States
  const [currentView, setCurrentView] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null);

  // Data States
  const [memos, setMemos] = useState([]);

  const handleLogin = (data) => {
    setUserData(data);
    setAuthState('app');
  };

  const handleOnboardingComplete = (data) => {
    setUserData(data);
    setAuthState('app');
  };

  const handlePostSelection = (post) => {
    setSelectedPost(post);
    setCurrentView('production-studio');
  };

  const handleSaveMemo = (newMemo) => {
    setMemos((prevMemos) => [newMemo, ...prevMemos]);
  };

  // Auth Flow Rendering
  if (authState === 'welcome') {
    return (
      <Welcome 
        onGetStarted={() => setAuthState('onboarding')} 
        onLogin={() => setAuthState('login')} 
      />
    );
  }

  if (authState === 'login') {
    return (
      <Login 
        onLogin={handleLogin} 
        onBack={() => setAuthState('welcome')} 
      />
    );
  }

  if (authState === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Main App Content
  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="flex flex-1 h-screen overflow-hidden">
            <div className="w-1/2 h-full border-r-2 border-black bg-brand-cream">
              <InputPanel onSaveMemo={handleSaveMemo} />
            </div>
            <div className="w-1/2 h-full bg-brand-cream">
              <IntelligencePanel />
            </div>
          </div>
        );
      case 'saved-memos':
        return <SavedMemos memos={memos} />;
      case 'ready-posts':
        return <ReadyPosts onSelectPost={handlePostSelection} />;
      case 'profile':
        return <Profile userData={userData} />;
      case 'production-studio':
        return <OutputPanel post={selectedPost} />;
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-brand-cream text-brand-black overflow-hidden relative font-sans">
       {/* Global Background Elements */}
       <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none"></div>

      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 h-full overflow-hidden relative z-10">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
