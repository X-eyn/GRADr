import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Grader from './components/Grader';
import About from './components/About';
import StaggeredMenu from './components/StaggeredMenu';

type ViewState = 'home' | 'biology' | 'physics' | 'chemistry' | 'english' | 'about';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: 'home' },
  { label: 'Biology', ariaLabel: 'Biology Grading', link: 'biology' },
  { label: 'Physics', ariaLabel: 'Physics Grading', link: 'physics' },
  { label: 'Chemistry', ariaLabel: 'Chemistry Grading', link: 'chemistry' },
  { label: 'English', ariaLabel: 'English Grading', link: 'english' },
  { label: 'About', ariaLabel: 'Learn about us', link: 'about' },
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (link: string) => {
    setView(link as ViewState);
  };

  const getComponent = () => {
    switch (view) {
      case 'home':
        return <LandingPage onStart={() => setView('biology')} isMenuOpen={isMenuOpen} />;
      case 'biology':
        return <Grader subject="Biology" />;
      case 'physics':
        return <Grader subject="Physics" />;
      case 'chemistry':
        return <Grader subject="Chemistry" />;
      case 'english':
        return <Grader subject="English" />;
      case 'about':
        return <About />;
      default:
        return <LandingPage onStart={() => setView('biology')} isMenuOpen={isMenuOpen} />;
    }
  };

  return (
    <>
      {/* Staggered Menu Overlay */}
      <div className="fixed top-0 right-0 w-full h-full z-50 pointer-events-none">
          <StaggeredMenu
            position="right"
            items={menuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            menuButtonColor="#fff"
            openMenuButtonColor="#000000"
            changeMenuColorOnOpen={true}
            colors={['#e0e0e0', '#ffffff']}
            logoUrl="/assets/logos/logo.png"
            accentColor="#ff6b6b"
            onNavigate={handleNavigate}
            onMenuOpen={() => setIsMenuOpen(true)}
            onMenuClose={() => setIsMenuOpen(false)}
          />
      </div>

      {getComponent()}
    </>
  );
};

export default App;
