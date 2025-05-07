import { useState, useEffect, useRef } from 'react';
import './App.css';
import ControlPanel from './components/ControlPanel';
import QRCodeDisplay from './components/QRCodeDisplay';
import { saveAs } from 'file-saver';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const qrRef = useRef(null);
  const [qrOptions, setQrOptions] = useState({
    width: 300,
    height: 300,
    type: 'svg',
    data: 'https://example.com',
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
    } else {
      document.documentElement.classList.remove('dark');
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <header className="py-4 px-6 bg-[#ffffff] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">QRify</h1>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="btn btn-secondary"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? '🌞 Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* QR Code Preview - More prominent on mobile */}
            <div className="order-1 lg:order-2 flex justify-center">
              <QRCodeDisplay ref={qrRef} options={qrOptions} />
            </div>
            
            {/* Control Panel - Full width on mobile */}
            <div className="order-2 lg:order-1">
              <ControlPanel 
                qrOptions={qrOptions} 
                setQrOptions={setQrOptions} 
                handleDownload={handleDownload} 
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 px-6 bg-[#ffffff] dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} QRify - Create Beautiful QR Codes
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Built with React, Tailwind CSS, and qr-code-styling
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
