import { useState, useEffect, useRef } from 'react';
import './App.css';
import ControlPanel from './components/ControlPanel';
import QRCodeDisplay from './components/QRCodeDisplay';
import { saveAs } from 'file-saver';

function App() {
  // Initialize darkMode from localStorage if available, or from user system preference
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const qrRef = useRef(null);
  const [qrOptions, setQrOptions] = useState({
    width: 300,
    height: 300,
    type: 'svg',
    data: 'https://github.com/buggy-bits/qrify',
    image: '',
    margin: 10,
    dotsOptions: {
      color: '#000000',
      type: 'square'
    },
    cornersSquareOptions: {
      color: '#000000',
      type: 'square',
    },
    cornersDotOptions: {
      color: '#000000',
      type: 'square',
    },
    backgroundOptions: {
      color: '#ffffff',
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 0,
      hideBackgroundDots: true,
      imageSize: 0.3,
    },
  });

  // Toggle dark mode and update document classes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleDownload = async (fileType, size) => {
    if (!qrRef.current) {
      console.error('QR code reference not available');
      return;
    }

    let fileExt = fileType.toLowerCase();
    
    try {
      const url = await qrRef.current.download({
        extension: fileExt,
        width: size,
        height: size,
      });
      
      saveAs(url, `qrcode.${fileExt}`);
    } catch (error) {
      console.error('Error downloading QR code:', error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <header className="py-4 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">QRify</h1>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
              : 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            }
          </button>
        </div>
      </header>

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Always keep Control Panel on left for desktop (3/5 width) */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <ControlPanel 
                qrOptions={qrOptions} 
                setQrOptions={setQrOptions} 
                handleDownload={handleDownload}
                darkMode={darkMode} 
              />
            </div>
            
            {/* Always keep QR Code Preview on right for desktop (2/5 width) */}
            <div className="lg:col-span-2 order-1 lg:order-2 flex justify-center lg:sticky lg:top-24 lg:self-start">
              <QRCodeDisplay ref={qrRef} options={qrOptions} />
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 px-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} QRify - Create Free QR Codes
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Built with React, Tailwind CSS, and qr-code-styling
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
